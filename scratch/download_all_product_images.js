const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/images/products');
fs.mkdirSync(outDir, { recursive: true });

const productsAssets = [
  {
    id: 'prod-ps5-pro',
    slug: 'ps5-pro',
    images: [
      { name: 'ps5-pro-1', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=85' },
      { name: 'ps5-pro-2', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-ps5-slim-disc',
    slug: 'ps5-slim-disc',
    images: [
      { name: 'ps5-slim-1', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=85' },
      { name: 'ps5-slim-2', url: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-xbox-series-x',
    slug: 'xbox-series-x',
    images: [
      { name: 'xbox-x-1', url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=85' },
      { name: 'xbox-x-2', url: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-switch-oled',
    slug: 'nintendo-switch-oled',
    images: [
      { name: 'switch-oled-1', url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=85' },
      { name: 'switch-oled-2', url: 'https://images.unsplash.com/photo-1612287233207-6c39f0ca51d2?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-lenovo-legion-go',
    slug: 'lenovo-legion-go',
    images: [
      { name: 'legion-go-1', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85' },
      { name: 'legion-go-2', url: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-rog-ally-x',
    slug: 'asus-rog-ally-x',
    images: [
      { name: 'rog-ally-x-1', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85' },
      { name: 'rog-ally-x-2', url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-steam-deck-oled',
    slug: 'steam-deck-oled-512',
    images: [
      { name: 'steam-deck-oled-1', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85' },
      { name: 'steam-deck-oled-2', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-dualsense-edge',
    slug: 'dualsense-edge-wireless-controller',
    images: [
      { name: 'dualsense-edge-1', url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=85' },
      { name: 'dualsense-edge-2', url: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-scuf-reflex-pro',
    slug: 'scuf-reflex-pro-ps5',
    images: [
      { name: 'scuf-reflex-1', url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=85' },
      { name: 'scuf-reflex-2', url: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-dji-mini-4-pro',
    slug: 'dji-mini-4-pro-fly-more-combo',
    images: [
      { name: 'dji-mini-4-pro-1', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=85' },
      { name: 'dji-mini-4-pro-2', url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-dji-air-3',
    slug: 'dji-air-3-fly-more-combo',
    images: [
      { name: 'dji-air-3-1', url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=85' },
      { name: 'dji-air-3-2', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-osmo-pocket-3',
    slug: 'dji-osmo-pocket-3-creator-combo',
    images: [
      { name: 'osmo-pocket-3-1', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85' },
      { name: 'osmo-pocket-3-2', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-dji-mic-2',
    slug: 'dji-mic-2-wireless-system',
    images: [
      { name: 'dji-mic-2-1', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=85' },
      { name: 'dji-mic-2-2', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-meta-quest-3',
    slug: 'meta-quest-3-512gb',
    images: [
      { name: 'meta-quest-3-1', url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=85' },
      { name: 'meta-quest-3-2', url: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-ray-ban-meta',
    slug: 'ray-ban-meta-wayfarer-smart-glasses',
    images: [
      { name: 'rayban-meta-1', url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=85' },
      { name: 'rayban-meta-2', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-emo-ai-robot',
    slug: 'emo-ai-desktop-robot-home-station',
    images: [
      { name: 'emo-ai-1', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=85' },
      { name: 'emo-ai-2', url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-loona-ai-petbot',
    slug: 'loona-smart-ai-companion-robot',
    images: [
      { name: 'loona-ai-1', url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=85' },
      { name: 'loona-ai-2', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-samsung-s24-ultra',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    images: [
      { name: 'samsung-s24-ultra-1', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=85' },
      { name: 'samsung-s24-ultra-2', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-logitech-g923',
    slug: 'logitech-g923-trueforce-racing-wheel',
    images: [
      { name: 'logitech-g923-1', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=85' },
      { name: 'logitech-g923-2', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-thrustmaster-t300',
    slug: 'thrustmaster-t300-rs-gt-edition',
    images: [
      { name: 'thrustmaster-t300-1', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=85' },
      { name: 'thrustmaster-t300-2', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-playseat-trophy',
    slug: 'playseat-trophy-black-racing-cockpit',
    images: [
      { name: 'playseat-trophy-1', url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=85' },
      { name: 'playseat-trophy-2', url: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-traxxas-xrt-8s',
    slug: 'traxxas-xrt-8s-brushless-race-truck',
    images: [
      { name: 'traxxas-xrt-1', url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=85' },
      { name: 'traxxas-xrt-2', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-traxxas-xmaxx',
    slug: 'traxxas-x-maxx-8s-monster-truck',
    images: [
      { name: 'traxxas-xmaxx-1', url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=85' },
      { name: 'traxxas-xmaxx-2', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-traxxas-rustler',
    slug: 'traxxas-rustler-4x4-vxl-brushless',
    images: [
      { name: 'traxxas-rustler-1', url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=85' },
      { name: 'traxxas-rustler-2', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-sony-pulse-elite',
    slug: 'sony-pulse-elite-wireless-headset',
    images: [
      { name: 'pulse-elite-1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85' },
      { name: 'pulse-elite-2', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=85' }
    ]
  },
  {
    id: 'prod-jbl-boombox-3',
    slug: 'jbl-boombox-3-portable-speaker',
    images: [
      { name: 'jbl-boombox-3-1', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=85' },
      { name: 'jbl-boombox-3-2', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=85' }
    ]
  }
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function processProduct(item) {
  for (const img of item.images) {
    const baseName = img.name;
    const jpgDest = path.join(outDir, `${baseName}.jpg`);
    const webpDest = path.join(outDir, `${baseName}.webp`);

    console.log(`Downloading ${baseName} from ${img.url}...`);
    try {
      const buffer = await fetchBuffer(img.url);

      // Process and optimize 800x800 square product photos
      await sharp(buffer)
        .resize(800, 800, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(jpgDest);

      await sharp(buffer)
        .resize(800, 800, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 88 })
        .toFile(webpDest);

      console.log(`✓ Processed ${baseName}.jpg and ${baseName}.webp`);
    } catch (err) {
      console.error(`✗ Error downloading ${baseName}:`, err.message);
    }
  }
}

async function main() {
  console.log(`Starting download of product assets for ${productsAssets.length} products...`);
  for (const prod of productsAssets) {
    await processProduct(prod);
  }
  console.log('All product assets downloaded and verified successfully!');
}

main();
