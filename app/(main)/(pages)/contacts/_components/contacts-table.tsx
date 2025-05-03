"use client"
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const fetchContacts = async () => {
    const res = await fetch("/api/contacts");
    if (!res.ok) throw new Error("Failed to fetch contacts");
    return res.json();
};

const ContactsTable = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["contacts"],
        queryFn: fetchContacts,
        staleTime: 1000 * 60 * 5,
        // cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="w-2/3 rounded-t-lg overflow-hidden border shadow-md">
            <Table className="w-full shadow-md">
                <TableHeader>
                    <TableRow className="border-b ">
                        <TableHead className="p-4">First Name</TableHead>
                        <TableHead className='p-4'>Last Name</TableHead>
                        <TableHead className='p-4'>Email</TableHead>
                        <TableHead className="text-right p-4">Phone Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((contact: any) => (
                        <TableRow
                            key={contact.id}
                            className="bg-muted/40 border-b"
                        >
                            <TableCell className="font-medium p-4">{contact?.firstname}</TableCell>
                            <TableCell className='p-4'>{contact?.lastname}</TableCell>
                            <TableCell className='p-4'>{contact?.email}</TableCell>
                            <TableCell className="text-right p-4">{contact?.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>



    )
}

export default ContactsTable