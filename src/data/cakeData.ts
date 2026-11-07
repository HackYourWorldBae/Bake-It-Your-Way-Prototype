import {
  CakeSize,
  FlourOption,
  FatOption,
  SweetenerOption,
  SweetnessLevel,
  FillingOption,
  FrostingOption,
  ColorOption,
  TopperOption,
  KitchenLocation,
  PresetInspiration,
  CakeConfiguration,
  NutritionProfile,
} from '@/types/cake';

export const CAKE_SIZES: CakeSize[] = [
  {
    id: 'bento',
    name: 'Bento Petite',
    diameter: '4" Petite',
    servings: '1 – 2 Servings',
    basePrice: 580,
    description: 'Personal mini celebration in an eco-kraft presentation box.',
    dimensionDetails: '4" dia • 400g',
  },
  {
    id: 'celebration',
    name: 'Celebration Stately',
    diameter: '6" Classic',
    servings: '6 – 8 Servings',
    basePrice: 1250,
    description: 'Our signature celebratory centerpiece with pedestal stand.',
    dimensionDetails: '6" dia • 1.1kg',
  },
  {
    id: 'tier',
    name: 'Grand Duo Tier',
    diameter: '8" + 6" Stacked',
    servings: '16 – 22 Servings',
    basePrice: 2450,
    description: 'Two-tier centerpiece for weddings and milestone banquets.',
    dimensionDetails: 'Stacked dual tier • 2.8kg',
  },
];

export const FLOUR_OPTIONS: FlourOption[] = [
  {
    id: 'organic-wheat',
    name: 'Heirloom Organic Wheat',
    subtitle: 'Classic & Fluffy',
    description: 'Stone-milled single-origin grain with velvety, airy lift.',
    dietaryTags: ['Classic', '100% Organic'],
    price: 0,
    crumbHex: '#F0D5A0',
    textureNotes: 'Feather-light crumb',
  },
  {
    id: 'almond',
    name: 'Blanched Almond Flour',
    subtitle: 'Keto & Grain-Free',
    description: 'Ultra-fine California almonds with naturally low net carbs (<3g).',
    dietaryTags: ['Keto-Friendly', 'Grain-Free'],
    price: 220,
    crumbHex: '#DFC49B',
    textureNotes: 'Moist & nutty',
  },
  {
    id: 'oat',
    name: 'Whole Grain Golden Oat',
    subtitle: 'Fiber-Rich & Hearty',
    description: 'Certified rolled oats offering gentle, steady digestion.',
    dietaryTags: ['High Fiber', 'Low GI'],
    price: 150,
    crumbHex: '#E5D6BD',
    textureNotes: 'Warm & rustic',
  },
  {
    id: 'gluten-free-blend',
    name: 'Celiac-Safe Blend',
    subtitle: '100% Certified GF',
    description: 'Brown rice, tapioca & potato starch from our dedicated clean room.',
    dietaryTags: ['100% Celiac-Safe'],
    price: 280,
    crumbHex: '#F6EBD9',
    textureNotes: 'Tender & moist',
  },
];

export const FAT_OPTIONS: FatOption[] = [
  {
    id: 'grass-fed-butter',
    name: 'Grass-Fed Alpine Butter',
    description: '82% butterfat for traditional melt-in-mouth crumb.',
    price: 0,
    dietaryTag: 'Classic',
  },
  {
    id: 'coconut-oil',
    name: 'Virgin Coconut Oil',
    description: 'Cold-pressed extra virgin oil for a light, dairy-free crumb.',
    price: 90,
    dietaryTag: '100% Vegan',
  },
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    description: 'First cold-press Arbequina olives with subtle floral warmth.',
    price: 120,
    dietaryTag: 'Plant-Based',
  },
];

export const SWEETENER_OPTIONS: SweetenerOption[] = [
  {
    id: 'cane-sugar',
    name: 'Raw Cane Sugar',
    description: 'Golden unrefined crystals with crisp caramel warmth.',
    price: 0,
    dietaryTag: 'Traditional',
    glycemicNotes: 'Standard GI',
  },
  {
    id: 'monkfruit',
    name: 'Pure Monkfruit Blend',
    description: 'Zero net carbs and zero blood sugar spike. Diabetic-safe.',
    price: 180,
    dietaryTag: '0g Net Carbs',
    glycemicNotes: '0 GI • Keto',
  },
  {
    id: 'wild-honey',
    name: 'Raw Mountain Honey',
    description: 'Unpasteurized foraged honey with rich floral notes.',
    price: 140,
    dietaryTag: 'Raw Floral',
    glycemicNotes: 'Slow Release',
  },
];

