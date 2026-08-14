import type { Product, ProductFilters, SortOption } from '@/types';
export { categories } from './categories';
export { brands } from './brands';

export const products: Product[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. GAMING ECOSYSTEM — CONSOLES & HANDHELDS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'prod-ps5-pro',
    slug: 'ps5-pro',
    name: 'PlayStation 5 Pro Console',
    brand: 'PlayStation',
    brandId: 'brand-1',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'PlayStation',
    categorySlug: 'playstation',
    subcategoryId: 'consoles',
    subcategorySlug: 'consoles',
    price: 249999,
    originalPrice: 269999,
    discount: 7,
    description: 'The most powerful PlayStation console ever created. Featuring an upgraded GPU with 67% more Compute Units, advanced ray tracing hardware, and PlayStation Spectral Super Resolution (PSSR) AI upscaling. Pre-installed with 2TB custom ultra-fast SSD.',
    shortDescription: 'Flagship PS5 Pro with 2TB SSD and AI-driven PSSR 4K/120Hz upscaling.',
    images: ['/images/products/ps5-pro-1.webp','/images/products/ps5-pro-2.webp'],
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockQuantity: 8,
    sku: 'NG-PS5PRO-2TB',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'PS5',
    specs: [
      { label: 'CPU', value: 'AMD Zen 2, 8 cores / 16 threads, 3.85 GHz' },
      { label: 'GPU', value: '16.7 TFLOPS RDNA, 67% more CUs with PSSR AI' },
      { label: 'RAM', value: '16GB GDDR6 + 2GB DDR5' },
      { label: 'Storage', value: '2TB Custom High-Speed SSD' },
      { label: 'Resolution', value: 'Up to 8K, 4K at 120fps' },
      { label: 'Disc Drive', value: 'Optional Modular Ultra HD Blu-ray' },
    ],
    variants: [
      {
        id: 'var-ps5-pro-storage',
        name: 'Storage & Bundle',
        type: 'storage',
        options: [
          { value: '2tb-standard', label: '2TB Digital Edition', priceModifier: 0, inStock: true },
          { value: '2tb-disc-bundle', label: '2TB + Disc Drive Bundle', priceModifier: 29000, inStock: true },
        ],
      },
    ],
    tags: ['ps5-pro', 'playstation', 'sony', 'console', 'gaming', '4k', 'flagship'],
    warranty: '1 Year Official Sony Warranty',
    deliveryInfo: 'Same-Day Dispatch in Peshawar • 1-2 Days Nationwide',
  },
  {
    id: 'prod-ps5-slim-disc',
    slug: 'ps5-slim-disc',
    name: 'PlayStation 5 Slim (Disc Edition)',
    brand: 'PlayStation',
    brandId: 'brand-1',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'PlayStation',
    categorySlug: 'playstation',
    subcategoryId: 'consoles',
    subcategorySlug: 'consoles',
    price: 174999,
    originalPrice: 189999,
    discount: 8,
    description: 'The redesigned, 30% smaller PS5 with an integrated Ultra HD Blu-ray disc drive and 1TB SSD storage. Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.',
    shortDescription: 'Redesigned slim PS5 console with Ultra HD disc drive and 1TB SSD.',
    images: ['/images/products/ps5-slim-1.webp','/images/products/ps5-slim-2.webp'],
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    stockQuantity: 14,
    sku: 'NG-PS5SLIM-DISC',
    featured: true,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'PS5',
    specs: [
      { label: 'CPU', value: 'AMD Zen 2, 8 cores, 3.5 GHz' },
      { label: 'GPU', value: '10.28 TFLOPS' },
      { label: 'Storage', value: '1TB Custom SSD' },
      { label: 'Drive', value: 'Ultra HD Blu-ray Disc Drive' },
    ],
    variants: [
      {
        id: 'var-ps5-edition',
        name: 'Edition',
        type: 'edition',
        options: [
          { value: 'disc', label: 'Disc Edition (1TB)', priceModifier: 0, inStock: true },
          { value: 'digital', label: 'Digital Edition (1TB)', priceModifier: -15000, inStock: true },
        ],
      },
    ],
    tags: ['ps5-slim', 'ps5', 'playstation', 'console', 'sony'],
    warranty: '1 Year Official Warranty',
    deliveryInfo: 'Peshawar Store Pickup & Express COD available',
  },
  {
    id: 'prod-xbox-series-x',
    slug: 'xbox-series-x',
    name: 'Xbox Series X (1TB Carbon Black)',
    brand: 'Xbox',
    brandId: 'brand-2',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Xbox',
    categorySlug: 'xbox',
    subcategoryId: 'consoles',
    subcategorySlug: 'consoles',
    price: 164999,
    originalPrice: 179999,
    discount: 8,
    description: 'The fastest, most powerful Xbox ever. Powered by Xbox Velocity Architecture, 12 TFLOPS of raw graphics processing power, DirectX Raytracing, true 4K gaming, and Quick Resume across multiple titles.',
    shortDescription: 'The ultimate Xbox console with 12 TFLOPS GPU power and 1TB SSD.',
    images: ['/images/products/xbox-x-1.webp','/images/products/xbox-x-2.webp'],
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    stockQuantity: 6,
    sku: 'NG-XBX-1TB',
    featured: false,
    bestseller: false,
    isNew: false,
    condition: 'new',
    platform: 'Xbox',
    specs: [
      { label: 'CPU', value: 'AMD Zen 2, 8 cores, 3.8 GHz' },
      { label: 'GPU', value: '12 TFLOPS RDNA 2' },
      { label: 'Storage', value: '1TB Custom NVMe SSD' },
      { label: 'Resolution', value: 'True 4K, 120 FPS, 8K HDR' },
    ],
    tags: ['xbox', 'xbox-series-x', 'microsoft', 'console', 'game-pass'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-switch-oled',
    slug: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED Model',
    brand: 'Nintendo',
    brandId: 'brand-3',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Nintendo',
    categorySlug: 'nintendo',
    subcategoryId: 'switch',
    subcategorySlug: 'switch',
    price: 89999,
    originalPrice: 94999,
    discount: 5,
    description: 'Features a vibrant 7-inch OLED screen with vivid colors and crisp contrast, a wide adjustable tabletop stand, a dock with a wired LAN port, 64GB of internal storage, and enhanced audio in handheld and tabletop modes.',
    shortDescription: 'Nintendo Switch with vivid 7-inch OLED screen and enhanced audio.',
    images: ['/images/products/switch-oled-1.webp','/images/products/switch-oled-2.webp'],
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 12,
    sku: 'NG-SW-OLED-WHT',
    featured: true,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'Nintendo',
    specs: [
      { label: 'Screen', value: '7.0-inch OLED Multitouch 720p' },
      { label: 'Storage', value: '64GB Internal (microSD expandable)' },
      { label: 'Battery Life', value: '4.5 to 9 Hours' },
      { label: 'Modes', value: 'TV Mode, Tabletop Mode, Handheld Mode' },
    ],
    variants: [
      {
        id: 'var-switch-color',
        name: 'Colorway',
        type: 'color',
        options: [
          { value: 'white', label: 'White Joy-Cons', priceModifier: 0, inStock: true },
          { value: 'neon', label: 'Neon Blue / Neon Red', priceModifier: 0, inStock: true },
          { value: 'mario-red', label: 'Mario Red Edition', priceModifier: 6000, inStock: true },
        ],
      },
    ],
    tags: ['nintendo', 'switch', 'oled', 'portable', 'handheld', 'mario', 'zelda'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-lenovo-legion-go',
    slug: 'lenovo-legion-go',
    name: 'Lenovo Legion Go 8.8" Handheld Gaming PC',
    brand: 'Lenovo',
    brandId: 'brand-13',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Handhelds',
    categorySlug: 'handhelds',
    subcategoryId: 'lenovo-legion-go',
    subcategorySlug: 'lenovo-legion-go',
    price: 189999,
    originalPrice: 199999,
    discount: 5,
    description: 'Unleash portable Windows gaming with the AMD Ryzen Z1 Extreme processor, 8.8-inch QHD+ 144Hz IPS display, detachable Legion TrueStrike controllers with FPS mouse mode, and 16GB LPDDR5X RAM.',
    shortDescription: '8.8" 144Hz QHD+ Gaming Handheld with AMD Ryzen Z1 Extreme & detachable controllers.',
    images: ['/images/products/legion-go-1.webp','/images/products/legion-go-2.webp'],
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    stockQuantity: 5,
    sku: 'NG-LEGION-GO-512',
    featured: true,
    bestseller: false,
    isNew: true,
    condition: 'new',
    platform: 'PC Handheld',
    specs: [
      { label: 'Processor', value: 'AMD Ryzen Z1 Extreme (8 cores, 16 threads, 5.1GHz)' },
      { label: 'Graphics', value: 'AMD RDNA 3 Graphics' },
      { label: 'Display', value: '8.8" QHD+ (2560x1600) 144Hz 500 nits' },
      { label: 'RAM / Storage', value: '16GB LPDDR5X / 512GB PCIe 4.0 NVMe SSD' },
      { label: 'OS', value: 'Windows 11 Home' },
    ],
    tags: ['lenovo', 'legion-go', 'handheld', 'pc-gaming', 'steam', 'windows11'],
    warranty: '1 Year Official Warranty',
  },
  {
    id: 'prod-rog-ally-x',
    slug: 'asus-rog-ally-x',
    name: 'ASUS ROG Ally X Gaming Handheld (1TB / 24GB RAM)',
    brand: 'ASUS ROG',
    brandId: 'brand-14',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Handhelds',
    categorySlug: 'handhelds',
    subcategoryId: 'rog-ally',
    subcategorySlug: 'rog-ally',
    price: 239999,
    description: 'Upgraded ROG Ally X with massive 80Wh battery, 24GB LPDDR5X-7500 RAM, full-size 1TB M.2 2280 NVMe SSD, improved ergonomics, and AMD Ryzen Z1 Extreme processor.',
    shortDescription: 'Ultimate Windows Handheld with 80Wh battery, 24GB RAM, and 1TB SSD.',
    images: ['/images/products/rog-ally-x-1.webp','/images/products/rog-ally-x-2.webp'],
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    stockQuantity: 4,
    sku: 'NG-ROG-ALLYX-1TB',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'PC Handheld',
    specs: [
      { label: 'Processor', value: 'AMD Ryzen Z1 Extreme' },
      { label: 'RAM', value: '24GB LPDDR5X 7500MHz' },
      { label: 'Storage', value: '1TB M.2 2280 PCIe 4.0 SSD' },
      { label: 'Battery', value: '80Wh (Double the battery life of original Ally)' },
      { label: 'Display', value: '7" FHD (1920x1080) 120Hz FreeSync Premium' },
    ],
    tags: ['asus', 'rog-ally', 'handheld', 'pc-gaming', 'windows11'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-steam-deck-oled',
    slug: 'steam-deck-oled-512',
    name: 'Valve Steam Deck OLED (512GB)',
    brand: 'Steam Deck',
    brandId: 'brand-14',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Handhelds',
    categorySlug: 'handhelds',
    subcategoryId: 'steam-deck',
    subcategorySlug: 'steam-deck',
    price: 169999,
    description: 'Stunning 7.4-inch 90Hz HDR OLED screen with pure blacks, wider color gamut, Wi-Fi 6E, improved battery life, and lightweight ergonomic chassis.',
    shortDescription: '7.4" 90Hz HDR OLED gaming handheld powered by SteamOS.',
    images: ['/images/products/steam-deck-oled-1.webp','/images/products/steam-deck-oled-2.webp'],
    rating: 4.9,
    reviewCount: 76,
    inStock: true,
    stockQuantity: 7,
    sku: 'NG-DECK-OLED-512',
    featured: false,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'Steam Deck',
    specs: [
      { label: 'Screen', value: '7.4" 1280x800 HDR OLED 90Hz' },
      { label: 'APU', value: '6nm AMD APU' },
      { label: 'RAM', value: '16GB LPDDR5' },
      { label: 'Storage', value: '512GB NVMe SSD' },
    ],
    tags: ['steam-deck', 'valve', 'steam', 'handheld', 'oled'],
    warranty: '1 Year Warranty',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. CONTROLLERS & PRO ACCESSORIES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'prod-dualsense-edge',
    slug: 'dualsense-edge-wireless-controller',
    name: 'PlayStation DualSense Edge Wireless Controller',
    brand: 'PlayStation',
    brandId: 'brand-1',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Controllers',
    categorySlug: 'controllers',
    subcategoryId: 'dualsense',
    subcategorySlug: 'dualsense',
    price: 54999,
    originalPrice: 59999,
    discount: 8,
    description: 'Get an edge in gameplay with remappable back buttons, tunable triggers, swappable stick caps and replaceable stick modules. Includes carrying case and braided USB cable.',
    shortDescription: 'Pro-grade modular PS5 controller with remappable back paddles.',
    images: ['/images/products/dualsense-edge-1.webp','/images/products/dualsense-edge-2.webp'],
    rating: 4.8,
    reviewCount: 52,
    inStock: true,
    stockQuantity: 10,
    sku: 'NG-DSE-001',
    featured: true,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'PS5',
    specs: [
      { label: 'Compatibility', value: 'PS5, PC, iOS, Android' },
      { label: 'Customization', value: 'Replaceable stick modules, 2 back buttons' },
      { label: 'Trigger Stops', value: '3-level adjustable hair triggers' },
    ],
    tags: ['dualsense-edge', 'playstation', 'controller', 'pro-gaming', 'sony'],
    warranty: '6 Months Warranty',
  },
  {
    id: 'prod-scuf-reflex-pro',
    slug: 'scuf-reflex-pro-ps5',
    name: 'Scuf Reflex Pro Wireless Controller for PS5 & PC',
    brand: 'Scuf Gaming',
    brandId: 'brand-15',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Controllers',
    categorySlug: 'controllers',
    subcategoryId: 'scuf',
    subcategorySlug: 'scuf',
    price: 69999,
    description: 'Engineered for competitive esports victory. Four embedded ergonomic rear paddles, non-slip high performance grip, and on-board profile switching.',
    shortDescription: 'Esports competitive PS5/PC controller with 4 rear paddles and custom grip.',
    images: ['/images/products/scuf-reflex-1.webp','/images/products/scuf-reflex-2.webp'],
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockQuantity: 4,
    sku: 'NG-SCUF-REFLX',
    featured: false,
    bestseller: false,
    isNew: true,
    condition: 'new',
    platform: 'PS5',
    specs: [
      { label: 'Rear Paddles', value: '4 Remappable Paddles' },
      { label: 'Grip', value: 'Performance Non-slip Texture' },
      { label: 'Connection', value: 'Bluetooth & Low Latency USB-C' },
    ],
    tags: ['scuf', 'controller', 'ps5', 'esports', 'pro-controller'],
    warranty: '6 Months Warranty',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. DRONES & CREATOR STUDIO (DJI, OSMO, MICS)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'prod-dji-mini-4-pro',
    slug: 'dji-mini-4-pro-fly-more-combo',
    name: 'DJI Mini 4 Pro Drone (Fly More Combo Plus with RC 2)',
    brand: 'DJI',
    brandId: 'brand-4',
    department: 'Drones & Creator',
    departmentSlug: 'drones-creator',
    category: 'DJI Drones',
    categorySlug: 'dji-drones',
    subcategoryId: 'dji-mini',
    subcategorySlug: 'dji-mini',
    price: 314999,
    originalPrice: 329999,
    discount: 5,
    description: 'Under 249g ultra-lightweight flagship camera drone. 4K/60fps HDR True Vertical Shooting, Omnidirectional Obstacle Sensing, ActiveTrack 360°, 20km FHD Video Transmission, and up to 45 mins extended flight time with Intelligent Flight Batteries Plus.',
    shortDescription: 'Under 249g flagship 4K/60fps HDR drone with Omnidirectional Obstacle Sensing & RC 2 Screen.',
    images: ['/images/products/dji-mini-4-pro-1.webp','/images/products/dji-mini-4-pro-2.webp'],
    rating: 5.0,
    reviewCount: 88,
    inStock: true,
    stockQuantity: 6,
    sku: 'NG-DJI-M4P-FMC',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'Drone',
    specs: [
      { label: 'Weight', value: '< 249 g (No FAA registration needed in most regions)' },
      { label: 'Camera Sensor', value: '1/1.3-inch CMOS, f/1.7, Dual Native ISO Fusion' },
      { label: 'Video Resolution', value: '4K/60fps HDR, 4K/100fps Slow Motion, D-Log M 10-bit' },
      { label: 'Flight Time', value: 'Up to 45 mins (with Plus Battery)' },
      { label: 'Transmission', value: 'DJI O4 20km 1080p/60fps' },
      { label: 'Obstacle Sensing', value: 'Omnidirectional (Front, Back, Left, Right, Up, Down)' },
    ],
    variants: [
      {
        id: 'var-dji-mini4-package',
        name: 'Package Edition',
        type: 'edition',
        options: [
          { value: 'fly-more-plus-rc2', label: 'Fly More Combo Plus (RC 2 Screen Remote)', priceModifier: 0, inStock: true },
          { value: 'standard-rc-n2', label: 'Standard Package (RC-N2 Phone Remote)', priceModifier: -65000, inStock: true },
        ],
      },
    ],
    tags: ['dji', 'drone', 'mini-4-pro', 'camera', '4k', 'aerial', 'creator'],
    warranty: '1 Year Official DJI International Warranty',
    deliveryInfo: 'Free Insured Express Delivery across Pakistan',
  },
  {
    id: 'prod-dji-air-3',
    slug: 'dji-air-3-fly-more-combo',
    name: 'DJI Air 3 Drone (Fly More Combo with DJI RC 2)',
    brand: 'DJI',
    brandId: 'brand-4',
    department: 'Drones & Creator',
    departmentSlug: 'drones-creator',
    category: 'DJI Drones',
    categorySlug: 'dji-drones',
    subcategoryId: 'dji-air',
    subcategorySlug: 'dji-air',
    price: 389999,
    description: 'Dual-primary 1/1.3-inch CMOS camera system (24mm wide-angle & 70mm 3x medium telephoto). 4K/60fps HDR video, 46-minute flight time, omnidirectional obstacle sensing, and 20km O4 video transmission.',
    shortDescription: 'Dual primary camera drone (Wide + 3x Telephoto) with 46 min flight time.',
    images: ['/images/products/dji-air-3-1.webp','/images/products/dji-air-3-2.webp'],
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    stockQuantity: 4,
    sku: 'NG-DJI-AIR3-RC2',
    featured: false,
    bestseller: false,
    isNew: false,
    condition: 'new',
    platform: 'Drone',
    specs: [
      { label: 'Dual Cameras', value: '1/1.3" Wide-angle (24mm) + 1/1.3" 3x Telephoto (70mm)' },
      { label: 'Video', value: '4K/60fps HDR, 4K/100fps, 10-bit D-Log M' },
      { label: 'Max Flight Time', value: '46 Minutes' },
      { label: 'Transmission', value: 'DJI O4 HD 20km' },
    ],
    tags: ['dji', 'air-3', 'drone', 'camera', 'telephoto'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-osmo-pocket-3',
    slug: 'dji-osmo-pocket-3-creator-combo',
    name: 'DJI Osmo Pocket 3 Gimbal Camera (Creator Combo)',
    brand: 'DJI',
    brandId: 'brand-4',
    department: 'Drones & Creator',
    departmentSlug: 'drones-creator',
    category: 'Cameras',
    categorySlug: 'cameras',
    subcategoryId: 'osmo-pocket',
    subcategorySlug: 'osmo-pocket',
    price: 194999,
    originalPrice: 204999,
    discount: 5,
    description: 'Massive 1-inch CMOS sensor, 4K/120fps video recording, 3-axis mechanical stabilization, rotatable 2-inch OLED touchscreen, ActiveTrack 6.0, full-pixel fast focusing, and wireless DJI Mic 2 transmitter included in Creator Combo.',
    shortDescription: '1-inch CMOS pocket gimbal camera with 4K/120fps & DJI Mic 2 audio transmitter.',
    images: ['/images/products/osmo-pocket-3-1.webp','/images/products/osmo-pocket-3-2.webp'],
    rating: 5.0,
    reviewCount: 94,
    inStock: true,
    stockQuantity: 9,
    sku: 'NG-DJI-OP3-CC',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'Camera',
    specs: [
      { label: 'Sensor', value: '1-inch CMOS, f/2.0 aperture' },
      { label: 'Video', value: '4K/120fps UHD, 10-bit D-Log M & HLG' },
      { label: 'Screen', value: '2.0-inch Rotatable OLED Touchscreen' },
      { label: 'Stabilization', value: '3-Axis Mechanical Gimbal' },
      { label: 'Audio', value: 'Stereo Recording + DJI Mic 2 Wireless Transmitter' },
    ],
    variants: [
      {
        id: 'var-pocket3-edition',
        name: 'Bundle Edition',
        type: 'edition',
        options: [
          { value: 'creator-combo', label: 'Creator Combo (+ Mic 2 & Battery Handle)', priceModifier: 0, inStock: true },
          { value: 'standard', label: 'Standard Package', priceModifier: -35000, inStock: true },
        ],
      },
    ],
    tags: ['dji', 'osmo-pocket-3', 'vlogging', 'camera', 'creator', '4k', 'gimbal'],
    warranty: '1 Year Official Warranty',
    deliveryInfo: 'Peshawar Store Pickup & Nationwide Delivery',
  },
  {
    id: 'prod-dji-mic-2',
    slug: 'dji-mic-2-wireless-system',
    name: 'DJI Mic 2 (2 TX + 1 RX + Charging Case)',
    brand: 'DJI',
    brandId: 'brand-4',
    department: 'Drones & Creator',
    departmentSlug: 'drones-creator',
    category: 'Vlogging Gear',
    categorySlug: 'vlogging-gear',
    subcategoryId: 'wireless-mics',
    subcategorySlug: 'wireless-mics',
    price: 99999,
    description: 'High-quality wireless audio recording with 32-bit float internal recording, intelligent noise cancelling, 250m range, and crystal-clear omnidirectional pickup. Includes 2 transmitters, receiver, and charging case.',
    shortDescription: 'Pro wireless audio recording system with 32-bit float and noise cancelling.',
    images: ['/images/products/dji-mic-2-1.webp','/images/products/dji-mic-2-2.webp'],
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    stockQuantity: 11,
    sku: 'NG-DJI-MIC2-SET',
    featured: false,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'Audio',
    specs: [
      { label: 'Audio Format', value: '32-bit Float Internal Recording' },
      { label: 'Transmission', value: '250m (820 ft) Range' },
      { label: 'Battery Life', value: '18 Hours (with Charging Case)' },
    ],
    tags: ['dji', 'dji-mic-2', 'wireless-mic', 'vlogging', 'creator', 'audio'],
    warranty: '1 Year Warranty',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. SMART TECH — VR, SPATIAL GLASSES, AI ROBOTS, PHONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'prod-meta-quest-3',
    slug: 'meta-quest-3-512gb',
    name: 'Meta Quest 3 Mixed Reality VR Headset (512GB)',
    brand: 'Meta',
    brandId: 'brand-5',
    department: 'Smart Tech',
    departmentSlug: 'smart-tech',
    category: 'VR Headsets',
    categorySlug: 'vr-headsets',
    subcategoryId: 'meta-quest-3',
    subcategorySlug: 'meta-quest-3',
    price: 174999,
    originalPrice: 189999,
    discount: 8,
    description: 'Breakthrough mixed reality headset with high-resolution full-color Passthrough. Powered by Snapdragon XR2 Gen 2 chip with 2x graphic performance, 4K+ Infinite Display (2064x2208 per eye), Pancake optics, and Touch Plus haptic controllers.',
    shortDescription: 'Next-gen mixed reality headset with 4K+ Infinite Display & Snapdragon XR2 Gen 2.',
    images: ['/images/products/meta-quest-3-1.webp','/images/products/meta-quest-3-2.webp'],
    rating: 4.9,
    reviewCount: 108,
    inStock: true,
    stockQuantity: 10,
    sku: 'NG-MQ3-512GB',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'VR',
    specs: [
      { label: 'Optics & Display', value: '4K+ Infinite Display (2064x2208 per eye) with Pancake Lenses' },
      { label: 'Processor', value: 'Snapdragon XR2 Gen 2 (2x GPU performance of Quest 2)' },
      { label: 'Mixed Reality', value: 'Dual RGB Color Cameras + Depth Projector for Real-time Passthrough' },
      { label: 'Storage', value: '512GB Flash Storage' },
      { label: 'Audio', value: 'Spatial 3D Audio with 40% louder volume' },
    ],
    variants: [
      {
        id: 'var-quest3-storage',
        name: 'Storage Capacity',
        type: 'storage',
        options: [
          { value: '512gb', label: '512GB High Capacity', priceModifier: 0, inStock: true },
          { value: '128gb', label: '128GB Standard', priceModifier: -28000, inStock: true },
        ],
      },
    ],
    tags: ['meta-quest-3', 'meta', 'vr', 'virtual-reality', 'mixed-reality', 'gaming'],
    warranty: '1 Year Warranty',
    deliveryInfo: 'Peshawar Store Pickup & Express COD Nationwide',
  },
  {
    id: 'prod-ray-ban-meta',
    slug: 'ray-ban-meta-wayfarer-smart-glasses',
    name: 'Ray-Ban Meta Wayfarer Smart Glasses with Meta AI',
    brand: 'Ray-Ban Meta',
    brandId: 'brand-6',
    department: 'Smart Tech',
    departmentSlug: 'smart-tech',
    category: 'Smart Glasses',
    categorySlug: 'smart-glasses',
    subcategoryId: 'ray-ban-meta',
    subcategorySlug: 'ray-ban-meta',
    price: 119999,
    originalPrice: 129999,
    discount: 8,
    description: 'Iconic Ray-Ban Wayfarer style upgraded with high-tech smart features: 12MP ultra-wide camera, 1080p video recording, 5-mic spatial audio array, open-ear custom speakers, voice control, and Meta AI multimodal assistant.',
    shortDescription: 'Smart glasses with 12MP camera, open-ear spatial audio & Meta AI assistant.',
    images: ['/images/products/rayban-meta-1.webp','/images/products/rayban-meta-2.webp'],
    rating: 4.8,
    reviewCount: 63,
    inStock: true,
    stockQuantity: 8,
    sku: 'NG-RBM-WAY-BLK',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'Wearable',
    specs: [
      { label: 'Camera', value: '12MP Ultra-Wide (Capture 1080p 60s clips & Livestream to IG/FB)' },
      { label: 'Audio', value: 'Custom Open-Ear Directional Speakers + 5-Mic Array' },
      { label: 'AI Features', value: 'Meta AI Multimodal Voice Control ("Hey Meta, look and tell me...")' },
      { label: 'Battery', value: '4 Hours per charge + 32 Hours via Leather Charging Case' },
    ],
    variants: [
      {
        id: 'var-rayban-frame',
        name: 'Frame Finish',
        type: 'color',
        options: [
          { value: 'matte-black', label: 'Matte Black / Polarized G15 Green', priceModifier: 0, inStock: true },
          { value: 'shiny-black', label: 'Shiny Black / Clear Transitions', priceModifier: 6000, inStock: true },
          { value: 'caramel', label: 'Caramel Transparent / Brown Gradient', priceModifier: 4000, inStock: true },
        ],
      },
    ],
    tags: ['ray-ban', 'meta', 'smart-glasses', 'ai', 'camera', 'wearable'],
    warranty: '1 Year International Warranty',
  },
  {
    id: 'prod-emo-ai-robot',
    slug: 'emo-ai-desktop-robot-home-station',
    name: 'EMO AI Desktop Pet Robot with Home Station (LivingAI)',
    brand: 'LivingAI (EMO)',
    brandId: 'brand-16',
    department: 'Smart Tech',
    departmentSlug: 'smart-tech',
    category: 'AI Robots',
    categorySlug: 'ai-robots',
    subcategoryId: 'emo',
    subcategorySlug: 'emo',
    price: 129999,
    description: 'An AI pet companion with multiple sensors and cutting-edge tech. EMO can self-explore your desktop, recognize your face, make 1000+ authentic expressions, play games, dance, set alarms, and walk automatically back to his Home Station to charge.',
    shortDescription: 'AI desktop companion pet robot with facial recognition & auto-charging Home Station.',
    images: ['/images/products/emo-ai-1.webp','/images/products/emo-ai-2.webp'],
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    stockQuantity: 6,
    sku: 'NG-EMO-HOME-STN',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'Robot',
    specs: [
      { label: 'Sensors', value: 'Wide-angle HD Camera, 4-Mic Array, Touch & Drop Sensors' },
      { label: 'Processing', value: 'AI Neural Network Processor with Autonomous Behavior' },
      { label: 'Home Station', value: 'Auto-docking wireless magnetic charging base' },
      { label: 'Features', value: 'Voice Assistant, Weather, Dance, Games, Desktop Clock' },
    ],
    tags: ['emo', 'ai-robot', 'pet-bot', 'livingai', 'smart-companion', 'robotics'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-loona-ai-petbot',
    slug: 'loona-smart-ai-companion-robot',
    name: 'Loona Smart AI Companion Robot (KEYi Tech)',
    brand: 'KEYi Tech (Loona)',
    brandId: 'brand-17',
    department: 'Smart Tech',
    departmentSlug: 'smart-tech',
    category: 'AI Robots',
    categorySlug: 'ai-robots',
    subcategoryId: 'loona',
    subcategorySlug: 'loona',
    price: 149999,
    description: 'Quadruped intelligent companion robot equipped with 3D ToF LiDAR, HD camera, voice recognition powered by ChatGPT integration, and playful personality movements.',
    shortDescription: 'Intelligent robotic companion pet with 3D ToF LiDAR camera & ChatGPT voice.',
    images: ['/images/products/loona-ai-1.webp','/images/products/loona-ai-2.webp'],
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    stockQuantity: 3,
    sku: 'NG-LOONA-PET',
    featured: false,
    bestseller: false,
    isNew: true,
    condition: 'new',
    platform: 'Robot',
    specs: [
      { label: 'Vision', value: '3D ToF (Time of Flight) LiDAR + RGB HD Camera' },
      { label: 'Voice AI', value: 'ChatGPT Voice Integration' },
      { label: 'Mobility', value: '3D Quadruped Wheel-Leg Hybrid' },
    ],
    tags: ['loona', 'ai-robot', 'robotics', 'smart-tech'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-samsung-s24-ultra',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    name: 'Samsung Galaxy S24 Ultra (512GB / Titanium Gray)',
    brand: 'Samsung',
    brandId: 'brand-11',
    department: 'Smart Tech',
    departmentSlug: 'smart-tech',
    category: 'Phones',
    categorySlug: 'phones',
    subcategoryId: 'samsung-galaxy',
    subcategorySlug: 'samsung-galaxy',
    price: 369999,
    description: 'Flagship Galaxy S24 Ultra with Galaxy AI, Titanium frame, 200MP camera with 5x optical zoom, Snapdragon 8 Gen 3 for Galaxy, flat 6.8" Dynamic AMOLED 2X 2600-nit display, and built-in S Pen.',
    shortDescription: 'Titanium flagship smartphone with Galaxy AI, 200MP camera & S Pen.',
    images: ['/images/products/samsung-s24-ultra-1.webp','/images/products/samsung-s24-ultra-2.webp'],
    rating: 4.9,
    reviewCount: 82,
    inStock: true,
    stockQuantity: 5,
    sku: 'NG-S24U-512-GRY',
    featured: false,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'Smartphone',
    specs: [
      { label: 'Display', value: '6.8" QHD+ Dynamic AMOLED 2X, 1-120Hz, 2600 nits' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Camera', value: '200MP Main + 50MP 5x Telephoto + 12MP Ultra-Wide' },
      { label: 'Storage & RAM', value: '512GB / 12GB RAM' },
    ],
    tags: ['samsung', 's24-ultra', 'galaxy', 'smartphone', 'flagship'],
    warranty: 'Official PTA Approved / 1 Year Warranty',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. RACING SIMULATORS & TRAXXAS RC VEHICLES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'prod-logitech-g923',
    slug: 'logitech-g923-trueforce-racing-wheel',
    name: 'Logitech G923 TrueForce Racing Wheel & Pedals',
    brand: 'Logitech G',
    brandId: 'brand-8',
    department: 'Racing & RC',
    departmentSlug: 'racing-rc',
    category: 'Racing Wheels',
    categorySlug: 'racing-wheels',
    subcategoryId: 'logitech',
    subcategorySlug: 'logitech',
    price: 94999,
    originalPrice: 104999,
    discount: 10,
    description: 'Experience the future of sim racing. Featuring TRUEFORCE next-gen force feedback that connects directly to in-game physics engines. Includes progressive brake pedal and launch assist dual-clutch.',
    shortDescription: 'TrueForce next-gen force feedback racing wheel with progressive 3-pedal set.',
    images: ['/images/products/logitech-g923-1.webp','/images/products/logitech-g923-2.webp'],
    rating: 4.8,
    reviewCount: 79,
    inStock: true,
    stockQuantity: 9,
    sku: 'NG-LOGI-G923-PS',
    featured: true,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'PS5 / PC',
    specs: [
      { label: 'Compatibility', value: 'PS5, PS4, PC (Windows 10/11)' },
      { label: 'Force Feedback', value: 'TRUEFORCE High-Definition Feedback (4000 updates/sec)' },
      { label: 'Pedals', value: 'Pressure-sensitive progressive brake with metal faces' },
      { label: 'Rotation', value: '900 degrees lock-to-lock' },
    ],
    variants: [
      {
        id: 'var-wheel-platform',
        name: 'Platform Compatibility',
        type: 'edition',
        options: [
          { value: 'ps-pc', label: 'PlayStation & PC Version', priceModifier: 0, inStock: true },
          { value: 'xbox-pc', label: 'Xbox & PC Version', priceModifier: 0, inStock: true },
        ],
      },
    ],
    tags: ['logitech', 'g923', 'racing-wheel', 'sim-racing', 'ps5', 'pc'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-thrustmaster-t300',
    slug: 'thrustmaster-t300-rs-gt-edition',
    name: 'Thrustmaster T300 RS GT Edition Racing Wheel',
    brand: 'Thrustmaster',
    brandId: 'brand-9',
    department: 'Racing & RC',
    departmentSlug: 'racing-rc',
    category: 'Racing Wheels',
    categorySlug: 'racing-wheels',
    subcategoryId: 'thrustmaster',
    subcategorySlug: 'thrustmaster',
    price: 139999,
    description: 'High-precision dual-belt force feedback racing simulator with brushless motor and Gran Turismo certified 3-pedal T3PA-GT set. Detachable 11-inch GT-style wheel.',
    shortDescription: 'Dual-belt brushless force feedback racing wheel with GT 3-pedal set.',
    images: ['/images/products/thrustmaster-t300-1.webp','/images/products/thrustmaster-t300-2.webp'],
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    stockQuantity: 5,
    sku: 'NG-TM-T300RS-GT',
    featured: false,
    bestseller: false,
    isNew: false,
    condition: 'new',
    platform: 'PS5 / PC',
    specs: [
      { label: 'Motor', value: 'Industrial Brushless Motor (25W Force Feedback)' },
      { label: 'System', value: 'Dual-Belt Friction-Free Mechanism (1080° Rotation)' },
      { label: 'Pedals', value: 'T3PA-GT 3-Pedal Set with 100% metal heads' },
    ],
    tags: ['thrustmaster', 't300', 'racing-wheel', 'sim-racing'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-playseat-trophy',
    slug: 'playseat-trophy-black-racing-cockpit',
    name: 'Playseat Trophy Racing Seat & Sim Rig Cockpit',
    brand: 'Playseat',
    brandId: 'brand-19',
    department: 'Racing & RC',
    departmentSlug: 'racing-rc',
    category: 'Racing Seats',
    categorySlug: 'racing-seats',
    subcategoryId: 'playseat',
    subcategorySlug: 'playseat',
    price: 179999,
    description: 'Developed in collaboration with real esports and motorsport drivers. Frameless high-rigidity structure made with ActiFit breathable material. Direct Drive compatible.',
    shortDescription: 'High-rigidity Direct Drive compatible sim racing cockpit with ActiFit fabric.',
    images: ['/images/products/playseat-trophy-1.webp','/images/products/playseat-trophy-2.webp'],
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    stockQuantity: 3,
    sku: 'NG-PST-TROPHY',
    featured: false,
    bestseller: false,
    isNew: true,
    condition: 'new',
    platform: 'Universal',
    specs: [
      { label: 'Structure', value: 'High-strength steel & aluminum alloy' },
      { label: 'Compatibility', value: 'Logitech, Thrustmaster, Fanatec, Direct Drive' },
      { label: 'Fabric', value: 'ActiFit Breathable Ergonomic Fabric' },
    ],
    tags: ['playseat', 'sim-rig', 'racing-seat', 'cockpit', 'sim-racing'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-traxxas-xrt-8s',
    slug: 'traxxas-xrt-8s-brushless-race-truck',
    name: 'Traxxas XRT 8S 4WD Brushless Race Truck (60+ MPH)',
    brand: 'Traxxas',
    brandId: 'brand-7',
    department: 'Racing & RC',
    departmentSlug: 'racing-rc',
    category: 'RC Cars',
    categorySlug: 'rc-cars',
    subcategoryId: 'traxxas-xrt',
    subcategorySlug: 'traxxas-xrt',
    price: 369999,
    originalPrice: 389999,
    discount: 5,
    description: 'Extreme 8S power monster. The Traxxas XRT fuses race-inspired engineering with 8S brushless Velineon 1200XL power and all-metal drivetrain to hit speeds over 60+ MPH.',
    shortDescription: 'Extreme 8S 4WD brushless race truck reaching 60+ MPH with all-metal drivetrain.',
    images: ['/images/products/traxxas-xrt-1.webp','/images/products/traxxas-xrt-2.webp'],
    rating: 5.0,
    reviewCount: 48,
    inStock: true,
    stockQuantity: 4,
    sku: 'NG-TRX-XRT-8S',
    featured: true,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'RC Vehicle',
    specs: [
      { label: 'Scale & Drive', value: '1/6 Scale 4WD All-Terrain Race Monster' },
      { label: 'Power System', value: 'VXL-8s Waterproof ESC + Velineon 1200XL Brushless Motor' },
      { label: 'Top Speed', value: '60+ MPH with two 4S LiPo batteries and optional gearing' },
      { label: 'Chassis', value: 'Low Center of Gravity (CG) High-strength Composite' },
      { label: 'Transmission', value: 'TQi 2.4GHz High Output Radio System with TSM Stability' },
    ],
    variants: [
      {
        id: 'var-xrt-color',
        name: 'Color Scheme',
        type: 'color',
        options: [
          { value: 'green', label: 'Solar Flare Green', priceModifier: 0, inStock: true },
          { value: 'red', label: 'Rock n Roll Red', priceModifier: 0, inStock: true },
          { value: 'blue', label: 'Blue Racing Livery', priceModifier: 0, inStock: true },
        ],
      },
    ],
    tags: ['traxxas', 'xrt', 'rc-car', '8s', 'brushless', 'hobby-grade', 'truck'],
    warranty: 'Official Traxxas Electronics Lifetime Warranty Support',
    deliveryInfo: 'Insured Courier Delivery with Tracking across Pakistan',
  },
  {
    id: 'prod-traxxas-xmaxx',
    slug: 'traxxas-x-maxx-8s-monster-truck',
    name: 'Traxxas X-Maxx 8S 4WD Monster Truck',
    brand: 'Traxxas',
    brandId: 'brand-7',
    department: 'Racing & RC',
    departmentSlug: 'racing-rc',
    category: 'RC Cars',
    categorySlug: 'rc-cars',
    subcategoryId: 'x-maxx',
    subcategorySlug: 'x-maxx',
    price: 349999,
    description: 'The undisputed king of RC monster trucks. Mammoth 8S power, 30+ volt muscle, colossal 8-inch tires, self-righting technology, and bulletproof all-metal driveline.',
    shortDescription: 'Giant 1/5 scale 8S 4WD monster truck with Self-Righting technology.',
    images: ['/images/products/traxxas-xmaxx-1.webp','/images/products/traxxas-xmaxx-2.webp'],
    rating: 4.9,
    reviewCount: 65,
    inStock: true,
    stockQuantity: 3,
    sku: 'NG-TRX-XMAXX-8S',
    featured: false,
    bestseller: true,
    isNew: false,
    condition: 'new',
    platform: 'RC Vehicle',
    specs: [
      { label: 'Scale', value: '1/5 Scale Colossal Monster Truck' },
      { label: 'Speed', value: '50+ MPH on Dual 4S LiPo' },
      { label: 'Feature', value: 'Self-Righting (Flips itself back onto wheels automatically)' },
    ],
    tags: ['traxxas', 'x-maxx', 'monster-truck', 'rc-car', '8s'],
    warranty: 'Official Traxxas Support',
  },
  {
    id: 'prod-traxxas-rustler',
    slug: 'traxxas-rustler-4x4-vxl-brushless',
    name: 'Traxxas Rustler 4X4 VXL Stadium Truck (65+ MPH)',
    brand: 'Traxxas',
    brandId: 'brand-7',
    department: 'Racing & RC',
    departmentSlug: 'racing-rc',
    category: 'RC Cars',
    categorySlug: 'rc-cars',
    subcategoryId: 'rustler',
    subcategorySlug: 'rustler',
    price: 169999,
    description: 'Blistering 65+ MPH speed with Velineon 3S brushless power system, low-CG chassis, heavy-duty driveshafts, and Traxxas Stability Management (TSM).',
    shortDescription: 'High-speed 1/10 4WD stadium truck hitting 65+ MPH on 3S LiPo.',
    images: ['/images/products/traxxas-rustler-1.webp','/images/products/traxxas-rustler-2.webp'],
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockQuantity: 6,
    sku: 'NG-TRX-RUSTLER',
    featured: false,
    bestseller: false,
    isNew: false,
    condition: 'new',
    platform: 'RC Vehicle',
    specs: [
      { label: 'Speed', value: '65+ MPH on 3S LiPo' },
      { label: 'Drive', value: 'Shaft-driven 4WD' },
      { label: 'Waterproof', value: 'All-weather waterproof electronics' },
    ],
    tags: ['traxxas', 'rustler', 'rc-car', 'brushless', 'vxl'],
    warranty: 'Traxxas Support',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. AUDIO & ENTERTAINMENT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'prod-sony-pulse-elite',
    slug: 'sony-pulse-elite-wireless-headset',
    name: 'Sony PlayStation Pulse Elite Wireless Headset',
    brand: 'Sony',
    brandId: 'brand-10',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Audio',
    categorySlug: 'audio',
    subcategoryId: 'sony-audio',
    subcategorySlug: 'sony-audio',
    price: 49999,
    description: 'Audiophile-inspired planar magnetic drivers deliver lifelike sound with ultra-low distortion. Retractable mic with AI-enhanced noise rejection, PlayStation Link lossless connection, and charging hanger.',
    shortDescription: 'Planar magnetic wireless gaming headset with AI noise rejection & lossless audio.',
    images: ['/images/products/pulse-elite-1.webp','/images/products/pulse-elite-2.webp'],
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    stockQuantity: 12,
    sku: 'NG-PULSE-ELITE',
    featured: false,
    bestseller: true,
    isNew: true,
    condition: 'new',
    platform: 'PS5 / PC',
    specs: [
      { label: 'Drivers', value: 'Custom Planar Magnetic Drivers' },
      { label: 'Connectivity', value: 'PlayStation Link Lossless + Bluetooth' },
      { label: 'Battery', value: 'Up to 30 Hours with Quick Charge' },
    ],
    tags: ['sony', 'pulse-elite', 'headset', 'audio', 'ps5'],
    warranty: '1 Year Warranty',
  },
  {
    id: 'prod-jbl-boombox-3',
    slug: 'jbl-boombox-3-portable-speaker',
    name: 'JBL Boombox 3 Portable Bluetooth Speaker',
    brand: 'JBL Audio',
    brandId: 'brand-21',
    department: 'Gaming',
    departmentSlug: 'gaming',
    category: 'Audio',
    categorySlug: 'audio',
    subcategoryId: 'speakers',
    subcategorySlug: 'speakers',
    price: 139999,
    description: 'Massive sound and deepest bass. 3-way speaker design with powerful subwoofer, 24 hours of playtime, IP67 waterproof and dustproof build, and built-in powerbank.',
    shortDescription: 'Monstrous portable 3-way speaker with 24-hour battery & IP67 waterproofing.',
    images: ['/images/products/jbl-boombox-3-1.webp','/images/products/jbl-boombox-3-2.webp'],
    rating: 4.9,
    reviewCount: 54,
    inStock: true,
    stockQuantity: 5,
    sku: 'NG-JBL-BB3-BLK',
    featured: false,
    bestseller: false,
    isNew: false,
    condition: 'new',
    platform: 'Audio',
    specs: [
      { label: 'Output Power', value: '180W RMS (AC mode) / 136W (Battery mode)' },
      { label: 'Battery Life', value: '24 Hours Playtime' },
      { label: 'Waterproof', value: 'IP67 Water and Dustproof' },
    ],
    tags: ['jbl', 'boombox', 'speaker', 'audio', 'bluetooth'],
    warranty: '1 Year Warranty',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEARCH SYNONYMS & TOKENIZATION DICTIONARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SEARCH_SYNONYMS: Record<string, string[]> = {
  ps5: ['playstation 5', 'ps 5', 'playstation', 'dualsense', 'sony console'],
  ps4: ['playstation 4', 'ps 4', 'playstation'],
  xbox: ['series x', 'series s', 'microsoft', 'xbox one'],
  switch: ['nintendo', 'switch oled', 'switch 2', 'mario', 'zelda', 'joycon'],
  dji: ['drone', 'mini 4', 'air 3', 'mavic', 'osmo', 'pocket 3', 'gimbal', 'camera'],
  drone: ['dji', 'mini 4 pro', 'air 3', 'mavic 3', 'aerial'],
  pocket: ['osmo pocket', 'dji pocket 3', 'vlogging camera'],
  quest: ['meta quest', 'meta', 'oculus', 'vr', 'virtual reality', 'quest 3', 'quest 3s'],
  vr: ['meta quest', 'ps vr2', 'headset', 'spatial', 'virtual reality'],
  glasses: ['ray-ban', 'rayban', 'smart glasses', 'meta glasses', 'wayfarer'],
  robot: ['emo', 'loona', 'pet bot', 'livingai', 'ai robot', 'companion'],
  emo: ['ai robot', 'pet robot', 'livingai', 'desktop robot'],
  traxxas: ['rc car', 'xrt', 'xmaxx', 'x-maxx', 'rustler', 'rc truck', 'hobby'],
  rc: ['traxxas', 'rc car', 'remote control', 'truck', 'xrt', 'xmaxx'],
  wheel: ['steering wheel', 'logitech', 'g923', 'thrustmaster', 't300', 'racing sim', 'sim rig', 'cockpit'],
  sim: ['racing wheel', 'playseat', 'cockpit', 'logitech', 'thrustmaster', 'g923'],
  phone: ['samsung', 'galaxy', 's24 ultra', 'smartphone', 'huawei'],
  galaxy: ['samsung', 's24', 's25', 'smartphone'],
  legion: ['lenovo', 'legion go', 'handheld', 'pc gaming'],
  ally: ['asus', 'rog ally', 'handheld', 'pc gaming'],
  deck: ['steam deck', 'valve', 'handheld', 'oled'],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPO-TOLERANT & TOKENIZED SEARCH ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function searchProducts(query: string): Product[] {
  if (!query || query.trim().length < 2) return [];

  const rawQuery = query.toLowerCase().trim();
  const queryTokens = rawQuery.split(/[\s\-_\/]+/).filter((t) => t.length > 0);

  // Expand query tokens with synonyms
  const expandedTokens = new Set<string>(queryTokens);
  queryTokens.forEach((token) => {
    if (SEARCH_SYNONYMS[token]) {
      SEARCH_SYNONYMS[token].forEach((syn) => {
        syn.split(/\s+/).forEach((st) => expandedTokens.add(st));
      });
    }
  });

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.brand,
      product.category,
      product.categorySlug,
      product.department || '',
      product.departmentSlug || '',
      product.platform || '',
      product.sku,
      product.shortDescription,
      product.description,
      ...(product.tags || []),
      ...(product.specs ? product.specs.map((s) => `${s.label} ${s.value}`) : []),
    ]
      .join(' ')
      .toLowerCase();

    // 1. Exact raw substring match gets highest priority
    if (searchableText.includes(rawQuery)) return true;

    // 2. Tokenized search: all primary tokens or expanded tokens match
    const matchesAllTokens = queryTokens.every((token) => {
      if (searchableText.includes(token)) return true;
      // Check partial matches or synonyms
      const syns = SEARCH_SYNONYMS[token] || [];
      return syns.some((syn) => searchableText.includes(syn));
    });

    if (matchesAllTokens) return true;

    // 3. Fallback: match at least 70% of expanded tokens
    let matchedCount = 0;
    expandedTokens.forEach((token) => {
      if (searchableText.includes(token)) matchedCount++;
    });

    return matchedCount >= Math.min(2, expandedTokens.size);
  });
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  const norm = slug.toLowerCase().trim();
  return products.find((p) => p.slug === norm || p.id === norm);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const norm = categorySlug.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.categorySlug === norm ||
      p.departmentSlug === norm ||
      p.tags.includes(norm)
  );
}

export function getProductsByBrand(brandSlug: string): Product[] {
  const norm = brandSlug.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.brand.toLowerCase().replace(/\s+/g, '-').includes(norm) ||
      p.brand.toLowerCase().includes(norm) ||
      p.tags.some((t) => t.toLowerCase() === norm)
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function filterProducts(allProducts: Product[], filters: ProductFilters): Product[] {
  let result = [...allProducts];

  if (filters.category) {
    const cat = filters.category.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.categorySlug === cat ||
        p.departmentSlug === cat ||
        p.tags.includes(cat)
    );
  }

  if (filters.subcategory) {
    const sub = filters.subcategory.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.subcategoryId === sub ||
        p.subcategorySlug === sub ||
        p.tags.includes(sub) ||
        p.slug.includes(sub)
    );
  }

  if (filters.brand && filters.brand.length > 0) {
    result = result.filter((p) =>
      filters.brand!.some((b) => {
        const norm = b.toLowerCase();
        return (
          p.brand.toLowerCase().replace(/\s+/g, '-').includes(norm) ||
          p.brand.toLowerCase().includes(norm) ||
          p.tags.some((t) => t.toLowerCase() === norm)
        );
      })
    );
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }

  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }

  if (filters.inStock !== undefined) {
    result = result.filter((p) => p.inStock === filters.inStock);
  }

  if (filters.platform && filters.platform.length > 0) {
    result = result.filter((p) => p.platform && filters.platform!.includes(p.platform));
  }

  if (filters.condition && filters.condition.length > 0) {
    result = result.filter((p) => filters.condition!.includes(p.condition));
  }

  if (filters.featured) {
    result = result.filter((p) => p.featured);
  }

  if (filters.bestseller) {
    result = result.filter((p) => p.bestseller);
  }

  if (filters.isNew) {
    result = result.filter((p) => p.isNew);
  }

  if (filters.search) {
    const matched = searchProducts(filters.search);
    const matchedIds = new Set(matched.map((m) => m.id));
    result = result.filter((p) => matchedIds.has(p.id));
  }

  return result;
}

export function sortProducts(productList: Product[], sort: SortOption): Product[] {
  const sorted = [...productList];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'popularity':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'relevance':
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        if (a.bestseller !== b.bestseller) return b.bestseller ? 1 : -1;
        return b.reviewCount - a.reviewCount;
      });
  }
}

export function getAvailablePlatforms(): string[] {
  const platforms = new Set<string>();
  products.forEach((p) => {
    if (p.platform) platforms.add(p.platform);
  });
  return Array.from(platforms).sort();
}

export function getAvailableBrands(): string[] {
  const brandSet = new Set<string>();
  products.forEach((p) => brandSet.add(p.brand));
  return Array.from(brandSet).sort();
}

// Local storage hydration helper for custom products
export function registerCustomProduct(product: Product) {
  const existingIdx = products.findIndex((p) => p.id === product.id || p.slug === product.slug);
  if (existingIdx >= 0) {
    products[existingIdx] = product;
  } else {
    products.unshift(product);
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ng_custom_products');
      let customList: Product[] = stored ? JSON.parse(stored) : [];
      const idx = customList.findIndex((p) => p.id === product.id || p.slug === product.slug);
      if (idx >= 0) {
        customList[idx] = product;
      } else {
        customList.unshift(product);
      }
      localStorage.setItem('ng_custom_products', JSON.stringify(customList));
    } catch {
      // Ignore storage quota
    }
  }
}
