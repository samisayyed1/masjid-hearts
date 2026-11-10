import rss from '@astrojs/rss';
import { getArticles, url } from '../lib';
import { site } from '../site.config';

export async function GET(context) {
  const articles = await getArticles();
  return rss({
    title: `${site.name} Journal`,
    description: 'Short articles about masajid and why they matter.',
    site: new URL(url('/'), context.site).href,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.summary,
      pubDate: a.data.date,
      link: new URL(url(`/articles/${a.id}/`), context.site).href,
    })),
  });
}
