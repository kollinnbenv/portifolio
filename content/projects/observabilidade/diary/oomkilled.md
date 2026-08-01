---
title: "Serviço reiniciando sem motivo aparente"
date: "04-2026"
summary: "Pods encerrados por limite de memória, fora do recorte do dashboard"
---
# Serviço reiniciando sem motivo aparente

## Contexto

Chamado aberto informando que um serviço estava reiniciando e que o Grafana não apresentava motivo.

## Investigação

Os pods estavam sendo encerrados por consumo de memória acima do limite definido no container. O reinício era consequência, não causa, e havia um pod específico dando início ao efeito em cadeia.

O comportamento do Kubernetes estava correto, porque encerrar container que ultrapassa o limite de memória é exatamente o que ele foi configurado para fazer. Essa decisão, porém, acontece em uma camada que o dashboard da aplicação não cobria.

## Ação

Investigação, identificação da causa e alinhamento com o responsável, que já estava tratando a correção em paralelo.

## Resultado

A lacuna não era de ferramenta, era de recorte. Existiam métrica, dashboard e log, mas nenhum deles colocava lado a lado o reinício do pod e o motivo do encerramento, então quem consultava via o efeito sem ver a causa.

Ficou como referência para o desenho dos painéis seguintes, incluir o motivo de encerramento junto da contagem de reinício.
