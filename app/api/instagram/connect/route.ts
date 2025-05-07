// app/api/instagram/connect/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	const clientId = process.env.INSTAGRAM_CLIENT_ID!;
	const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;
	const scope = "user_profile,user_media"; // adjust as needed
	const state = "someRandomState123"; // optionally use crypto.randomUUID()

	const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=2104590016710116&redirect_uri=${redirectUri}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
	return NextResponse.redirect(authUrl);
}
