import { readFile, writeFile as fsWriteFile } from "fs/promises";

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
  if (cachedProducts) return cachedProducts;

  const fileData = await readFile(filePath, "utf-8");
  cachedProducts = JSON.parse(fileData) as Product[];
  return cachedProducts;
}

async function writeFile(filePath: string, newProduct: Product): Promise<Product[]> {
  const products = await loadProducts(filePath);

  const existingIndex = products.findIndex((p) => p.id === newProduct.id);

  if (existingIndex !== -1) {
    products[existingIndex] = { ...products[existingIndex], ...newProduct };
  } else {
    const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
    newProduct.id = maxId + 1;
    products.push(newProduct);
  }

  await fsWriteFile(filePath, JSON.stringify(products, null, 2), "utf-8");

  cachedProducts = products;

  return products;
}


export { Product, loadProducts, writeFile };
