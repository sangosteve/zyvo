"use client";
import React, { useCallback, useRef } from "react";
import {
    Background,
    BackgroundVariant,
    ConnectionLineType,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerNode } from "./trigger-node";
import { ActionNode } from "./action-node";
import { AddTriggerModal } from "./trigger-modal";
import { useTriggerModal } from "@/stores/use-trigger-modal";

const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
};

let id = 2;
const getId = () => `trigger-${id++}`;

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: "trigger-1",
            type: "trigger",
            position: { x: 100, y: 0 },
            data: {
                label: "New Message Received",
                config: { keywords: ["hi", "order", "price"] },
            },
        },
    ]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
    const { open, closeModal } = useTriggerModal();

    const connectingNodeId = useRef<string | null>(null);

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent) => {
            const source = connectingNodeId.current;
            if (!source) return;

            const { clientX, clientY } =
                "changedTouches" in event ? event.changedTouches[0] : event;

            const position = screenToFlowPosition({ x: clientX, y: clientY });

            // Only add a node if we dropped on empty space (not another node)
            const intersects = getIntersectingNodes({
                x: position.x,
                y: position.y,
                width: 1,
                height: 1,
            });

            if (intersects.length === 0) {
                const newId = getId();
                const newNode = {
                    id: newId,
                    type: "action", // ✅ Now creates Action Node
                    position,
                    data: {
                        label: "New Action",
                    },
                };

                setNodes((nds) => [...nds, newNode]);
                setEdges((eds) => [
                    ...eds,
                    {
                        id: `edge-${source}-${newId}`,
                        source,
                        target: newId,
                        type: "smoothstep",
                        markerEnd: {
                            type: 'arrowclosed',  // Arrowhead at the target end
                            width: 12,
                            height: 12,
                        },
                    },
                ]);
            }

            connectingNodeId.current = null;
        },
        [screenToFlowPosition, getIntersectingNodes]
    );

    return (
        <main className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                connectionLineType={ConnectionLineType.B}
                fitView
            >
                <Controls position="top-left" />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
            <AddTriggerModal open={open} onClose={closeModal} />
        </main>
    );
};

export default Flow;
