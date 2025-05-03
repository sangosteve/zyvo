import { Blocks, Contact, Home, Settings, Workflow, LifeBuoy, CircleHelp } from 'lucide-react'
import { v4 as uuid } from 'uuid'

type SidebarItem = {
    id: string
    label: string
    icon: React.ReactNode
}

type SidebarSection = {
    title: string
    items: SidebarItem[]
}

export const SIDEBAR_MENU: SidebarSection[] = [
    {
        title: "Menu",
        items: [
            {
                id: uuid(),
                label: "home",
                icon: <Home size={20} />
            },
            {
                id: uuid(),
                label: "contacts",
                icon: <Contact size={20} />
            },
            {
                id: uuid(),
                label: "automations",
                icon: <Workflow size={20} />
            },
            {
                id: uuid(),
                label: "integrations",
                icon: <Blocks size={20} />
            },
        ]
    },
    {
        title: "Support",
        items: [
            {
                id: uuid(),
                label: "settings",
                icon: <Settings size={20} />
            },
            {
                id: uuid(),
                label: "help",
                icon: <CircleHelp size={20} />
            }
        ]
    }
]
