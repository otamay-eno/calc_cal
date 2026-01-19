export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">CalorieAIへようこそ</h1>
            <p className="mb-4 text-muted-foreground">ログインして続けてください。</p>
            {/* Auth component will go here */}
            <div className="p-4 border rounded bg-muted">
                認証フォーム (Supabase Auth UI)
            </div>
        </div>
    );
}
