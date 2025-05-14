// lib/mutations/useUpdateTrigger.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTrigger(triggerId: string | null) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (event: string) => {
			if (!triggerId) throw new Error("No trigger ID provided");

			const res = await fetch(`/api/triggers/${triggerId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ event }),
			});

			if (!res.ok) {
				throw new Error("Failed to update trigger");
			}

			return res.json();
		},
		onSuccess: () => {
			// ✅ Invalidate the cache for this trigger so UI stays fresh
			queryClient.invalidateQueries({ queryKey: ["trigger", triggerId] });
		},
	});
}
