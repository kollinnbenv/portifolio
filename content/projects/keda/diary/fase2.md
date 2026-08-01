---
title: "fase 02"
date: "01-2026"
summary: "Laboratório com controle de risco"
---
# Fase 2 - Testando o autoscaling no laboratório

Na fase 1 eu validei que o KEDA fazia sentido para o nosso ambiente, mas aquilo ainda era estudo. Nessa fase eu precisava ver o autoscaling funcionando de verdade, então montei um cenário de gargalo controlado no laboratório, que é onde eu posso errar sem afetar usuário final nem desenvolvedor.

# O que eu montei

Criei um repositório de POC com as peças para gerar carga sob demanda:

* Aplicação consumidora em nodejs, publicada no nosso registry privado
* Deployment com requests e limits definidos, que é pré-requisito para escalar por cpu e memória
* Fila de mensageria de laboratório, isolada dos outros ambientes
* Gerador de carga para controlar o volume de mensagens

Como eu sabia o tempo de processamento de cada mensagem, eu conseguia calcular quantas réplicas deveriam subir e comparar com o que o KEDA fazia de fato.

# Atividades deste ciclo

Eu não testei só mensageria, aproveitei o laboratório para exercitar os tipos de gatilho que o KEDA oferece e entender onde cada um se aplica:

* **Service Bus:** escala pelo backlog da fila, é o caso do consumidor orientado a evento
* **Cpu e memória:** escala por utilização, serve de linha de base e para serviço que não tem métrica de negócio, mas é reativo, quando a cpu subiu o usuário já sentiu
* **Cron:** escala por janela de horário, resolve o que métrica nenhuma resolve, que é subir capacidade antes do pico e não depois dele
* **Prometheus:** escala pelo resultado de uma query, é o mais flexível porque transforma qualquer métrica já instrumentada em critério de escalonamento

Também testei os dois tipos de objeto, que é fácil confundir:

* **ScaledObject:** ajusta réplicas de um Deployment de longa duração
* **ScaledJob:** dispara execuções pontuais de trabalho, com controle de histórico de jobs concluídos e falhos

No teste de ScaledJob eu deixei os workers com tolerância para nós spot, que custam bem menos que o sob demanda. Trabalho em lote tolera interrupção, então é a carga que deve rodar em nó barato, e isso é decisão de custo.

# Scale to zero

Com gatilho de horário eu validei escalonamento até zero réplica fora da janela de uso. Em ambiente não produtivo, que fica ocioso à noite e no fim de semana, isso é redução direta de consumo.

A limitação que eu descobri testando é que cpu e memória sozinhos não escalam para zero, precisa ter pelo menos um gatilho de outro tipo junto. Não está óbvio na documentação e só aparece quando você tenta.

# Decisões técnicas

O comportamento do autoscaling depende muito mais da configuração do que da ferramenta:

* `pollingInterval`
    * frequência de consulta ao gatilho
    * curto demais gera custo de consulta na origem da métrica, longo demais atrasa a reação
* `cooldownPeriod`
    * espera antes de reduzir réplicas
    * mal calibrado gera flapping, com pod subindo e descendo sem necessidade, somando custo e cold start
* `minReplicaCount` e `maxReplicaCount`
    * piso de disponibilidade e teto de custo
    * sem teto definido, um pico de fila vira custo não previsto na fatura

Outra coisa que eu entendi aqui é que o KEDA não substitui o HPA, ele gera o HPA a partir da métrica externa, então quando o escalonamento não acontece existem duas camadas para investigar, o ScaledObject e o HPA que ele produziu.

# Finalização dessa fase

O autoscaling funcionou nos quatro gatilhos, mas o teste deixou claro que entregar o KEDA ligado não era suficiente. Se cada time configurasse do seu jeito eu ia trocar um problema de performance por um problema de custo e de governança, e foi isso que definiu a fase 3.
