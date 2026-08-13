import { departments, Department, DepartmentCategory } from '@/data/departments';
import { brands } from '@/data/brands';
import type { Brand } from '@/types';

export interface UnifiedTaxonomyItem {
  type: 'department' | 'category' | 'subcategory' | 'brand';
  name: string;
  slug: string;
  description: string;
  departmentSlug?: string;
  departmentName?: string;
  categorySlug?: string;
  categoryName?: string;
  icon?: string;
  subcategories?: { id: string; slug: string; name: string }[];
}

// Aliases mapping old or alternative slugs to canonical department/category slugs
export const TAXONOMY_ALIASES: Record<string, { categorySlug: string; subcategorySlug?: string }> = {
  // Legacy category slugs -> canonical slugs
  'consoles': { categorySlug: 'playstation' },
  'playstation-5': { categorySlug: 'playstation', subcategorySlug: 'consoles' },
  'ps5': { categorySlug: 'playstation', subcategorySlug: 'consoles' },
  'ps4': { categorySlug: 'playstation', subcategorySlug: 'consoles' },
  'xbox-series': { categorySlug: 'xbox', subcategorySlug: 'consoles' },
  'nintendo-switch': { categorySlug: 'nintendo', subcategorySlug: 'switch' },
  'vr-ar': { categorySlug: 'vr-headsets' },
  'drones-cameras': { categorySlug: 'dji-drones' },
  'racing-simulators': { categorySlug: 'racing-wheels' },
  'gaming-pcs': { categorySlug: 'handhelds' },
  'tvs-displays': { categorySlug: 'audio' },
  'smart-ai-tech': { categorySlug: 'ai-robots' },
  'gaming-furniture': { categorySlug: 'racing-seats' },
  'collectibles': { categorySlug: 'games' },
  'drones': { categorySlug: 'dji-drones' },
  'sim-rigs': { categorySlug: 'sim-rigs' },
  'wheels': { categorySlug: 'racing-wheels' },
};

/**
 * Resolves any slug (department, category, or alias) into a structured taxonomy entity
 */
export function resolveTaxonomySlug(slug: string): UnifiedTaxonomyItem | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();

  // 1. Check if it's a Department
  const dept = departments.find((d) => d.slug === normalized);
  if (dept) {
    return {
      type: 'department',
      name: dept.name,
      slug: dept.slug,
      description: dept.description,
      icon: dept.icon,
      subcategories: dept.categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
    };
  }

  // 2. Check if it's an Alias
  const alias = TAXONOMY_ALIASES[normalized];
  const targetCategorySlug = alias ? alias.categorySlug : normalized;

  // 3. Search across all Department Categories
  for (const d of departments) {
    const cat = d.categories.find((c) => c.slug === targetCategorySlug);
    if (cat) {
      return {
        type: 'category',
        name: cat.name,
        slug: cat.slug,
        description: `${cat.name} hardware, games, and accessories in ${d.name}`,
        departmentSlug: d.slug,
        departmentName: d.name,
        subcategories: cat.subcategories,
      };
    }
  }

  // 4. Check if it's a Brand
  const brand = brands.find((b) => b.slug === normalized);
  if (brand) {
    return {
      type: 'brand',
      name: brand.name,
      slug: brand.slug,
      description: brand.description || `Official ${brand.name} products at Naveed Games.`,
    };
  }

  return null;
}

/**
 * Returns all valid static routes for /shop/[category]
 */
export function getAllShopSlugs(): string[] {
  const slugs = new Set<string>();

  // Add all department slugs
  departments.forEach((d) => {
    slugs.add(d.slug);
    d.categories.forEach((c) => {
      slugs.add(c.slug);
    });
  });

  // Add all legacy alias slugs
  Object.keys(TAXONOMY_ALIASES).forEach((alias) => slugs.add(alias));

  return Array.from(slugs);
}

/**
 * Resolves subcategory metadata inside a category
 */
export function resolveSubcategory(categorySlug: string, subcategorySlug: string) {
  const catItem = resolveTaxonomySlug(categorySlug);
  if (!catItem || !catItem.subcategories) return null;

  const sub = catItem.subcategories.find((s) => s.slug === subcategorySlug);
  if (!sub) return null;

  return {
    ...sub,
    categoryName: catItem.name,
    categorySlug: catItem.slug,
    departmentSlug: catItem.departmentSlug,
  };
}
