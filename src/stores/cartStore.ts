import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, ApiCartItem, ApiCartResponse } from '@types';
import { API_URL } from '@utils/api';
import { getAuthToken, authFetch } from '@utils/authFetch';
import { useProductStore } from './productStore';

interface CartState {
  cartItems: CartItem[];
  cartLoading: boolean;
  loadingItems: Set<string>;
  clearingCart: boolean;
  error: string | undefined;
  fetchCart: () => Promise<void>;
  addToCart: (id: string, qty: number, color: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  incrementQuantity: (id: string, currentQty: number, stock: number) => void;
  decrementQuantity: (id: string, currentQty: number) => void;
  syncCartToServer: () => Promise<void>;
  clearError: () => void;
}

const mapApiItems = (apiItems: ApiCartItem[], existingItems: CartItem[]): CartItem[] => {
  const { products } = useProductStore.getState();
  return apiItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const compositeId = `${item.productId}-${item.color}`;
    const existing = existingItems.find((i) => i.id === compositeId);
    return {
      id: compositeId,
      name: item.name,
      image: item.image,
      price: item.price,
      color: item.color,
      quantity: item.quantity,
      stock: product?.stock ?? existing?.stock ?? 99,
    };
  });
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartLoading: false,
      loadingItems: new Set<string>(),
      clearingCart: false,
      error: undefined,

      fetchCart: async () => {
        if (!getAuthToken()) return;

        try {
          set({ cartLoading: true });
          const res = await authFetch(`${API_URL}cart`);

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to fetch cart');
          }

          const data: ApiCartResponse = await res.json();
          set({
            cartItems: mapApiItems(data.items, get().cartItems),
            cartLoading: false,
          });
        } catch (error) {
          set({
            cartLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch cart',
          });
        }
      },

      addToCart: async (id: string, qty: number, color: string) => {
        const { products } = useProductStore.getState();
        const product = products.find((p) => p.id === id);
        if (!product) {
          set({ error: 'Product not found' });
          return;
        }

        if (getAuthToken()) {
          try {
            const res = await authFetch(`${API_URL}cart`, {
              method: 'POST',
              body: JSON.stringify({ productId: id, quantity: qty, color }),
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.message || 'Failed to add to cart');
            }

            const data = await res.json();
            set({
              cartItems: mapApiItems(data.items as ApiCartItem[], get().cartItems),
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to add to cart',
            });
          }
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${color}`,
            name: product.name,
            image: product.images?.[0]?.url ?? product.image,
            price: product.price,
            color,
            quantity: qty,
            stock: product.stock ?? 0,
          };

          const existItem = get().cartItems.find((x) => x.id === newItem.id);
          if (existItem) {
            set({
              cartItems: get().cartItems.map((x) => (x.id === existItem.id ? newItem : x)),
            });
          } else {
            set({ cartItems: [...get().cartItems, newItem] });
          }
        }
      },

      removeFromCart: async (id: string) => {
        if (getAuthToken()) {
          const productId = id.substring(0, id.lastIndexOf('-'));
          const color = id.substring(id.lastIndexOf('-') + 1);
          set({ loadingItems: new Set([...get().loadingItems, id]) });
          try {
            const res = await authFetch(
              `${API_URL}cart/${productId}?color=${encodeURIComponent(color)}`,
              { method: 'DELETE' }
            );

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.message || 'Failed to remove item');
            }

            const data = await res.json();
            const next = new Set(get().loadingItems);
            next.delete(id);
            set({
              cartItems: mapApiItems(data.items as ApiCartItem[], get().cartItems),
              loadingItems: next,
            });
          } catch (error) {
            const next = new Set(get().loadingItems);
            next.delete(id);
            set({
              loadingItems: next,
              error: error instanceof Error ? error.message : 'Failed to remove item',
            });
          }
        } else {
          set({ cartItems: get().cartItems.filter((x) => x.id !== id) });
        }
      },

      clearCart: async () => {
        if (getAuthToken()) {
          set({ clearingCart: true });
          try {
            const res = await authFetch(`${API_URL}cart`, {
              method: 'DELETE',
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.message || 'Failed to clear cart');
            }

            set({ cartItems: [], clearingCart: false });
          } catch (error) {
            set({
              clearingCart: false,
              error: error instanceof Error ? error.message : 'Failed to clear cart',
            });
          }
        } else {
          set({ cartItems: [] });
        }
      },

      incrementQuantity: (id: string, currentQty: number, stock: number) => {
        if (currentQty + 1 > stock) {
          set({ error: 'There are no more products available in stock' });
          return;
        }

        // Optimistic local update
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id ? { ...item, quantity: currentQty + 1 } : item
          ),
          loadingItems: new Set([...get().loadingItems, id]),
        });

        // Sync to server in background
        if (getAuthToken()) {
          const item = get().cartItems.find((i) => i.id === id);
          if (!item) {
            const next = new Set(get().loadingItems);
            next.delete(id);
            set({ loadingItems: next });
            return;
          }

          const productId = id.substring(0, id.lastIndexOf('-'));
          authFetch(`${API_URL}cart`, {
            method: 'POST',
            body: JSON.stringify({ productId, quantity: 1, color: item.color }),
          })
            .then(() => {
              const next = new Set(get().loadingItems);
              next.delete(id);
              set({ loadingItems: next });
            })
            .catch(() => {
              const next = new Set(get().loadingItems);
              next.delete(id);
              set({
                cartItems: get().cartItems.map((i) =>
                  i.id === id ? { ...i, quantity: currentQty } : i
                ),
                loadingItems: next,
                error: 'Failed to update quantity',
              });
            });
        } else {
          const next = new Set(get().loadingItems);
          next.delete(id);
          set({ loadingItems: next });
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

      syncCartToServer: async () => {
        if (!getAuthToken()) return;

        const { cartItems } = get();
        if (cartItems.length === 0) return;

        await Promise.all(
          cartItems.map((item) => {
            const productId = item.id.substring(0, item.id.lastIndexOf('-'));
            return authFetch(`${API_URL}cart`, {
              method: 'POST',
              body: JSON.stringify({ productId, quantity: item.quantity, color: item.color }),
            }).catch(() => {
              // Continue syncing remaining items
            });
          })
        );

        // Fetch the merged server cart
        await get().fetchCart();
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
