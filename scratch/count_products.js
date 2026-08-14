const fs = require('fs');

const content = fs.readFileSync('./src/data/products.ts', 'utf8');

// Match each object in the array
const idMatches = content.match(/id:\s*'prod-[^']+'/g) || [];
console.log('Total product IDs found:', idMatches.length);
console.log(idMatches);
