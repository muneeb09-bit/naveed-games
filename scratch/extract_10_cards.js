const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:/Users/munee/.gemini/antigravity-ide/brain/c6c9fc24-15c2-440a-9168-fb7cd7ed4ed5/.user_uploaded/media_1786707586996.png';
const outDir = path.join(__dirname, '../public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

async function extractCards() {
  const meta = await sharp(inputPath).metadata();
  console.log('Image dimensions:', meta.width, meta.height);

  // 10 cards horizontally
  // Card 1: 12..102
  // Card 2: 112..202
  // Card 3: 212..302
  // Card 4: 312..402
  // Card 5: 412..502
  // Card 6: 512..602
  // Card 7: 612..702
  // Card 8: 712..802
  // Card 9: 812..902
  // Card 10: 912..1002

  const cards = [
    { id: 'consoles', crop: { left: 12, top: 6, width: 90, height: 132 }, imgCrop: { left: 14, top: 8, width: 86, height: 74 } },
    { id: 'games', crop: { left: 112, top: 6, width: 90, height: 132 }, imgCrop: { left: 114, top: 8, width: 86, height: 74 } },
    { id: 'controllers', crop: { left: 212, top: 6, width: 90, height: 132 }, imgCrop: { left: 214, top: 8, width: 86, height: 74 } },
    { id: 'vr', crop: { left: 312, top: 6, width: 90, height: 132 }, imgCrop: { left: 314, top: 8, width: 86, height: 74 } },
    { id: 'gaming-pcs', crop: { left: 412, top: 6, width: 90, height: 132 }, imgCrop: { left: 414, top: 8, width: 86, height: 74 } },
    { id: 'drones', crop: { left: 512, top: 6, width: 90, height: 132 }, imgCrop: { left: 514, top: 8, width: 86, height: 74 } },
    { id: 'audio', crop: { left: 612, top: 6, width: 90, height: 132 }, imgCrop: { left: 614, top: 8, width: 86, height: 74 } },
    { id: 'racing', crop: { left: 712, top: 6, width: 90, height: 132 }, imgCrop: { left: 714, top: 8, width: 86, height: 74 } },
    { id: 'smart-tech', crop: { left: 812, top: 6, width: 90, height: 132 }, imgCrop: { left: 814, top: 8, width: 86, height: 74 } },
    { id: 'rc-cars', crop: { left: 912, top: 6, width: 90, height: 132 }, imgCrop: { left: 914, top: 8, width: 86, height: 74 } },
  ];

  for (const card of cards) {
    // Save crisp product visual WebP and PNG
    await sharp(inputPath)
      .extract(card.imgCrop)
      .webp({ quality: 90 })
      .toFile(path.join(outDir, `${card.id}.webp`));

    await sharp(inputPath)
      .extract(card.imgCrop)
      .png({ quality: 90 })
      .toFile(path.join(outDir, `${card.id}.png`));

    console.log(`Extracted & saved ${card.id}.webp`);
  }
}

extractCards().catch(console.error);
