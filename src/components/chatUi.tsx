import React, { useRef, useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import ChatMessage from "./chatmessage";
import { ChatInput } from "./input";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useAuthStore } from "../datastore/store";
interface Message {
    id: number;
    role: "user" | "bot";
    text: string;
}

export default function ExpenseChatUI() {
    const [messages, setMessages] = useState<Message[]>([]);
    console.log('messages', messages)
    const { user } = useAuthStore()
    const userId = user?.id
    console.log("userId", userId)
    const bottomRef = useRef<HTMLDivElement>(null);
    async function sendMessage(message: string) {
        console.log("message", message)
        await fetchEventSource("http://localhost:3001/chat/stream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, message }),

            onmessage(ev) {
                const data = JSON.parse(ev.data);
                const msg = data.token
                console.log('msg', msg)
                setMessages((prevMessages) => {
                    const lastMessage = prevMessages[prevMessages.length - 1];

                    const cloned = [...prevMessages];
                    cloned[cloned.length - 1] = {
                        ...lastMessage,
                        text: lastMessage.text + msg
                    };
                    if (lastMessage.role === "bot") {
                        return cloned;
                    }
                    return [...prevMessages, { id: prevMessages.length + 1, role: "bot", text: msg }];
                });
            },

            onerror(err) {
                console.error("SSE error:", err);
                throw err;
            },

            onclose() {
                console.log("Connection closed");
            }
        });
    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmitfun = async (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, role: "user", text: message }]);
        await sendMessage(message)
    };

    return (
        <div className="flex flex-col h-screen bg-white">

            {/* Header */}
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                    EA
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-800 leading-tight">Expense Assistant</p>
                    <p className="text-xs text-gray-400">Track your spending</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-6">
                <div className="max-w-2xl mx-auto px-5">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                                <MessageCircle size={24} className="text-blue-400" />
                            </div>

                            <p className="text-base font-semibold text-gray-800 mb-2">
                                No expenses yet
                            </p>

                            <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-8">
                                Start by typing an expense like
                                <span className="text-gray-600 font-medium"> 500 food</span> or
                                <span className="text-gray-600 font-medium"> 200 transport</span>
                            </p>
                        </div>
                    ) : (

                        <div >
                            <ChatMessage messages={messages} />
                        </div>
                    )}

                </div>
            </div>

            {/* Input */}
            <ChatInput onSubmitfun={onSubmitfun} />

        </div>
    );
}