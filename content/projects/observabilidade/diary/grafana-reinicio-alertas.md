---
title: "Grafana reiniciando e alertas com fonte de dados quebrada"
date: "07-2025"
summary: "Reinício de pod por sidecar mal delimitado e regras órfãs no banco"
---
# Grafana reiniciando e alertas com fonte de dados quebrada

## Contexto

O Grafana estava reiniciando no cluster de laboratório e, no mesmo período, os alertas passaram a falhar com erro de fonte de dados não encontrada. As regras apareciam na interface, mas não avaliavam nada, então não havia cobertura real.

## Investigação

Dois problemas independentes, com sintomas próximos:

* O sidecar responsável por carregar configuração estava sem delimitação correta de label e namespace, então recarregava fora do escopo esperado e derrubava o pod
* O consumo de memória do Grafana estava acima do que os limites definidos comportavam
* As regras de alerta eram declaradas em arquivo versionado, mas o Grafana mantém alerta também no banco de dados dele, e o que estava no banco apontava para uma fonte de dados que não existia mais

## Ação

* Definição de label e namespace do sidecar de alerta, para restringir o que ele observa
* Aumento dos recursos de memória do Grafana
* Desativação do modo de alerta legado
* Remoção das regras de alerta com fonte de dados quebrada, no arquivo versionado e também manualmente no banco

## Resultado

O reinício parou e os alertas voltaram a avaliar.

A correção precisou atuar nos dois lugares. Mexer apenas no repositório não resolvia, porque o registro órfão continuava no banco e continuava tentando avaliar. O caso delimita o alcance do GitOps quando a ferramenta mantém estado próprio: o repositório é a verdade da parte que ele controla, e o que está no banco não aparece em diff de PR.
