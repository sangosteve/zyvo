"use client";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Bot, BarChart3 } from "lucide-react";
import StatCard from "./_components/stats-card/page";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    if (!isLoaded) return <p>Loading...</p>;
    return (
        <div className="space-y-6 p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}👋</h1>
                <p className="text-muted-foreground">
                    Your bots status today...
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard title="Active Subscribers" icon={Users} value="1,824" iconBg="bg-purple-500" percentage="↑ 12% vs last month" />

                <StatCard title="Messages Sent" icon={MessageCircle} value="3,482" iconBg="bg-teal-500" percentage="↑ 10% from last week" />

                <StatCard title="Active Bots" icon={Bot} value="12" iconBg="bg-blue-500" percentage="↑ 1 this week" />

                <StatCard title="Engagement Rate" icon={BarChart3} value="72%" iconBg="bg-orange-500" percentage="↑ 5.3% this week" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <p className="font-medium">John Doe</p>
                                <p className="text-muted-foreground">"Hey, I want to know more about your pricing."</p>
                            </div>
                            <Button size="sm" variant="outline">Reply</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <p className="font-medium">Sarah Lee</p>
                                <p className="text-muted-foreground">"Can the bot send PDFs?"</p>
                            </div>
                            <Button size="sm" variant="outline">Reply</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button className="w-full">Create New Flow</Button>
                        <Button className="w-full" variant="secondary">Broadcast Message</Button>
                        <Button className="w-full" variant="outline">Add New Bot</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
