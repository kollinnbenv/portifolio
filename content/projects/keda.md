# Implementando autoscaling com KEDA no AKS
## Com foco em laboratório e governança

Há alguns meses, um produto de um cliente nosso trouxe um problema claro:
durante o período das 7h às 17h (pico de requisições), a aplicação começava a travar e apresentar lentidão.

# Contexto
Nosso ambiente roda em AKS, então desenhei uma solução baseada em autoscaling com KEDA, considerando que os serviços são orientados a eventos, como o KEDA tem autoscaling com service bus e com cpu/memory, montei toda proposta para apresentar a solução para o time.

# As fases 

Realizei o projeto em fase separando em ciclos em MVP (Minimum Viable Product), trazendo visibilidades nos controles dos meus testes e podendo desenvolver com mais segurança em ambientes controlados sem imprevistos