# Aplicação

Aplicação em Astro

## Requisitos
- Node.js 22.12+ (recomendado 22 LTS)
- npm 9.6.5+

## Variaveis de ambiente
- Configure `SITE_URL` com o dominio canonico do site.
- Opcional: `GOOGLE_SITE_VERIFICATION` para a meta tag de verificacao do Search Console.
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
