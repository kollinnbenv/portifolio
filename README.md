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
- `content/projects/*.md` com detalhes de cada projeto.
- `public/cv-kollinn.pdf` e links de contato sao placeholders (substitua pelos seus).

## Deploy no GitHub Pages (Astro)
1. Atualize `astro.config.mjs` com seu usuario e repo (campos `site` e `base`).
2. No GitHub, ative Pages em **Settings > Pages** e selecione **GitHub Actions**.
3. Faca push para `main`. O workflow `deploy.yml` vai publicar a pasta `dist`.

Se preferir outro provedor, o build gera um site estatico em `dist`.
