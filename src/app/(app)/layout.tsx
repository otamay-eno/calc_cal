import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen pb-16">
            <main className="flex-1 w-full max-w-md mx-auto p-4 animate-in fade-in duration-500">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
