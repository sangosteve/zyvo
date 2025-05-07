"use client";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";;
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTriggerModal } from "@/stores/use-trigger-modal";

type TriggerNodeData = {
    label: string;
    triggers: {
        id: string;
        label: string;
        description: string;
    }[];
};



export function TriggerNode({ data, id }: NodeProps<TriggerNodeData>) {
    const { setNodes } = useReactFlow();

    const { openModal, selectedTriggers } = useTriggerModal();


    return (
        <div className="rounded-sm border bg-background text-foreground shadow-sm w-60 relative px-4 py-3 space-y-2 hover:border-primary hover:cursor-pointer">
            <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground">When…</p>
                <p className="text-[9px] text-muted-foreground">
                    The automation is triggered when the following occurs…
                </p>
            </div>
            {selectedTriggers.map((trigger) => (
                <div key={trigger.id} className="rounded bg-muted p-2 text-xs">
                    <p className="font-medium">{trigger.label}</p>
                    <p className="text-muted-foreground text-[10px]">{trigger.description}</p>
                </div>
            ))}
            <Button onClick={() => openModal()} size={"sm"} className="w-full border border-primary border-dashed bg-transparent text-primary hover:bg-purple-300"><Plus /> Add Trigger</Button>
            <Handle type="source" position={Position.Right} className="w-2 h-2 bg-muted rounded-sm" />

        </div>
    );
}
