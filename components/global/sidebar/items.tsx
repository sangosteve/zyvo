import React from "react";
import { SIDEBAR_MENU } from "@/constants/menu";
import Link from "next/link";
import { cn } from "@/lib/utils";


type Props = {};

const Items = (props: Props) => {
    return (
        <div className="space-y-6">
            {SIDEBAR_MENU.map((section) => (
                <div key={section.title}>
                    <p className="px-4 text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-2">
                        {section.title}
                    </p>
                    <div className="space-y-1">
                        {section.items.map((item) => (
                            <Link
                                key={item.id}
                                className={cn(
                                    "capitalize flex items-center gap-3 px-4 py-2.5 rounded-[0.4rem]",
                                    "text-sm font-medium text-muted-foreground",
                                    "transition-all duration-200 ease-in-out",
                                    "bg-transparent hover:bg-secondary/80",
                                    "hover:text-white",
                                    "hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_2px_6px_rgba(0,0,0,0.2)]",
                                    "hover:ring-1 hover:ring-white/10",
                                    "hover:backdrop-blur-sm"
                                )}
                                href={`/${item.label === "home" ? "/" : item.label}`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Items;
