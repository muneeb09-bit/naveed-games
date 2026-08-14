const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const inputPath = 'public/images/logo-original.jpg';
  const outputPath = 'public/images/logo.png';

  const inputBuffer = fs.readFileSync(inputPath);

  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image size: ${width}x${height}, channels: ${channels}`);

  const isBg = new Uint8Array(width * height);
  const queue = [];

  function getPixel(x, y) {
    const idx = (y * width + x) * channels;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      a: data[idx + 3]
    };
  }

  function isBackgroundPixel(r, g, b) {
    // Check if it's near black
    const maxVal = Math.max(r, g, b);
    return maxVal < 45;
  }

  // Push all border pixels to queue if they are background
  for (let x = 0; x < width; x++) {
    // Top border
    let p = getPixel(x, 0);
    if (isBackgroundPixel(p.r, p.g, p.b)) {
      isBg[0 * width + x] = 1;
      queue.push(x, 0);
    }
    // Bottom border
    p = getPixel(x, height - 1);
    if (isBackgroundPixel(p.r, p.g, p.b)) {
      isBg[(height - 1) * width + x] = 1;
      queue.push(x, height - 1);
    }
  }

  for (let y = 0; y < height; y++) {
    // Left border
    let p = getPixel(0, y);
    if (isBackgroundPixel(p.r, p.g, p.b)) {
      isBg[y * width + 0] = 1;
      queue.push(0, y);
    }
    // Right border
    p = getPixel(width - 1, y);
    if (isBackgroundPixel(p.r, p.g, p.b)) {
      isBg[y * width + (width - 1)] = 1;
      queue.push(width - 1, y);
    }
  }

  // BFS Flood Fill
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!isBg[nIndex]) {
          const np = getPixel(nx, ny);
          if (isBackgroundPixel(np.r, np.g, np.b)) {
            isBg[nIndex] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Apply transparency and anti-aliasing
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const maskIdx = y * width + x;

      if (isBg[maskIdx]) {
        data[idx + 3] = 0; // Transparent
      } else {
        // Check if near background for anti-aliasing feather
        let hasBgNeighbor = false;
        const radius = 2;
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (isBg[ny * width + nx]) {
                hasBgNeighbor = true;
                break;
              }
            }
          }
          if (hasBgNeighbor) break;
        }

        if (hasBgNeighbor) {
          const maxVal = Math.max(data[idx], data[idx + 1], data[idx + 2]);
          if (maxVal < 60) {
            const alpha = Math.max(0, Math.min(255, Math.round(((maxVal - 30) / 30) * 255)));
            data[idx + 3] = alpha;
          }
        }
      }
    }
  }

  // Also trim excess transparent margins so the logo is crisp and centered
  const outputBuffer = await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .png()
    .trim()
    .toBuffer();

  fs.writeFileSync(outputPath, outputBuffer);
  console.log('Successfully wrote transparent trimmed logo to', outputPath);
}

processLogo().catch(console.error);
