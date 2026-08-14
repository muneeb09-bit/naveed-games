const fs = require('fs');

const content = fs.readFileSync('./src/data/products.ts', 'utf8');

const regex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)'[\s\S]*?images:\s*\[([^\]]+)\]/g;
let match;
const products = [];

while ((match = regex.exec(content)) !== null) {
  const images = match[4].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
  products.push({
    id: match[1],
    slug: match[2],
    name: match[3],
    images
  });
}

console.log(JSON.stringify(products, null, 2));
console.log('Total products:', products.length);
