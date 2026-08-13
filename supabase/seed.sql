-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- NAVEED GAMES — Seed SQL
-- Pre-populates 13 categories, subcategories, 11 brands, and sample products
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ─── INSERT BRANDS ───
INSERT INTO public.brands (slug, name, description, logo, sort_order) VALUES
('playstation', 'PlayStation', 'Sony Interactive Entertainment gaming brand. Home to PS5, DualSense, and exclusive titles.', NULL, 1),
('xbox', 'Xbox', 'Microsoft gaming brand. Xbox Series X|S, Game Pass, and cross-platform gaming.', NULL, 2),
('nintendo', 'Nintendo', 'Iconic Japanese gaming company. Switch, Mario, Zelda, and handheld gaming innovation.', NULL, 3),
('dji', 'DJI', 'World leader in camera drones and handheld stabilizers. Mini, Air, Mavic, Osmo.', NULL, 4),
('meta', 'Meta', 'Mixed reality and VR headsets. Quest 3, Ray-Ban smart glasses, and AI wearables.', NULL, 5),
('traxxas', 'Traxxas', 'Premium RC vehicles. X-Maxx, XRT, Rustler, and high-performance hobby-grade cars.', NULL, 6),
('logitech', 'Logitech', 'Gaming peripherals, racing wheels, and accessories. G923, G Pro, and StreamCam.', NULL, 7),
('thrustmaster', 'Thrustmaster', 'Professional racing simulation hardware. T300, T-GT, and flight sticks.', NULL, 8),
('sony', 'Sony', 'Electronics giant. Audio, displays, cameras, and PlayStation ecosystem.', NULL, 9),
('turtle-beach', 'Turtle Beach', 'Gaming audio specialists. Stealth, Recon, and wireless gaming headsets.', NULL, 10),
('samsung', 'Samsung', 'Global electronics leader. QLED/OLED TVs, monitors, smartphones, and Galaxy ecosystem.', NULL, 11)
ON CONFLICT (slug) DO NOTHING;

-- ─── INSERT PARENT CATEGORIES ───
INSERT INTO public.categories (slug, name, description, icon, sort_order) VALUES
('consoles', 'Consoles', 'PS5, Xbox Series X/S, Nintendo Switch 2, and more', 'GameController', 1),
('games', 'Games', 'PS5, PS4, Xbox, Nintendo Switch — new, pre-owned, and disc exchange', 'Disc', 2),
('controllers', 'Controllers', 'DualSense, Xbox, Scuf, limited edition controllers, charging docks', 'GameController', 3),
('vr-ar', 'VR & AR', 'Meta Quest, PS VR2, mixed reality headsets and accessories', 'VirtualReality', 4),
('drones-cameras', 'Drones & Cameras', 'DJI Mini, Air, Mavic, Osmo, cameras, and accessories', 'Drone', 5),
('racing-simulators', 'Racing Simulators', 'Logitech, Thrustmaster, PXN wheels, seats, and sim accessories', 'SteeringWheel', 6),
('rc-cars', 'RC Cars', 'Traxxas XRT, X-Maxx, Raptor, Rustler, hobby-grade RC vehicles', 'Car', 7),
('gaming-pcs', 'Gaming PCs', 'Custom gaming PCs, laptops, Lenovo Legion Go, ROG Ally, Steam Deck', 'Desktop', 8),
('audio', 'Audio', 'Sony, Turtle Beach, JBL headsets, soundbars, speakers, and gaming audio', 'Headphones', 9),
('tvs-displays', 'TVs & Displays', 'QLED, OLED TVs, gaming monitors, and smart displays', 'Monitor', 10),
('smart-ai-tech', 'Smart AI Tech', 'Ray-Ban Meta, EMO, Loona, AI robots, and smart devices', 'Robot', 11),
('gaming-furniture', 'Gaming Furniture', 'Gaming chairs, racing seats, and gaming desks', 'Armchair', 12),
('collectibles', 'Collectibles', 'Merchandise, statues, limited editions, and special editions', 'Trophy', 13)
ON CONFLICT (slug) DO NOTHING;

