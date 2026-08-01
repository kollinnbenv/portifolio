# Aplicação

Aplicação em Astro

## Requisitos
- Node.js 22.12+ (recomendado 22 LTS)
- npm 9.6.5+

## Variaveis de ambiente
- Configure `SITE_URL` com o dominio canonico do site.
- Opcional: `GOOGLE_SITE_VERIFICATION` para a meta tag de verificacao do Search Console.
- `DIARY_PASSWORD`: senha que libera os posts do diario. Obrigatoria enquanto o bloqueio estiver ativo.
- `DIARY_LOCK`: `false` (ou `0`/`off`/`no`) desativa o bloqueio e publica o diario aberto.
  Qualquer outro valor, ou a variavel ausente, mantem o bloqueio ligado.

### Diario protegido por senha
Os posts do diario sao cifrados em build (AES-256-GCM, chave derivada da senha com
PBKDF2-SHA256 / 250k iteracoes) e so sao decifrados no navegador quando a senha certa e
informada. O `dist` publicado nao contem o texto dos posts em claro, entao a protecao vale
tambem para acesso direto a URL e para view-source.

Fica visivel mesmo com o bloqueio ligado: titulo, data e resumo de cada post (usados no
indice lateral). Nao coloque nada sensivel nesses campos do frontmatter.

Detalhes praticos:
- A senha fica no `sessionStorage` durante a visita, para nao ser pedida a cada projeto.
- Trocar a senha exige um novo build (o conteudo e cifrado em build time).
- O navegador precisa de contexto seguro (HTTPS ou `localhost`) para usar o WebCrypto.
  Por isso `npm run dev:lan` acessado por IP na rede local nao consegue liberar o diario.

```bash
export DIARY_PASSWORD='sua-senha'
npm run build

# ou, para publicar o diario sem bloqueio:
DIARY_LOCK=false npm run build
```
## Como rodar
```bash
npm install
export SITE_URL=https://meusite.meudomínio
npm run dev
```

`npm run dev` inicia o servidor local em `127.0.0.1:4321`.
Para expor na rede local, use `npm run dev:lan`.

No Astro 7 o dev server roda em background (nao prende o terminal). Para controla-lo:

```bash
npx astro dev status   # ver se esta rodando
npx astro dev logs     # acompanhar os logs
npx astro dev stop     # parar
```

## Build
```bash
export SITE_URL=https://meusite.meudomínio
npm run build
npm run prd
```

## Conteudo
- `content/projects.json` com a lista de projetos.
- `content/projects/*.md` com detalhes gerais de cada projeto.
- `content/projects/<slug>/diary/*.md` para diario com varios posts do mesmo projeto.
  Tambem e aceito `content/projects/<slug>/*.md` para posts sem subpasta `diary`.
  Se precisar usar outra pasta, defina `diaryFolder` no projeto dentro de `content/projects.json`.
  Cada post pode usar frontmatter:
  - `title`: titulo do post
  - `date`: usada para ordenacao e para o rotulo exibido. Formatos aceitos:
    `YYYY-MM-DD` e `DD-MM-YYYY` (mostram dia), `YYYY-MM` e `MM-YYYY` (mostram so mes/ano).
    Data ausente ou invalida cai para "Data nao informada" e vai para o fim da ordenacao.
  - `summary`: resumo curto opcional
- `content/personal.json` guarda `cvFile`: aponte para um arquivo dentro de `public/`
  (ex.: `cv-kollinn.pdf`) para o botao "Baixar CV" aparecer. Vazio = botao oculto.

## Deploy no GitHub Pages (Astro)
Este repositorio ainda **nao** tem o workflow de Pages. Para usar essa opcao:
1. Configure `SITE_URL` no ambiente de deploy com seu dominio final.
2. Ajuste `astro.config.mjs` se precisar de `base` diferente de `/`.
3. Crie `.github/workflows/deploy.yml` com as actions oficiais
   (`withastro/action` ou `actions/upload-pages-artifact` + `actions/deploy-pages`).
4. No GitHub, ative Pages em **Settings > Pages** e selecione **GitHub Actions**.

Se preferir outro provedor, o build gera um site estatico em `dist`.

## Deploy no Render (Web Service)
- Build Command: `npm run build`
- Start Command: `npm run start`
- O script `start` serve a pasta `dist` diretamente (sem fallback SPA), evitando bloqueio de host do `astro preview` e preservando rotas como `/about/`.
