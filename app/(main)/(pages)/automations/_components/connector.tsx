import { Button } from '@/components/ui/button'
import { Handle, HandleType, Position } from '@xyflow/react'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {
    type: HandleType
    position: Position


}

const Connector = ({ type, position }: Props) => {
    return (
        <div>
            <div className='relative flex w-full flex-col items-center justify-center'>
                <div className='h-4 w-[0.5px] bg-slate-900' />

                <Button className='h-4 w-4 flex items-center justify-center rounded-full m-0 p-2.5 shadow'><Plus size={6} /></Button>
            </div>
            <Handle className="invisible" position={position} type={type} />
        </div>
    )
}

export default Connector