 

export default function HowWork() {
    return (
        <section className="px-6 py-16">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-10">How it works</h2>
                <div className="space-y-6">
                    {[
                        { step: "1", title: "Open the app", desc: "need gmail account" },
                        { step: "2", title: "Chat your expense", desc: 'Say "i spent 500" in the chat and AI record its your expenseDatabase' },
                        { step: "3", title: "Track everything", desc: "See totals your expenses, and calendar events for your expense" },
                    ].map(s => (
                        <div key={s.step} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                                {s.step}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 mb-0.5">{s.title}</p>
                                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
