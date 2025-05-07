const ALL_INTEGRATIONS = [
	{
		type: "INSTAGRAM",
		name: "Instagram",
		description: "Connect your IG account to receive and send messages.",
		icon: "/icons/instagram.svg",
	},
	{
		type: "WHATSAPP",
		name: "WhatsApp",
		description: "Integrate with WhatsApp to automate and respond to messages.",
		icon: "/icons/whatsapp.svg",
	},
	{
		type: "LINKEDIN",
		name: "LinkedIn",
		description: "Automate and respond to messages from your LinkedIn inbox.",
		icon: "/icons/linkedin.svg",
	},
	{
		type: "SLACK",
		name: "Slack",
		description: "Send call and message logs to your Slack workspace.",
		icon: "/icons/slack.svg",
	},
	{
		type: "DISCORD",
		name: "Discord",
		description:
			"Integrate with Discord to send and receive messages in your server.",
		icon: "/icons/discord.svg",
	},
] as const;
