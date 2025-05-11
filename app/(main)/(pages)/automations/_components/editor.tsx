"use client"
import React from 'react'
import { ReactFlowProvider, } from '@xyflow/react';
import Flow from './flow';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const fetchAutomation = async (id: string) => {
    const res = await fetch(`/api/automations/${id}`);
    if (!res.ok) throw new Error("Failed to fetch automation");
    return res.json();
};

const Editor = () => {

    const { id } = useParams(); // From URL like /automations/[id]/edit

    const { data: automation, isLoading, error } = useQuery({
        queryKey: ['automation', id],
        queryFn: () => fetchAutomation(id as string),
        enabled: !!id
    });

    if (isLoading) return <div>Loading automation...</div>;
    if (error || !automation) return <div>Failed to load automation</div>;

    return (
        <ReactFlowProvider>
            <div className='flex flex-col h-full w-full overflow-hidden'>
                <section className='flex  h-full overflow-auto'>
                    <Flow automation={automation} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor