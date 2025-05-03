// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: process.env.NODE_ENV === "development" ? ["query"] : [],
	});
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
