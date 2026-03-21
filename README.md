# kollinn-portfolio

Portfolio estatico em Astro com foco em DevOps, SRE e Cloud.

## Requisitos
- Node.js 18+ (recomendado 20+)

## Como rodar
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Conteudo
- `content/projects.json` com a lista de projetos.
- `content/projects/*.md` com detalhes gerais de cada projeto.
- `content/projects/<slug>/diary/*.md` para diario com varios posts do mesmo projeto.
  Tambem e aceito `content/projects/<slug>/*.md` para posts sem subpasta `diary`.
  Se precisar usar outra pasta, defina `diaryFolder` no projeto dentro de `content/projects.json`.
  Cada post pode usar frontmatter:
  - `title`: titulo do post
  - `date`: data no formato `YYYY-MM-DD` (usada para ordenacao)
  - `summary`: resumo curto opcional
- `public/cv-kollinn.pdf` e links de contato sao placeholders (substitua pelos seus).

## Deploy no GitHub Pages (Astro)
1. Atualize `astro.config.mjs` com seu usuario e repo (campos `site` e `base`).
2. No GitHub, ative Pages em **Settings > Pages** e selecione **GitHub Actions**.
3. Faca push para `main`. O workflow `deploy.yml` vai publicar a pasta `dist`.

Se preferir outro provedor, o build gera um site estatico em `dist`.

## Deploy no Render (Web Service)
- Build Command: `npm run build`
- Start Command: `npm run start`
- O script `start` serve a pasta `dist` diretamente (sem fallback SPA), evitando bloqueio de host do `astro preview` e preservando rotas como `/about/`.
