const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Criminal lawyer" },
        { name: "Civil lawyer" },
        { name: "Cyber lawyer" },
        { name: "Government lawyer" },
        { name: "Corporate lawyer" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
