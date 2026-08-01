---
title: "Correção dos dashboards de cronjob e job"
date: "06-2026"
summary: "Painel que reportava execução de job de forma incorreta"
---
# Correção dos dashboards de cronjob e job

## Contexto

Os dashboards de visão geral de cronjob e job apresentavam informação incorreta sobre a execução das cargas agendadas.

Painel de job errado é um caso particularmente ruim, porque carga agendada roda sem ninguém olhando. O painel é a única fonte de verdade sobre ter executado, ter falhado ou nem ter disparado, e quando ele erra a falha passa despercebida até alguém sentir o efeito no dado.

## Ação

* Correção dos painéis de cronjob e job overview
* Ajuste complementar da versão do ambiente de desenvolvimento

## Resultado

Os painéis voltaram a refletir a execução real das cargas agendadas.

O ajuste em duas etapas, primeiro a correção e depois o acerto no ambiente de desenvolvimento, seguiu o padrão de aplicar a mudança e validar o comportamento antes de considerar encerrado.
