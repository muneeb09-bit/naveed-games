-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- NAVEED GAMES — Production Supabase Schema
-- Relational database design for multi-category gaming, drones, smart tech & RC
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUMS ───
CREATE TYPE user_role AS ENUM ('customer', 'admin');
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cod', 'bank_transfer', 'easypaisa', 'jazzcash');
CREATE TYPE product_condition AS ENUM ('new', 'used', 'refurbished', 'pre-owned');

-- ─── 1. PROFILES ───
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 2. BRANDS ───
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 3. CATEGORIES ───
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  icon TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 4. PRODUCTS ───
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  department_name TEXT DEFAULT 'Gaming',
  department_slug TEXT DEFAULT 'gaming',
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  subcategory_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  subcategory_slug TEXT,
  price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2),
  sale_price DECIMAL(12, 2),
  cost_price DECIMAL(12, 2),
  discount INT DEFAULT 0,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  rating DECIMAL(3, 2) DEFAULT 5.00,
  review_count INT DEFAULT 0,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  stock_quantity INT NOT NULL DEFAULT 0,
  sku TEXT UNIQUE NOT NULL,
  featured BOOLEAN DEFAULT false,
  bestseller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  condition product_condition NOT NULL DEFAULT 'new',
  platform TEXT,
  release_year INT,
  specs JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  warranty TEXT,
  delivery_info TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status product_status NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 5. PRODUCT VARIANTS ───
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  variant_type TEXT NOT NULL, -- e.g. 'color', 'storage', 'edition'
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 6. ORDERS ───
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  notes TEXT,
  subtotal DECIMAL(12, 2) NOT NULL,
  delivery_fee DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  payment_method payment_method NOT NULL DEFAULT 'cod',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 7. ORDER ITEMS ───
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  price DECIMAL(12, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  variants JSONB DEFAULT '{}'::jsonb
);

-- ─── 8. REVIEWS ───
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INDEXES FOR FAST READS ───
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_dept ON public.products(department_slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_bestseller ON public.products(bestseller) WHERE bestseller = true;
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON public.products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_platform ON public.products(platform);
CREATE INDEX IF NOT EXISTS idx_products_condition ON public.products(condition);
CREATE INDEX IF NOT EXISTS idx_categories_sort ON public.categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_brands_sort ON public.brands(sort_order);
CREATE INDEX IF NOT EXISTS idx_brands_active ON public.brands(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- ─── ROW LEVEL SECURITY (RLS) POLICIES ───
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Categories & Brands Policies (Public read, Admin write)
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin write categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Admin write brands" ON public.brands FOR ALL USING (public.is_admin());

-- Products Policies (Public can read 'published' products; Admin full access)
CREATE POLICY "Public read published products" ON public.products
  FOR SELECT USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin full products access" ON public.products
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Admin write product variants" ON public.product_variants FOR ALL USING (public.is_admin());

-- Orders Policies (Public can insert orders; Admin full access; Customers can view own orders)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers view own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id OR public.is_admin());
CREATE POLICY "Admin full orders access" ON public.orders FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view order items" ON public.order_items FOR SELECT USING (public.is_admin());

-- Profiles Policies
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reviews Policies
CREATE POLICY "Public read approved reviews" ON public.reviews FOR SELECT USING (is_approved = true OR public.is_admin());
CREATE POLICY "Authenticated users write reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
