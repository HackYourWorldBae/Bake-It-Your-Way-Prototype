export type CakeSizeId = 'bento' | 'celebration' | 'tier';

export interface CakeSize {
  id: CakeSizeId;
  name: string;
  diameter: string;
  servings: string;
  basePrice: number;
  description: string;
  dimensionDetails: string;
}

export type FlourId = 'organic-wheat' | 'almond' | 'oat' | 'gluten-free-blend';

export interface FlourOption {
  id: FlourId;
  name: string;
  subtitle: string;
  description: string;
  dietaryTags: string[];
  price: number;
  crumbHex: string;
  textureNotes: string;
}

export type FatId = 'grass-fed-butter' | 'coconut-oil' | 'olive-oil';

export interface FatOption {
  id: FatId;
  name: string;
  description: string;
  price: number;
  dietaryTag: string;
}

export type SweetenerId = 'cane-sugar' | 'monkfruit' | 'wild-honey';

export interface SweetenerOption {
  id: SweetenerId;
  name: string;
  description: string;
  price: number;
  dietaryTag: string;
  glycemicNotes: string;
}

export type SweetnessLevel = 25 | 50 | 75 | 100;

export type FillingId =
  | 'dark-ganache'
  | 'strawberry-compote'
  | 'pistachio-cream'
  | 'vanilla-custard'
  | 'salted-caramel'
  | 'matcha-mousse';

export interface FillingOption {
  id: FillingId;
  name: string;
  description: string;
  price: number;
  layerHex: string;
  flavorProfile: string;
}

export type FrostingId = 'velvet-buttercream' | 'whipped-coconut' | 'semi-naked';

export interface FrostingOption {
  id: FrostingId;
  name: string;
  description: string;
  price: number;
  dietaryTag: string;
  finishStyle: string;
}

export type ColorId =
  | 'classic-cream'
  | 'terracotta-rust'
  | 'botanical-sage'
  | 'pastel-blush'
  | 'midnight-espresso'
  | 'wild-honey';

export interface ColorOption {
  id: ColorId;
  name: string;
  hex: string;
  strokeHex: string;
  accentHex: string;
  mood: string;
}

export type TopperId =
  | 'pressed-flowers'
  | 'gold-leaf'
  | 'berry-crown'
  | 'macaron-cluster'
  | 'piped-rosettes';

export interface TopperOption {
  id: TopperId;
  name: string;
  description: string;
  price: number;
  detail: string;
}

export type PlaqueStyle = 'ivory' | 'gold' | 'chocolate';

export type FulfillmentMode = 'express-delivery' | 'kitchen-pickup';

export interface KitchenLocation {
  id: string;
  name: string;
  address: string;
  district: string;
  hours: string;
  leadTime: string;
}

export interface CakeConfiguration {
  size: CakeSizeId;
  flour: FlourId;
  fat: FatId;
  sweetener: SweetenerId;
  sweetnessLevel: SweetnessLevel;
  fillings: FillingId[];
  frosting: FrostingId;
  color: ColorId;
  toppers: TopperId[];
  inscription: string;
  plaqueStyle: PlaqueStyle;
}

export interface NutritionProfile {
  caloriesPerServing: number;
  netCarbs: number;
  protein: number;
  fat: number;
  fiber: number;
  glycemicImpact: 'Very Low (<5)' | 'Low (5-10)' | 'Moderate (11-19)' | 'Classic Patisserie';
}

export interface CartItem {
  id: string;
  config: CakeConfiguration;
  unitPrice: number;
  quantity: number;
  customTitle: string;
  dietaryBadges: string[];
  createdAt: string;
}

export interface PresetInspiration {
  id: string;
  title: string;
  tagline: string;
  flour: FlourId;
  frosting: FrostingId;
  color: ColorId;
  fillings: FillingId[];
  toppers: TopperId[];
  sweetener: SweetenerId;
  sweetnessLevel: SweetnessLevel;
  dietaryFocus: string;
  story: string;
}

