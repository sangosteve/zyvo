"use client"
import { useRouter } from 'next/navigation';
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"

type Integration = {
    name: string
    description: string
    icon: string
    connected: boolean
    features?: { name: string; description: string; enabled: boolean }[]
}

const integrations: Integration[] = [
    {
        name: "Instagram",
        description: "Connect your IG account to receive and send messages.",
        icon: "/icons/instagram.svg",
        connected: false,
    },

    {
        name: "WhatsApp",
        description: "Integrate with WhatsApp to automate and respond to messages.",
        icon: "/icons/whatsapp.svg",
        connected: false,
    },
    {
        name: "LinkedIn",
        description: "Automate and respond to messages from your LinkedIn inbox.",
        icon: "/icons/linkedin.svg",
        connected: false,
    },
    {
        name: "Slack",
        description: "Send call and message logs to your Slack workspace.",
        icon: "/icons/slack.svg",
        connected: true,
        features: [
            {
                name: "Messages",
                description: "Send incoming messages to my channel",
                enabled: true,
            },
            {
                name: "Missed calls",
                description: "Send missed calls to my channel",
                enabled: false,
            },
        ],
    },
    {
        name: "Discord",
        description: "Integrate with Discord to send and receive messages in your server.",
        icon: "/icons/discord.svg",
        connected: false,
    },
]


export default function IntegrationsPage() {
    const handleInstagramConnect = () => {
        window.location.href = "/api/instagram/connect";
    }
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-foreground">Integrations</h2>
                <p className="text-muted-foreground">
                    Connect your accounts to automate workflows and access your channels.
                </p>
            </div>

            {integrations.map((integration, idx) => (
                <Card key={idx} className="bg-muted/10 border border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-4">
                            <Image src={integration.icon} alt={integration.name} className="h-8 w-8" width={24}
                                height={24} />
                            <div>
                                <CardTitle>{integration.name}</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {integration.description}
                                </CardDescription>
                            </div>
                        </div>
                        <Button onClick={handleInstagramConnect} variant={integration.connected ? "secondary" : "default"}>
                            {integration.connected ? "Disconnect" : "Connect"}
                        </Button>
                    </CardHeader>

                    {integration.connected && integration.features?.length ? (
                        <CardContent className="space-y-4 pt-4 border-t border-border">
                            {integration.features.map((feature, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{feature.name}</p>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                    <Switch checked={feature.enabled} />
                                </div>
                            ))}
                        </CardContent>
                    ) : null}
                </Card>
            ))}
        </div>
    )
}
