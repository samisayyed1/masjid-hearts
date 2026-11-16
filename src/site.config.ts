// Site settings. The values live in src/content/site/settings.json so they can be changed
// in the browser editor (see EDITING.md) without touching code.
import settings from './content/site/settings.json';
import en from './content/site/home.en.json';

export const site = {
  name: settings.name || 'Masjid Hearts',
  tagline: en.meta.tagline,
  description: en.meta.description,
  email: settings.email.trim(), // shown in the footer and used by the contact form
  formEndpoint: settings.formEndpoint.trim(), // optional Formspree/Basin URL; the contact form posts here
  donateUrl: settings.donateUrl.trim(), // where "Give monthly" buttons go; empty = contact section
  social: settings.social as Record<string, string>,
  photo: settings.photo,
};

/** Monthly giving levels: the amount, and how many hearts the card shows. Text for each is in home.<lang>.json. */
export const givingLevels = settings.givingLevels
  .filter((l) => Number(l.amount) > 0)
  .map((l) => ({ amount: Number(l.amount), masajid: Math.max(1, Math.min(12, Number(l.masajid) || 1)) }));
