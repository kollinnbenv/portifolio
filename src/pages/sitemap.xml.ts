import type { APIRoute } from 'astro';
import projects from '../../content/projects.json';

const normalizePath = (path: string) => {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
};

const ensureTrailingSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Astro.site nao definido. Configure SITE_URL no ambiente.');
  }

  const staticPaths = ['/', '/about/', '/projects/'];
  const projectPaths = projects.map((project) => `/projects/${project.slug}/`);
  const paths = [...staticPaths, ...projectPaths];

  const urls = paths.map((path) => {
    const pathname = ensureTrailingSlash(normalizePath(path));
    const loc = new URL(pathname, site).toString();
    return `<url><loc>${escapeXml(loc)}</loc></url>`;
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>'
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
