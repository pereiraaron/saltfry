import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, ApiCartItem, ApiCartResponse } from '@types';
import { API_URL } from '@utils/api';
import { useProductStore } from './productStore';
import { useAuthStore } from './authStore';

interface CartState {
  cartItems: CartItem[];
  cartLoading: boolean;
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

const getAuthToken = (): string | null => {
  const { userInfo } = useAuthStore.getState();
  return userInfo?.accessToken ?? null;
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Fetch wrapper that retries once on 401 after refreshing the access token.
 */
const authFetch = async (url: string, init?: RequestInit): Promise<Response> => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(url, { ...init, headers: authHeaders(token) });

  if (res.status === 401) {
    await useAuthStore.getState().refreshAccessToken();
    const newToken = getAuthToken();
    if (!newToken) throw new Error('Session expired');
    return fetch(url, { ...init, headers: authHeaders(newToken) });
  }

  return res;
};

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
              body: JSON.stringify({
                productId: id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url ?? product.image,
                quantity: qty,
                color,
              }),
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
          try {
            const res = await authFetch(`${API_URL}cart/${productId}`, {
              method: 'DELETE',
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.message || 'Failed to remove item');
            }

            const data = await res.json();
            set({
              cartItems: mapApiItems(data.items as ApiCartItem[], get().cartItems),
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to remove item',
            });
          }
        } else {
          set({ cartItems: get().cartItems.filter((x) => x.id !== id) });
        }
      },

      clearCart: async () => {
        if (getAuthToken()) {
          try {
            const res = await authFetch(`${API_URL}cart`, {
              method: 'DELETE',
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.message || 'Failed to clear cart');
            }

            set({ cartItems: [] });
          } catch (error) {
            set({
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
        });

        // Sync to server in background
        if (getAuthToken()) {
          const item = get().cartItems.find((i) => i.id === id);
          if (!item) return;

          const productId = id.substring(0, id.lastIndexOf('-'));
          authFetch(`${API_URL}cart`, {
            method: 'POST',
            body: JSON.stringify({
              productId,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: 1,
              color: item.color,
            }),
          }).catch(() => {
            // Revert on failure
            set({
              cartItems: get().cartItems.map((i) =>
                i.id === id ? { ...i, quantity: currentQty } : i
              ),
              error: 'Failed to update quantity',
            });
          });
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
              body: JSON.stringify({
                productId,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                color: item.color,
              }),
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
