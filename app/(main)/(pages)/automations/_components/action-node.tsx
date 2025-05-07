"use client";
import { Handle, NodeProps, Position } from "@xyflow/react";

type ActionNodeData = {
    label: string;
};

export function ActionNode({ data }: NodeProps<ActionNodeData>) {
    return (
        <div className="rounded-sm border bg-background text-foreground shadow-sm w-60 relative px-4 py-3 space-y-2">
            <p className="text-xs font-bold text-muted-foreground">Do Action</p>
            <p className="text-sm">{data.label}</p>

            {/* Allow connections on both ends */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-2 h-2 bg-muted rounded-sm"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-2 h-2 bg-muted rounded-sm"
            />
        </div>
    );
}
