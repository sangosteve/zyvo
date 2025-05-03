"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react" // Import Lucide React Spinner
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateContact } from "@/hooks/use-create-contact" // Your custom React Query mutation hook
import { toast } from "sonner"
import { useRouter } from "next/navigation"
// 1. Define Zod schema for form validation
const formSchema = z.object({
    firstname: z.string().min(2, {
        message: "First name must be at least 2 characters",
    }),
    lastname: z.string().min(2, {
        message: "Last name must be at least 2 characters",
    }),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, {
        message: "Phone number must be at least 5 characters",
    }),
})


const CreateContactPage = () => {

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
        },
    })

    const createContact = useCreateContact()


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createContact.mutate(values, {
            onSuccess: () => {
                toast.success("Contact created successfully")
                form.reset()
                router.push("/contacts")
            },
            onError: (error: any) => {
                toast.error(error.message || "Something went wrong")
            },
        })
    }

    return (
        <div className="flex flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 p-8 border rounded-md space-y-8">

                    <FormField control={form.control} name="firstname" render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <FormField control={form.control} name="lastname" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <Button type="submit" disabled={createContact.isPending}>
                        {createContact.isPending ? (
                            <Loader2 className="animate-spin h-5 w-5 text-white" /> // Spinner from Lucide React
                        ) : (
                            "Create Contact"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateContactPage
