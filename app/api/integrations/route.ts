// app/api/integrations/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { findUser } from "@/actions/user";

export async function GET() {
	const user = await currentUser();
	if (!user)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const existingUser = await findUser(user.id);

	const integrations = await prisma.integration.findMany({
		where: { userId: existingUser?.id },
		select: { type: true, externalUserId: true },
	});

	return NextResponse.json({ integrations });
}
