import { create } from "zustand";

type Trigger = {
	id: string;
	label: string;
	description: string;
};

type TriggerModalState = {
	open: boolean;
	nodeId: string | null;
	selectedTriggers: Trigger[];
	openModal: () => void;
	closeModal: () => void;
	addTrigger: (trigger: Trigger) => void;
	removeTrigger: (triggerId: string) => void;
};

export const useTriggerModal = create<TriggerModalState>((set) => ({
	open: false,
	nodeId: null,
	selectedTriggers: [],
	openModal: () => set({ open: true }),
	closeModal: () => set({ open: false, nodeId: null }),
	addTrigger: (trigger) =>
		set((state) => {
			const exists = state.selectedTriggers.some((t) => t.id === trigger.id);
			return exists
				? {}
				: { selectedTriggers: [...state.selectedTriggers, trigger] };
		}),
	removeTrigger: (triggerId) =>
		set((state) => ({
			selectedTriggers: state.selectedTriggers.filter(
				(t) => t.id !== triggerId
			),
		})),
}));
