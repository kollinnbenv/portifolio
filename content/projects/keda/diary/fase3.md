---
title: "Fase 3 · GitOps e template"
date: "03-2026"
summary: "Por que o time declara o autoscaling e a plataforma controla o template"
---
# Fase 3 - Padronização GitOps e template

Até essa fase tudo tinha sido feito na mão, com helm install direto no cluster de laboratório. Isso funciona para provar conceito, mas não é entregável, porque não tem histórico, não tem revisão e não garante que o próximo ambiente fique igual ao anterior. Nosso padrão de entrega é GitOps, então o KEDA tinha que entrar por esse caminho.

# Atividades deste ciclo

* Chart entregue como release declarativa, com a origem do chart e o namespace dedicado também versionados
* Estrutura de base comum com sobreposição por ambiente, então laboratório e dev compartilham a mesma definição e divergem só no que precisa divergir
* Values alinhados ao padrão de plataforma, com nodeSelector e tolerations para agendar nos nós certos, requests e limits iguais para garantir QoS previsível, e múltiplas réplicas dos componentes
* Imagem espelhada no nosso registry interno via IaC
* TriggerAuthentication referenciando segredo gerenciado pelo nosso fluxo de segredos, no lugar de credencial escrita no manifesto

O espelhamento da imagem é o ponto que normalmente é esquecido quando se instala o KEDA, porque no dia da instalação funciona igual e o problema só aparece meses depois. Depender de registry público significa que uma indisponibilidade de terceiro pode impedir o operator de subir numa rotação de nó ou num upgrade de cluster, e sem o operator de pé o autoscaling inteiro para, mesmo com toda a configuração correta e os ScaledObject certos.

Nós resolvemos isso criando a imagem de cache no nosso registry interno via IaC, então o KEDA não depende mais de registry externo para subir no cluster.

# Decisões técnicas

A discussão mais importante da fase foi definir quem gerencia os manifestos de escalonamento de cada produto. Existiam dois caminhos:

* **A plataforma gerencia**
    * Trade-off: vira fila de chamado para cada ajuste de réplica
    * Impacto: não escala como time e coloca o SRE no caminho crítico de toda mudança
* **Cada time gerencia o seu**
    * Trade-off: escala bem, mas abre espaço para configuração inconsistente
    * Impacto: risco de custo e de comportamento diferente entre produtos

Eu fui pelo meio termo, o time declara mas dentro de um template que a plataforma controla, então o time ganha autonomia e a plataforma mantém os defaults seguros embutidos.

# O template

Criei o template do ScaledObject na nossa biblioteca interna de charts Helm. O time preenche alguns valores e herda o resto pronto:

* Consulta ao gatilho a cada 30 segundos e espera de 300 segundos antes de reduzir réplica
* Piso e teto de réplicas sempre explícitos, com 2 e 5 como padrão
* Janela de estabilização de 300 segundos na redução, para evitar flapping
* Limiar de 70 por cento para cpu e 80 por cento para memória, quando o gatilho é de utilização
* Suporte a `paused`, que permite congelar o autoscaling durante troubleshooting ou incidente sem remover a configuração
* fallback disponível, com a ressalva de que só se aplica a gatilho externo

O template passou por revisão de PR e voltou com correções, o que foi bom porque as correções vieram de quem ia consumir o template no dia a dia.

# Finalização dessa fase

O KEDA deixou de ser um estudo meu e virou componente de plataforma com contrato definido. O custo de um próximo time adotar autoscaling caiu de estudar o KEDA para preencher um arquivo de values.

# Próximo passo

* Subir o KEDA no ambiente de dev
