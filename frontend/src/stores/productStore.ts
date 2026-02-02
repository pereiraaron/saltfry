import { create } from 'zustand';
import axios from 'axios';
import { Product } from '../types';

const url = import.meta.env.VITE_BASE_URL;

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
    try {
      set({ productsLoading: true, productsError: undefined });
      const { data } = await axios.get(`${url}/react-store-products`);
      set({ productsLoading: false, products: data });
    } catch (error) {
      set({
        productsLoading: false,
        productsError: error instanceof Error ? error.message : 'Failed to fetch products',
      });
    }
  },

  fetchProductDetails: async (id: string) => {
    try {
      set({ productLoading: true, productError: undefined });
      const { data } = await axios.get(`${url}/react-store-single-product?id=${id}`);
      set({ productLoading: false, product: data });
    } catch (error) {
      set({
        productLoading: false,
        productError: error instanceof Error ? error.message : 'Failed to fetch product details',
      });
    }
  },

  clearProductDetails: () => {
    set({ product: null, productError: undefined });
  },
}));
