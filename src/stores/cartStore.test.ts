import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';

vi.mock('@utils/authFetch', () => ({
  authFetch: vi.fn(),
  getAuthToken: vi.fn(() => null),
}));

vi.mock('@utils/api', () => ({
  API_URL: 'http://test-api/',
}));

vi.mock('./productStore', () => ({
  useProductStore: {
    getState: vi.fn(() => ({
      products: [
        {
          id: 'prod-1',
          name: 'Table',
          price: 5000,
          image: 'table.jpg',
          images: [{ url: 'table-lg.jpg' }],
          colors: ['#000', '#fff'],
          company: 'Co',
          description: 'A table',
          category: 'office',
          stock: 10,
        },
      ],
    })),
  },
}));

import { authFetch, getAuthToken } from '@utils/authFetch';

const mockAuthFetch = vi.mocked(authFetch);
const mockGetAuthToken = vi.mocked(getAuthToken);

const initialState = {
  cartItems: [],
  cartLoading: false,
  loadingItems: new Set<string>(),
  clearingCart: false,
  error: undefined,
};

beforeEach(() => {
  vi.clearAllMocks();
  useCartStore.setState(initialState);
  mockGetAuthToken.mockReturnValue(null);
});

describe('fetchCart', () => {
  it('skips when unauthenticated', async () => {
    await useCartStore.getState().fetchCart();

    expect(mockAuthFetch).not.toHaveBeenCalled();
  });

  it('populates cartItems when authenticated', async () => {
    mockGetAuthToken.mockReturnValue('token');
    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    } as Response);

    await useCartStore.getState().fetchCart();

    const state = useCartStore.getState();
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].id).toBe('prod-1-#000');
    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.cartLoading).toBe(false);
  });

  it('sets error on API failure', async () => {
    mockGetAuthToken.mockReturnValue('token');
    mockAuthFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error' }),
    } as Response);

    await useCartStore.getState().fetchCart();

    expect(useCartStore.getState().error).toBe('Server error');
    expect(useCartStore.getState().cartLoading).toBe(false);
  });
});

describe('addToCart', () => {
  it('adds item locally when unauthenticated', async () => {
    await useCartStore.getState().addToCart('prod-1', 3, '#000');

    const state = useCartStore.getState();
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toMatchObject({
      id: 'prod-1-#000',
      name: 'Table',
      price: 5000,
      quantity: 3,
      color: '#000',
    });
    expect(mockAuthFetch).not.toHaveBeenCalled();
  });

  it('replaces existing item locally when unauthenticated', async () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 1,
          stock: 10,
        },
      ],
    });

    await useCartStore.getState().addToCart('prod-1', 5, '#000');

    const state = useCartStore.getState();
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].quantity).toBe(5);
  });

  it('syncs to server when authenticated', async () => {
    mockGetAuthToken.mockReturnValue('token');
    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            productId: 'prod-1',
            name: 'Table',
            price: 5000,
            image: 'table.jpg',
            quantity: 3,
            color: '#000',
          },
        ],
      }),
    } as Response);

    await useCartStore.getState().addToCart('prod-1', 3, '#000');

    expect(mockAuthFetch).toHaveBeenCalledWith('http://test-api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId: 'prod-1', quantity: 3, color: '#000' }),
    });
    expect(useCartStore.getState().cartItems).toHaveLength(1);
  });

  it('sets error when product not found', async () => {
    await useCartStore.getState().addToCart('unknown-id', 1, '#000');

    expect(useCartStore.getState().error).toBe('Product not found');
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });
});

describe('removeFromCart', () => {
  it('removes item locally when unauthenticated', async () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 1,
          stock: 10,
        },
      ],
    });

    await useCartStore.getState().removeFromCart('prod-1-#000');

    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('calls DELETE endpoint when authenticated', async () => {
    mockGetAuthToken.mockReturnValue('token');
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 1,
          stock: 10,
        },
      ],
    });

    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }),
    } as Response);

    await useCartStore.getState().removeFromCart('prod-1-#000');

    expect(mockAuthFetch).toHaveBeenCalledWith(
      'http://test-api/cart/prod-1?color=%23000',
      { method: 'DELETE' }
    );
    expect(useCartStore.getState().cartItems).toHaveLength(0);
    expect(useCartStore.getState().loadingItems.size).toBe(0);
  });
});

describe('incrementQuantity', () => {
  it('increments quantity optimistically', () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 2,
          stock: 10,
        },
      ],
    });

    useCartStore.getState().incrementQuantity('prod-1-#000', 2, 10);

    expect(useCartStore.getState().cartItems[0].quantity).toBe(3);
  });

  it('sets error when exceeding stock', () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 10,
          stock: 10,
        },
      ],
    });

    useCartStore.getState().incrementQuantity('prod-1-#000', 10, 10);

    expect(useCartStore.getState().error).toBe(
      'There are no more products available in stock'
    );
    expect(useCartStore.getState().cartItems[0].quantity).toBe(10);
  });
});

describe('decrementQuantity', () => {
  it('decrements quantity', () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 3,
          stock: 10,
        },
      ],
    });

    useCartStore.getState().decrementQuantity('prod-1-#000', 3);

    expect(useCartStore.getState().cartItems[0].quantity).toBe(2);
  });

  it('sets error when at minimum', () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 1,
          stock: 10,
        },
      ],
    });

    useCartStore.getState().decrementQuantity('prod-1-#000', 1);

    expect(useCartStore.getState().error).toBe("Product count can't be negative");
    expect(useCartStore.getState().cartItems[0].quantity).toBe(1);
  });
});

describe('clearCart', () => {
  it('clears cart locally when unauthenticated', async () => {
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 1,
          stock: 10,
        },
      ],
    });

    await useCartStore.getState().clearCart();

    expect(useCartStore.getState().cartItems).toHaveLength(0);
    expect(mockAuthFetch).not.toHaveBeenCalled();
  });

  it('calls DELETE endpoint when authenticated', async () => {
    mockGetAuthToken.mockReturnValue('token');
    useCartStore.setState({
      cartItems: [
        {
          id: 'prod-1-#000',
          name: 'Table',
          image: 'table.jpg',
          price: 5000,
          color: '#000',
          quantity: 1,
          stock: 10,
        },
      ],
    });

    mockAuthFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    await useCartStore.getState().clearCart();

    expect(mockAuthFetch).toHaveBeenCalledWith('http://test-api/cart', {
      method: 'DELETE',
    });
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });
});
