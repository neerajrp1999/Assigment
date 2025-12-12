import { readFile } from "fs/promises";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt: string;
  isActive: boolean;
  tags: string[];
}

let cachedProducts: Product[] | null = null;

async function loadProducts(filePath: string): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }

  const fileData = await readFile(filePath, "utf-8");
  cachedProducts = JSON.parse(fileData) as Product[];

  return cachedProducts;
}

export { Product, loadProducts };
