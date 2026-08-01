# Implementando autoscaling com KEDA no AKS
## Com foco em laboratório e governança

Há alguns meses, um produto de um cliente nosso trouxe um problema claro:
durante o período das 7h às 17h (pico de requisições), a aplicação começava a travar e apresentar lentidão.

# Contexto
Nosso ambiente roda em AKS, então desenhei uma solução baseada em autoscaling com KEDA, considerando que os serviços são orientados a eventos, como o KEDA tem autoscaling com service bus e com cpu/memory, montei toda proposta para apresentar a solução para o time.

# As fases 

Realizei o projeto em fase separando em ciclos em MVP (Minimum Viable Product), trazendo visibilidades nos controles dos meus testes e podendo desenvolver com mais segurança em ambientes controlados sem imprevistos

Foram 9 meses de trabalho, de outubro de 2025 a julho de 2026, distribuídos em 27 ciclos. Nesse período validei 4 tipos de gatilho de escalonamento, levei o KEDA para 2 dos 4 ambientes e deixei template, documentação e entrega declarativa prontos para os times usarem sem depender de mim.

# Onde eu parei

O KEDA ficou rodando em laboratório e desenvolvimento, com template na biblioteca interna de charts, documentação publicada para os times e entrega via GitOps. O último ciclo meu validou o gatilho por número de requisições, que era o pré-requisito para levar o autoscaling ao ambiente de homologação, onde estão os serviços de uso alto.

Com esse resultado em mãos, o projeto foi priorizado e mais pessoas foram alocadas nele. Eu estava com muitas demandas em paralelo e outras entrando, então repassei o trabalho documentado em vez de segurar o projeto no meu ritmo.

Isso acabou validando o desenho que eu propus na fase 3, de o time declarar o autoscaling dentro de um template controlado pela plataforma. A continuidade não dependia de mim, que era exatamente o objetivo.