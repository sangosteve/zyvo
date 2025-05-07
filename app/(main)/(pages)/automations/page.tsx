"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@radix-ui/react-switch'

import { format } from "date-fns"
import React, { useState } from 'react'

type Automation = {
    id: string
    name: string
    type: string
    status: "active" | "inactive"
    createdAt: string
}

const dummyAutomations: Automation[] = [
    {
        id: "1",
        name: "Welcome DM",
        type: "Instagram Auto Reply",
        status: "active",
        createdAt: "2024-12-01T10:30:00Z",
    },
    {
        id: "2",
        name: "Follow-up Reminder",
        type: "WhatsApp Follow Up",
        status: "inactive",
        createdAt: "2024-12-15T14:00:00Z",
    },
    {
        id: "3",
        name: "Birthday Campaign",
        type: "Email Campaign",
        status: "active",
        createdAt: "2025-01-05T09:00:00Z",
    },
]


const AutomationsPage = () => {
    const [automations, setAutomations] = useState<Automation[]>(dummyAutomations)

    const toggleStatus = (id: string) => {
        setAutomations((prev) =>
            prev.map((a) =>
                a.id === id
                    ? { ...a, status: a.status === "active" ? "inactive" : "active" }
                    : a
            )
        )
    }
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">Automations</h2>
                    <p className="text-muted-foreground">Manage your automated workflows</p>
                </div>
                <Button variant="default">+ New Automation</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground border-b border-border">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {automations.map((automation) => (
                                <tr key={automation.id} className="border-b border-border hover:bg-muted/20">
                                    <td className="px-4 py-3 text-foreground">{automation.name}</td>
                                    <td className="px-4 py-3">{automation.type}</td>
                                    <td className="px-4 py-3">
                                        <Switch />
                                    </td>
                                    <td className="px-4 py-3">
                                        {format(new Date(automation.createdAt), "PPP")}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}

export default AutomationsPage