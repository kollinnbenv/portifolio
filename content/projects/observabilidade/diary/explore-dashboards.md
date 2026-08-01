---
title: "Alternativa ao Explore do Grafana"
date: "07-2026"
summary: "Dashboards segregados por produto, entregues como código"
---
# Alternativa ao Explore do Grafana

Ciclo em andamento.

## Contexto

O Explore do Grafana é a tela de consulta livre. Ele atende bem quem sabe o que procura e sabe escrever a consulta, e se torna problema quando é a porta de entrada padrão de todos os usuários.

Três fatores motivaram a mudança:

* Consulta livre em base de log grande tem custo alto e afeta os demais usuários
* Cada pessoa monta a consulta do zero, então o mesmo diagnóstico é refeito repetidamente e não fica registrado
* Acesso amplo à consulta livre implica acesso amplo a dado que nem todo perfil precisa consultar

Somava-se a isso um volume recorrente de chamados de liberação e de ajuste de permissão no Grafana, vindos de produtos diferentes, o que indicava modelo de acesso mal resolvido.

## Ação

* Construção de dashboards segregados por produto, a partir de um produto piloto
* Validação com os desenvolvedores, para confirmar cobertura dos casos de uso reais do Explore
* Renomeação e reorganização dos painéis de visão geral de logs
* Entrega dos dashboards via GitOps, com remoção da versão criada manualmente na interface
* Publicação da alternativa também em homologação e produção
* Coleta de feedback dos usuários do Explore, para mapear caso de uso real antes de qualquer restrição

## Dashboard como código

A ordem da passagem para o repositório importa. O painel é construído na interface, onde a iteração é rápida, e em seguida é levado para o repositório e a versão manual é removida.

Manter nos dois lugares reproduz o problema já observado no caso dos alertas, que é configuração vivendo em duas fontes e divergindo sem visibilidade. Painel editado apenas na interface não sobrevive à recriação do ambiente.

## Próximo passo

* Concluir os dashboards segregados por produto
* Encerrar a coleta de feedback e cruzar com a cobertura já entregue
* Tratar a restrição de acesso ao Explore somente após essa cobertura estar confirmada

Restringir o acesso antes de mapear o uso real transferiria o custo para o time de desenvolvimento e transformaria a plataforma em obstáculo. O levantamento prévio é mais lento, mas garante que os painéis cubram o uso que existe, e não o uso presumido.