export const SWEETNESS_LEVELS: { level: SweetnessLevel; label: string; desc: string; pillColor: string }[] = [
  {
    level: 25,
    label: '25% Subtle',
    desc: 'Chef preferred. Accents cacao and fruit.',
    pillColor: 'bg-matcha-light text-matcha',
  },
  {
    level: 50,
    label: '50% Balanced',
    desc: 'Signature house equilibrium.',
    pillColor: 'bg-honey-light text-terracotta-dark',
  },
  {
    level: 75,
    label: '75% Standard',
    desc: 'Traditional patisserie balance.',
    pillColor: 'bg-terracotta-light/30 text-terracotta-dark',
  },
  {
    level: 100,
    label: '100% Indulgent',
    desc: 'Rich dessert party sweetness.',
    pillColor: 'bg-terracotta/20 text-roast',
  },
];

export const FILLING_OPTIONS: FillingOption[] = [
  {
    id: 'dark-ganache',
    name: '70% Dark Ganache',
    description: 'Single-origin Davao bittersweet chocolate.',
    price: 160,
    layerHex: '#3E2519',
    flavorProfile: 'Bittersweet',
  },
  {
    id: 'strawberry-compote',
    name: 'Strawberry Thyme',
    description: 'Highland strawberries simmered with fresh thyme.',
    price: 180,
    layerHex: '#B23A48',
    flavorProfile: 'Tart & Jammy',
  },
  {
    id: 'pistachio-cream',
    name: 'Pistachio Mousseline',
    description: 'Pure roasted Sicilian pistachio cream.',
    price: 240,
    layerHex: '#93A87B',
    flavorProfile: 'Nutty & Velvety',
  },
  {
    id: 'vanilla-custard',
    name: 'Bourbon Custard',
    description: 'Speckled with Madagascar vanilla beans.',
    price: 140,
    layerHex: '#F6E4A8',
    flavorProfile: 'Creamy Vanilla',
  },
  {
    id: 'salted-caramel',
    name: 'Fleur de Sel Caramel',
    description: 'Copper kettle caramel with grey sea salt.',
    price: 150,
    layerHex: '#C57E37',
    flavorProfile: 'Amber & Salty',
  },
  {
    id: 'matcha-mousse',
    name: 'Kyoto Matcha Cream',
    description: 'Stone-ground ceremonial Uji green tea.',
    price: 210,
    layerHex: '#5F8562',
    flavorProfile: 'Earthy Umami',
  },
];

export const FROSTING_OPTIONS: FrostingOption[] = [
  {
    id: 'velvet-buttercream',
    name: 'Swiss Meringue Buttercream',
    description: 'Ultra-smooth, glossy and stable traditional finish.',
    price: 0,
    dietaryTag: 'Silky Classic',
    finishStyle: 'Ultra Smooth',
  },
  {
    id: 'whipped-coconut',
    name: 'Whipped Coconut Cloud',
    description: '100% plant-based, airy coconut vanilla cream.',
    price: 160,
    dietaryTag: '100% Vegan',
    finishStyle: 'Cloud Whipped',
  },
  {
    id: 'semi-naked',
    name: 'Artisanal Semi-Naked Scrape',
    description: 'Minimalist crumb coat showing rustic sponge geometry.',
    price: 0,
    dietaryTag: 'Low Frosting',
    finishStyle: 'Rustic Scrape',
  },
];

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'classic-cream',
    name: 'Classic Cream',
    hex: '#FAF6EE',
    strokeHex: '#E2D7C3',
    accentHex: '#C87D55',
    mood: 'Warm Parchment',
  },
  {
    id: 'terracotta-rust',
    name: 'Terracotta Rust',
    hex: '#C87D55',
    strokeHex: '#A25832',
    accentHex: '#FAF6EE',
    mood: 'Warm Clay',
  },
  {
    id: 'botanical-sage',
    name: 'Botanical Sage',
    hex: '#7E9F89',
    strokeHex: '#587762',
    accentHex: '#F2E8DC',
    mood: 'Garden Herb',
  },
  {
    id: 'pastel-blush',
    name: 'Rosewater Blush',
    hex: '#F3D5CF',
    strokeHex: '#D5A79F',
    accentHex: '#8C4637',
    mood: 'Soft Petal',
  },
  {
    id: 'midnight-espresso',
    name: 'Midnight Cocoa',
    hex: '#3D2B24',
    strokeHex: '#251711',
    accentHex: '#E29E4B',
    mood: 'Deep Espresso',
  },
  {
    id: 'wild-honey',
    name: 'Golden Honey',
    hex: '#E9B668',
    strokeHex: '#C5913F',
    accentHex: '#2C221E',
    mood: 'Amber Glow',
  },
];

