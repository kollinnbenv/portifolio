---
title: "fase 05"
date: "06-2026"
summary: "Escalonamento por volume de requisições"
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
* **Média por réplica, em janela curta**
    * Motivação: o número que o KEDA avalia passa a ser quanto de carga cada pod está aguentando
    * Impacto: mantém a reação rápida sem transformar ruído em escalonamento

# O risco que a fila não tinha

Escalar por métrica externa cria uma dependência que o service bus não tinha, porque a qualidade do escalonamento passa a depender da disponibilidade da coleta, e se o Prometheus fica indisponível o KEDA não consegue ler o gatilho.

Por isso eu registrei o fallback na documentação como recomendação para gatilho externo, com a ressalva de que ele não se aplica a cpu e memória, já que essas métricas vêm do próprio Kubernetes e sempre estão disponíveis. Parece detalhe de configuração mas é o tipo de coisa que vira incidente.

# Finalização dessa fase

O projeto passou a cobrir os dois padrões de carga que existem no nosso ambiente:

* **Orientado a evento:** escala pelo backlog da fila
* **Orientado a requisição:** escala pela demanda real de tráfego

Que era o que eu tinha proposto lá no começo, transformar uma reclamação pontual de lentidão em capacidade de plataforma, disponível para qualquer produto que use a nossa infraestrutura.
