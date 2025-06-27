import CustomTable from "app/components/CustomTable/CustomTable";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Product, ProductDto } from "types/Product";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "~/db/product.server";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";

import { FilterForm } from "~/components/FilterForm/FilterForm";
import { DeleteConfirmationDialog } from "~/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import { useMemo, useState } from "react";
import { ProductFormDialog } from "~/components/ProductFormDialog/ProductFormDialog";
import { CreateProductDialogOptions } from "types/General";
import { formDataToObject } from "~/lib/FormDataToObject";
import { objectToFormData } from "~/lib/ObjectToFormData";

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

  if (request.method === "POST") {
    formData.delete("productId");
    const data = formDataToObject(formData);

    data.price = Number(data.price);
    data.stock = Number(data.stock);
    data.avgRating = Number(data.avgRating) || 0;

    await createProduct(data as unknown as ProductDto);
    return redirect("/");
  }

  if (request.method === "DELETE") {
    const id = formData.get("productId");
    if (typeof id !== "string") {
      return Response.json({ error: "Invalid product ID" }, { status: 400 });
    }
    await deleteProduct(id);
    return redirect("/");
  }
  if (request.method === "PUT") {
    const id = formData.get("productId");
    if (typeof id !== "string") {
      return Response.json({ error: "Invalid product ID" }, { status: 400 });
    }
    formData.delete("productId");
    const data = formDataToObject(formData);

    data.price = Number(data.price);
    data.stock = Number(data.stock);

    await updateProduct(id, data as unknown as ProductDto);
    return redirect("/");
  }

  return Response.json({ error: "Invalid request" }, { status: 400 });
};

export default function Index() {
  const { products } = useLoaderData<{ products: Product[] }>();
  const fetcher = useFetcher();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] =
    useState<CreateProductDialogOptions>({
      open: false,
      mode: "create",
    });
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
    setSelectedProductId(null);
  };

  const handleUpdateProduct = (newProduct: ProductDto) => {
    if (!selectedProductId) return;
    const formData = objectToFormData(newProduct);

    fetcher.submit(formData, {
      method: "PUT",
    });
    setSelectedProductId(null);
  };

  const handleCreateProduct = (newProduct: ProductDto) => {
    console.log("handle create product called", newProduct);
    const formData = objectToFormData(newProduct);
    fetcher.submit(formData, {
      method: "POST",
    });
  };

  const initialValues = useMemo(() => {
    if (!selectedProductId) return {};
    const product = products.find((p) => p.id === selectedProductId);
    return product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          category: product.category,
        }
      : {};
  }, [selectedProductId]);

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
            editCallback={(product_id: string) => {
              setSelectedProductId(product_id);
              setIsCreateDialogOpen({
                open: true,
                mode: "update",
              });
            }}
            createCallback={() =>
              setIsCreateDialogOpen({ open: true, mode: "create" })
            }
          />
        </div>
      </div>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        handleDelete={handleDelete}
      />
      <ProductFormDialog
        open={isCreateDialogOpen.open}
        onOpenChange={() =>
          setIsCreateDialogOpen((prev) => ({
            ...prev,
            open: false,
          }))
        }
        mode={isCreateDialogOpen.mode}
        onSubmit={(values) => {
          if (isCreateDialogOpen.mode === "create") {
            handleCreateProduct(values);
            return;
          }
          handleUpdateProduct(values);
        }}
        initialValues={
          isCreateDialogOpen.mode === "update" ? initialValues : {}
        }
      />
    </>
  );
}
