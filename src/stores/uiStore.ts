import { create } from 'zustand';
import { Product } from '@types';

interface Filters {
  filterkeyword: string;
  company: string;
  category: string;
  color: string;
  min_price: number;
  max_price: number;
  price: number;
  shipping: boolean;
}

interface UIState {
  isSidebarOpen: boolean;
  filteredProducts: Product[];
  gridView: boolean;
  sortType: string;
  filters: Filters;
  openSidebar: () => void;
  closeSidebar: () => void;
  setGridView: () => void;
  setListView: () => void;
  sortProducts: (sortType: string, products: Product[]) => void;
  updateFilter: (name: string, value: string | number | boolean) => void;
  applyFilters: (products: Product[]) => void;
  clearFilters: (products: Product[]) => void;
}

const initialFilters: Filters = {
  filterkeyword: '',
  company: 'all',
  category: 'all',
  color: 'all',
  min_price: 0,
  max_price: 0,
  price: 0,
  shipping: false,
};

export const useUIStore = create<UIState>()((set, get) => ({
  isSidebarOpen: false,
  filteredProducts: [],
  gridView: true,
  sortType: '',
  filters: initialFilters,

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  setGridView: () => set({ gridView: true }),
  setListView: () => set({ gridView: false }),

  sortProducts: (sortType: string, products: Product[]) => {
    if (products.length === 0) return;
    const sortedProducts = [...products];
    const maxPrice = Math.max(...products.map((p) => p.price));

    switch (sortType) {
      case 'SORT_LOWEST_PRICE':
        sortedProducts.sort((a, b) => a.price - b.price);
        set({
          filteredProducts: sortedProducts,
          sortType,
          filters: { ...get().filters, max_price: maxPrice, price: maxPrice },
        });
        break;
      case 'SORT_HIGHEST_PRICE':
        sortedProducts.sort((a, b) => b.price - a.price);
        set({ filteredProducts: sortedProducts, sortType });
        break;
      case 'SORT_NAME_A_Z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        set({ filteredProducts: sortedProducts, sortType });
        break;
      case 'SORT_NAME_Z_A':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        set({ filteredProducts: sortedProducts, sortType });
        break;
      default:
        break;
    }
  },

  updateFilter: (name: string, value: string | number | boolean) => {
    set({ filters: { ...get().filters, [name]: value } });
  },

  applyFilters: (products: Product[]) => {
    const { filterkeyword, category, company, color, price, shipping } = get().filters;
    let tempProducts = [...products];

    if (filterkeyword) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(filterkeyword)
      );
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => product.category === category);
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => product.company === company);
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => product.colors.find((c) => c === color));
    }
    if (price > 0) {
      tempProducts = tempProducts.filter((product) => product.price <= price);
    }
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true);
    }

    set({ filteredProducts: tempProducts });
  },

  clearFilters: (products: Product[]) => {
    const maxPrice = get().filters.max_price;
    set({
      filteredProducts: products,
      filters: {
        ...initialFilters,
        max_price: maxPrice,
        price: maxPrice,
      },
    });
  },
}));
