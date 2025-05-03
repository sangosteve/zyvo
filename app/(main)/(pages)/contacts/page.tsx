"use client"
import React from 'react'
import ContactsTable from './_components/contacts-table'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"
type Props = {}

const Contacts = (props: Props) => {
    const router = useRouter()
    const handleClick = () => {
        router.push("/contacts/new")
    }
    return (
        <div className='flex flex-col  p-8 items-center justify-center'>
            <Button onClick={handleClick}>Add Contact</Button>
            <ContactsTable />

        </div>
    )
}

export default Contacts