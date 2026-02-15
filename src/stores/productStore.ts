import { create } from 'zustand';
import { Product } from '@types';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiProduct {
  id: number;
  attributes: {
    title: string;
    company: string;
    description: string;
    featured: boolean;
    category: string;
    image: string;
    price: string;
    shipping: boolean;
    colors: string[];
  };
}

interface ApiResponse {
  data: ApiProduct[];
  meta: Record<string, unknown>;
}

const normalizeApiProduct = (item: ApiProduct): Product => ({
  id: String(item.id),
  name: item.attributes.title,
  price: Number(item.attributes.price),
  image: item.attributes.image,
  colors: item.attributes.colors,
  company: item.attributes.company,
  description: item.attributes.description,
  category: item.attributes.category,
  shipping: item.attributes.shipping,
  featured: item.attributes.featured,
});

interface ProductState {
  products: Product[];
  productsLoading: boolean;
  productsError: string | undefined;
  product: Product | null;
  productLoading: boolean;
  productError: string | undefined;
  fetchProducts: (params?: { featured?: boolean }) => Promise<void>;
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

  fetchProducts: async (params) => {
    set({ productsLoading: true, productsError: undefined });
    try {
      const url = new URL(`${API_URL}products`);
      if (params?.featured !== undefined) {
        url.searchParams.set('featured', String(params.featured));
      }
      const response = await fetch(url);
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
