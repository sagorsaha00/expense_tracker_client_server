interface Message {
    id: number;
    role: "user" | "bot";
    text: string;
}

function ChatMessage({ messages }: { messages: Message[] }) {
    return (
        <div className="flex flex-col gap-4 py-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex items-end gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                    {/* Bot avatar */}
                    {message.role === "bot" && (
                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0">
                            EA
                        </div>
                    )}

                    {/* Bubble */}
                    <p
                        className={`text-sm leading-relaxed px-4 py-2.5 rounded-2xl max-w-[70%] whitespace-pre-wrap ${message.role === "user"
                            ? "bg-gray-100 text-gray-800 rounded-br-sm"
                            : "bg-blue-50 text-gray-800 rounded-bl-sm"
                            }`}
                    >
                        {message.text}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ChatMessage;