const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:/Users/munee/.gemini/antigravity-ide/brain/c6c9fc24-15c2-440a-9168-fb7cd7ed4ed5/.user_uploaded/media_1786706321717.png';
const outDir = path.join(__dirname, '../public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

async function extract() {
  const metadata = await sharp(inputPath).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);

  // 5 cards across ~1024 width
  // Total width: 1024, Height: 162
  // Card 1: left ~18, top ~10, width ~185, height ~142
  // Card 2: left ~220, top ~10, width ~185, height ~142
  // Card 3: left ~422, top ~10, width ~185, height ~142
  // Card 4: left ~624, top ~10, width ~185, height ~142
  // Card 5: left ~826, top ~10, width ~185, height ~142

  const cards = [
    { name: 'playstation', crop: { left: 16, top: 8, width: 190, height: 146 }, imgCrop: { left: 95, top: 12, width: 105, height: 138 } },
    { name: 'xbox', crop: { left: 216, top: 8, width: 190, height: 146 }, imgCrop: { left: 300, top: 12, width: 102, height: 138 } },
    { name: 'gaming-pcs', crop: { left: 418, top: 8, width: 190, height: 146 }, imgCrop: { left: 510, top: 12, width: 94, height: 138 } },
    { name: 'accessories', crop: { left: 620, top: 8, width: 190, height: 146 }, imgCrop: { left: 698, top: 12, width: 106, height: 138 } },
    { name: 'vr', crop: { left: 818, top: 8, width: 190, height: 146 }, imgCrop: { left: 885, top: 12, width: 118, height: 138 } },
  ];

  for (const card of cards) {
    // Save whole card
    await sharp(inputPath)
      .extract(card.crop)
      .png()
      .toFile(path.join(outDir, `${card.name}-card.png`));

    // Save product cutout
    await sharp(inputPath)
      .extract(card.imgCrop)
      .png()
      .toFile(path.join(outDir, `${card.name}.png`));

    console.log(`Saved ${card.name}.png and ${card.name}-card.png`);
  }
}

extract().catch(console.error);
