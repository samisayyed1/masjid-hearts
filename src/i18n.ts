// Every visible string on the home page, header, footer and contact form, in English and Arabic.
// The text itself lives in src/content/site/home.en.json and home.ar.json, so it can be edited in the
// browser editor (see EDITING.md). This file only shapes it for the components.
// The Arabic home page lives at /ar/. Articles are English only, so Arabic links to them are marked EN.
import enJson from './content/site/home.en.json';
import arJson from './content/site/home.ar.json';
import { givingLevels } from './site.config';

export type Lang = 'en' | 'ar';

/** Arabic counted-noun form for "dollars" after a number (3–10: plural, 11–99: accusative singular, otherwise singular). */
export const arDollars = (n: number) => {
  const r = n % 100;
  if (n === 2) return 'دولارين';
  if (r >= 3 && r <= 10) return 'دولارات';
  if (r >= 11 && r <= 99) return 'دولارًا';
  return 'دولار';
};

type Pair = { title: string; text: string };
const pairs = (list: Pair[] = []) => list.filter((p) => p?.title || p?.text).map((p) => [p.title ?? '', p.text ?? ''] as [string, string]);

function shape(j: typeof enJson, fallback: typeof enJson, lang: Lang) {
  const levels: Record<number, { title: string; line: string }> = {};
  givingLevels.forEach((l, i) => {
    const own = j.give.levels?.[i];
    const base = fallback.give.levels?.[i];
    levels[l.amount] = { title: own?.title || base?.title || '', line: own?.line || base?.line || '' };
  });
  const template = j.give.button || fallback.give.button;
  return {
    ...j,
    hero: { ...j.hero, facts: pairs(j.hero.facts) },
    mission: { ...j.mission, work: pairs(j.mission.work) },
    how: { ...j.how, steps: pairs(j.how.steps) },
    contact: { ...j.contact, who: pairs(j.contact.who), roles: (j.contact.roles ?? []).filter(Boolean) },
    give: {
      ...j.give,
      levels,
      button: (n: number) => template.replace('{amount}', String(n)).replace('{usd}', lang === 'ar' ? arDollars(n) : 'USD'),
    },
  };
}

export const t = { en: shape(enJson, enJson, 'en'), ar: shape(arJson as typeof enJson, enJson, 'ar') };