export const TOPPER_OPTIONS: TopperOption[] = [
  {
    id: 'pressed-flowers',
    name: 'Pressed Edible Flowers',
    description: 'Organic violas and calendula petals.',
    price: 180,
    detail: 'Botanical',
  },
  {
    id: 'gold-leaf',
    name: '24k Edible Gold Leaf',
    description: 'Shimmering genuine gold flecks.',
    price: 250,
    detail: 'Gilded',
  },
  {
    id: 'berry-crown',
    name: 'Fresh Berry Crown',
    description: 'Blackberries, raspberries & mint.',
    price: 220,
    detail: 'Fresh Fruit',
  },
  {
    id: 'macaron-cluster',
    name: 'Artisan Macaron Trio',
    description: 'Color-matched French almond macarons.',
    price: 280,
    detail: 'French Patisserie',
  },
  {
    id: 'piped-rosettes',
    name: 'Vintage Piped Rosettes',
    description: 'Delicate Lambeth buttercream shell borders.',
    price: 190,
    detail: 'Heritage Piping',
  },
];

export const KITCHEN_LOCATIONS: KitchenLocation[] = [
  {
    id: 'bgc-flagship',
    name: 'BGC High Street Flagship',
    address: 'High Street South Block, 26th St, Taguig',
    district: 'BGC, Taguig',
    hours: '8:00 AM – 9:00 PM Daily',
    leadTime: '2.5 hr on-demand baking',
  },
  {
    id: 'makati-studio',
    name: 'Makati Legazpi Studio',
    address: '118 Rada Street, Legazpi Village, Makati',
    district: 'Makati',
    hours: '7:30 AM – 8:30 PM Mon–Sat',
    leadTime: 'Express 2-hr dispatch',
  },
  {
    id: 'qc-kitchen',
    name: 'QC Tomas Morato Atelier',
    address: '74 Scout Rallos, Diliman, Quezon City',
    district: 'Quezon City',
    hours: '9:00 AM – 9:30 PM Daily',
    leadTime: 'Dedicated Celiac Clean Room',
  },
];

export const PRESET_INSPIRATIONS: PresetInspiration[] = [
  {
    id: 'parisian-raspberry',
    title: 'Parisian Framboise',
    tagline: 'Heirloom Wheat with Strawberry Thyme & Rosewater Blush',
    flour: 'organic-wheat',
    frosting: 'velvet-buttercream',
    color: 'pastel-blush',
    fillings: ['strawberry-compote', 'vanilla-custard'],
    toppers: ['berry-crown', 'gold-leaf'],
    sweetener: 'cane-sugar',
    sweetnessLevel: 50,
    dietaryFocus: 'Classic & Balanced',
    story: 'Fresh berries and fragrant vanilla custard.',
  },
  {
    id: 'keto-golden-truffle',
    title: 'Keto Golden Truffle',
    tagline: 'Almond Flour, Dark Ganache & 24k Gold Leaf',
    flour: 'almond',
    frosting: 'velvet-buttercream',
    color: 'terracotta-rust',
    fillings: ['dark-ganache'],
    toppers: ['gold-leaf', 'pressed-flowers'],
    sweetener: 'monkfruit',
    sweetnessLevel: 25,
    dietaryFocus: 'Keto • <3g Net Carbs',
    story: 'Zero sugar spikes with rich dark chocolate.',
  },
  {
    id: 'celiac-sage-botanical',
    title: 'Celiac Uji Garden',
    tagline: 'Celiac-Safe Sponge with Pistachio & Kyoto Matcha',
    flour: 'gluten-free-blend',
    frosting: 'semi-naked',
    color: 'botanical-sage',
    fillings: ['pistachio-cream', 'matcha-mousse'],
    toppers: ['pressed-flowers', 'macaron-cluster'],
    sweetener: 'wild-honey',
    sweetnessLevel: 50,
    dietaryFocus: '100% Celiac Certified',
    story: 'Baked in our sealed wheat-free isolation oven.',
  },
  {
    id: 'cloud-vegan-caramel',
    title: 'Plant-Based Solstice',
    tagline: 'Oat Sponge, Whipped Coconut Cream & Salted Caramel',
    flour: 'oat',
    frosting: 'whipped-coconut',
    color: 'wild-honey',
    fillings: ['salted-caramel'],
    toppers: ['pressed-flowers', 'piped-rosettes'],
    sweetener: 'wild-honey',
    sweetnessLevel: 75,
    dietaryFocus: '100% Plant-Based',
    story: 'Velvety whipped coconut with amber caramel.',
  },
];

