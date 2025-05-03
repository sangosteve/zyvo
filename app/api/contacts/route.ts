import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/actions/user";
// 1. Define Zod schema for validation
const contactSchema = z.object({
	firstname: z.string().min(2, "First name must be at least 2 characters"),
	lastname: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(5, "Phone number must be at least 5 characters"),
});

// 2. Handle POST request to create a contact
export async function POST(req: Request) {
	try {
		const user = await currentUser();

		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const existingUser = await findUser(user.id);
		const data = await req.json();

		// 3. Validate request body with Zod
		const result = contactSchema.safeParse(data);

		if (!result.success) {
			return NextResponse.json(
				{ error: result.error.flatten().fieldErrors },
				{ status: 400 }
			);
		}

		//const data = await req.json();

		// 4. Create contact in the database
		const contact = await prisma.contact.create({
			data: {
				firstname: data.firstname,
				lastname: data.lastname,
				email: data.email,
				phone: data.phone,
				userId: existingUser?.id || "",
			},
		});

		return NextResponse.json(contact, { status: 201 });
	} catch (error) {
		console.error("Create contact error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		const user = await currentUser();

		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const existingUser = await findUser(user.id);

		const contacts = await prisma.contact.findMany({
			where: {
				userId: existingUser?.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return Response.json(contacts);
	} catch (error) {
		console.error("Error fetching contacts:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
