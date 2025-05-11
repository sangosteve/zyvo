'use client'

import { Handle, HandleProps } from '@xyflow/react'
import { cn } from '@/lib/utils'

interface CustomHandleProps extends HandleProps {
    className?: string
}

export function CustomHandle({ className, ...props }: CustomHandleProps) {
    return (
        <Handle
            className={cn(
                '!w-2 !h-2 !bg-muted-foreground !border !border-white rounded-full',
                className
            )}
            {...props}
        />
    )
}
