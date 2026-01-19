import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Dashboard() {
    // Dummy data
    const targetCalories = 2200;
    const consumedCalories = 1450;
    const progress = (consumedCalories / targetCalories) * 100;
    const remaining = targetCalories - consumedCalories;

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">今日</h1>
                <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString('ja-JP')}</span>
            </header>

            {/* Summary Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-background border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">摂取カロリー</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end justify-between mb-2">
                        <div>
                            <span className="text-4xl font-bold text-primary">{consumedCalories}</span>
                            <span className="text-sm text-muted-foreground ml-1">/ {targetCalories} kcal</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-semibold text-green-600">{remaining}</span>
                            <p className="text-xs text-muted-foreground">残りと目安</p>
                        </div>
                    </div>
                    <Progress value={progress} className="h-3" />
                </CardContent>
            </Card>

            {/* Quick Actions / Recent */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">最近の記録</h2>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/log">すべて見る</Link>
                    </Button>
                </div>

                <div className="space-y-3">
                    {/* Placeholder for recent logs */}
                    <Card className="shadow-sm">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">ランチ (カツ丼)</p>
                                <p className="text-xs text-muted-foreground">12:30</p>
                            </div>
                            <span className="font-bold">850 kcal</span>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">朝のコーヒー</p>
                                <p className="text-xs text-muted-foreground">08:15</p>
                            </div>
                            <span className="font-bold">45 kcal</span>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Button asChild className="w-full h-12 text-lg shadow-lg relative group overflow-hidden" size="lg">
                <Link href="/log">
                    <span className="relative z-10 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> 食事を記録する
                    </span>
                </Link>
            </Button>
        </div>
    );
}
