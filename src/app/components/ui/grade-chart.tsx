"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

const data = [
    { name: "ممتاز (A)", value: 35, color: "#2ECC71" }, // Green
    { name: "جيد جداً (B)", value: 25, color: "#3498DB" }, // Blue
    { name: "جيد (C)", value: 20, color: "#F1C40F" }, // Yellow
    { name: "مقبول (D)", value: 15, color: "#E67E22" }, // Orange
    { name: "راسب (F)", value: 5, color: "#E74C3C" }, // Red
]

export function GradeDistributionChart() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#2C3E50]" style={{ fontFamily: "Cairo, sans-serif" }}>
                    توزيع الدرجات
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <span className="text-sm font-bold block" style={{ color: payload[0].payload.color }}>
                                                {payload[0].name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {payload[0].value}% من الطلاب
                                            </span>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
