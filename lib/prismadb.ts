import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// accessed globally throughout the application.
declare global {
  var prisma: PrismaClient | undefined; //declares a global variable type of prisma client
}


const prismadb = globalThis.prisma || prisma;


if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}


export default prismadb;
