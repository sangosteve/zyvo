import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/actions/user";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
	const state = req.nextUrl.searchParams.get("state");
	if (!state) {
		return NextResponse.json({ error: "Missing state" }, { status: 400 });
	}

	try {
		const decodedState = JSON.parse(Buffer.from(state, "base64").toString());
		const { accessToken, expiresIn, userId } = decodedState;

		const user = await currentUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const existingUser = await findUser(user.id);
		if (!existingUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Save integration to DB
		await prisma.integration.upsert({
			where: {
				userId_type: {
					userId: existingUser.id,
					type: "INSTAGRAM",
				},
			},
			update: {
				accessToken,
				expiresAt: new Date(Date.now() + expiresIn * 1000),
				externalUserId: userId,
			},
			create: {
				userId: existingUser.id,
				type: "INSTAGRAM",
				accessToken,
				expiresAt: new Date(Date.now() + expiresIn * 1000),
				externalUserId: userId,
			},
		});

		// Redirect to integrations page
		return NextResponse.redirect(new URL("/integrations", req.url));
	} catch (error) {
		console.error("Error completing Instagram connection:", error);
		return NextResponse.json({ error: "Invalid state" }, { status: 400 });
	}
}
