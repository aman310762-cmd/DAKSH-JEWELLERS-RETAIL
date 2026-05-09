import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  weight: number;
  purity: string;
  category: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'qty'>) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getItems: () => CartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const existing = items.find((item) => item.productId === product.productId);

        if (existing) {
          set({
            items: items.map((item) =>
              item.productId === product.productId
                ? { ...item, qty: item.qty + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((item) => item.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, qty } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },

      getItems: () => get().items,
    }),
    {
      name: 'daksh-jewellers-cart',
    }
  )
);
