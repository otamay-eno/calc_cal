import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">プロフィール設定</h1>

            <Card>
                <CardHeader>
                    <CardTitle>身体データ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="height">身長 (cm)</Label>
                            <Input id="height" type="number" placeholder="170" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">体重 (kg)</Label>
                            <Input id="weight" type="number" placeholder="60" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age">年齢</Label>
                        <Input id="age" type="number" placeholder="30" />
                    </div>

                    <div className="space-y-2">
                        <Label>性別</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" value="male" className="w-4 h-4" /> 男性
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" value="female" className="w-4 h-4" /> 女性
                            </label>
                        </div>
                    </div>

                    <Button className="w-full">プロフィールを更新</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>アプリ設定</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full">ログアウト</Button>
                </CardContent>
            </Card>
        </div>
    );
}
