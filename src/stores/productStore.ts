import { create } from 'zustand';
import { Product } from '@types';
import { API_URL, ApiResponse, normalizeApiProduct } from '@utils/api';

interface ProductState {
  products: Product[];
  productsLoading: boolean;
  productsError: string | undefined;
  product: Product | null;
  productLoading: boolean;
  productError: string | undefined;
  fetchProducts: () => Promise<void>;
  fetchProductDetails: (id: string) => Promise<void>;
  clearProductDetails: () => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  productsLoading: false,
  productsError: undefined,
  product: null,
  productLoading: false,
  productError: undefined,

  fetchProducts: async () => {
    set({ productsLoading: true, productsError: undefined });
    try {
      const response = await fetch(`${API_URL}products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const data = await response.json();
      const products: Product[] = Array.isArray(data)
        ? data
        : (data as ApiResponse).data.map(normalizeApiProduct);
      set({ productsLoading: false, products });
    } catch (error) {
      set({
        productsLoading: false,
        productsError: error instanceof Error ? error.message : 'Failed to fetch products',
      });
    }
  },

  fetchProductDetails: async (id: string) => {
    set({ productLoading: true, productError: undefined });
    try {
      const response = await fetch(`${API_URL}products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
      const product: Product = await response.json();
      set({ productLoading: false, product });
    } catch (error) {
      set({
        productLoading: false,
        productError: error instanceof Error ? error.message : 'Product not found',
      });
    }
  },

  clearProductDetails: () => {
    set({ product: null, productError: undefined });
  },
}));
