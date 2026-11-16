// Runs before every build. Catches mistakes made in the browser editor and names the exact field,
// so a bad edit stops the build (the live site stays as it was) instead of publishing a broken page.
import { readFileSync, existsSync } from 'node:fs';

const problems = [];
const read = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch (e) { problems.push(`${p}: not valid JSON (${e.message})`); return null; } };
const settings = read('src/content/site/settings.json');
const en = read('src/content/site/home.en.json');
const ar = read('src/content/site/home.ar.json');

if (settings) {
  if (!String(settings.name || '').trim()) problems.push('Site settings → Organisation name is empty');
  const email = String(settings.email || '').trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push(`Site settings → Contact email "${email}" is not an email address`);
  for (const k of ['formEndpoint', 'donateUrl']) { const v = String(settings[k] || '').trim(); if (v && !/^https:\/\//.test(v)) problems.push(`Site settings → ${k} must start with https:// (got "${v}")`); }
  for (const [k, v] of Object.entries(settings.social || {})) if (v && !/^https:\/\//.test(v)) problems.push(`Site settings → Social links → ${k} must start with https:// (got "${v}")`);
  const levels = (settings.givingLevels || []).filter((l) => Number(l?.amount) > 0);
  if (!levels.length) problems.push('Site settings → Monthly giving amounts: add at least one amount');
  for (const lang of [['English', en], ['Arabic', ar]]) if (lang[1] && (lang[1].give?.levels?.length ?? 0) < levels.length && lang[0] === 'English')
    problems.push(`Home page text (English) → Monthly giving section → Giving level text has ${lang[1].give.levels.length} entries but there are ${levels.length} amounts`);
  const photo = String(settings.photo || '').split('/').pop();
  if (photo && !existsSync(`src/assets/site/${photo}`)) problems.push(`Site settings → Large photo: src/assets/site/${photo} does not exist`);
}

// Every piece of text in the English file must exist (as text) in both files.
const walk = (ref, obj, path, label) => {
  for (const [k, v] of Object.entries(ref)) {
    const here = [...path, k];
    const got = obj?.[k];
    if (typeof v === 'string') { if (typeof got !== 'string') problems.push(`${label} → ${here.join(' → ')} is missing`); }
    else if (Array.isArray(v)) { if (!Array.isArray(got)) problems.push(`${label} → ${here.join(' → ')} is missing`); }
    else if (v && typeof v === 'object') walk(v, got, here, label);
  }
};
const required = { meta: { tagline: '', description: '' }, hero: { h1: '', h1em: '', lede: '', cta: '', cta2: '', facts: [] }, mission: { statement: '', p1: '', work: [] }, how: { h2: '', steps: [] }, why: { quote: '', alt: '' }, give: { h2: '', button: '', levels: [] }, contact: { h2: '', send: '', js: {} } };
if (en) { walk(required, en, [], 'Home page text (English)'); if (!String(en.meta?.description || '').trim() || String(en.meta.description).length < 40) problems.push('Home page text (English) → Search engines → Description should be at least 40 characters'); }
if (en && ar) walk(en, ar, [], 'Home page text (Arabic)');

if (problems.length) { console.error(`Content check found ${problems.length} problem(s):\n` + problems.map((p) => ' - ' + p).join('\n')); process.exit(1); }
console.log('Content check passed.');
