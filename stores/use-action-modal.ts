import { create } from "zustand";

type ActionData = {
	label: string;
	description: string;
};

type ActionModalState = {
	open: boolean;
	sheetOpen: boolean;
	nodeId: string | null;
	selectedActions: Record<string, ActionData>;
	textActions: Record<string, string>;
	openModal: (nodeId: string) => void;
	closeModal: () => void;
	selectActionForNode: (nodeId: string, action: ActionData) => void;
	setTextForNode: (nodeId: string, text: string) => void;
	openSheet: (nodeId: string) => void;
	closeSheet: () => void;
};

export const useActionModal = create<ActionModalState>((set) => ({
	open: false,
	sheetOpen: false,
	nodeId: null,
	selectedActions: {},
	textActions: {},

	openModal: (nodeId) => set({ open: true, nodeId }),
	closeModal: () => set({ open: false, nodeId: null }),

	selectActionForNode: (nodeId, action) =>
		set((state) => ({
			selectedActions: { ...state.selectedActions, [nodeId]: action },
			open: false,
			sheetOpen: true,
			nodeId,
		})),

	setTextForNode: (nodeId, text) =>
		set((state) => ({
			textActions: { ...state.textActions, [nodeId]: text },
		})),

	openSheet: (nodeId) => set({ sheetOpen: true, nodeId }),
	closeSheet: () => set({ sheetOpen: false, nodeId: null }),
}));
