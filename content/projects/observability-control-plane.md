## Objetivo
Centralizar metricas, logs e traces com padrao de alertas baseados em SLO e observabilidade de custo controlado.

## Arquitetura
Coleta padronizada via agentes, pipeline de logs com retencao definida e traces com amostragem dinamica. Dashboards e alertas ficam versionados no repositorio.

## Stack
- Prometheus + Alertmanager
- Grafana + Tempo
- Loki
- OpenTelemetry

## Desafios
Reduzir ruido de alertas e manter visibilidade sem explodir custos de armazenamento e ingestao.

## Decisoes tecnicas
- SLOs como fonte de verdade para alertas.
- Amostragem de tracing por servico critico.
- Retencao por tier com compressao.

## Como rodar
```bash
docker compose up -d
./scripts/bootstrap-dashboards.sh
```

## Resultados
MTTR menor e observabilidade consistente em todas as squads sem aumento relevante de custo.
