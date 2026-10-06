import { slugify } from '@/lib/utils';

export type ColorOption = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  collection: string;
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  images: number[]; // pexels photo ids
  tags: string[];
  sku: string;
  features: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
};

export const CATEGORIES = [
  'Handbags',
  'Shoulder Bags',
  'Crossbody Bags',
  'Clutches',
  'Backpacks',
  'Tote Bags',
  'Travel Bags',
  'Accessories',
] as const;

export const COLLECTIONS = [
  'Signature',
  'Urban',
  'Evening',
  'Travel',
  'Heritage',
] as const;

export const COLOR_SWATCHES: Record<string, string> = {
  Sage: '#7f907f',
  Black: '#222222',
  Cognac: '#8a5a3b',
  Ivory: '#e8e2d6',
  Blush: '#d8b8b0',
  Olive: '#6b7a5a',
  Navy: '#2a3340',
  Stone: '#b8b0a4',
  Camel: '#c9a878',
};

const swatch = (name: string): ColorOption => ({ name, hex: COLOR_SWATCHES[name] ?? '#cccccc' });

const raw: Omit<Product, 'slug' | 'sku'>[] = [
  {
    id: 'p1',
    name: 'Embossed Crocodile Clutch',
    shortDescription: 'Elegant textured clutch with refined detailing',
    description:
      'A timeless clutch crafted with an embossed crocodile finish and polished hardware. Compact yet spacious enough for your evening essentials, it pairs effortlessly with both cocktail and tailored looks.',
    price: 65,
    oldPrice: 70,
    category: 'Clutches',
    collection: 'Evening',
    colors: [swatch('Black'), swatch('Cognac'), swatch('Sage')],
    sizes: ['One Size'],
    rating: 4.8,
    reviewCount: 126,
    images: [7953286, 22434759, 36367484],
    tags: ['evening', 'textured', 'best-seller'],
    features: ['Embossed crocodile texture', 'Magnetic snap closure', 'Detachable wrist strap', 'Suede-lined interior'],
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
  },
  {
    id: 'p2',
    name: 'Metallic Statement Purse',
    shortDescription: 'Compact metallic purse for evening styling',
    description:
      'Make an entrance with this metallic statement purse. The softly structured silhouette catches the light, while a chain-link shoulder strap transitions from handheld to crossbody wear.',
    price: 65,
    oldPrice: 70,
    category: 'Clutches',
    collection: 'Evening',
    colors: [swatch('Blush'), swatch('Black'), swatch('Ivory')],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 88,
    images: [36367484, 35666033, 7953286],
    tags: ['evening', 'metallic', 'chain-strap'],
    features: ['Metallic foil finish', 'Convertible chain strap', 'Interior card slots', 'Soft velvet lining'],
    isFeatured: true,
    isOnSale: true,
  },
  {
    id: 'p3',
    name: 'Stylish Saffiano',
    shortDescription: 'Structured saffiano bag with premium finish',
    description:
      'A structured saffiano-leather bag with a refined cross-grain texture and gold-tone hardware. The structured base holds its shape beautifully, making it an elevated everyday companion.',
    price: 65,
    oldPrice: 70,
    category: 'Handbags',
    collection: 'Signature',
    colors: [swatch('Black'), swatch('Cognac'), swatch('Navy')],
    sizes: ['One Size'],
    rating: 4.9,
    reviewCount: 154,
    images: [35666033, 9327162, 22434759],
    tags: ['everyday', 'structured', 'saffiano'],
    features: ['Genuine saffiano leather', 'Top-handle + shoulder strap', 'Protective metal feet', 'Zippered wall pocket'],
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
  },
  {
    id: 'p4',
    name: 'Polished Purse',
    shortDescription: 'Minimal polished handbag for everyday use',
    description:
      'Clean lines and a polished finish define this everyday handbag. Designed to carry your daily essentials with understated elegance, it transitions seamlessly from desk to dinner.',
    price: 65,
    oldPrice: 70,
    category: 'Handbags',
    collection: 'Signature',
    colors: [swatch('Stone'), swatch('Black'), swatch('Camel')],
    sizes: ['One Size'],
    rating: 4.6,
    reviewCount: 73,
    images: [9327162, 18601568, 135620],
    tags: ['everyday', 'minimal', 'polished'],
    features: ['Smooth full-grain leather', 'Magnetic flap closure', 'Adjustable shoulder strap', 'Microfiber lining'],
    isFeatured: true,
    isOnSale: true,
  },
  {
    id: 'p5',
    name: 'Sage Mini Shoulder Bag',
    shortDescription: 'Soft structured shoulder bag',
    description:
      'A softly structured mini shoulder bag in a muted sage tone. The compact proportions and supple leather make it an effortless piece for everyday styling.',
    price: 89,
    category: 'Shoulder Bags',
    collection: 'Signature',
    colors: [swatch('Sage'), swatch('Black'), swatch('Olive')],
    sizes: ['One Size'],
    rating: 4.8,
    reviewCount: 102,
    images: [6650008, 21897320, 6650000],
    tags: ['everyday', 'mini', 'soft'],
    features: ['Soft pebbled leather', 'Sliding shoulder strap', 'Turn-lock closure', 'Interior zip pocket'],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 'p6',
    name: 'Classic Leather Tote',
    shortDescription: 'Premium everyday leather tote',
    description:
      'A generous everyday tote in full-grain leather. Roomy enough for a laptop and essentials, with a structured base and refined handles that feel comfortable on the shoulder.',
    price: 129,
    category: 'Tote Bags',
    collection: 'Signature',
    colors: [swatch('Black'), swatch('Cognac'), swatch('Stone')],
    sizes: ['Medium', 'Large'],
    rating: 4.9,
    reviewCount: 211,
    images: [30431969, 30471952, 9327162],
    tags: ['everyday', 'work', 'spacious'],
    features: ['Full-grain leather', 'Fits 15" laptop', 'Interior zip divider', 'Reinforced base'],
    isBestSeller: true,
    isNew: true,
  },
  {
    id: 'p7',
    name: 'Soft Quilted Crossbody',
    shortDescription: 'Elegant quilted crossbody bag',
    description:
      'A quilted crossbody with a soft, cushioned feel and a refined chain-accented strap. Lightweight and hands-free, it is the definition of effortless elegance.',
    price: 95,
    category: 'Crossbody Bags',
    collection: 'Signature',
    colors: [swatch('Black'), swatch('Blush'), swatch('Ivory')],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 96,
    images: [6650000, 21897146, 6650008],
    tags: ['everyday', 'quilted', 'chain-strap'],
    features: ['Diamond-quilted leather', 'Chain & leather strap', 'Hidden magnetic closure', 'Soft jersey lining'],
    isNew: true,
  },
  {
    id: 'p8',
    name: 'Urban Travel Backpack',
    shortDescription: 'Minimal functional fashion backpack',
    description:
      'A minimal, fashion-forward backpack designed for the city. Clean lines, a soft canvas-leather build, and thoughtfully placed pockets keep you organised on the move.',
    price: 110,
    category: 'Backpacks',
    collection: 'Urban',
    colors: [swatch('Black'), swatch('Olive'), swatch('Stone')],
    sizes: ['One Size'],
    rating: 4.6,
    reviewCount: 64,
    images: [9630186, 9412815, 4167659],
    tags: ['travel', 'minimal', 'functional'],
    features: ['Water-resistant canvas', 'Padded 14" laptop sleeve', 'Anti-theft back pocket', 'Adjustable padded straps'],
    isBestSeller: true,
  },
  {
    id: 'p9',
    name: 'Mini Evening Bag',
    shortDescription: 'Compact evening bag with refined hardware',
    description:
      'A compact evening bag with refined gold hardware and a sleek silhouette. Designed to hold just the essentials, it is the finishing touch to any after-dark look.',
    price: 79,
    category: 'Clutches',
    collection: 'Evening',
    colors: [swatch('Black'), swatch('Blush'), swatch('Cognac')],
    sizes: ['One Size'],
    rating: 4.5,
    reviewCount: 47,
    images: [21897147, 7953286, 22434759],
    tags: ['evening', 'mini', 'gold-hardware'],
    features: ['Smooth satin finish', 'Detachable chain strap', 'Kiss-lock clasp', 'Satin-lined interior'],
    isNew: true,
  },
  {
    id: 'p10',
    name: 'Structured City Bag',
    shortDescription: 'Modern structured handbag',
    description:
      'A modern structured handbag with architectural lines and a confident presence. The rigid frame and premium hardware make it a statement of considered design.',
    price: 119,
    category: 'Handbags',
    collection: 'Urban',
    colors: [swatch('Black'), swatch('Navy'), swatch('Camel')],
    sizes: ['One Size'],
    rating: 4.8,
    reviewCount: 119,
    images: [135620, 18601568, 21897312],
    tags: ['everyday', 'structured', 'modern'],
    features: ['Structured reinforced frame', 'Top handle + shoulder strap', 'Gold-tone hardware', 'Suede-lined'],
    isBestSeller: true,
  },
  {
    id: 'p11',
    name: 'Everyday Shoulder Bag',
    shortDescription: 'Minimal shoulder bag for daily styling',
    description:
      'A minimal shoulder bag designed for daily styling. The clean, uncluttered silhouette and soft leather make it a versatile piece that goes with everything.',
    price: 99,
    category: 'Shoulder Bags',
    collection: 'Signature',
    colors: [swatch('Stone'), swatch('Black'), swatch('Sage')],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 81,
    images: [21897320, 21897141, 6650008],
    tags: ['everyday', 'minimal', 'soft'],
    features: ['Soft nappa leather', 'Wide shoulder strap', 'Magnetic closure', 'Two interior slip pockets'],
    isNew: true,
  },
  {
    id: 'p12',
    name: 'Premium Weekend Bag',
    shortDescription: 'Spacious fashion travel bag',
    description:
      'A spacious weekend bag crafted for stylish getaways. The generous interior, durable leather handles, and refined hardware make every trip feel considered.',
    price: 149,
    category: 'Travel Bags',
    collection: 'Travel',
    colors: [swatch('Cognac'), swatch('Black'), swatch('Olive')],
    sizes: ['One Size'],
    rating: 4.9,
    reviewCount: 58,
    images: [11696717, 36931056, 9630186],
    tags: ['travel', 'spacious', 'weekend'],
    features: ['Full-grain leather trim', 'Cotton-twill lining', 'Detachable shoulder strap', 'Shoe compartment'],
    isBestSeller: true,
  },
];

export const PRODUCTS: Product[] = raw.map((p) => ({
  ...p,
  slug: slugify(p.name),
  sku: 'CC-' + p.id.toUpperCase().replace('p', '') + '-' + p.collection.slice(0, 3).toUpperCase(),
}));

export const SHIPPING_INFO = 'Free standard shipping on orders over $75. Orders are processed within 1–2 business days and delivered in 3–5 business days.';
export const RETURNS_INFO = 'Enjoy 30-day returns on unworn items in their original packaging. Return shipping is complimentary on orders over $150.';

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller);
}

export function getOnSale(): Product[] {
  return PRODUCTS.filter((p) => p.isOnSale);
}

export function getByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)),
  );
}

export const ALL_COLORS = Array.from(
  new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])).values(),
);
