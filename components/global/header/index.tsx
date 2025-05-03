"use client"
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePaths } from '@/hooks/use-nav'
type Props = {}

const Header = (props: Props) => {
    const { page } = usePaths()
    return (
        <div className='flex items-center justify-between px-12 py-4 border-b'>
            <h3 className='text-xl font-bold capitalize '>{page}</h3>
            <UserButton />
        </div>
    )
}

export default Header