const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:/Users/munee/.gemini/antigravity-ide/brain/c6c9fc24-15c2-440a-9168-fb7cd7ed4ed5/.user_uploaded/media_1786710080304.png';
const heroDir = path.join(__dirname, '../public/images/hero');
fs.mkdirSync(heroDir, { recursive: true });

async function processHeroCollage() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Let's remove pure white / near-white background from corners/edges using BFS flood fill
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r > 240 && g > 240 && b > 240;
  }

  // Push top, bottom, left, right edges into queue
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) { queue.push(x, 0); visited[x] = 1; }
    if (isWhite(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isWhite(0, y)) { queue.push(0, y); visited[y * width] = 1; }
    if (isWhite(width - 1, y)) { queue.push(width - 1, y); visited[y * width + width - 1] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const idx = (cy * width + cx) * channels;
    data[idx + 3] = 0; // make transparent

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!visited[nIndex] && isWhite(nx, ny)) {
          visited[nIndex] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Soft feathering on edge pixels
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] !== 0 && isWhite(x, y)) {
        // If adjacent to transparent, fade alpha
        const hasTransparentNeighbor =
          data[((y - 1) * width + x) * channels + 3] === 0 ||
          data[((y + 1) * width + x) * channels + 3] === 0 ||
          data[(y * width + x - 1) * channels + 3] === 0 ||
          data[(y * width + x + 1) * channels + 3] === 0;

        if (hasTransparentNeighbor) {
          data[idx + 3] = 0;
        }
      }
    }
  }

  const outPng = path.join(heroDir, 'hardware-flagship.png');
  const outWebp = path.join(heroDir, 'hardware-flagship.webp');

  await sharp(data, { raw: { width, height, channels } })
    .png({ quality: 90 })
    .toFile(outPng);

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 90 })
    .toFile(outWebp);

  console.log('Saved transparent hero collage to:', outPng, outWebp);
}

processHeroCollage().catch(console.error);
