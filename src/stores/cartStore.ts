import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { CartItem } from '../types';

const url = import.meta.env.VITE_BASE_URL;

interface CartState {
  cartItems: CartItem[];
  error: string | undefined;
  addToCart: (id: string, qty: number) => Promise<void>;
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

      addToCart: async (id: string, qty: number) => {
        try {
          const { data } = await axios.get(`${url}/react-store-single-product?id=${id}`);
          const newItem: CartItem = {
            id: data.id,
            name: data.name,
            image: data.images[0].url,
            price: data.price,
            color: data.color,
            quantity: qty,
            stock: data.stock,
          };

          const existItem = get().cartItems.find((x) => x.id === newItem.id);

          if (existItem) {
            set({
              cartItems: get().cartItems.map((x) => (x.id === existItem.id ? newItem : x)),
            });
          } else {
            set({ cartItems: [...get().cartItems, newItem] });
          }
        } catch (error) {
          console.log(error);
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
