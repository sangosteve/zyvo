// stores/useTriggerStore.ts
import { create } from "zustand";

type TriggerStore = {
	open: boolean;
	triggerNodeId: string | null;
	triggerType: string | null;
	openSheet: (nodeId: string) => void;
	closeSheet: () => void;
	setTriggerType: (value: string) => void;
};

export const useTriggerStore = create<TriggerStore>((set) => ({
	open: false,
	triggerNodeId: null,
	triggerType: null,
	openSheet: (nodeId) => set({ open: true, triggerNodeId: nodeId }),
	closeSheet: () => set({ open: false }),
	setTriggerType: (value) => set({ triggerType: value }),
}));
