// app/api/automations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust import based on your Prisma instance
import { automationSchema } from "@/lib/validations/automation";
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/actions/user";

export async function POST(req: Request) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await req.json();
	const parsed = automationSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error }, { status: 400 });
	}
	const existingUser = await findUser(user.id);
	const { name, description } = parsed.data;

	const automation = await prisma.automation.create({
		data: {
			name,
			description,
			userId: existingUser?.id,
			triggers: {
				create: {
					type: "", // create empty trigger
				},
			},
		},
		include: {
			triggers: true, // return the trigger in case frontend wants it
		},
	});

	return NextResponse.json(automation, { status: 201 });
}

export async function GET() {
	const user = await currentUser();

	if (!user)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const existingUser = await findUser(user.id);
	const automations = await prisma.automation.findMany({
		where: { userId: existingUser?.id },
		orderBy: { createdAt: "desc" },
	});

	return NextResponse.json(automations);
}
