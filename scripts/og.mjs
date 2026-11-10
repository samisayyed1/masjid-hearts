import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const logo = await sharp(readFileSync(new URL('./og-logo.svg', import.meta.url)), { density: 220 }).resize(760, 760).toBuffer();
const crop = await sharp(logo).extract({ left: 110, top: 150, width: 540, height: 460 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#00483D' } })
  .composite([{ input: crop, gravity: 'centre' }]).png().toFile('public/og.png');
await sharp(readFileSync('public/favicon.svg'), { density: 300 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
