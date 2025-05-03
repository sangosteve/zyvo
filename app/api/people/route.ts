import { NextResponse } from "next/server";

// This is the test GET route for debugging
export async function GET(req: Request) {
	try {
		console.log("Test GET Webhook Called");

		return new NextResponse("Test webhook response", { status: 200 });
	} catch (error) {
		console.error("Error in GET webhook:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
