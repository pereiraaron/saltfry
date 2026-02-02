import { create } from 'zustand';
import { Product } from '../types';
import { products } from '../data/products';

interface ProductState {
  products: Product[];
  productsLoading: boolean;
  productsError: string | undefined;
  product: Product | null;
  productLoading: boolean;
  productError: string | undefined;
  fetchProducts: () => void;
  fetchProductDetails: (id: string) => void;
  clearProductDetails: () => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  productsLoading: false,
  productsError: undefined,
  product: null,
  productLoading: false,
  productError: undefined,

  fetchProducts: () => {
    set({ productsLoading: true, productsError: undefined });
    set({ productsLoading: false, products });
  },

  fetchProductDetails: (id: string) => {
    set({ productLoading: true, productError: undefined });
    const product = products.find((p) => p.id === id);
    if (product) {
      set({ productLoading: false, product });
    } else {
      set({ productLoading: false, productError: 'Product not found' });
    }
  },

  clearProductDetails: () => {
    set({ product: null, productError: undefined });
  },
}));
