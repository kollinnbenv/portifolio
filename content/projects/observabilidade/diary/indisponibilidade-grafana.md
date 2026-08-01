---
title: "Indisponibilidade do Grafana em todos os ambientes"
date: "06-2026"
summary: "Atualização automática de plugin, sem passar por commit nem revisão"
---
# Indisponibilidade do Grafana em todos os ambientes

## Contexto

O Grafana ficou indisponível simultaneamente em todos os ambientes.

Falha simultânea em ambientes isolados já elimina boa parte das hipóteses, porque carga, problema pontual de cluster e alteração de um produto específico não atingem todos ao mesmo tempo. Resta o que é comum a todos, que é a definição compartilhada da ferramenta.

## Causa

O plugin da fonte de dados foi atualizado automaticamente. A atualização de plugin estava habilitada, então o componente se atualizou em tempo de execução, o comportamento mudou e a configuração vigente deixou de ser válida.

## Ação

Desativação da atualização automática de plugin em todos os ambientes, via PR no repositório de GitOps.

## Resultado

O serviço foi restabelecido e a atualização de plugin passou a exigir alteração explícita, com revisão e possibilidade de validar em laboratório antes.

A configuração estava versionada e entregue por GitOps, e ainda assim existia um caminho pelo qual o componente se alterava sozinho, sem commit e sem aprovação. Do ponto de vista do repositório nada havia mudado, e o ambiente mudou.
