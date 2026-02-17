# Objetivo

Migrar o ambiente do Mozilla Hubs de uma infraestrutura manual na AWS (provisionada via portal) para uma arquitetura moderna, reproduzível e observável no Azure, utilizando AKS, Infraestrutura como Código (Terraform) e serviços gerenciados.

# Objetivos principais:

* Eliminar provisionamento manual

* Garantir reprodutibilidade do ambiente

* Implementar observabilidade estruturada

* Reduzir risco operacional

* Criar base escalável e preparada para produção

# Arquitetura

Arquitetura baseada em serviços gerenciados e orquestração via Kubernetes:

```
Usuários
   ↓
Ingress (AKS)
   ↓
Pods do Mozilla Hubs
   ↓
Azure PostgreSQL Flexible Server
```

# Camadas da arquitetura:

* **Orquestração:** Azure Kubernetes Service (AKS)

* **Banco de dados:** Azure PostgreSQL Flexible Server

* **Observabilidade:** Prometheus + Node Exporter + Grafana

* **Provisionamento:** Terraform (azurerm provider)

* **Configuração da aplicação:** Manifests YAML

# Stack
## Infraestrutura

* Azure Kubernetes Service (AKS)

* Azure PostgreSQL Flexible Server

* Terraform (provider azurerm)

## Aplicação

* Mozilla Hubs (self-hosted)
Aplicação

* Comunicação em tempo real baseada em:

    * WebRTC para transmissão de áudio e vídeo entre participantes

    * WebSocket para sinalização, eventos e sincronização de estado das salas 3D

    * Renderização 3D via WebXR/WebGL no navegador

## Observabilidade

* Prometheus

* Grafana

* Node Exporter

# Provisionamento e Configuração

* Infraestrutura declarativa via Terraform

* Configuração da aplicação via YAML

* Validação baseada em documentação comunitária e Discord oficial

# Desafios
1. Ambiente original sem Infraestrutura como Código

* O ambiente anterior na AWS estava:

    * Provisionado manualmente via portal

    * Sem versionamento

    * Sem histórico de mudanças

    * Sem reprodutibilidade

    * Alto risco operacional

2. Documentação limitada do Mozilla Hubs

* Pouca documentação oficial estruturada

* Inconsistências entre versões

* Dependência da comunidade (Discord)

* Mensagens de erro pouco descritivas

* Falta de padrões claros para deploy em produção

### Isso exigiu

* Testes incrementais

* Ajustes finos de configuração

* Análise de logs para troubleshooting

* Engenharia reversa de comportamentos não documentados

3. Configuração manual da aplicação

* Foi necessário:

    * Criar YAMLs personalizados

    * Ajustar variáveis de ambiente

    * Configurar conexão com PostgreSQL

    * Adaptar a aplicação para execução em AKS

## Decisões Técnicas
1. Migração para AKS

*  Motivação:

    * Padronização com stack Azure

    * Integração com serviços gerenciados

    * Escalabilidade horizontal

    * Separação clara entre infraestrutura e aplicação

* Trade-off:

* Complexidade inicial maior

* Necessidade de adaptação da aplicação ao ambiente Kubernetes

2. Uso de Azure PostgreSQL Flexible Server

* Motivos:

    * Serviço gerenciado (PaaS)

    * Backup automático

    * Alta disponibilidade nativa

    * Redução de carga operacional

* Impacto:

* Foco na aplicação

* Eliminação de manutenção de banco autogerenciado

3. Infraestrutura como Código com Terraform

* Motivos:

    * Reprodutibilidade

    * Versionamento

    * Auditoria de mudanças

    * Base para CI/CD futuro

* Benefícios:

    * Ambiente declarativo

    * Possibilidade de rollback controlado

    * Facilidade para replicar ambientes

4. Observabilidade com Prometheus e Grafana

* Motivação:

    * Stack padrão Kubernetes

    * Independência de vendor

    * Controle granular de métricas

* Monitoramento implementado:

    * Métricas de cluster

    * Uso de CPU e memória

    * Métricas de nodes via Node Exporter

* Base para evolução futura com alertas e SLOs

# Resultados
1. Infraestrutura 100% Reproduzível

* Eliminação de dependência do portal

* Versionamento completo da infraestrutura

* Maior governança técnica

2. Ambiente Observável

* Antes:

    * Diagnóstico reativo

    * Baixa visibilidade de métricas

* Depois:

    * Métricas centralizadas

    * Dashboards estruturados no Grafana

    * Base para monitoramento proativo

3. Redução de Risco Operacional

* Banco gerenciado

* Orquestração via Kubernetes

* Separação clara de responsabilidades