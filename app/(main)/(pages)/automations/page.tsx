"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@radix-ui/react-switch'
import { toast } from "sonner"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import { NewAutomationModal } from './_components/modals/new-automation-modal'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AutomationFormValues } from '@/lib/validations/automation'
import { useAutomations } from '@/hooks/use-automations'

const AutomationsPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: automations = [], isLoading } = useAutomations()

    const createAutomation = useMutation({
        mutationFn: async (data: AutomationFormValues) => {
            await new Promise((resolve) => setTimeout(resolve, 800))
            const res = await fetch("/api/automations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error?.error ?? "Failed to create automation")
            }

            return res.json()
        },
        onSuccess: () => {
            toast.success("Automation created successfully")
            queryClient.invalidateQueries({ queryKey: ["automations"] })
            setModalOpen(false)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">Automations</h2>
                    <p className="text-muted-foreground">Manage your automated workflows</p>
                </div>
                <Button onClick={() => setModalOpen(true)} variant="default">+ New Automation</Button>
            </div>

            <NewAutomationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={(data) => createAutomation.mutateAsync(data)}
            />

            <Card>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="p-4">Loading...</div>
                    ) : (
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
                                {automations.map((automation: any) => (
                                    <tr key={automation.id} className="border-b border-border hover:bg-muted/20">
                                        <td className="px-4 py-3 text-foreground">{automation.name}</td>
                                        <td className="px-4 py-3">{automation.type || "-"}</td>
                                        <td className="px-4 py-3">
                                            <Switch checked={automation.status === "active"} />
                                        </td>
                                        <td className="px-4 py-3">
                                            {format(new Date(automation.createdAt), "PPP")}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button size="sm" variant="outline"
                                                onClick={() => router.push(`/automations/${automation.id}/edit`)}
                                            >Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AutomationsPage
