## Objetivo
Organizar releases com GitOps, promovendo mudancas entre ambientes com rastreabilidade e aprovacoes claras.

## Arquitetura
Repositorios por ambiente, com manifests versionados e pipelines que promovem tags assinadas. Cada rollout gera eventos e logs para auditoria.

## Stack
- Argo CD
- GitHub Actions
- Terraform
- Vault para segredos

## Desafios
Evitar drift entre ambientes e reduzir risco de rollback manual.

## Decisoes tecnicas
- Promocao via pull request automatizado.
- Assinatura de manifests e policy checks.
- Rollback padrao com janela de observacao.

## Como rodar
```bash
./scripts/promote.sh staging
./scripts/promote.sh production
```

## Resultados
Releases previsiveis e auditoria simplificada, com menos janelas manuais de deploy.
