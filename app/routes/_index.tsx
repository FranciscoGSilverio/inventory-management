import CustomTable from "app/components/CustomTable/CustomTable";
import type { MetaFunction } from "@remix-run/node";
import { Product } from "types/Product";

export const meta: MetaFunction = () => {
  return [{ title: "Inventory Management App" }];
};

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

export default function Index() {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold text-center mt-10">
        Welcome to the Inventory Management App
      </h1>
      <p className="text-center mt-4">
        This app helps you manage your product inventory efficiently.
      </p>
      <div className="max-w-[1500px] mx-auto mt-5">
        <CustomTable products={products} />
      </div>
    </div>
  );
}
