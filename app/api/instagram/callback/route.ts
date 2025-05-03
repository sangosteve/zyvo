import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/actions/user";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get("code");
	const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;
	const clientId = process.env.INSTAGRAM_CLIENT_ID!;
	const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET!;

	if (!code) {
		return NextResponse.json({ error: "Missing code" }, { status: 400 });
	}

	// Step 1: Get short-lived token
	const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: "authorization_code",
			redirect_uri: redirectUri,
			code,
		}),
	});

	const tokenData = await tokenRes.json();
	if (!tokenRes.ok) {
		console.error("Error getting short-lived token:", tokenData);
		return NextResponse.json(tokenData, { status: tokenRes.status });
	}

	const shortLivedToken = tokenData.access_token;

	// Step 2: Exchange for long-lived token
	const longLivedRes = await fetch(
		`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortLivedToken}`
	);
	const longLivedData = await longLivedRes.json();
	if (!longLivedRes.ok) {
		console.error("Error getting long-lived token:", longLivedData);
		return NextResponse.json(longLivedData, { status: longLivedRes.status });
	}

	// Step 3: Get the currently logged-in user
	const user = await currentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const existingUser = await findUser(user.id);
	if (!existingUser) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	// Step 4: Save integration to DB
	await prisma.integration.upsert({
		where: {
			userId_type: {
				userId: existingUser.id,
				type: "INSTAGRAM",
			},
		},
		update: {
			accessToken: longLivedData.access_token,
			expiresAt: new Date(Date.now() + longLivedData.expires_in * 1000),
			externalUserId: longLivedData.user_id,
		},
		create: {
			userId: existingUser.id,
			type: "INSTAGRAM",
			accessToken: longLivedData.access_token,
			expiresAt: new Date(Date.now() + longLivedData.expires_in * 1000),
			externalUserId: longLivedData.user_id,
		},
	});

	return NextResponse.json({ success: true, message: "Instagram connected" });
}
