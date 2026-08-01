---
title: "Fase 1 · Estudo e validações"
date: "12-2025"
summary: "Por que o KEDA servia para além do cliente que reclamou"
---
# Fase 1 - Estudo e validações 

Nosso ambientes são controlados em 4 ambientes, lab, dev, qas e produção, com isso eu consigo ter um controle maior de consistência de menor erro aplicando em ambiente não controláveis (lab) sem afetar os usuários finais e desenvolvedores 

Então nessa fase foi mapeado no ambiente de laboratório 

* Estudo da arquitetura do KEDA 
* Possibilidades com o KEDA
* Possibilidades de autoscaling com KEDA
* Possibilidade integração com os nosso padrões internos 

Com essas validações em mãos no mesmo ambientes eu pude validar com um serviço de teste 

* Instalação e comportamento via `helm install`
* Autoscaling baseado em CPU 
* Autoscaling baseado em Service Bus 
* Validação da estrutura e da arquitetura do KEDA no cluster 

# Finalização dessa fase

Eu consegui objetivamente identificar o comportamento do KEDA, como ele seria benéfico para o nosso ambiente e os benefícios que ele poderia trazer não só para aquele cliente que nos reportou o a lentidão, mas sim para outros clientes que utilizam nossa infraestrutura. 
