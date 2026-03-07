## Objetivo
Atualizar PostgreSQL dos ambientes de produtos de PRD nos ambientes de produção em conjunto com um SRE senior.

## Arquitetura
O processo de atualização foi feito via terraform com aplicação de um commit, que automaticamente disparou uma pipeline para aprovação do terraform apply 

## Stack
- PostgreSQL
- Terraform
- Pipeline Azure Devops 

## Desafios


## Decisoes tecnicas
- Kollinn como responsável:
    - e entrar em contato com os Tech Leads pra agendar a janela de manutenção e explicar o downtime previsel
    - Fazer upgrade do PostgreSQL em IaC, mandar PR com padrões da empresa
    - Disparar as pipelines para aplicação do `terraform apply`

## Resultados
Ambiente atualizado conforme as boas praticas de Engenharia da Plataforma