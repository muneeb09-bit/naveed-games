-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- NAVEED GAMES — Seed SQL
-- Pre-populates all 11 categories and 22 gaming products
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Insert Categories
INSERT INTO public.categories (slug, name, description, icon) VALUES
('consoles', 'Consoles', 'PS5, Xbox Series X/S, Nintendo Switch OLED and more', 'GameController'),
('gaming-pcs', 'Gaming PCs', 'Custom builds, liquid cooled systems, RTX-powered rigs', 'Desktop'),
('racing-simulators', 'Racing', 'Steering wheels, pedals, racing rigs and simulators', 'SteeringWheel'),
('handhelds-vr', 'Handhelds & VR', 'Steam Deck, ROG Ally, Meta Quest and portable gaming', 'DeviceMobile'),
('games', 'Games', 'PS5, PS4, Nintendo Switch titles', 'Disc'),
('monitors', 'Monitors', '4K, high refresh rate, OLED displays', 'Monitor'),
('audio', 'Audio', 'Gaming headsets, wireless audio, speakers', 'Headphones'),
('chairs-setup', 'Chairs & Setup', 'Gaming chairs, desks and setup accessories', 'Armchair'),
('collectibles', 'Collectibles', 'Action figures, statues, limited editions', 'Trophy'),
('rc-drones', 'RC & Drones', 'Remote control vehicles and camera drones', 'Drone'),
('smart-tech', 'Smart Tech', 'Smart watches and connected devices', 'Watch')
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO public.products (
  slug, name, brand_name, category_slug, price, original_price, discount, description, short_description,
  rating, review_count, in_stock, stock_quantity, sku, featured, bestseller, is_new, specs, tags, warranty, status
) VALUES
(
  'ps5-pro', 'PlayStation 5 Pro', 'Sony', 'consoles', 249999, NULL, 0,
  'The most powerful PlayStation ever. Enhanced GPU with 67% more Compute Units, advanced ray tracing, AI-driven upscaling and 2TB SSD.',
  'The most powerful PlayStation ever built.', 4.8, 124, true, 8, 'NG-PS5PRO-001', true, true, true,
  '[{"label":"CPU","value":"AMD Zen 2 8-core"},{"label":"Storage","value":"2TB SSD"}]'::jsonb,
  ARRAY['ps5','sony','console'], '1 Year Official Warranty', 'published'
),
(
  'ps5-slim-disc', 'PlayStation 5 Slim (Disc Edition)', 'Sony', 'consoles', 174999, 189999, 8,
  'A slimmer, sleeker PS5 with a disc drive. 1TB SSD, 30% smaller design.',
  'Slimmer PS5 with disc drive and 1TB storage.', 4.7, 89, true, 12, 'NG-PS5SL-002', true, true, false,
  '[{"label":"Storage","value":"1TB SSD"}]'::jsonb,
  ARRAY['ps5','sony'], '1 Year Official Warranty', 'published'
),
(
  'xbox-series-x', 'Xbox Series X', 'Microsoft', 'consoles', 164999, NULL, 0,
  'The fastest, most powerful Xbox ever. 12 TFLOPS of processing power, true 4K gaming, 1TB SSD.',
  'The most powerful Xbox ever made.', 4.6, 67, true, 6, 'NG-XBXX-003', false, false, false,
  '[{"label":"GPU","value":"12 TFLOPS RDNA 2"}]'::jsonb,
  ARRAY['xbox','microsoft'], '1 Year Official Warranty', 'published'
),
(
  'nintendo-switch-oled', 'Nintendo Switch OLED Model', 'Nintendo', 'consoles', 89999, 94999, 5,
  'Vibrant 7-inch OLED screen, wide adjustable stand, enhanced audio and 64GB storage.',
  'Switch with vibrant 7-inch OLED screen.', 4.9, 156, true, 15, 'NG-NSOLED-004', true, true, false,
  '[{"label":"Screen","value":"7-inch OLED"}]'::jsonb,
  ARRAY['nintendo','switch'], '1 Year Official Warranty', 'published'
),
(
  'naveed-rtx-4070-build', 'NG Custom Build — RTX 4070 Super', 'Naveed Games', 'gaming-pcs', 389999, NULL, 0,
  'Custom-built gaming PC by Naveed Games. Ryzen 7 7800X3D, RTX 4070 Super 12GB, 32GB DDR5 RAM, 1TB NVMe SSD.',
  'Custom RTX 4070 Super gaming rig built in-house.', 4.9, 34, true, 3, 'NG-CPCB-005', true, true, true,
  '[{"label":"CPU","value":"Ryzen 7 7800X3D"},{"label":"GPU","value":"RTX 4070 Super 12GB"}]'::jsonb,
  ARRAY['gaming-pc','custom-build'], '2 Year Naveed Games Warranty', 'published'
),
(
  'steam-deck-oled-512gb', 'Steam Deck OLED 512GB', 'Valve', 'handhelds-vr', 149999, NULL, 0,
  'HDR OLED display, 50% bigger battery, faster Wi-Fi 6E, lighter weight.',
  '7.4" OLED display. Your Steam library, anywhere.', 4.8, 78, true, 6, 'NG-SDOL-009', true, true, false,
  '[{"label":"Display","value":"7.4 inch HDR OLED"}]'::jsonb,
  ARRAY['steam-deck','handheld'], '1 Year Warranty', 'published'
),
(
  'gta-vi-ps5', 'Grand Theft Auto VI', 'Rockstar Games', 'games', 19999, NULL, 0,
  'The most anticipated game of the decade. Vice City in massive open-world scale.',
  'The most anticipated game ever. PS5.', 4.9, 312, true, 25, 'NG-GTAVI-012', true, true, true,
  '[{"label":"Platform","value":"PS5"}]'::jsonb,
  ARRAY['gta','rockstar','ps5'], 'Official Disc', 'published'
)
ON CONFLICT (slug) DO NOTHING;
