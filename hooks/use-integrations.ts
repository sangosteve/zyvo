// lib/hooks/useIntegrations.ts
import { useQuery } from "@tanstack/react-query";

export function useIntegrations() {
	return useQuery({
		queryKey: ["integrations"],
		queryFn: async () => {
			const res = await fetch("/api/integrations");
			if (!res.ok) throw new Error("Failed to fetch integrations");
			return res.json();
		},
	});
}
