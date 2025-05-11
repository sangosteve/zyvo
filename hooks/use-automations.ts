import { useQuery } from "@tanstack/react-query";

export const useAutomations = () => {
	return useQuery({
		queryKey: ["automations"],
		queryFn: async () => {
			const res = await fetch("/api/automations");
			if (!res.ok) throw new Error("Failed to fetch automations");
			return res.json();
		},
		staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
	});
};
