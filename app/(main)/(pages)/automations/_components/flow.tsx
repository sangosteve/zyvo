"use client "
import React from 'react'
import { Background, BackgroundVariant, ConnectionLineType, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { TriggerNode } from './trigger-node';
import { AddTriggerModal } from './trigger-modal';
import { useTriggerModal } from '@/stores/use-trigger-modal';

const nodeTypes = {
    trigger: TriggerNode,

};
const initialNodes: any[] = [];
const initialEdges: any[] = [];
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
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const { open, closeModal, nodeId } = useTriggerModal();
    return (

        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.Straight}
                fitView
            >
                <Controls position='top-left' />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
            <AddTriggerModal open={open} onClose={closeModal} />
        </main>


    )
}

export default Flow

