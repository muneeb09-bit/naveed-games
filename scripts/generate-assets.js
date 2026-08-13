const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'images');
const productsDir = path.join(baseDir, 'products');
const categoriesDir = path.join(baseDir, 'categories');
const brandsDir = path.join(baseDir, 'brands');

[baseDir, productsDir, categoriesDir, brandsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function createProductSvg(title, brand, color1, color2, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)" />
  <rect width="800" height="600" fill="url(#glow)" />

  <!-- Grid overlay -->
  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="150" x2="800" y2="150" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="450" x2="800" y2="450" />
    <line x1="200" y1="0" x2="200" y2="600" />
    <line x1="400" y1="0" x2="400" y2="600" />
    <line x1="600" y1="0" x2="600" y2="600" />
  </g>

  <!-- Decorative Badge -->
  <rect x="60" y="50" width="120" height="28" rx="4" fill="#6366f1" opacity="0.9" />
  <text x="120" y="69" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1.5">${brand.toUpperCase()}</text>

  <!-- Product Icon Graphic Container -->
  <rect x="250" y="140" width="300" height="260" rx="16" fill="url(#card)" stroke="#334155" stroke-width="2" />
  <circle cx="400" cy="270" r="70" fill="#6366f1" opacity="0.15" />
  
  <!-- Gaming controller / Device Emblem -->
  <g fill="none" stroke="#818cf8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M360 270 h80 M400 230 v80" />
    <circle cx="400" cy="270" r="45" stroke="#a5b4fc" stroke-width="3" />
    <circle cx="400" cy="270" r="10" fill="#a5b4fc" />
  </g>

  <!-- Title & Label -->
  <text x="400" y="460" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="800" text-anchor="middle" letter-spacing="-0.5">${escapeXml(title)}</text>
  <text x="400" y="495" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" text-anchor="middle" letter-spacing="1.5">${escapeXml(label).toUpperCase()}</text>

  <!-- Naveed Games Watermark -->
  <text x="740" y="565" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" text-anchor="end" letter-spacing="1">NAVEED GAMES</text>
</svg>`;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const products = [
  { name: 'ps5-pro-1.jpg', title: 'PlayStation 5 Pro', brand: 'Sony', c1: '#090d16', c2: '#1e1b4b', label: 'Console 2TB SSD' },
  { name: 'ps5-pro-2.jpg', title: 'PlayStation 5 Pro', brand: 'Sony', c1: '#0f172a', c2: '#311b92', label: 'Detail View' },
  { name: 'ps5-slim-1.jpg', title: 'PS5 Slim Disc', brand: 'Sony', c1: '#090d16', c2: '#172554', label: 'Disc Edition' },
  { name: 'ps5-slim-2.jpg', title: 'PS5 Slim Disc', brand: 'Sony', c1: '#0f172a', c2: '#1e3a8a', label: 'Box View' },
  { name: 'xbox-x-1.jpg', title: 'Xbox Series X', brand: 'Microsoft', c1: '#022c22', c2: '#064e3b', label: '1TB 12 TFLOPS' },
  { name: 'xbox-x-2.jpg', title: 'Xbox Series X', brand: 'Microsoft', c1: '#064e3b', c2: '#022c22', label: 'Controller & Console' },
  { name: 'switch-oled-1.jpg', title: 'Nintendo Switch OLED', brand: 'Nintendo', c1: '#450a0a', c2: '#7f1d1d', label: '7-inch OLED' },
  { name: 'switch-oled-2.jpg', title: 'Nintendo Switch OLED', brand: 'Nintendo', c1: '#7f1d1d', c2: '#991b1b', label: 'Handheld Mode' },
  { name: 'custom-pc-1.jpg', title: 'NG Custom RTX 4070 Super', brand: 'Naveed Games', c1: '#111827', c2: '#312e81', label: 'Ryzen 7 7800X3D' },
  { name: 'custom-pc-2.jpg', title: 'NG Custom RTX 4070 Super', brand: 'Naveed Games', c1: '#312e81', c2: '#111827', label: 'Tempered Glass RGB' },
  { name: 'ultimate-pc-1.jpg', title: 'NG Ultimate RTX 4090', brand: 'Naveed Games', c1: '#090d16', c2: '#4c1d95', label: 'Flagship i9-14900K' },
  { name: 'ultimate-pc-2.jpg', title: 'NG Ultimate RTX 4090', brand: 'Naveed Games', c1: '#4c1d95', c2: '#1e1b4b', label: 'Custom Loop' },
  { name: 'g923-1.jpg', title: 'Logitech G923 TRUEFORCE', brand: 'Logitech', c1: '#0f172a', c2: '#1e293b', label: 'Racing Wheel & Pedals' },
  { name: 'g923-2.jpg', title: 'Logitech G923 TRUEFORCE', brand: 'Logitech', c1: '#1e293b', c2: '#334155', label: '900° Force Feedback' },
  { name: 'fanatec-dd-1.jpg', title: 'Fanatec CSL DD Pro', brand: 'Fanatec', c1: '#172554', c2: '#1e1b4b', label: '8Nm Direct Drive' },
  { name: 'fanatec-dd-2.jpg', title: 'Fanatec CSL DD Pro', brand: 'Fanatec', c1: '#1e1b4b', c2: '#0f172a', label: 'Gran Turismo Wheel' },
  { name: 'steam-deck-oled-1.jpg', title: 'Steam Deck OLED 512GB', brand: 'Valve', c1: '#18181b', c2: '#27272a', label: 'HDR OLED Handheld' },
  { name: 'steam-deck-oled-2.jpg', title: 'Steam Deck OLED 512GB', brand: 'Valve', c1: '#27272a', c2: '#3f3f46', label: 'Controls & Screen' },
  { name: 'quest-3-1.jpg', title: 'Meta Quest 3 128GB', brand: 'Meta', c1: '#0284c7', c2: '#0f172a', label: 'Mixed Reality VR' },
  { name: 'quest-3-2.jpg', title: 'Meta Quest 3 128GB', brand: 'Meta', c1: '#0369a1', c2: '#1e293b', label: 'Touch Plus Controllers' },
  { name: 'rog-ally-x-1.jpg', title: 'ASUS ROG Ally X', brand: 'ASUS', c1: '#311b92', c2: '#090d16', label: 'Z1 Extreme 1TB' },
  { name: 'rog-ally-x-2.jpg', title: 'ASUS ROG Ally X', brand: 'ASUS', c1: '#1e1b4b', c2: '#311b92', label: '120Hz Gaming' },
  { name: 'gta-vi-1.jpg', title: 'Grand Theft Auto VI', brand: 'Rockstar Games', c1: '#831843', c2: '#4c0519', label: 'Vice City PS5' },
  { name: 'gta-vi-2.jpg', title: 'Grand Theft Auto VI', brand: 'Rockstar Games', c1: '#9f1239', c2: '#831843', label: 'Official Art' },
  { name: 'spiderman-2-1.jpg', title: 'Marvel Spider-Man 2', brand: 'Insomniac Games', c1: '#7f1d1d', c2: '#450a0a', label: 'PS5 Exclusive' },
  { name: 'spiderman-2-2.jpg', title: 'Marvel Spider-Man 2', brand: 'Insomniac Games', c1: '#991b1b', c2: '#7f1d1d', label: 'Venom Action' },
  { name: 'zelda-totk-1.jpg', title: 'Zelda Tears of the Kingdom', brand: 'Nintendo', c1: '#065f46', c2: '#022c22', label: 'Switch Epic' },
  { name: 'zelda-totk-2.jpg', title: 'Zelda Tears of the Kingdom', brand: 'Nintendo', c1: '#047857', c2: '#065f46', label: 'Hyrule Skies' },
  { name: 'odyssey-g9-1.jpg', title: 'Samsung Odyssey OLED G9', brand: 'Samsung', c1: '#090d16', c2: '#1e3a8a', label: '49" 240Hz Ultrawide' },
  { name: 'odyssey-g9-2.jpg', title: 'Samsung Odyssey OLED G9', brand: 'Samsung', c1: '#1e3a8a', c2: '#0f172a', label: 'Curved Display' },
  { name: 'lg-oled-27-1.jpg', title: 'LG UltraGear 27" OLED', brand: 'LG', c1: '#111827', c2: '#1e1b4b', label: '240Hz 0.03ms' },
  { name: 'lg-oled-27-2.jpg', title: 'LG UltraGear 27" OLED', brand: 'LG', c1: '#1e1b4b', c2: '#111827', label: 'Anti-Glare Screen' },
  { name: 'pulse-elite-1.jpg', title: 'Sony PULSE Elite Headset', brand: 'Sony', c1: '#0f172a', c2: '#312e81', label: 'Planar Magnetic' },
  { name: 'pulse-elite-2.jpg', title: 'Sony PULSE Elite Headset', brand: 'Sony', c1: '#1e1b4b', c2: '#0f172a', label: 'PS Link Wireless' },
  { name: 'arctis-nova-pro-1.jpg', title: 'SteelSeries Arctis Nova Pro', brand: 'SteelSeries', c1: '#18181b', c2: '#27272a', label: 'Wireless ANC Hi-Fi' },
  { name: 'arctis-nova-pro-2.jpg', title: 'SteelSeries Arctis Nova Pro', brand: 'SteelSeries', c1: '#27272a', c2: '#18181b', label: 'Hot-Swap Battery' },
  { name: 'dualsense-edge-1.jpg', title: 'DualSense Edge Controller', brand: 'Sony', c1: '#090d16', c2: '#1e293b', label: 'Pro Custom PS5' },
  { name: 'dualsense-edge-2.jpg', title: 'DualSense Edge Controller', brand: 'Sony', c1: '#1e293b', c2: '#0f172a', label: 'Back Buttons & Case' },
  { name: 'titan-evo-1.jpg', title: 'Secretlab TITAN Evo 2024', brand: 'Secretlab', c1: '#0f172a', c2: '#1e1b4b', label: 'Ergonomic Chair' },
  { name: 'titan-evo-2.jpg', title: 'Secretlab TITAN Evo 2024', brand: 'Secretlab', c1: '#1e1b4b', c2: '#0f172a', label: 'L-ADAPT Lumbar' },
  { name: 'kratos-statue-1.jpg', title: 'God of War Kratos Statue', brand: 'Sony', c1: '#450a0a', c2: '#1c1917', label: '12" Polystone Statue' },
  { name: 'kratos-statue-2.jpg', title: 'God of War Kratos Statue', brand: 'Sony', c1: '#7f1d1d', c2: '#450a0a', label: 'Leviathan Axe Detail' },
  { name: 'rayban-meta-1.jpg', title: 'Ray-Ban Meta Smart Glasses', brand: 'Meta', c1: '#0f172a', c2: '#0369a1', label: 'Meta AI & 12MP Cam' },
  { name: 'rayban-meta-2.jpg', title: 'Ray-Ban Meta Smart Glasses', brand: 'Meta', c1: '#0369a1', c2: '#0f172a', label: 'Wayfarer Design' },
];

products.forEach((p) => {
  const filePath = path.join(productsDir, p.name);
  const svgContent = createProductSvg(p.title, p.brand, p.c1, p.c2, p.label);
  fs.writeFileSync(filePath, svgContent, 'utf8');
});

const categories = [
  { name: 'consoles.jpg', title: 'Consoles', brand: 'PlayStation • Xbox • Switch', c1: '#090d16', c2: '#1e1b4b', label: 'Hardware' },
  { name: 'games.jpg', title: 'Video Games', brand: 'PS5 • PS4 • Switch • Xbox', c1: '#831843', c2: '#4c0519', label: 'Software' },
  { name: 'controllers.jpg', title: 'Controllers', brand: 'DualSense • Scuf • Xbox', c1: '#0f172a', c2: '#312e81', label: 'Accessories' },
  { name: 'vr.jpg', title: 'VR & AR', brand: 'Meta Quest 3 • PS VR2', c1: '#0284c7', c2: '#0f172a', label: 'Virtual Reality' },
  { name: 'drones.jpg', title: 'Drones & Cameras', brand: 'DJI Mini • Mavic • Air', c1: '#065f46', c2: '#022c22', label: 'Aerial & Action' },
];

categories.forEach((c) => {
  const filePath = path.join(categoriesDir, c.name);
  const svgContent = createProductSvg(c.title, c.brand, c.c1, c.c2, c.label);
  fs.writeFileSync(filePath, svgContent, 'utf8');
});

console.log('Successfully generated all SVG image assets!');
