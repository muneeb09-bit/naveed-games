export interface DepartmentCategory {
  id: string;
  slug: string;
  name: string;
  subcategories: {
    id: string;
    slug: string;
    name: string;
  }[];
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  categories: DepartmentCategory[];
}

export const departments: Department[] = [
  {
    id: 'dept-gaming',
    slug: 'gaming',
    name: 'Gaming',
    description: 'PlayStation, Xbox, Nintendo, Handhelds, Games & Audio',
    icon: 'GameController',
    categories: [
      {
        id: 'cat-ps',
        slug: 'playstation',
        name: 'PlayStation',
        subcategories: [
          { id: 'sub-ps-consoles', slug: 'consoles', name: 'Consoles' },
          { id: 'sub-ps-games', slug: 'games', name: 'Games' },
          { id: 'sub-ps-controllers', slug: 'controllers', name: 'Controllers' },
          { id: 'sub-ps-accessories', slug: 'accessories', name: 'Accessories' },
          { id: 'sub-ps-special', slug: 'special-editions', name: 'Special Editions' },
        ],
      },
      {
        id: 'cat-xbox',
        slug: 'xbox',
        name: 'Xbox',
        subcategories: [
          { id: 'sub-xbox-consoles', slug: 'consoles', name: 'Consoles' },
          { id: 'sub-xbox-games', slug: 'games', name: 'Games' },
          { id: 'sub-xbox-controllers', slug: 'controllers', name: 'Controllers' },
          { id: 'sub-xbox-accessories', slug: 'accessories', name: 'Accessories' },
        ],
      },
      {
        id: 'cat-nintendo',
        slug: 'nintendo',
        name: 'Nintendo',
        subcategories: [
          { id: 'sub-nin-switch2', slug: 'switch-2', name: 'Switch 2' },
          { id: 'sub-nin-switch', slug: 'switch', name: 'Switch' },
          { id: 'sub-nin-lite', slug: 'switch-lite', name: 'Switch Lite' },
          { id: 'sub-nin-games', slug: 'games', name: 'Games' },
          { id: 'sub-nin-acc', slug: 'accessories', name: 'Accessories' },
        ],
      },
      {
        id: 'cat-handhelds',
        slug: 'handhelds',
        name: 'Handhelds',
        subcategories: [
          { id: 'sub-handheld-legion', slug: 'lenovo-legion-go', name: 'Lenovo Legion Go' },
          { id: 'sub-handheld-rog', slug: 'rog-ally', name: 'ROG Ally' },
          { id: 'sub-handheld-deck', slug: 'steam-deck', name: 'Steam Deck' },
        ],
      },
      {
        id: 'cat-games',
        slug: 'games',
        name: 'Games',
        subcategories: [
          { id: 'sub-g-ps5', slug: 'ps5-games', name: 'PS5 Games' },
          { id: 'sub-g-ps4', slug: 'ps4-games', name: 'PS4 Games' },
          { id: 'sub-g-xbox', slug: 'xbox-games', name: 'Xbox Games' },
          { id: 'sub-g-nintendo', slug: 'nintendo-games', name: 'Nintendo Games' },
        ],
      },
      {
        id: 'cat-controllers',
        slug: 'controllers',
        name: 'Controllers',
        subcategories: [
          { id: 'sub-c-dualsense', slug: 'dualsense', name: 'DualSense' },
          { id: 'sub-c-xbox', slug: 'xbox-controllers', name: 'Xbox Controllers' },
          { id: 'sub-c-scuf', slug: 'scuf', name: 'Scuf Controllers' },
          { id: 'sub-c-docks', slug: 'charging-docks', name: 'Charging Docks' },
        ],
      },
      {
        id: 'cat-vr',
        slug: 'vr',
        name: 'VR',
        subcategories: [
          { id: 'sub-vr-quest3', slug: 'meta-quest-3', name: 'Meta Quest 3' },
          { id: 'sub-vr-psvr2', slug: 'ps-vr2', name: 'PS VR2' },
        ],
      },
      {
        id: 'cat-audio',
        slug: 'audio',
        name: 'Audio',
        subcategories: [
          { id: 'sub-a-sony', slug: 'sony-audio', name: 'Sony' },
          { id: 'sub-a-turtle', slug: 'turtle-beach', name: 'Turtle Beach' },
          { id: 'sub-a-jbl', slug: 'jbl', name: 'JBL' },
          { id: 'sub-a-speakers', slug: 'speakers', name: 'Speakers' },
        ],
      },
    ],
  },
  {
    id: 'dept-drones',
    slug: 'drones-creator',
    name: 'Drones & Creator',
    description: 'DJI Mini, Air, Mavic, Osmo cameras, gimbals and vlogging gear',
    icon: 'Drone',
    categories: [
      {
        id: 'cat-dji',
        slug: 'dji-drones',
        name: 'DJI Drones',
        subcategories: [
          { id: 'sub-dji-mini', slug: 'dji-mini', name: 'DJI Mini' },
          { id: 'sub-dji-air', slug: 'dji-air', name: 'DJI Air' },
          { id: 'sub-dji-mavic', slug: 'dji-mavic', name: 'DJI Mavic' },
        ],
      },
      {
        id: 'cat-cameras',
        slug: 'cameras',
        name: 'Cameras',
        subcategories: [
          { id: 'sub-cam-osmo', slug: 'osmo-pocket', name: 'Osmo Pocket' },
          { id: 'sub-cam-action', slug: 'action-cameras', name: 'Action Cameras' },
        ],
      },
      {
        id: 'cat-gimbals',
        slug: 'gimbals',
        name: 'Gimbals',
        subcategories: [
          { id: 'sub-gimbal-mobile', slug: 'osmo-mobile', name: 'Osmo Mobile' },
        ],
      },
      {
        id: 'cat-vlogging',
        slug: 'vlogging-gear',
        name: 'Vlogging Gear',
        subcategories: [
          { id: 'sub-vlog-mics', slug: 'wireless-mics', name: 'Wireless Mics' },
          { id: 'sub-vlog-lights', slug: 'led-lights', name: 'LED Lights' },
        ],
      },
      {
        id: 'cat-drone-acc',
        slug: 'accessories',
        name: 'Accessories',
        subcategories: [
          { id: 'sub-d-batteries', slug: 'batteries', name: 'Batteries & Chargers' },
          { id: 'sub-d-cases', slug: 'cases', name: 'Carrying Cases' },
        ],
      },
    ],
  },
  {
    id: 'dept-smart-tech',
    slug: 'smart-tech',
    name: 'Smart Tech',
    description: 'VR Headsets, Ray-Ban Meta glasses, AI Robots, Phones & Laptops',
    icon: 'Robot',
    categories: [
      {
        id: 'cat-vr-headsets',
        slug: 'vr-headsets',
        name: 'VR Headsets',
        subcategories: [
          { id: 'sub-vr-quest-3', slug: 'meta-quest-3', name: 'Meta Quest 3' },
          { id: 'sub-vr-quest-3s', slug: 'meta-quest-3s', name: 'Meta Quest 3S' },
          { id: 'sub-vr-quest-2', slug: 'meta-quest-2', name: 'Meta Quest 2' },
          { id: 'sub-vr-psvr2', slug: 'ps-vr2', name: 'PS VR2' },
        ],
      },
      {
        id: 'cat-smart-glasses',
        slug: 'smart-glasses',
        name: 'Smart Glasses',
        subcategories: [
          { id: 'sub-sg-rayban', slug: 'ray-ban-meta', name: 'Ray-Ban Meta' },
        ],
      },
      {
        id: 'cat-ai-robots',
        slug: 'ai-robots',
        name: 'AI Robots',
        subcategories: [
          { id: 'sub-robot-emo', slug: 'emo', name: 'EMO' },
          { id: 'sub-robot-eilik', slug: 'eilik', name: 'Eilik' },
          { id: 'sub-robot-loona', slug: 'loona', name: 'Loona' },
        ],
      },
      {
        id: 'cat-phones',
        slug: 'phones',
        name: 'Phones',
        subcategories: [
          { id: 'sub-phone-samsung', slug: 'samsung-galaxy', name: 'Samsung Galaxy' },
          { id: 'sub-phone-huawei', slug: 'huawei', name: 'Huawei' },
        ],
      },
      {
        id: 'cat-laptops',
        slug: 'laptops',
        name: 'Laptops',
        subcategories: [
          { id: 'sub-lap-huawei', slug: 'huawei-matebook', name: 'Huawei MateBook' },
          { id: 'sub-lap-gaming', slug: 'gaming-laptops', name: 'Gaming Laptops' },
        ],
      },
    ],
  },
  {
    id: 'cat-racing-rc',
    slug: 'racing-rc',
    name: 'Racing & RC',
    description: 'Logitech, Thrustmaster, PXN wheels, seats, sim rigs and Traxxas RC cars',
    icon: 'SteeringWheel',
    categories: [
      {
        id: 'cat-wheels',
        slug: 'racing-wheels',
        name: 'Racing Wheels',
        subcategories: [
          { id: 'sub-w-logitech', slug: 'logitech', name: 'Logitech Wheels' },
          { id: 'sub-w-thrustmaster', slug: 'thrustmaster', name: 'Thrustmaster' },
          { id: 'sub-w-pxn', slug: 'pxn', name: 'PXN Wheels' },
        ],
      },
      {
        id: 'cat-seats',
        slug: 'racing-seats',
        name: 'Racing Seats',
        subcategories: [
          { id: 'sub-seat-playseat', slug: 'playseat', name: 'Playseat' },
        ],
      },
      {
        id: 'cat-sim-rigs',
        slug: 'sim-rigs',
        name: 'Sim Rigs',
        subcategories: [
          { id: 'sub-rig-cockpits', slug: 'cockpits', name: 'Cockpits' },
        ],
      },
      {
        id: 'cat-rc-cars',
        slug: 'rc-cars',
        name: 'RC Cars',
        subcategories: [
          { id: 'sub-rc-xrt', slug: 'traxxas-xrt', name: 'Traxxas XRT' },
          { id: 'sub-rc-xmaxx', slug: 'x-maxx', name: 'Traxxas X-Maxx' },
          { id: 'sub-rc-raptor', slug: 'raptor', name: 'Traxxas Raptor' },
          { id: 'sub-rc-rustler', slug: 'rustler', name: 'Traxxas Rustler' },
        ],
      },
    ],
  },
  {
    id: 'dept-used',
    slug: 'used',
    name: 'Used',
    description: 'Pre-owned consoles, disc exchange, used controllers and open box gear',
    icon: 'Recycle',
    categories: [
      {
        id: 'cat-used-consoles',
        slug: 'used-consoles',
        name: 'Used Consoles',
        subcategories: [
          { id: 'sub-uc-ps5', slug: 'used-ps5', name: 'Pre-Owned PS5' },
          { id: 'sub-uc-xbox', slug: 'used-xbox', name: 'Pre-Owned Xbox' },
          { id: 'sub-uc-switch', slug: 'used-switch', name: 'Pre-Owned Switch' },
        ],
      },
      {
        id: 'cat-used-games',
        slug: 'used-games',
        name: 'Used Games',
        subcategories: [
          { id: 'sub-ug-ps5', slug: 'ps5-disc-exchange', name: 'PS5 Disc Exchange' },
          { id: 'sub-ug-preowned', slug: 'pre-owned-games', name: 'Pre-Owned Games' },
        ],
      },
      {
        id: 'cat-used-controllers',
        slug: 'used-controllers',
        name: 'Used Controllers',
        subcategories: [
          { id: 'sub-uctrl-dualsense', slug: 'used-dualsense', name: 'Used DualSense' },
        ],
      },
      {
        id: 'cat-open-box',
        slug: 'open-box',
        name: 'Open Box & Refurbished',
        subcategories: [
          { id: 'sub-ob-gear', slug: 'open-box-gear', name: 'Open Box Gear' },
        ],
      },
    ],
  },
];
