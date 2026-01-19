"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Send, Loader2, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { estimateCalories, type CalorieEstimation } from "@/app/actions/gemini";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Message = {
    id: string;
    role: "user" | "assistant";
    content?: string;
    data?: CalorieEstimation;
    saved?: boolean;
};

export default function LoggingPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);

        const currentInput = input;
        setInput("");
        setLoading(true);

        startTransition(async () => {
            try {
                const result = await estimateCalories(currentInput);
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    data: result
                };
                setMessages(prev => [...prev, assistantMessage]);
            } catch (e) {
                toast.error("Failed to estimate calories. Please try again.");
            } finally {
                setLoading(false);
            }
        });
    };

    const handleSave = async (id: string, data: CalorieEstimation) => {
        // TODO: Implement actual save to Supabase
        console.log("Saving log:", data);

        // Optimistic update to mark as saved
        setMessages(prev => prev.map(m => m.id === id ? { ...m, saved: true } : m));
        toast.success("Log saved!");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <header className="flex-none p-4 border-b">
                <h1 className="text-xl font-bold">食事を記録</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                        <p>今日食べたものを入力してください！</p>
                        <p className="text-sm">例: "牛丼とサラダ"</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex w-full",
                            message.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        {message.role === "user" ? (
                            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%]">
                                {message.content}
                            </div>
                        ) : (
                            <LogResultCard message={message} onSave={() => handleSave(message.id, message.data!)} />
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">AIが計算中...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex-none p-4 bg-background border-t">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="何を食べましたか？"
                        className="flex-1"
                        disabled={loading}
                    />
                    <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

function LogResultCard({ message, onSave }: { message: Message; onSave: () => void }) {
    const [data, setData] = useState(message.data!);

    if (!data) return null;

    if (message.saved) {
        return (
            <div className="bg-muted/50 border rounded-2xl rounded-tl-none p-4 max-w-[90%]">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-semibold">保存済み</span>
                </div>
                <div className="text-sm">
                    <strong>{data.food_name}</strong> - {data.estimated_calories} kcal
                </div>
            </div>
        )
    }

    return (
        <Card className="w-full max-w-[90%] rounded-tl-none border-primary/20 shadow-sm animate-in fade-in slide-in-from-left-2">
            <CardHeader className="p-3 pb-2 bg-muted/30">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Geminiによる推計
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
                <div className="space-y-1">
                    <label className="text-xs font-medium">メニュー名</label>
                    <Input
                        value={data.food_name}
                        onChange={e => setData({ ...data, food_name: e.target.value })}
                        className="h-8"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium">カロリー (kcal)</label>
                    <Input
                        type="number"
                        inputMode="numeric"
                        value={data.estimated_calories}
                        onChange={e => setData({ ...data, estimated_calories: parseInt(e.target.value) || 0 })}
                        className="h-8 font-mono"
                    />
                </div>
                <Button size="sm" className="w-full mt-2" onClick={onSave}>
                    <Save className="w-4 h-4 mr-2" /> 記録する
                </Button>
            </CardContent>
        </Card>
    )
}
