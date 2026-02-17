import React from 'react';

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
  images?: ProductImage[];
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping?: boolean;
  featured?: boolean;
  stock?: number;
  reviews?: number;
  stars?: number;
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

export interface ApiCartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
}

export interface ApiCartResponse {
  userId: string;
  items: ApiCartItem[];
}

// User Types
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

// Link Type
export interface Link {
  id: number;
  text: string;
  url: string;
}

// Service Type
export interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}
