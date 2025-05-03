"use server";
import { prisma } from "@/lib/prisma";

export async function createUserIfNotExists({
	clerkId,
	email,
	firstname,
	lastname,
}: {
	clerkId: string;
	email: string;
	firstname?: string;
	lastname?: string;
}) {
	const existingUser = await prisma.user.findUnique({ where: { clerkId } });

	if (!existingUser) {
		await prisma.user.create({
			data: { clerkId, email, firstname, lastname },
		});
	}

	return;
}

//query

export const findUser = async (clerkId: string) => {
	return await prisma.user.findUnique({
		where: {
			clerkId,
		},
	});
};
