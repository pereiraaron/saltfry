import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';
import { products } from '../data/products';

interface CartState {
  cartItems: CartItem[];
  error: string | undefined;
  addToCart: (id: string, qty: number, color: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  incrementQuantity: (id: string, currentQty: number, stock: number) => void;
  decrementQuantity: (id: string, currentQty: number) => void;
  clearError: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      error: undefined,

      addToCart: (id: string, qty: number, color: string) => {
        const product = products.find((p) => p.id === id);
        if (!product) {
          set({ error: 'Product not found' });
          return;
        }

        const newItem: CartItem = {
          id: `${product.id}-${color}`,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          color,
          quantity: qty,
          stock: product.stock,
        };

        const existItem = get().cartItems.find((x) => x.id === newItem.id);

        if (existItem) {
          set({
            cartItems: get().cartItems.map((x) => (x.id === existItem.id ? newItem : x)),
          });
        } else {
          set({ cartItems: [...get().cartItems, newItem] });
        }
      },

      removeFromCart: (id: string) => {
        set({ cartItems: get().cartItems.filter((x) => x.id !== id) });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      incrementQuantity: (id: string, currentQty: number, stock: number) => {
        if (currentQty + 1 <= stock) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === id ? { ...item, quantity: currentQty + 1 } : item
            ),
          });
        } else {
          set({ error: 'There are no more products available in stock' });
        }
      },

      decrementQuantity: (id: string, currentQty: number) => {
        if (currentQty <= 1) {
          set({ error: "Product count can't be negative" });
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === id ? { ...item, quantity: currentQty - 1 } : item
            ),
          });
        }
      },

      clearError: () => {
        set({ error: undefined });
      },
    }),
    {
      name: 'cartItems',
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);
