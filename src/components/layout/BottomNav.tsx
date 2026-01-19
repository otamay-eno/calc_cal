"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "ホーム", icon: Home },
        { href: "/log", label: "記録", icon: PlusCircle },
        { href: "/settings", label: "設定", icon: User },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href === "/" && pathname === "/dashboard"); // Handle Home

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors hover:bg-muted/50",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("w-6 h-6 mb-1 transition-transform", isActive && "scale-110")} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
