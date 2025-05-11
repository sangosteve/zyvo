"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useActionModal } from "@/stores/use-action-modal";

export const ActionTextSheet = () => {
    const { sheetOpen, closeSheet, nodeId, textActions, setTextForNode } = useActionModal();

    const value = nodeId ? textActions[nodeId] || "" : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (nodeId) {
            setTextForNode(nodeId, e.target.value);
        }
    };

    return (
        <Sheet open={sheetOpen} onOpenChange={closeSheet}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add Instagram DM Text</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <Input value={value} onChange={handleChange} placeholder="Type your DM here..." />
                </div>
            </SheetContent>
        </Sheet>
    );
};
