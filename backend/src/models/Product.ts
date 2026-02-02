import mongoose, { Schema, Document } from "mongoose";

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface ProductImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
    full: Thumbnail;
  };
}

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  image: string;
  images: ProductImage[];
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping?: boolean;
  featured?: boolean;
  stock: number;
  reviews: number;
  stars: number;
}

const ThumbnailSchema = new Schema<Thumbnail>(
  {
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false },
);

const ProductImageSchema = new Schema<ProductImage>(
  {
    id: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    thumbnails: {
      small: ThumbnailSchema,
      large: ThumbnailSchema,
      full: ThumbnailSchema,
    },
  },
  { _id: false },
);

const ProductSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: { type: [ProductImageSchema], required: true },
  colors: { type: [String], required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  shipping: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  stock: { type: Number, default: 10 },
  reviews: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