export const PROBLEM_SOLUTION_MATRIX = [
  {
    problemTitle: 'Rigid White Flour Premixes',
    problemDesc: 'Standard bakeries rely on generic refined wheat mixes with no ingredient freedom.',
    solutionTitle: '4 Tailored Foundation Flours',
    solutionDesc: 'Choose stone-milled organic wheat, keto almond flour, whole oat, or certified celiac blend.',
    badge: 'Flour Freedom',
  },
  {
    problemTitle: 'Dietary Blindspots & Sugar Spikes',
    problemDesc: 'Allergies and diabetic needs are usually met with chalky, compromised alternatives.',
    solutionTitle: 'Custom Sweetener Chemistry',
    solutionDesc: 'Select 0g-carb monkfruit, raw wild honey, or organic cane, dialed from 25% to 100%.',
    badge: 'Bio-Individual',
  },
  {
    problemTitle: 'Static Catalog Photos',
    problemDesc: 'Ordering blind from catalog photos that rarely match your actual celebration cake.',
    solutionTitle: 'Real-Time 2D Visual Studio',
    solutionDesc: 'Live canvas updating color swatches, tier sizing, accents, and custom inscription in real time.',
    badge: 'Live Visualizer',
  },
];

export const FOUNDERS_DATA = [
  {
    name: 'Janine Sadcat',
    role: 'CEO & Food Scientist',
    background: 'B.S. Food Science & Tech • Ex-Nestlé Innovation',
    quote: 'Science and soul belong in the same kitchen. Celebrate without allergen compromise.',
    badge: 'Food Chemistry Lead',
  },
  {
    name: 'Jan Alexa Cezar',
    role: 'Head Pastry Chef',
    background: 'Le Cordon Bleu Paris • Michelin Patisserie',
    quote: 'Every cake is baked fresh to order. Sponges are never frozen.',
    badge: 'Master Pâtissier',
  },
  {
    name: 'Roj Justin Rillera',
    role: 'Product & Design Lead',
    background: 'Human-Centered UI/UX • Ex-Shopify Architect',
    quote: 'Custom baking should feel effortless and tactile in your hands.',
    badge: 'Design System Lead',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How do you guarantee 100% Celiac-Safe baking?',
    answer:
      'Our gluten-free cakes are prepared in an isolated, positive-pressure clean room with dedicated ovens and color-coded utensils, certified under 5ppm.',
  },
  {
    question: 'What is the lead time for on-demand orders?',
    answer:
      'Because our kitchen workflow is modular, our chefs bake, cool, and hand-frost custom creations within 2.5 hours for Express Delivery.',
  },
  {
    question: 'Can I lower sweetness without affecting cake texture?',
    answer:
      'Yes. Our chefs recalibrate crumb hydration and structural fat whenever sweetness is adjusted, keeping the crumb moist and tender.',
  },
  {
    question: 'How is the cake protected during delivery?',
    answer:
      'Each cake travels in an insulated thermal box with reusable dry-ice packs, holding a stable 14°C cold-chain environment across Metro Manila.',
  },
];

