"use client"
import { usePaths } from '@/hooks/use-nav'
import React from 'react'
import Items from './items'


type Props = {

}

const Sidebar = (props: Props) => {
    const { page } = usePaths()

    return (
        <div className="w-[250px] bg-background h-screen border-r  overflow-hidden flex flex-col justify-between">
            {/* Top Content */}
            <div className="flex flex-col gap-y-2 p-4">
                <Items />
            </div>
        </div>

    )
}

export default Sidebar