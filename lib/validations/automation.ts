// lib/validations/automation.ts

import { z } from "zod";

export const automationSchema = z.object({
	name: z.string().min(1, "Automation name is required"),
	description: z.string().optional(),
});

export type AutomationFormValues = z.infer<typeof automationSchema>;
