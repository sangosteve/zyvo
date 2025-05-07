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

	// Step 1: Exchange code for short-lived access token
	const shortTokenRes = await fetch(
		"https://api.instagram.com/oauth/access_token",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				client_id: "2104590016710116",
				client_secret: clientSecret,
				grant_type: "authorization_code",
				redirect_uri: redirectUri,
				code: code,
			}),
		}
	);

	const shortTokenData = await shortTokenRes.json();
	if (!shortTokenRes.ok) {
		console.error("Error getting short-lived token:", shortTokenData);
		return NextResponse.json(shortTokenData, { status: shortTokenRes.status });
	}

	const shortAccessToken = shortTokenData.access_token;

	// Step 2: Get Instagram user ID and info using the short-lived token
	const userInfoRes = await fetch(
		`https://graph.instagram.com/v22.0/me?fields=id,username&access_token=${shortAccessToken}`
	);

	const userInfo = await userInfoRes.json();
	if (!userInfoRes.ok) {
		console.error("Error getting IG user info:", userInfo);
		return NextResponse.json(userInfo, { status: userInfoRes.status });
	}

	console.log("userInfo: ", userInfo);

	const instagramUserId = userInfo.id;

	// Step 3: Get logged-in Clerk user
	const user = await currentUser();
	if (!user) {
		const state = Buffer.from(
			JSON.stringify({ accessToken: shortAccessToken, instagramUserId })
		).toString("base64");
		return NextResponse.redirect(new URL(`/sign-in?state=${state}`, req.url));
	}

	const existingUser = await findUser(user.id);
	if (!existingUser) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	// Step 4: Save to DB (store short-lived access token)
	await prisma.integration.upsert({
		where: {
			userId_type: {
				userId: existingUser.id,
				type: "INSTAGRAM",
			},
		},
		update: {
			accessToken: shortAccessToken,
			externalUserId: instagramUserId,
		},
		create: {
			userId: existingUser.id,
			type: "INSTAGRAM",
			accessToken: shortAccessToken,
			externalUserId: instagramUserId,
		},
	});

	// Step 5: Redirect to success page
	return NextResponse.redirect(
		new URL("https://gy3yg2zqw6wo.share.zrok.io/integrations", req.url)
	);
}
