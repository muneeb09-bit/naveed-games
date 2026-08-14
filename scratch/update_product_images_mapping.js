const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

const imageMappings = {
  'prod-ps5-pro': ['/images/products/ps5-pro-1.webp', '/images/products/ps5-pro-2.webp'],
  'prod-ps5-slim-disc': ['/images/products/ps5-slim-1.webp', '/images/products/ps5-slim-2.webp'],
  'prod-xbox-series-x': ['/images/products/xbox-x-1.webp', '/images/products/xbox-x-2.webp'],
  'prod-switch-oled': ['/images/products/switch-oled-1.webp', '/images/products/switch-oled-2.webp'],
  'prod-lenovo-legion-go': ['/images/products/legion-go-1.webp', '/images/products/legion-go-2.webp'],
  'prod-rog-ally-x': ['/images/products/rog-ally-x-1.webp', '/images/products/rog-ally-x-2.webp'],
  'prod-steam-deck-oled': ['/images/products/steam-deck-oled-1.webp', '/images/products/steam-deck-oled-2.webp'],
  'prod-dualsense-edge': ['/images/products/dualsense-edge-1.webp', '/images/products/dualsense-edge-2.webp'],
  'prod-scuf-reflex-pro': ['/images/products/scuf-reflex-1.webp', '/images/products/scuf-reflex-2.webp'],
  'prod-dji-mini-4-pro': ['/images/products/dji-mini-4-pro-1.webp', '/images/products/dji-mini-4-pro-2.webp'],
  'prod-dji-air-3': ['/images/products/dji-air-3-1.webp', '/images/products/dji-air-3-2.webp'],
  'prod-osmo-pocket-3': ['/images/products/osmo-pocket-3-1.webp', '/images/products/osmo-pocket-3-2.webp'],
  'prod-dji-mic-2': ['/images/products/dji-mic-2-1.webp', '/images/products/dji-mic-2-2.webp'],
  'prod-meta-quest-3': ['/images/products/meta-quest-3-1.webp', '/images/products/meta-quest-3-2.webp'],
  'prod-ray-ban-meta': ['/images/products/rayban-meta-1.webp', '/images/products/rayban-meta-2.webp'],
  'prod-emo-ai-robot': ['/images/products/emo-ai-1.webp', '/images/products/emo-ai-2.webp'],
  'prod-loona-ai-petbot': ['/images/products/loona-ai-1.webp', '/images/products/loona-ai-2.webp'],
  'prod-samsung-s24-ultra': ['/images/products/samsung-s24-ultra-1.webp', '/images/products/samsung-s24-ultra-2.webp'],
  'prod-logitech-g923': ['/images/products/logitech-g923-1.webp', '/images/products/logitech-g923-2.webp'],
  'prod-thrustmaster-t300': ['/images/products/thrustmaster-t300-1.webp', '/images/products/thrustmaster-t300-2.webp'],
  'prod-playseat-trophy': ['/images/products/playseat-trophy-1.webp', '/images/products/playseat-trophy-2.webp'],
  'prod-traxxas-xrt-8s': ['/images/products/traxxas-xrt-1.webp', '/images/products/traxxas-xrt-2.webp'],
  'prod-traxxas-xmaxx': ['/images/products/traxxas-xmaxx-1.webp', '/images/products/traxxas-xmaxx-2.webp'],
  'prod-traxxas-rustler': ['/images/products/traxxas-rustler-1.webp', '/images/products/traxxas-rustler-2.webp'],
  'prod-sony-pulse-elite': ['/images/products/pulse-elite-1.webp', '/images/products/pulse-elite-2.webp'],
  'prod-jbl-boombox-3': ['/images/products/jbl-boombox-3-1.webp', '/images/products/jbl-boombox-3-2.webp']
};

for (const [id, images] of Object.entries(imageMappings)) {
  const idRegex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?images:\\s*)\\[[^\\]]*\\]`);
  const formattedImages = JSON.stringify(images).replace(/"/g, "'");
  if (idRegex.test(content)) {
    content = content.replace(idRegex, `$1${formattedImages}`);
    console.log(`Updated images for ${id}`);
  } else {
    console.warn(`Could not find regex match for ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating products.ts');