-- ─── INSERT SUBCATEGORIES ───
-- Consoles subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('ps5-pro', 'PS5 Pro', 'PlayStation 5 Pro consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 1),
('ps5-slim', 'PS5 Slim', 'PlayStation 5 Slim consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 2),
('ps5-digital', 'PS5 Digital', 'PlayStation 5 Digital Edition', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 3),
('xbox-series-x', 'Xbox Series X', 'Xbox Series X consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 4),
('xbox-series-s', 'Xbox Series S', 'Xbox Series S consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 5),
('nintendo-switch-2', 'Nintendo Switch 2', 'Nintendo Switch 2 consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 6),
('nintendo-switch-oled', 'Nintendo Switch OLED', 'Nintendo Switch OLED Model', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 7),
('nintendo-switch-lite', 'Nintendo Switch Lite', 'Nintendo Switch Lite', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 8),
('playstation-4', 'PlayStation 4', 'PS4 consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 9),
('playstation-3', 'PlayStation 3', 'PS3 consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 10),
('xbox-one', 'Xbox One', 'Xbox One consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 11),
('xbox-360', 'Xbox 360', 'Xbox 360 consoles', 'GameController', (SELECT id FROM public.categories WHERE slug = 'consoles'), 12)
ON CONFLICT (slug) DO NOTHING;

-- Games subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('ps5-games', 'PS5 Games', 'PlayStation 5 games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 1),
('ps4-games', 'PS4 Games', 'PlayStation 4 games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 2),
('ps3-games', 'PS3 Games', 'PlayStation 3 games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 3),
('xbox-games', 'Xbox Games', 'Xbox Series X|S games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 4),
('nintendo-games', 'Nintendo Games', 'Nintendo Switch games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 5),
('switch-2-games', 'Switch 2 Games', 'Nintendo Switch 2 games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 6),
('pre-owned-games', 'Pre-Owned Games', 'Pre-owned and used games', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 7),
('disc-exchange', 'Disc Exchange', 'Trade and exchange game discs', 'Disc', (SELECT id FROM public.categories WHERE slug = 'games'), 8)
ON CONFLICT (slug) DO NOTHING;

-- Controllers subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('dualsense-controllers', 'DualSense Controllers', 'PS5 DualSense and DualSense Edge controllers', 'GameController', (SELECT id FROM public.categories WHERE slug = 'controllers'), 1),
('xbox-controllers', 'Xbox Controllers', 'Xbox wireless controllers', 'GameController', (SELECT id FROM public.categories WHERE slug = 'controllers'), 2),
('scuf-controllers', 'Scuf Controllers', 'Scuf pro gaming controllers', 'GameController', (SELECT id FROM public.categories WHERE slug = 'controllers'), 3),
('limited-edition-controllers', 'Limited Edition Controllers', 'Special and limited edition controllers', 'GameController', (SELECT id FROM public.categories WHERE slug = 'controllers'), 4),
('charging-docks', 'Charging Docks', 'Controller charging docks and stations', 'GameController', (SELECT id FROM public.categories WHERE slug = 'controllers'), 5),
('controller-accessories', 'Accessories', 'Controller accessories and add-ons', 'GameController', (SELECT id FROM public.categories WHERE slug = 'controllers'), 6)
ON CONFLICT (slug) DO NOTHING;

-- Drones & Cameras subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('dji-mini', 'DJI Mini', 'DJI Mini series drones', 'Drone', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 1),
('dji-air', 'DJI Air', 'DJI Air series drones', 'Drone', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 2),
('dji-mavic', 'DJI Mavic', 'DJI Mavic series drones', 'Drone', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 3),
('osmo-pocket', 'Osmo Pocket', 'DJI Osmo Pocket cameras', 'Camera', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 4),
('osmo-mobile', 'Osmo Mobile', 'DJI Osmo Mobile gimbals', 'Camera', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 5),
('cameras', 'Cameras', 'Action cameras and compact cameras', 'Camera', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 6),
('camera-accessories', 'Camera Accessories', 'Lenses, mounts, bags, and camera accessories', 'Camera', (SELECT id FROM public.categories WHERE slug = 'drones-cameras'), 7)
ON CONFLICT (slug) DO NOTHING;

-- Smart AI Tech subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('ray-ban-meta', 'Ray-Ban Meta', 'Ray-Ban Meta smart glasses', 'Glasses', (SELECT id FROM public.categories WHERE slug = 'smart-ai-tech'), 1),
('meta-glasses', 'Meta Glasses', 'Meta smart glasses range', 'Glasses', (SELECT id FROM public.categories WHERE slug = 'smart-ai-tech'), 2),
('emo-robot', 'EMO', 'EMO AI desktop robot', 'Robot', (SELECT id FROM public.categories WHERE slug = 'smart-ai-tech'), 3),
('loona-robot', 'Loona', 'Loona AI pet robot', 'Robot', (SELECT id FROM public.categories WHERE slug = 'smart-ai-tech'), 4),
('ai-robots', 'AI Robots', 'AI-powered robots and companions', 'Robot', (SELECT id FROM public.categories WHERE slug = 'smart-ai-tech'), 5),
('smart-devices', 'Smart Devices', 'Smart home and connected devices', 'Robot', (SELECT id FROM public.categories WHERE slug = 'smart-ai-tech'), 6)
ON CONFLICT (slug) DO NOTHING;

-- VR & AR subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('meta-quest-3', 'Meta Quest 3', 'Meta Quest 3 VR headsets', 'VirtualReality', (SELECT id FROM public.categories WHERE slug = 'vr-ar'), 1),
('meta-quest-3s', 'Meta Quest 3S', 'Meta Quest 3S VR headsets', 'VirtualReality', (SELECT id FROM public.categories WHERE slug = 'vr-ar'), 2),
('meta-quest-2', 'Meta Quest 2', 'Meta Quest 2 VR headsets', 'VirtualReality', (SELECT id FROM public.categories WHERE slug = 'vr-ar'), 3),
('ps-vr2', 'PS VR2', 'PlayStation VR2 headsets', 'VirtualReality', (SELECT id FROM public.categories WHERE slug = 'vr-ar'), 4),
('ps-vr', 'PS VR', 'PlayStation VR headsets', 'VirtualReality', (SELECT id FROM public.categories WHERE slug = 'vr-ar'), 5)
ON CONFLICT (slug) DO NOTHING;

-- Gaming PCs subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('gaming-pcs-desktop', 'Gaming PCs', 'Custom and pre-built gaming PCs', 'Desktop', (SELECT id FROM public.categories WHERE slug = 'gaming-pcs'), 1),
('gaming-laptops', 'Gaming Laptops', 'Gaming laptops from top brands', 'Laptop', (SELECT id FROM public.categories WHERE slug = 'gaming-pcs'), 2),
('lenovo-legion-go', 'Lenovo Legion Go', 'Lenovo Legion Go handhelds', 'DeviceMobile', (SELECT id FROM public.categories WHERE slug = 'gaming-pcs'), 3),
('rog-ally', 'ROG Ally', 'ASUS ROG Ally handhelds', 'DeviceMobile', (SELECT id FROM public.categories WHERE slug = 'gaming-pcs'), 4),
('steam-deck', 'Steam Deck', 'Valve Steam Deck handhelds', 'DeviceMobile', (SELECT id FROM public.categories WHERE slug = 'gaming-pcs'), 5),
('huawei-matebook', 'Huawei MateBook', 'Huawei MateBook laptops', 'Laptop', (SELECT id FROM public.categories WHERE slug = 'gaming-pcs'), 6)
ON CONFLICT (slug) DO NOTHING;

-- Racing Simulators subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('logitech-racing', 'Logitech', 'Logitech racing wheels and sets', 'SteeringWheel', (SELECT id FROM public.categories WHERE slug = 'racing-simulators'), 1),
('thrustmaster-racing', 'Thrustmaster', 'Thrustmaster racing wheels and sets', 'SteeringWheel', (SELECT id FROM public.categories WHERE slug = 'racing-simulators'), 2),
('pxn-racing', 'PXN', 'PXN racing wheels and accessories', 'SteeringWheel', (SELECT id FROM public.categories WHERE slug = 'racing-simulators'), 3),
('racing-seats', 'Racing Seats', 'Racing simulation seats and cockpits', 'Armchair', (SELECT id FROM public.categories WHERE slug = 'racing-simulators'), 4),
('sim-accessories', 'Sim Accessories', 'Shifters, handbrakes, and sim accessories', 'SteeringWheel', (SELECT id FROM public.categories WHERE slug = 'racing-simulators'), 5)
ON CONFLICT (slug) DO NOTHING;

-- RC Cars subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('traxxas-xrt', 'Traxxas XRT', 'Traxxas XRT 1/5 scale RC trucks', 'Car', (SELECT id FROM public.categories WHERE slug = 'rc-cars'), 1),
('traxxas-x-maxx', 'X-Maxx', 'Traxxas X-Maxx monster trucks', 'Car', (SELECT id FROM public.categories WHERE slug = 'rc-cars'), 2),
('traxxas-raptor', 'Raptor', 'Traxxas Raptor RC vehicles', 'Car', (SELECT id FROM public.categories WHERE slug = 'rc-cars'), 3),
('traxxas-rustler', 'Rustler', 'Traxxas Rustler stadium trucks', 'Car', (SELECT id FROM public.categories WHERE slug = 'rc-cars'), 4),
('rc-accessories', 'RC Accessories', 'Batteries, chargers, and RC accessories', 'Car', (SELECT id FROM public.categories WHERE slug = 'rc-cars'), 5)
ON CONFLICT (slug) DO NOTHING;

-- Audio subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('sony-audio', 'Sony', 'Sony headphones, earbuds, and audio', 'Headphones', (SELECT id FROM public.categories WHERE slug = 'audio'), 1),
('turtle-beach-audio', 'Turtle Beach', 'Turtle Beach gaming headsets', 'Headphones', (SELECT id FROM public.categories WHERE slug = 'audio'), 2),
('jbl-audio', 'JBL', 'JBL speakers and headphones', 'Headphones', (SELECT id FROM public.categories WHERE slug = 'audio'), 3),
('soundbars', 'Soundbars', 'Soundbars and home audio', 'SpeakerHigh', (SELECT id FROM public.categories WHERE slug = 'audio'), 4),
('speakers', 'Speakers', 'Bluetooth and wireless speakers', 'SpeakerHigh', (SELECT id FROM public.categories WHERE slug = 'audio'), 5),
('gaming-audio', 'Gaming Audio', 'Gaming headsets and audio accessories', 'Headphones', (SELECT id FROM public.categories WHERE slug = 'audio'), 6)
ON CONFLICT (slug) DO NOTHING;

-- TVs & Displays subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('qled-tvs', 'QLED TVs', 'Samsung and LG QLED televisions', 'Monitor', (SELECT id FROM public.categories WHERE slug = 'tvs-displays'), 1),
('oled-tvs', 'OLED TVs', 'OLED televisions', 'Monitor', (SELECT id FROM public.categories WHERE slug = 'tvs-displays'), 2),
('gaming-monitors', 'Gaming Monitors', 'High refresh rate gaming monitors', 'Monitor', (SELECT id FROM public.categories WHERE slug = 'tvs-displays'), 3),
('smart-displays', 'Smart Displays', 'Smart displays and digital frames', 'Monitor', (SELECT id FROM public.categories WHERE slug = 'tvs-displays'), 4)
ON CONFLICT (slug) DO NOTHING;

-- Gaming Furniture subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('gaming-chairs', 'Gaming Chairs', 'Ergonomic and racing gaming chairs', 'Armchair', (SELECT id FROM public.categories WHERE slug = 'gaming-furniture'), 1),
('gaming-racing-seats', 'Racing Seats', 'Racing simulation seats and cockpits', 'Armchair', (SELECT id FROM public.categories WHERE slug = 'gaming-furniture'), 2),
('gaming-desks', 'Gaming Desks', 'Gaming desks and desk setups', 'Armchair', (SELECT id FROM public.categories WHERE slug = 'gaming-furniture'), 3)
ON CONFLICT (slug) DO NOTHING;

-- Collectibles subcategories
INSERT INTO public.categories (slug, name, description, icon, parent_id, sort_order) VALUES
('merchandise', 'Merchandise', 'Gaming merchandise and apparel', 'Trophy', (SELECT id FROM public.categories WHERE slug = 'collectibles'), 1),
('statues', 'Statues', 'Premium collectible statues and figures', 'Trophy', (SELECT id FROM public.categories WHERE slug = 'collectibles'), 2),
('limited-editions', 'Limited Editions', 'Limited edition collectibles', 'Trophy', (SELECT id FROM public.categories WHERE slug = 'collectibles'), 3),
('special-editions', 'Special Editions', 'Special edition game bundles and collectors items', 'Trophy', (SELECT id FROM public.categories WHERE slug = 'collectibles'), 4)
ON CONFLICT (slug) DO NOTHING;

-- ─── INSERT SAMPLE PRODUCTS ───
INSERT INTO public.products (
  slug, name, brand_name, category_slug, price, original_price, discount, description, short_description,
  rating, review_count, in_stock, stock_quantity, sku, featured, bestseller, is_new, condition, platform, specs, tags, warranty, status
) VALUES
(
  'ps5-pro', 'PlayStation 5 Pro', 'Sony', 'consoles', 249999, NULL, 0,
  'The most powerful PlayStation ever. Enhanced GPU with 67% more Compute Units, advanced ray tracing, AI-driven upscaling and 2TB SSD.',
  'The most powerful PlayStation ever built.', 4.8, 124, true, 8, 'NG-PS5PRO-001', true, true, true, 'new', 'PS5',
  '[{"label":"CPU","value":"AMD Zen 2 8-core"},{"label":"Storage","value":"2TB SSD"}]'::jsonb,
  ARRAY['ps5','sony','console'], '1 Year Official Warranty', 'published'
),
(
  'ps5-slim-disc', 'PlayStation 5 Slim (Disc Edition)', 'Sony', 'consoles', 174999, 189999, 8,
  'A slimmer, sleeker PS5 with a disc drive. 1TB SSD, 30% smaller design.',
  'Slimmer PS5 with disc drive and 1TB storage.', 4.7, 89, true, 12, 'NG-PS5SL-002', true, true, false, 'new', 'PS5',
  '[{"label":"Storage","value":"1TB SSD"}]'::jsonb,
  ARRAY['ps5','sony'], '1 Year Official Warranty', 'published'
),
(
  'xbox-series-x', 'Xbox Series X', 'Microsoft', 'consoles', 164999, NULL, 0,
  'The fastest, most powerful Xbox ever. 12 TFLOPS of processing power, true 4K gaming, 1TB SSD.',
  'The most powerful Xbox ever made.', 4.6, 67, true, 6, 'NG-XBXX-003', false, false, false, 'new', 'Xbox',
  '[{"label":"GPU","value":"12 TFLOPS RDNA 2"}]'::jsonb,
  ARRAY['xbox','microsoft'], '1 Year Official Warranty', 'published'
),
(
  'nintendo-switch-oled', 'Nintendo Switch OLED Model', 'Nintendo', 'consoles', 89999, 94999, 5,
  'Vibrant 7-inch OLED screen, wide adjustable stand, enhanced audio and 64GB storage.',
  'Switch with vibrant 7-inch OLED screen.', 4.9, 156, true, 15, 'NG-NSOLED-004', true, true, false, 'new', 'Nintendo Switch',
  '[{"label":"Screen","value":"7-inch OLED"}]'::jsonb,
  ARRAY['nintendo','switch'], '1 Year Official Warranty', 'published'
),
(
  'naveed-rtx-4070-build', 'NG Custom Build — RTX 4070 Super', 'Naveed Games', 'gaming-pcs', 389999, NULL, 0,
  'Custom-built gaming PC by Naveed Games. Ryzen 7 7800X3D, RTX 4070 Super 12GB, 32GB DDR5 RAM, 1TB NVMe SSD.',
  'Custom RTX 4070 Super gaming rig built in-house.', 4.9, 34, true, 3, 'NG-CPCB-005', true, true, true, 'new', 'PC',
  '[{"label":"CPU","value":"Ryzen 7 7800X3D"},{"label":"GPU","value":"RTX 4070 Super 12GB"}]'::jsonb,
  ARRAY['gaming-pc','custom-build'], '2 Year Naveed Games Warranty', 'published'
),
(
  'steam-deck-oled-512gb', 'Steam Deck OLED 512GB', 'Valve', 'gaming-pcs', 149999, NULL, 0,
  'HDR OLED display, 50% bigger battery, faster Wi-Fi 6E, lighter weight.',
  '7.4" OLED display. Your Steam library, anywhere.', 4.8, 78, true, 6, 'NG-SDOL-009', true, true, false, 'new', 'PC',
  '[{"label":"Display","value":"7.4 inch HDR OLED"}]'::jsonb,
  ARRAY['steam-deck','handheld'], '1 Year Warranty', 'published'
),
(
  'gta-vi-ps5', 'Grand Theft Auto VI', 'Rockstar Games', 'games', 19999, NULL, 0,
  'The most anticipated game of the decade. Vice City in massive open-world scale.',
  'The most anticipated game ever. PS5.', 4.9, 312, true, 25, 'NG-GTAVI-012', true, true, true, 'new', 'PS5',
  '[{"label":"Platform","value":"PS5"}]'::jsonb,
  ARRAY['gta','rockstar','ps5'], 'Official Disc', 'published'
)
ON CONFLICT (slug) DO NOTHING;
