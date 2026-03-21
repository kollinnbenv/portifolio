import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Astro.site nao definido. Configure SITE_URL no ambiente.');
  }

  const sitemapUrl = new URL('/sitemap.xml', site).toString();

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
