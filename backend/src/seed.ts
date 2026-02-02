import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "./models/Product";

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI environment variable is required");
  process.exit(1);
}

const MONGODB_URI: string = process.env.MONGODB_URI;

const PRODUCTS_URL = "https://www.course-api.com/react-store-products";
const SINGLE_PRODUCT_URL = "https://www.course-api.com/react-store-single-product";

interface ProductListItem {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping?: boolean;
  featured?: boolean;
}

async function fetchProducts(): Promise<ProductListItem[]> {
  const response = await fetch(PRODUCTS_URL);
  return response.json();
}

async function fetchSingleProduct(id: string) {
  const response = await fetch(`${SINGLE_PRODUCT_URL}?id=${id}`);
  return response.json();
}

async function seed() {
  try {
    console.log("Fetching products list...");
    const productList = await fetchProducts();
    console.log(`Found ${productList.length} products`);

    console.log("Fetching individual product details...");
    const fullProducts = [];

    for (const product of productList) {
      console.log(`  Fetching: ${product.name}`);
      const fullProduct = await fetchSingleProduct(product.id);
      // Add image field from first image in images array
      fullProduct.image = fullProduct.images?.[0]?.url || product.image;
      // Add featured from list data (not in single product response)
      if (product.featured) {
        fullProduct.featured = true;
      }
      fullProducts.push(fullProduct);
      // Small delay to avoid rate limiting
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(fullProducts);
    console.log(`Seeded ${fullProducts.length} products with full details`);

    await mongoose.disconnect();
    console.log("Done!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
