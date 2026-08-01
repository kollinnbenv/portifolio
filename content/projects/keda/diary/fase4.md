---
title: "fase 04"
date: "04-2026"
summary: "Subida em DEV e documentação para os times"
---
# Fase 4 - Subida no ambiente de dev e documentação

Com o template pronto e o KEDA declarado via GitOps, chegou a hora de sair do laboratório e subir no segundo ambiente. Mesmo em dev, se o autoscaling se comportar mal quem sente é o time no meio do trabalho, então eu mantive o mesmo princípio das fases anteriores, ciclo pequeno com alvo único e reversível.

# Atividades deste ciclo

* Subi primeiro só o KEDA, operator e metrics server, sem nenhum objeto de escalonamento ativo, porque nesse estado ele apenas observa e o risco é praticamente nulo
* Validei a saúde dos componentes e se o metrics server estava respondendo
* Escolhi um único serviço piloto, um consumidor de mensageria, que era o caso mais próximo do que eu já tinha validado em laboratório

Escolher um piloto só foi proposital, porque assim o impacto era conhecido e o rollback se resumia a remover um objeto.

# O que dev mostrou e o laboratório não

Em laboratório eu gerava carga sintética, constante e previsível. Em dev a carga é real e vem em rajada, e isso expôs a calibragem do cooldownPeriod de um jeito que carga sintética não expõe, porque o que parecia estável no teste ficava oscilando com tráfego irregular.

É a diferença entre validar que a ferramenta funciona e descobrir com quais parâmetros ela funciona no nosso tráfego.

# Padronizando na origem

Depois do piloto validado eu atualizei o boilerplate de novos serviços para já nascer com a estrutura de autoscaling prevista. Em vez de eu ter que converter serviço por serviço depois, os novos serviços já chegam no padrão, o que evita a dívida técnica em vez de pagar ela lá na frente.

# A documentação

Componente de plataforma que precisa do autor por perto não é componente, vira dependência. Escrevi a documentação na wiki interna deixando a premissa explícita logo na abertura, que o time não precisa conhecer a implementação interna do template, só precisa saber quais campos preencher e o comportamento esperado.

A estrutura ficou assim:

* **Pré requisitos:** o alvo precisa ser um Deployment, pelo menos um gatilho é obrigatório, e para escalar por cpu ou memória o pod precisa ter resources definidos
* **Campos do values:** cada campo explicado pelo efeito prático e não pela definição
* **Um exemplo por gatilho:** cpu, memória e service bus, cada um com o par de values base e values do ambiente
* **Boas práticas:** defaults seguros no arquivo base, sobrescrevendo no ambiente só o que muda, e começar pequeno em dev
* **Erros comuns**

A seção de erros comuns foi a que eu mais quis escrever, porque são erros que eu mesmo cometi nas fases anteriores:

* Habilitar escalonamento por cpu ou memória sem resources definidos
* Tentar escalar para zero usando só cpu ou memória
* Configurar fallback em gatilho que não suporta
* Esquecer a credencial do service bus, deixando o gatilho sem conseguir consultar a fila
* Repetir o nome de um gatilho quando existe mais de um

Documentar o erro que eu cometi é mais útil do que documentar o caminho feliz, porque o caminho feliz a pessoa descobre sozinha e o erro é onde ela fica bloqueada e abre chamado.

# Finalização dessa fase

KEDA rodando nos dois ambientes, entregue por GitOps, com template e documentação, então a adoção deixou de depender de mim.
