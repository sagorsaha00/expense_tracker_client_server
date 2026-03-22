import { ArrowRight, BarChart2, Calendar, MessageCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NeedSection() {
    const navigate = useNavigate();
    const data = [
        {
            icon: <MessageCircle size={18} className="text-blue-500" />,
            title: "Chat with AI",
            desc: "Just type 500 food and AI logs it for you instantly.",
            action: "See chat",
            onClick: () => navigate("/chatUi"),
        },
        {
            icon: <Calendar size={18} className="text-blue-500" />,
            title: "Calendar events",
            desc: "See your expenses on a calendar. Know what you spent on any day.",
            action: "See calendar",
            onClick: () => window.open("https://calendar.google.com", "_blank"),
        },
        {
            icon: <BarChart2 size={18} className="text-blue-500" />,
            title: "See expense list",
            desc: "Track monthly goals, savings targets and spending trends.",
            action: "See list",
            onClick: () => navigate("/expenseList"),
        },
    ]
    return (
        <section className="px-6 py-16 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">Everything you need</h2>
                <p className="text-center text-xs text-gray-400 mb-10">All your expense tools in one place.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {data.map(f => (
                        <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                {f.icon}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 mb-1">{f.title}</p>
                                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                            </div>
                            <button
                                onClick={f.onClick}
                                className="mt-auto flex items-center gap-1 text-xs text-blue-500 font-medium hover:gap-2 transition-all cursor-pointer"
                            >
                                {f.action} <ArrowRight size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
