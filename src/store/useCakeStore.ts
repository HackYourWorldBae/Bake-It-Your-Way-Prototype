import { create } from 'zustand';
import {
  CakeConfiguration,
  CakeSizeId,
  FlourId,
  FatId,
  SweetenerId,
  SweetnessLevel,
  FillingId,
  FrostingId,
  ColorId,
  TopperId,
  PlaqueStyle,
  CartItem,
  FulfillmentMode,
} from '@/types/cake';
import {
  calculateCakePrice,
  computeDietaryBadges,
  PRESET_INSPIRATIONS,
  CAKE_SIZES,
  FLOUR_OPTIONS,
} from '@/data/cakeData';

interface CakeStoreState {
  // Current Builder Configuration
  config: CakeConfiguration;
  currentStep: number;
  visualizerMode: 'exterior' | 'cross-section';
  lightingMode: 'daylight' | 'candlelight';

  // Builder Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSize: (size: CakeSizeId) => void;
  setFlour: (flour: FlourId) => void;
  setFat: (fat: FatId) => void;
  setSweetener: (sweetener: SweetenerId) => void;
  setSweetnessLevel: (level: SweetnessLevel) => void;
  toggleFilling: (fillingId: FillingId) => void;
  setFrosting: (frosting: FrostingId) => void;
  setColor: (color: ColorId) => void;
  toggleTopper: (topperId: TopperId) => void;
  setInscription: (text: string) => void;
  setPlaqueStyle: (style: PlaqueStyle) => void;
  toggleVisualizerMode: () => void;
  toggleLightingMode: () => void;
  loadPreset: (presetId: string) => void;
  resetBuilder: () => void;

  // Cart State & Actions
  cartItems: CartItem[];
  isCartOpen: boolean;
  fulfillmentMode: FulfillmentMode;
  selectedKitchen: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  recipientNotes: string;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: () => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  setFulfillmentMode: (mode: FulfillmentMode) => void;
  setSelectedKitchen: (kitchenId: string) => void;
  setDeliveryDetails: (details: {
    deliveryDate?: string;
    deliveryTime?: string;
    deliveryAddress?: string;
    recipientNotes?: string;
  }) => void;
}

const DEFAULT_CONFIG: CakeConfiguration = {
  size: 'celebration',
  flour: 'organic-wheat',
  fat: 'grass-fed-butter',
  sweetener: 'cane-sugar',
  sweetnessLevel: 50,
  fillings: ['strawberry-compote'],
  frosting: 'velvet-buttercream',
  color: 'classic-cream',
  toppers: ['pressed-flowers', 'gold-leaf'],
  inscription: 'Sweet Celebrations!',
  plaqueStyle: 'ivory',
};

// Initial sample pre-baked item for immediate interactive discovery
const INITIAL_CART_ITEM: CartItem = {
  id: 'cart-init-01',
  config: {
    size: 'bento',
    flour: 'almond',
    fat: 'coconut-oil',
    sweetener: 'monkfruit',
    sweetnessLevel: 25,
    fillings: ['dark-ganache'],
    frosting: 'whipped-coconut',
    color: 'terracotta-rust',
    toppers: ['gold-leaf', 'pressed-flowers'],
    inscription: 'Keto Delight',
    plaqueStyle: 'gold',
  },
  unitPrice: 1290,
  quantity: 1,
  customTitle: 'Bento Petite • Keto Truffle Cloud',
  dietaryBadges: ['Keto-Friendly', 'Grain-Free', 'Zero Sugar Spikes', '100% Plant-Based'],
  createdAt: '2026-11-07T12:00:00.000Z',
};

