import { PrismaClient } from "@prisma/client";

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
