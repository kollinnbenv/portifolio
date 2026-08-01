---
title: "Dashboard de porcentagem de uso de logs"
date: "05-2025"
summary: "Medir a proporção de log por origem em todos os ambientes"
---
# Dashboard de porcentagem de uso de logs

## Contexto

Volume de log é custo direto e cresce sem aviso. Sem medir a proporção por origem, o crescimento só aparece na fatura ou quando a base de logs começa a degradar, e nos dois casos a informação chega tarde.

Não existia visão de qual aplicação gerava qual fatia do volume.

## Ação

* Criação do dashboard de porcentagem de uso de logs
* Publicação do dashboard para todos os ambientes, via entrega declarativa

## Resultado

Passou a ser possível responder qual aplicação gera desproporcionalmente mais log que as outras.

Na prática, desvio nesse painel costuma apontar para três causas: nível de log em debug esquecido ligado, erro em repetição que ninguém percebeu, ou log de requisição sendo gravado por inteiro quando bastaria o essencial. As três são corrigíveis pelo time da aplicação, o que torna o dashboard acionável e não apenas informativo.