export function calculateCakePrice(config: CakeConfiguration): number {
  const sizeObj = CAKE_SIZES.find((s) => s.id === config.size) || CAKE_SIZES[1];
  const flourObj = FLOUR_OPTIONS.find((f) => f.id === config.flour) || FLOUR_OPTIONS[0];
  const fatObj = FAT_OPTIONS.find((f) => f.id === config.fat) || FAT_OPTIONS[0];
  const sweetenerObj = SWEETENER_OPTIONS.find((s) => s.id === config.sweetener) || SWEETENER_OPTIONS[0];
  const frostingObj = FROSTING_OPTIONS.find((f) => f.id === config.frosting) || FROSTING_OPTIONS[0];

  const fillingsTotal = config.fillings.reduce((sum, fid) => {
    const filling = FILLING_OPTIONS.find((f) => f.id === fid);
    return sum + (filling ? filling.price : 0);
  }, 0);

  const toppersTotal = config.toppers.reduce((sum, tid) => {
    const topper = TOPPER_OPTIONS.find((t) => t.id === tid);
    return sum + (topper ? topper.price : 0);
  }, 0);

  const inscriptionPrice = config.inscription.trim().length > 0 ? 50 : 0;

  return (
    sizeObj.basePrice +
    flourObj.price +
    fatObj.price +
    sweetenerObj.price +
    frostingObj.price +
    fillingsTotal +
    toppersTotal +
    inscriptionPrice
  );
}

export function computeDietaryBadges(config: CakeConfiguration): string[] {
  const badges: string[] = [];

  if (config.flour === 'almond') {
    badges.push('Keto-Friendly', 'Grain-Free');
  } else if (config.flour === 'gluten-free-blend') {
    badges.push('100% Celiac-Safe');
  } else if (config.flour === 'oat') {
    badges.push('High-Fiber');
  }

  if (config.sweetener === 'monkfruit') {
    badges.push('Zero Sugar Spikes');
  }

  if (config.sweetnessLevel <= 25) {
    badges.push('Low Sugar');
  }

  if (config.fat === 'coconut-oil' && config.frosting === 'whipped-coconut') {
    badges.push('100% Vegan', 'Dairy-Free');
  } else if (config.fat === 'coconut-oil' || config.fat === 'olive-oil') {
    badges.push('Butter-Free');
  }

  if (config.flour === 'organic-wheat') {
    badges.push('100% Organic');
  }

  return badges;
}

export function computeNutritionProfile(config: CakeConfiguration): NutritionProfile {
  let calories = 220;
  let netCarbs = 18;
  let protein = 4;
  let fat = 12;
  let fiber = 2;

  // Flour effect
  if (config.flour === 'almond') {
    calories += 40;
    netCarbs = 2.8;
    protein += 5;
    fat += 9;
    fiber += 3.5;
  } else if (config.flour === 'oat') {
    calories -= 10;
    netCarbs = 16;
    protein += 2;
    fiber += 4.5;
  } else if (config.flour === 'gluten-free-blend') {
    netCarbs = 21;
    fiber += 1.5;
  }

  // Sweetener effect
  if (config.sweetener === 'monkfruit') {
    calories -= 60;
    netCarbs = Math.max(1.8, netCarbs - 14);
  } else if (config.sweetener === 'wild-honey') {
    calories -= 15;
    netCarbs -= 2;
  }

  // Sweetness intensity factor
  const sweetnessFactor = config.sweetnessLevel / 100;
  if (config.sweetener !== 'monkfruit') {
    netCarbs = Math.round(netCarbs * (0.6 + sweetnessFactor * 0.4) * 10) / 10;
    calories = Math.round(calories * (0.8 + sweetnessFactor * 0.2));
  }

  // Fat effect
  if (config.fat === 'coconut-oil') {
    fat += 2;
  } else if (config.fat === 'olive-oil') {
    fat += 3;
  }

  // Fillings
  calories += config.fillings.length * 25;

  let glycemicImpact: NutritionProfile['glycemicImpact'] = 'Classic Patisserie';
  if (config.sweetener === 'monkfruit' && config.flour === 'almond') {
    glycemicImpact = 'Very Low (<5)';
  } else if (config.sweetener === 'monkfruit' || (config.flour === 'oat' && config.sweetnessLevel <= 50)) {
    glycemicImpact = 'Low (5-10)';
  } else if (config.sweetnessLevel <= 50 || config.sweetener === 'wild-honey') {
    glycemicImpact = 'Moderate (11-19)';
  }

  return {
    caloriesPerServing: Math.round(calories),
    netCarbs: Math.round(netCarbs * 10) / 10,
    protein: Math.round(protein * 10) / 10,
    fat: Math.round(fat * 10) / 10,
    fiber: Math.round(fiber * 10) / 10,
    glycemicImpact,
  };
}
