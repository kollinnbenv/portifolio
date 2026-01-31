## Objetivo
Padronizar a entrega de infraestrutura com Terraform, garantindo estado consistente, revisao automatica e controle de mudancas em ambientes com multiplas squads.

## Arquitetura
O estado fica em backend remoto com locking e criptografia. Cada workspace passa por validacoes e politicas antes do apply, e o drift detection roda em agenda para manter a infraestrutura alinhada.

## Stack
- Terraform
- S3 compativel + locking (DynamoDB ou equivalente)
- GitHub Actions
- OPA / Conftest

## Desafios
Evitar conflitos de estado entre times e reduzir o tempo de resposta para correcoes de drift sem quebrar janelas de deploy.

## Decisoes tecnicas
- Separacao por workspaces e ambientes com permissao minima.
- Checks de policy-as-code antes do plano.
- Alertas acionaveis quando o drift excede limites definidos.

## Como rodar
```bash
terraform init
terraform plan -out=plan.tfplan
terraform apply plan.tfplan
```

## Resultados
Menos falhas de apply, trilha de auditoria clara e menor retrabalho nas rotinas de infraestrutura.
