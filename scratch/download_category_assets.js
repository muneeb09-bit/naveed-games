const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

const categoryImages = [
  {
    id: 'consoles',
    url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    filename: 'consoles.webp',
  },
  {
    id: 'gaming-pcs',
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    filename: 'gaming-pcs.webp',
  },
  {
    id: 'vr',
    url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80',
    filename: 'vr.webp',
  },
  {
    id: 'drones',
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    filename: 'drones.webp',
  },
  {
    id: 'controllers',
    url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80',
    filename: 'controllers.webp',
  },
  {
    id: 'audio',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    filename: 'audio.webp',
  },
  {
    id: 'racing',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    filename: 'racing.webp',
  },
  {
    id: 'smart-tech',
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    filename: 'smart-tech.webp',
  },
  {
    id: 'handhelds',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    filename: 'handhelds.webp',
  },
  {
    id: 'rc-cars',
    url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80',
    filename: 'rc-cars.webp',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        try {
          // Process to WebP and PNG
          await sharp(buffer)
            .resize(480, 400, { fit: 'cover', position: 'center' })
            .webp({ quality: 85 })
            .toFile(dest);

          await sharp(buffer)
            .resize(480, 400, { fit: 'cover', position: 'center' })
            .png({ quality: 85 })
            .toFile(dest.replace('.webp', '.png'));

          console.log(`Saved ${path.basename(dest)}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  for (const item of categoryImages) {
    const dest = path.join(outDir, item.filename);
    try {
      await downloadFile(item.url, dest);
    } catch (err) {
      console.error(`Error downloading ${item.filename}:`, err.message);
    }
  }
  console.log('Category assets download complete.');
}

run();
