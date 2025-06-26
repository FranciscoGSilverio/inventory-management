import CustomTable from "app/components/CustomTable/CustomTable";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Product } from "types/Product";
import { getAllProducts } from "~/db/product.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Inventory Management App" }];
};

export const loader: LoaderFunction = async () => {
  const products = await getAllProducts();
  return Response.json({ products });
};

export default function Index() {
  const products = useLoaderData<{ products: Product[] }>().products;
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
