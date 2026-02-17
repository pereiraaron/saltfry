import { create } from 'zustand';
import { Order, LineItem } from '@types';
import { API_URL } from '@utils/api';
import { authFetch } from '@utils/authFetch';

interface ApiOrder extends Omit<Order, 'id'> {
  _id: string;
}

const mapOrder = (raw: ApiOrder): Order => {
  const { _id: rawId, ...rest } = raw;
  return { id: rawId, ...rest };
};

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  checkoutLoading: boolean;
  error: string | undefined;
  checkout: (lineItems?: LineItem[]) => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchOrder: (id: string) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>()((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  checkoutLoading: false,
  error: undefined,

  checkout: async (lineItems?: LineItem[]) => {
    set({ checkoutLoading: true, error: undefined });
    try {
      const res = await authFetch(`${API_URL}orders`, {
        method: 'POST',
        body: JSON.stringify(lineItems?.length ? { lineItems } : {}),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create checkout session');
      }

      const data: { order: ApiOrder; checkoutUrl: string } = await res.json();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      set({
        checkoutLoading: false,
        error: error instanceof Error ? error.message : 'Checkout failed',
      });
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await authFetch(`${API_URL}orders`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch orders');
      }

      const raw: ApiOrder[] = await res.json();
      set({ orders: raw.map(mapOrder), loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch orders',
      });
    }
  },

  fetchOrder: async (id: string) => {
    set({ loading: true, error: undefined, currentOrder: null });
    try {
      const res = await authFetch(`${API_URL}orders/${id}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch order');
      }

      const raw: ApiOrder = await res.json();
      set({ currentOrder: mapOrder(raw), loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch order',
      });
    }
  },

  cancelOrder: async (id: string) => {
    set({ loading: true, error: undefined });
    try {
      const res = await authFetch(`${API_URL}orders/${id}/cancel`, { method: 'PATCH' });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to cancel order');
      }

      const raw: ApiOrder = await res.json();
      const cancelled = mapOrder(raw);
      set({
        orders: get().orders.map((o) => (o.id === id ? cancelled : o)),
        currentOrder: get().currentOrder?.id === id ? cancelled : get().currentOrder,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to cancel order',
      });
    }
  },

  clearError: () => {
    set({ error: undefined });
  },
}));
