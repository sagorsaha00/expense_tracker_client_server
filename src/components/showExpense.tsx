import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useAuthStore } from "../datastore/store";
import type { ExpenseItem, MonthExpense, ExpenseResponse } from "../datastore/store";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";





const chartConfig = {
    amount: {
        label: "Amount",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export default function ShowExpense() {

    const { expense } = useAuthStore();
    const navigate = useNavigate();


    const expensee = expense as unknown as ExpenseResponse;

    const currentMonth: MonthExpense | null = expensee?.data?.[0] ?? null;
    const expenses: ExpenseItem[] = currentMonth?.expenses?.slice(0, 6) || [];


    const chartData = useMemo(() => {
        return expenses.map((item) => ({
            id: item._id,
            title: item.title,
            amount: item.amount,
        }));
    }, [expenses]);


    return (
        <section className="px-4 sm:px-6 pb-16">
            <div className="max-w-4xl mx-auto">
                <Card className="rounded-2xl border border-gray-100 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
                            Expense Overview
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Your latest expenses in chart view
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {chartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="h-[260px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />

                                    <XAxis
                                        dataKey="title"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        interval={0}
                                        tickFormatter={(value) =>
                                            value.length > 8 ? `${value.slice(0, 8)}...` : value
                                        }
                                        className="text-xs"
                                    />

                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        className="text-xs"
                                    />

                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />

                                    <Bar
                                        dataKey="amount"
                                        fill="var(--color-amount)"
                                        radius={[10, 10, 0, 0]}
                                        onClick={(data) => {
                                            if (data?.id) navigate("/expenseList");
                                        }}
                                        className="cursor-pointer"
                                    />
                                </BarChart>
                            </ChartContainer>
                        ) : (
                            <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">
                                No expense data found
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}