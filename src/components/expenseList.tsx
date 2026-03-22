import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../datastore/store";
import { NavBar } from "./navBar";


interface Expense {
    _id: string;
    title: string;
    amount: number;
    date: string;
    userId: string;
}

interface GroupedExpense {
    _id: string;
    total: number;
    count: number;
    expenses: Expense[];
}
function LoadingSpinner() {
    return (
        <section className="px-6 pb-16">
            {/* Stats Cards Skeleton */}
            <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                        <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-3 w-14 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                ))}
            </div>

            
            <div className="max-w-3xl mx-auto space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                    <div
                        key={i}
                        className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl px-4 py-3"
                    >
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                        <div className="h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                ))}
            </div>
        </section>
    );
}
export default function ExpenseList() {
    const { user, expense } = useAuthStore();
    console.log("expense", expense)
    const userId = user!.id
    const fetchExpenses = async (userId: string, groupBy: string) => {
        const res = await fetch(`http://localhost:3001/auth/grouped/${userId}?groupBy=${groupBy}`);
        const data = await res.json();
        useAuthStore.setState({ expense: data })
        return data;
    };

    function useExpenses(userId: string, groupBy: string = "month") {
        return useQuery({
            queryKey: ["expenses", userId, groupBy],
            queryFn: () => fetchExpenses(userId, groupBy),
            enabled: !!userId,
        });
    }

    const { data, isLoading, isError } = useExpenses(userId, "month");
    console.log("Data", data)

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-red-400 text-sm">Something went wrong</p>
            </div>
        );
    }

    const grouped: GroupedExpense[] = data?.data ?? [];

    const grandTotal = grouped.reduce((sum, g) => sum + g.total, 0);


    const today = new Date().toISOString().split("T")[0];
    const todayExpenses = grouped
        .flatMap(g => g.expenses)
        .filter(e => e.date.startsWith(today));
    const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0);


    const allExpenses = grouped.flatMap(g => g.expenses);
    const titleMap: Record<string, number> = {};
    allExpenses.forEach(e => {
        titleMap[e.title] = (titleMap[e.title] || 0) + e.amount;
    });
    const topCategory = Object.entries(titleMap).sort((a, b) => b[1] - a[1])[0];

    return (
        <>
            <NavBar />
            <section className="px-6 pb-16 mt-2">


                <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-400 mb-1">This month</p>
                        <p className="text-base font-bold text-gray-800">৳ {grandTotal.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Total spent</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-400 mb-1">Today</p>
                        <p className="text-base font-bold text-gray-800">৳ {todayTotal.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{todayExpenses.length} expenses</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-400 mb-1">Top category</p>
                        <p className="text-base font-bold text-gray-800">{topCategory?.[0] ?? "N/A"}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">৳ {topCategory?.[1].toLocaleString() ?? 0}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-400 mb-1">Total expenses</p>
                        <p className="text-base font-bold text-gray-800">{allExpenses.length}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">All time</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {grouped.map((group) => (
                        <div key={group._id}>
                            {/* Month Header */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-semibold text-gray-600">{group._id}</p>
                                <p className="text-sm font-semibold text-gray-800">৳ {group.total.toLocaleString()}</p>
                            </div>

                            {/* Expense Items */}
                            <div className="space-y-2">
                                {group.expenses.map((expense) => (
                                    <div
                                        key={expense._id}
                                        className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl px-4 py-3"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{expense.title}</p>
                                            <p className="text-[11px] text-gray-400">
                                                {new Date(expense.date).toLocaleDateString("en-BD", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800">
                                            ৳ {expense.amount.toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {grouped.length === 0 && (
                        <p className="text-center text-gray-400 text-sm py-10">No expenses found</p>
                    )}
                </div>
            </section>
        </>
    );
}