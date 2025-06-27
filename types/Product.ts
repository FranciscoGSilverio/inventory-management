export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductDto = Omit<Product, "id" | "createdAt" | "updatedAt">;