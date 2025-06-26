import CustomTable from "app/components/CustomTable/CustomTable";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Product } from "types/Product";
import { getProducts } from "~/db/product.server";
import { useLoaderData } from "@remix-run/react";

import { FilterForm } from "~/components/FilterForm/FilterForm";

export const meta: MetaFunction = () => {
  return [{ title: "Inventory Management App" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("product")?.trim() || "";

  const products = await getProducts({
    name: query ? query : undefined,
  });

  return Response.json({ products });
};

export default function Index() {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <div className="w-full h-full">
      <FilterForm />

      <div className="max-w-[80%] mx-auto mt-5 mb-5">
        <CustomTable products={products} />
      </div>
    </div>
  );
}
