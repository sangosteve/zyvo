"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Action, useActionModal } from "@/stores/use-action-modal";
import { Button } from "@/components/ui/button";

const availableActions = [
    {
        id: "send_dm",
        label: "Send Instagram DM",
        description: "Send a direct message to the user.",
    },
    {
        id: "add_to_label",
        label: "Add Label",
        description: "Organize the user by applying a label.",
    },
    {
        id: "assign_agent",
        label: "Assign to Agent",
        description: "Forward this user to a team member.",
    },
];

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AddActionModal({ open, onClose }: Props) {
    const { nodeId, selectActionForNode } = useActionModal();

    const handleSelect = () => {
        if (!nodeId) return;

        selectActionForNode(nodeId, {
            label: "Send Instagram DM",
            description: "Send a direct message to the user.",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Select Action</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {availableActions.map((action) => (
                        <Button
                            key={action.id}
                            variant="outline"
                            className="w-full flex flex-col items-start"
                            onClick={() => handleSelect(action)}
                        >
                            <p className="font-medium">{action.label}</p>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
