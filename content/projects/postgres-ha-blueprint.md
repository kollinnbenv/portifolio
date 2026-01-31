## Objetivo
Garantir Postgres altamente disponivel com failover rapido, backups consistentes e testes recorrentes de restore.

## Arquitetura
Cluster primario-replica com WAL shipping, storage redundante e rotinas automaticas de backup e verificacao. O failover e coordenado por health checks e quorum.

## Stack
- PostgreSQL
- Patroni
- Object Storage para backups
- PgBouncer

## Desafios
Diminuir o tempo de recuperacao sem comprometer consistencia e manter o processo de restore validado.

## Decisoes tecnicas
- Backups incrementais com verificacao diaria.
- Testes de restore em ambiente isolado.
- SLOs de latencia e disponibilidade para governanca.

## Como rodar
```bash
make bootstrap
make failover-test
```

## Resultados
Disponibilidade mais alta e incidentes de corrupcao detectados antes de impactar producao.
