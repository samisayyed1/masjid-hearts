import { url } from '../lib';
export const GET = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('/sitemap-index.xml'), site).href}\n`, { headers: { 'Content-Type': 'text/plain' } });
