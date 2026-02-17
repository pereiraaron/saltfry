import { Product } from '@types';

export const API_URL = import.meta.env.VITE_API_URL;

export interface ApiProduct {
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

export interface ApiResponse {
  data: ApiProduct[];
  meta: Record<string, unknown>;
}

export const normalizeApiProduct = (item: ApiProduct): Product => ({
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
