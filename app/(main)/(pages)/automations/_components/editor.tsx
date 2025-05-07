"use client"
import React from 'react'
import { ReactFlowProvider, } from '@xyflow/react';
import Flow from './flow';

const Editor = () => {
    return (
        <ReactFlowProvider>
            <div className='flex flex-col h-full w-full overflow-hidden'>
                <section className='flex  h-full overflow-auto'>
                    <Flow />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor