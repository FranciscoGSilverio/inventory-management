import { PrismaClient } from "@prisma/client";
import { ProductDto } from "types/Product";

const prisma = new PrismaClient();

type GetProductsParams = {
  id?: string;
  name?: string;
};

export async function getProducts(params: GetProductsParams = {}) {
  const { id, name } = params;

  if (id) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  return prisma.product.findMany({
    where: name
      ? {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : undefined,
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}

export async function updateProduct(id: string, data: ProductDto) {
  if (!id || !data) {
    throw new Error("Invalid product ID or data");
  }

  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function createProduct(data: ProductDto) {
  console.log('create product called!!!')
  if (!data) {
    throw new Error("Invalid product data");
  }

  return prisma.product.create({
    data,
  });
}
