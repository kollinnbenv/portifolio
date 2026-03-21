import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const site = env.SITE_URL;

if (!site) {
  throw new Error('SITE_URL nao definido. Configure em variavel de ambiente para build/deploy.');
}

export default defineConfig({
  site,
  base: '/',
  output: 'static',
  trailingSlash: 'always'
});
