import { Button } from "@/components/ui/button";
import { useActionModal } from "@/stores/use-action-modal";
import { NodeProps, Position } from "@xyflow/react";
import { Plus } from "lucide-react";
import { CustomHandle } from "../shared/custom-handle";

export function ActionNode({ id }: NodeProps) {
    const { selectedActions, textActions, openModal } = useActionModal();
    const action = selectedActions[id];
    const text = textActions[id] || "";

    return (
        <div className="rounded-sm border bg-background text-foreground shadow-sm w-60 relative px-4 py-3 space-y-2 hover:border-primary hover:cursor-pointer">
            <p className="text-xs font-bold text-muted-foreground">Do Action</p>

            {action && (
                <div className="rounded bg-muted p-2 text-xs">
                    <p className="font-medium">{action.label}</p>
                    {text && <p className="text-muted-foreground text-[10px]">{text}</p>}
                </div>
            )}

            <Button
                onClick={() => openModal(id)}
                size="sm"
                className="w-full border border-primary border-dashed bg-transparent text-primary hover:bg-purple-300"
            >
                <Plus />
                {action ? "Edit Action" : "Add Action"}
            </Button>

            <CustomHandle type="target" position={Position.Left} />
            <CustomHandle type="source" position={Position.Right} />
        </div>
    );
}