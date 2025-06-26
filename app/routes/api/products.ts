import { Product } from "types/Product";

const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description for Product 1",
    price: 29.99,
    imageUrl: "https://example.com/product1.jpg",
    stock: 100,
    category: "Category A",
    avgRating: 4.5,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description for Product 2",
    price: 49.99,
    imageUrl: "https://example.com/product2.jpg",
    stock: 50,
    category: "Category B",
    avgRating: 4.0,
  },
  {
    id: "3",
    name: "Product 3",
    description: "Description for Product 3",
    price: 19.99,
    imageUrl: "https://example.com/product3.jpg",
    stock: 200,
    category: "Category A",
    avgRating: 4.8,
  },
];

export function loader() {
  return Response.json(products);
}
