## Objetivo
Criar um padrao de clusters Kubernetes multi-tenant com bootstrap rapido, politicas consistentes e fluxo GitOps para configuracao e aplicacoes.

## Arquitetura
Um repositorio central define o baseline do cluster, com namespaces, RBAC e addons essenciais. Cada time herda o baseline e aplica overlays por ambiente via GitOps.

## Stack
- Kubernetes
- Flux ou Argo CD
- Helm + Kustomize
- Policy Controller

## Desafios
Balancear autonomia dos times com governanca de seguranca e manter o bootstrap rapido para novos clusters.

## Decisoes tecnicas
- Baseline imutavel por ambiente.
- Catalogo de addons com versoes testadas.
- Alertas de desvio de configuracao no pipeline.

## Como rodar
```bash
kubectl apply -k clusters/dev
flux reconcile kustomization platform
```

## Resultados
Clusters consistentes em menos de 30 minutos, com menor variabilidade e menos incidentes de permissao.
