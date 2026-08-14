const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '../public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

const downloads = [
  {
    name: 'playstation.png',
    url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80',
    fallbackLocal: 'playstation.png'
  },
  {
    name: 'xbox.png',
    url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80',
    fallbackLocal: 'xbox.png'
  },
  {
    name: 'gaming-pcs.png',
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    fallbackLocal: 'gaming-pcs.png'
  },
  {
    name: 'accessories.png',
    url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
    fallbackLocal: 'accessories.png'
  },
  {
    name: 'vr.png',
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=400&q=80',
    fallbackLocal: 'vr.png'
  }
];

console.log('Category folders ready in public/images/categories/');
