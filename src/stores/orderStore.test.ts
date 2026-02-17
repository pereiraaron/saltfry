import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authFetch } from '@utils/authFetch';
import { useOrderStore } from './orderStore';

vi.mock('@utils/authFetch', () => ({
  authFetch: vi.fn(),
}));

vi.mock('@utils/api', () => ({
  API_URL: 'http://test-api/',
}));

const mockAuthFetch = vi.mocked(authFetch);

const makeApiOrder = (overrides?: Record<string, unknown>) => ({
  _id: 'order-1',
  userId: 'user-1',
  items: [
    {
      productId: 'prod-1',
      name: 'Table',
      price: 5000,
      image: 'table.jpg',
      quantity: 2,
      color: '#000',
    },
  ],
  lineItems: [{ name: 'Shipping', amount: 1000 }],
  total: 11000,
  status: 'pending',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  useOrderStore.setState({
    orders: [],
    currentOrder: null,
    loading: false,
    checkoutLoading: false,
    error: undefined,
  });
});

describe('checkout', () => {
  it('sends lineItems in POST body and redirects on success', async () => {
    const hrefSetter = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window.location, 'href', {
      set: hrefSetter,
      get: () => '',
      configurable: true,
    });

    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        order: makeApiOrder(),
        checkoutUrl: 'https://checkout.stripe.com/session-123',
      }),
    } as Response);

    await useOrderStore.getState().checkout([{ name: 'Shipping', amount: 1000 }]);

    expect(mockAuthFetch).toHaveBeenCalledWith('http://test-api/orders', {
      method: 'POST',
      body: JSON.stringify({ lineItems: [{ name: 'Shipping', amount: 1000 }] }),
    });
    expect(hrefSetter).toHaveBeenCalledWith('https://checkout.stripe.com/session-123');
  });

  it('sends empty body when no lineItems', async () => {
    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        order: makeApiOrder(),
        checkoutUrl: 'https://checkout.stripe.com/session-456',
      }),
    } as Response);

    await useOrderStore.getState().checkout([]);

    expect(mockAuthFetch).toHaveBeenCalledWith('http://test-api/orders', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  });

  it('sets error on failure', async () => {
    mockAuthFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Cart is empty' }),
    } as Response);

    await useOrderStore.getState().checkout();

    const state = useOrderStore.getState();
    expect(state.error).toBe('Cart is empty');
    expect(state.checkoutLoading).toBe(false);
  });
});

describe('fetchOrders', () => {
  it('populates orders and maps _id to id', async () => {
    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [makeApiOrder(), makeApiOrder({ _id: 'order-2' })],
    } as Response);

    await useOrderStore.getState().fetchOrders();

    const state = useOrderStore.getState();
    expect(state.orders).toHaveLength(2);
    expect(state.orders[0].id).toBe('order-1');
    expect(state.orders[1].id).toBe('order-2');
    expect(state.loading).toBe(false);
  });

  it('sets error on failure', async () => {
    mockAuthFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Unauthorized' }),
    } as Response);

    await useOrderStore.getState().fetchOrders();

    expect(useOrderStore.getState().error).toBe('Unauthorized');
    expect(useOrderStore.getState().loading).toBe(false);
  });
});

describe('fetchOrder', () => {
  it('sets currentOrder on success', async () => {
    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => makeApiOrder(),
    } as Response);

    await useOrderStore.getState().fetchOrder('order-1');

    const state = useOrderStore.getState();
    expect(state.currentOrder?.id).toBe('order-1');
    expect(state.currentOrder?.total).toBe(11000);
    expect(state.loading).toBe(false);
  });

  it('sets error on failure', async () => {
    mockAuthFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Not found' }),
    } as Response);

    await useOrderStore.getState().fetchOrder('bad-id');

    expect(useOrderStore.getState().error).toBe('Not found');
  });
});

describe('cancelOrder', () => {
  it('updates order in list and currentOrder', async () => {
    const pendingOrder = {
      id: 'order-1',
      userId: 'user-1',
      items: makeApiOrder().items,
      lineItems: [{ name: 'Shipping', amount: 1000 }],
      total: 11000,
      status: 'pending' as const,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };

    useOrderStore.setState({
      orders: [pendingOrder],
      currentOrder: pendingOrder,
    });

    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => makeApiOrder({ status: 'cancelled' }),
    } as Response);

    await useOrderStore.getState().cancelOrder('order-1');

    const state = useOrderStore.getState();
    expect(state.orders[0].status).toBe('cancelled');
    expect(state.currentOrder?.status).toBe('cancelled');
    expect(state.loading).toBe(false);
  });

  it('sets error on failure', async () => {
    useOrderStore.setState({
      orders: [],
      currentOrder: null,
    });

    mockAuthFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Cannot cancel confirmed order' }),
    } as Response);

    await useOrderStore.getState().cancelOrder('order-1');

    expect(useOrderStore.getState().error).toBe('Cannot cancel confirmed order');
  });
});

describe('clearError', () => {
  it('clears the error', () => {
    useOrderStore.setState({ error: 'some error' });
    useOrderStore.getState().clearError();
    expect(useOrderStore.getState().error).toBeUndefined();
  });
});
