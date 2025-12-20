// Product Types
export interface ProductImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: ProductImage[];
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
  featured: boolean;
  stock: number;
  reviews: number;
  stars: number;
  color?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  color: string;
  quantity: number;
  stock: number;
}

export interface CartState {
  cartItems: CartItem[];
  error?: string;
}

// User Types
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface UserLoginState {
  loading?: boolean;
  userInfo: UserInfo | null;
  error?: string;
}

export interface UserRegisterState {
  loading?: boolean;
  userInfo: UserInfo | null;
  error?: string;
}

// Product List State
export interface ProductListState {
  loading?: boolean;
  products: Product[];
  error?: string;
}

// Product Detail State
export interface ProductDetailState {
  loading?: boolean;
  product: Product | null;
  error?: string;
}

// Product Screen State
export interface ProductScreenState {
  filteredProducts: $TSFixMe[];
  type?: string;
  gridView: boolean;
  filters: {
    filterkeyword: string;
    company: string;
    category: string;
    color: string;
    min_price: number;
    max_price: number;
    price: number;
    shipping: boolean;
  };
  loading?: boolean;
  error?: $TSFixMe;
  sorttype?: string;
}

// Sidebar State
export interface SidebarState {
  isSidebarOpen: boolean;
}

// Root State
export interface RootState {
  sidebar: SidebarState;
  userLogin: UserLoginState;
  userRegister: UserRegisterState;
  productList: ProductListState;
  productDetails: ProductDetailState;
  cart: CartState;
  productScreen: ProductScreenState;
}

// Action Types
export interface Action<T = $TSFixMe> {
  type: string;
  payload?: T;
  error?: string;
}

// Thunk Types
export type AppThunk<ReturnType = void> = (
  dispatch: $TSFixMe,
  getState: () => RootState
) => ReturnType;

// Link Type
export interface Link {
  id: number;
  text: string;
  url: string;
}

// Service Type
export interface Service {
  id: number;
  icon: $TSFixMe;
  title: string;
  text: string;
}
