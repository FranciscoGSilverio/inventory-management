import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.product.deleteMany(); // Clear existing records

  const quantity = 20;

  const productData = Array.from({ length: quantity }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    imageUrl: "https://via.placeholder.com/300", // consistent placeholder
    stock: faker.number.int({ min: 0, max: 200 }),
    category: faker.commerce.department(),
    avgRating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // range 3.0–5.0
  }));

  await prisma.product.createMany({ data: productData });

  console.log(`✅ Seeded ${quantity} products.`);
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  prisma.$disconnect();
  process.exit(1);
});
