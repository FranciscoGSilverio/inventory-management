import CustomTable from "app/components/CustomTable/CustomTable";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Product } from "types/Product";
import { deleteProduct, getProducts } from "~/db/product.server";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";

import { FilterForm } from "~/components/FilterForm/FilterForm";
import { DeleteConfirmationDialog } from "~/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import { useState } from "react";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("productId");

  if (request.method === "DELETE" && typeof id === "string") {
    await deleteProduct(id);
    return redirect("/");
  }

  return Response.json({ error: "Invalid request" }, { status: 400 });
};

export default function Index() {
  const { products } = useLoaderData<{ products: Product[] }>();
  const fetcher = useFetcher();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const handleDelete = () => {
    if (!selectedProductId) return;

    const formData = new FormData();
    formData.set("productId", selectedProductId);

    fetcher.submit(formData, {
      method: "DELETE",
    });

    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="w-full h-full">
        <FilterForm />

        <div className="max-w-[80%] mx-auto mt-5 mb-5">
          <CustomTable
            products={products}
            deleteCallback={(product_id: string) => {
              setSelectedProductId(product_id);
              setIsDeleteDialogOpen(true);
            }}
          />
        </div>
      </div>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}
