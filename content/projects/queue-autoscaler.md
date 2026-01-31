## Objetivo
Escalar workloads com base em filas e latencia de processamento, evitando overprovision e mantendo SLA.

## Arquitetura
Exportadores coletam tamanho de fila e idade das mensagens. Um controlador ajusta o HPA com base em thresholds dinamicos e janelas de tendencia.

## Stack
- Kubernetes HPA
- Prometheus Adapter
- RabbitMQ ou SQS
- Grafana

## Desafios
Lidar com picos de carga e garantir escala antecipada sem gerar custos excessivos.

## Decisoes tecnicas
- Buffer de seguranca para evitar flapping.
- Ajuste automatico de thresholds por horario.
- Alertas quando a fila atinge limites criticos.

## Como rodar
```bash
kubectl apply -f deploy/adapter.yaml
kubectl apply -f deploy/autoscaler.yaml
```

## Resultados
Reducao de custos e tempo de processamento estavel mesmo em picos sazonais.
