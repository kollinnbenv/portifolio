---
title: "Fase 5 · Escalonamento por requisições"
date: "06-2026"
summary: "Escalar por requisição sem exigir que o time instrumente nada"
---
# Fase 5 - Escalonamento por número de requisições

Até essa fase todo o trabalho girava em torno de mensageria, fila cresce e réplica sobe. Só que a queixa que abriu o projeto não era fila, era lentidão em horário de pico de requisições, e serviço que atende requisição síncrona não tem fila para observar. Se eu entregasse só o escalonamento por fila eu ia resolver metade do problema e deixar de fora justamente a metade que reclamou primeiro.

# A fonte de métrica

O gatilho passa a ser uma query no Prometheus, que é o mesmo mecanismo que eu tinha experimentado no laboratório na fase 2, agora com propósito real. A partir do momento em que o critério é uma query, dá para escalar por qualquer coisa que já esteja instrumentada, sem depender de um scaler específico da ferramenta.

# Decisões técnicas

* **Métrica coletada na malha de serviço e não dentro da aplicação**
    * Motivação: métrica de malha existe para todo serviço por padrão, sem o time instrumentar nada
    * Impacto: componente de plataforma que exige mudança de código tem adoção baixa, então o custo de entrada precisa ser zero
* **Respostas de erro de cliente fora da conta**
    * Motivação: sem esse filtro, requisição inválida, bot ou cliente mal configurado fariam a aplicação escalar
    * Impacto: evita pagar mais nó para responder erro mais rápido
* **Média por réplica, em janela de 2 minutos**
    * Motivação: o número que o KEDA avalia passa a ser quanto de carga cada pod está aguentando
    * Impacto: mantém a reação rápida sem transformar ruído em escalonamento

# O que a subida em dev era de fato

O serviço em desenvolvimento foi um teste do gatilho por requisição, não a solução do problema. O objetivo era validar se a métrica funcionava, se o KEDA reagia a ela do jeito esperado e se o comportamento era estável, antes de levar isso para homologação, que é onde estão os serviços com uso alto e onde a latência aparece.

Estrear um tipo de gatilho novo direto em homologação me deixaria sem margem para ajuste. Em desenvolvimento eu conseguia observar o mecanismo e corrigir a calibragem sem impacto para os times.

A configuração ficou com piso de 1 e teto de 10 réplicas, consulta ao gatilho a cada 30 segundos e espera de 300 segundos antes de reduzir. O teto de 10 saiu do que a quota do namespace comportava, e o piso de 1 em vez de 2 porque disponibilidade contínua não é requisito em desenvolvimento.

# O risco que a fila não tinha

Escalar por métrica externa cria uma dependência que o service bus não tinha, porque a qualidade do escalonamento passa a depender da disponibilidade da coleta, e se o Prometheus fica indisponível o KEDA não consegue ler o gatilho.

Por isso eu registrei o fallback na documentação como recomendação para gatilho externo, com a ressalva de que ele não se aplica a cpu e memória, já que essas métricas vêm do próprio Kubernetes e sempre estão disponíveis. Parece detalhe de configuração mas é o tipo de coisa que vira incidente.

# Finalização dessa fase

O projeto passou a cobrir os dois padrões de carga que existem no nosso ambiente:

* **Orientado a evento:** escala pelo backlog da fila
* **Orientado a requisição:** escala pela demanda real de tráfego

Que era o que eu tinha proposto lá no começo, transformar uma reclamação pontual de lentidão em capacidade de plataforma, disponível para qualquer produto que use a nossa infraestrutura.

# Onde eu parei e o projeto seguiu

Com o gatilho por requisição validado em desenvolvimento, o passo seguinte era levar o KEDA para homologação, que é onde estão os serviços de uso alto e onde a melhora de latência apareceria de verdade.

Esse passo não aconteceu comigo. Eu estava com muitas demandas em paralelo e outras entrando, e como o KEDA tinha acabado de mostrar resultado no teste do gatilho, a decisão foi priorizar o projeto e alocar mais pessoas nele em vez de deixá-lo no meu ritmo.

Então eu repassei o trabalho. A documentação de uso já estava publicada para os times, os manifestos estavam versionados e o que faltava estava mapeado, incluindo a promoção para os demais ambientes e as políticas de admissão que estavam em desenho.

O desenho da fase 3 acabou sendo testado na prática, com outras pessoas assumindo o template e a documentação para seguir com a promoção para os demais ambientes.
