// app/api/triggers/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Update as needed
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/actions/user";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const existingUser = await findUser(user.id);
	if (!existingUser) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const trigger = await prisma.trigger.findUnique({
			where: { id: params.id },
		});

		if (!trigger) {
			return NextResponse.json({ error: "Trigger not found" }, { status: 404 });
		}

		return NextResponse.json(trigger);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch trigger" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const existingUser = await findUser(user.id);
	const triggerId = params.id;
	const { event } = await req.json();

	if (!existingUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	if (!event)
		return NextResponse.json({ error: "Missing event" }, { status: 400 });

	try {
		const updated = await prisma.trigger.update({
			where: { id: triggerId },
			data: { event },
		});

		return NextResponse.json(updated);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to update trigger" },
			{ status: 500 }
		);
	}
}
