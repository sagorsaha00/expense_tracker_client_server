import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../datastore/store";
import type { expense } from "../datastore/store";
export default function ShowExpense() {
    const { expense } = useAuthStore();
    const navigate = useNavigate();
    const currentMonth = expense?.data?.[0];
    const expenses: expense[] = currentMonth?.expenses?.slice(0, 4) || [];

    return (
        <section className="px-6 pb-16">
            <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">

                {expenses.map((item) => (
                    <div
                        onClick={() => navigate(`/expenseList`)}
                        key={item._id}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-4 cursor-pointer"
                    >
                        <p className="text-[11px] text-gray-400 mb-1">
                            Expense
                        </p>

                        <p className="text-base font-bold text-gray-800">
                            {item.title}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-0.5">
                            ৳ {item.amount}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
}