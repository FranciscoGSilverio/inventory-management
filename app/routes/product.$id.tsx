import { Product } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Image } from "lucide-react";
import { getProducts } from "~/db/product.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response("Product ID is required", { status: 400 });
  }

  const product = await getProducts({ id });

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return Response.json({ product });
}

export default function ProductPage() {
  const { product } = useLoaderData<{ product: Product }>();

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="max-w-2xl m-auto p-6 border shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="w-[200px] h-[300px] relative mx-auto">
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.avgRating}</p>
      </div>
    </div>
  );
}
