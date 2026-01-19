"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, TooltipProps } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

const data = [
    { name: "الأحد", total: 85 },
    { name: "الاثنين", total: 88 },
    { name: "الثلاثاء", total: 92 },
    { name: "الأربعاء", total: 90 },
    { name: "الخميس", total: 86 },
]

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {label}
                        </span>
                        <span className="font-bold text-muted-foreground">
                            {payload[0].value}%
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export function AttendanceChart() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#2C3E50]" style={{ fontFamily: "Cairo, sans-serif" }}>
                    إحصائيات الحضور الأسبوعي
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            style={{ fontFamily: "Cairo, sans-serif" }}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                            style={{ fontFamily: "Cairo, sans-serif" }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar
                            dataKey="total"
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-[#3498DB]"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