export const useCakeStore = create<CakeStoreState>((set, get) => ({
  config: { ...DEFAULT_CONFIG },
  currentStep: 1,
  visualizerMode: 'exterior',
  lightingMode: 'daylight',

  setStep: (step) => set({ currentStep: Math.max(1, Math.min(4, step)) }),
  nextStep: () => set((state) => ({ currentStep: Math.min(4, state.currentStep + 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),

  setSize: (size) =>
    set((state) => ({
      config: { ...state.config, size },
    })),

  setFlour: (flour) =>
    set((state) => ({
      config: { ...state.config, flour },
    })),

  setFat: (fat) =>
    set((state) => ({
      config: { ...state.config, fat },
    })),

  setSweetener: (sweetener) =>
    set((state) => ({
      config: { ...state.config, sweetener },
    })),

  setSweetnessLevel: (sweetnessLevel) =>
    set((state) => ({
      config: { ...state.config, sweetnessLevel },
    })),

  toggleFilling: (fillingId) =>
    set((state) => {
      const exists = state.config.fillings.includes(fillingId);
      let updated: FillingId[];
      if (exists) {
        updated = state.config.fillings.filter((id) => id !== fillingId);
      } else {
        if (state.config.fillings.length >= 3) {
          // Limit to max 3 layer inclusions for culinary balance
          updated = [...state.config.fillings.slice(1), fillingId];
        } else {
          updated = [...state.config.fillings, fillingId];
        }
      }
      return { config: { ...state.config, fillings: updated } };
    }),

  setFrosting: (frosting) =>
    set((state) => ({
      config: { ...state.config, frosting },
    })),

  setColor: (color) =>
    set((state) => ({
      config: { ...state.config, color },
    })),

  toggleTopper: (topperId) =>
    set((state) => {
      const exists = state.config.toppers.includes(topperId);
      const updated = exists
        ? state.config.toppers.filter((id) => id !== topperId)
        : [...state.config.toppers, topperId];
      return { config: { ...state.config, toppers: updated } };
    }),

  setInscription: (text) =>
    set((state) => ({
      config: { ...state.config, inscription: text.slice(0, 36) },
    })),

  setPlaqueStyle: (plaqueStyle) =>
    set((state) => ({
      config: { ...state.config, plaqueStyle },
    })),

  toggleVisualizerMode: () =>
    set((state) => ({
      visualizerMode: state.visualizerMode === 'exterior' ? 'cross-section' : 'exterior',
    })),

  toggleLightingMode: () =>
    set((state) => ({
      lightingMode: state.lightingMode === 'daylight' ? 'candlelight' : 'daylight',
    })),

  loadPreset: (presetId) => {
    const preset = PRESET_INSPIRATIONS.find((p) => p.id === presetId);
    if (!preset) return;
    set((state) => ({
      config: {
        ...state.config,
        flour: preset.flour,
        frosting: preset.frosting,
        color: preset.color,
        fillings: [...preset.fillings],
        toppers: [...preset.toppers],
        sweetener: preset.sweetener,
        sweetnessLevel: preset.sweetnessLevel,
        inscription: `${preset.title} Edition`,
      },
      currentStep: 1,
    }));
  },

  resetBuilder: () =>
    set({
      config: { ...DEFAULT_CONFIG },
      currentStep: 1,
      visualizerMode: 'exterior',
    }),

  // Cart State
  cartItems: [INITIAL_CART_ITEM],
  isCartOpen: false,
  fulfillmentMode: 'express-delivery',
  selectedKitchen: 'bgc-flagship',
  deliveryDate: 'Today (Priority Kitchen Slot)',
  deliveryTime: '2:30 PM – 4:30 PM Window',
  deliveryAddress: 'Unit 18B, One Serendra, Taguig City',
  recipientNotes: 'Fragile cake box. Please handle with care!',

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: () => {
    const { config, cartItems } = get();
    const price = calculateCakePrice(config);
    const badges = computeDietaryBadges(config);
    const sizeName = CAKE_SIZES.find((s) => s.id === config.size)?.name || 'Custom';
    const flourName = FLOUR_OPTIONS.find((f) => f.id === config.flour)?.name || 'Artisan';

    const newItem: CartItem = {
      id: `cake-${Date.now()}`,
      config: { ...config },
      unitPrice: price,
      quantity: 1,
      customTitle: `${sizeName} • ${flourName}`,
      dietaryBadges: badges,
      createdAt: new Date().toISOString(),
    };

    set({
      cartItems: [newItem, ...cartItems],
      isCartOpen: true,
    });
  },

  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),

  updateQuantity: (itemId, qty) =>
    set((state) => ({
      cartItems:
        qty <= 0
          ? state.cartItems.filter((item) => item.id !== itemId)
          : state.cartItems.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item)),
    })),

  clearCart: () => set({ cartItems: [] }),

  setFulfillmentMode: (fulfillmentMode) => set({ fulfillmentMode }),
  setSelectedKitchen: (selectedKitchen) => set({ selectedKitchen }),
  setDeliveryDetails: (details) =>
    set((state) => ({
      ...state,
      ...details,
    })),
}));
