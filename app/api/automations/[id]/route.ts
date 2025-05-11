import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const ParamsSchema = z.object({
	id: z.string().uuid(),
});

export async function GET(req: Request, context: { params: { id: string } }) {
	try {
		const { id } = ParamsSchema.parse(context.params);

		const automation = await prisma.automation.findUnique({
			where: { id },
			include: {
				triggers: true,
				actions: true,
				// edges: true, if you store edges separately
			},
		});

		if (!automation) {
			return NextResponse.json(
				{ error: "Automation not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(automation);
	} catch (error) {
		console.error("[AUTOMATION_GET]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
