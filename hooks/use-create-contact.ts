import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateContact() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: {
			firstname: string;
			lastname: string;
			email: string;
			phone: string;
		}) => {
			const res = await fetch("/api/contacts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Failed to create contact");
			}

			return res.json();
		},

		onSuccess: () => {
			// Optional: refetch contacts list
			queryClient.invalidateQueries({ queryKey: ["contacts"] });
		},
	});
}
