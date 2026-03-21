"use client";
import { useState, useRef, useEffect, useCallback } from "react";

/* ─── SVG Icons ──────────────────────────────────────── */
const SendIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);
const PlusIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
const MenuIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const TrashIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);
const CopyIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
);
const ThumbUpIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </svg>
);
const AttachIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
);
const SparkleIcon = ({ size = "w-4 h-4" }: { size?: string }) => (
    <svg viewBox="0 0 24 24" className={size} fill="currentColor">
        <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74z" />
        <path d="M5 3l.84 2.5L8.5 6.5l-2.66.76L5 10l-.84-2.74L1.5 6.5l2.66-.76z" opacity=".5" />
    </svg>
);
const EditIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

/* ─── Types ──────────────────────────────────────────── */
interface Message { id: string; role: "user" | "assistant"; content: string; }
interface Conversation { id: string; title: string; messages: Message[]; group: string; }

/* ─── Mock data ──────────────────────────────────────── */
const INIT_CONVS: Conversation[] = [
    {
        id: "1", title: "React performance tips", group: "Today", messages: [
            { id: "m1", role: "user", content: "How can I optimize React re-renders?" },
            { id: "m2", role: "assistant", content: "Great question! Here are the most effective strategies:\n\n**1. React.memo** — Prevents re-renders when props haven't changed.\n\n**2. useMemo & useCallback** — Memoize values and callbacks.\n\n**3. State colocation** — Keep state as close to where it's used.\n\n**4. Code splitting** — Use `React.lazy` + `Suspense` to load components on demand.\n\nWant me to dive deeper into any of these with examples?" },
        ]
    },
    { id: "2", title: "Python data analysis", group: "Today", messages: [] },
    { id: "3", title: "API design best practices", group: "Yesterday", messages: [] },
    { id: "4", title: "CSS Grid vs Flexbox", group: "Yesterday", messages: [] },
    { id: "5", title: "TypeScript generics guide", group: "Mar 15", messages: [] },
    { id: "6", title: "Docker deployment setup", group: "Mar 14", messages: [] },
];

const SUGGESTIONS = [
    { icon: "💡", text: "Explain quantum computing" },
    { icon: "✍️", text: "Write a cover letter" },
    { icon: "🐛", text: "Debug my code" },
    { icon: "📊", text: "Analyze data trends" },
];

const FAKE_REPLIES = [
    "That's a great topic to explore!\n\n**Here's a concise breakdown:**\n\nThe concept you're asking about has several important dimensions. Starting with the fundamentals helps build a strong mental model before tackling advanced cases.\n\n**Key considerations:**\n- Context matters significantly here\n- There are multiple valid approaches\n- The best choice depends on your constraints\n\nWould you like me to elaborate on any specific aspect?",
    "Absolutely, let me walk you through this step by step.\n\nThe core idea is straightforward once you break it down into its components. Here's how I'd approach it:\n\n1. **Understand the problem space** — What constraints exist?\n2. **Explore solutions** — Which tools or patterns fit?\n3. **Implement iteratively** — Start simple, refine.\n\nWhat's your current level of familiarity with this topic?",
    "Happy to help with that!\n\nThis is a nuanced area with a few competing approaches. The good news is that once you understand the trade-offs, making the right call becomes much more intuitive.\n\nLet me know if you'd like a deeper dive into any specific part.",
];

/* ─── Render bold markdown ───────────────────────────── */
function RenderContent({ text }: { text: string }) {
    return (
        <span>
            {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                part.startsWith("**") && part.endsWith("**")
                    ? <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
                    : <span key={i}>{part}</span>
            )}
        </span>
    );
}

/* ─── Message ────────────────────────────────────────── */
function Message({ msg }: { msg: Message }) {
    const isUser = msg.role === "user";
    return (
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6 group`}>
            {/* Avatar */}
            {isUser ? (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 self-end">
                    U
                </div>
            ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-indigo-500/30 flex items-center justify-center flex-shrink-0 self-end text-indigo-400">
                    <SparkleIcon />
                </div>
            )}
            <div className={`flex flex-col gap-1 max-w-[78%] sm:max-w-[72%] ${isUser ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line
          ${isUser
                        ? "bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-900/30"
                        : "bg-[#111827] border border-[#1f2937] text-slate-300 rounded-tl-sm"}`}
                    style={{ fontFamily: "'Sora',sans-serif" }}>
                    <RenderContent text={msg.content} />
                </div>
                {!isUser && (
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {[CopyIcon, ThumbUpIcon].map((Icon, i) => (
                            <button key={i} className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] transition-all">
                                <Icon />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Typing ─────────────────────────────────────────── */
function TypingIndicator() {
    return (
        <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400">
                <SparkleIcon />
            </div>
            <div className="bg-[#111827] border border-[#1f2937] px-4 py-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                {[0, 150, 300].map(d => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
            </div>
        </div>
    );
}

/* ─── Empty State ────────────────────────────────────── */
function EmptyState({ onSuggest }: { onSuggest: (s: string) => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 py-16">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 text-white shadow-xl shadow-indigo-500/30">
                <SparkleIcon size="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Sora',sans-serif" }}>
                How can I help you?
            </h2>
            <p className="text-slate-500 text-sm mb-8 max-w-sm leading-relaxed" style={{ fontFamily: "'Sora',sans-serif" }}>
                Ask me anything — coding, writing, analysis, creative ideas, and more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm">
                {SUGGESTIONS.map(s => (
                    <button key={s.text} onClick={() => onSuggest(s.text)}
                        className="flex items-center gap-2.5 text-left p-3.5 rounded-xl border border-[#1f2937] bg-[#0d1117] hover:bg-[#111827] hover:border-[#2d3748] transition-all duration-200 text-[13px] text-slate-400 hover:text-white group"
                        style={{ fontFamily: "'Sora',sans-serif" }}>
                        <span className="text-base flex-shrink-0">{s.icon}</span>
                        <span>{s.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── Sidebar Content ────────────────────────────────── */
function SidebarContent({
    convs, activeId, onSelect, onNew, onDelete, onClose,
}: {
    convs: Conversation[]; activeId: string; onSelect: (id: string) => void;
    onNew: () => void; onDelete: (id: string, e: React.MouseEvent) => void; onClose?: () => void;
}) {
    const groups = convs.reduce<Record<string, Conversation[]>>((acc, c) => {
        acc[c.group] = [...(acc[c.group] || []), c]; return acc;
    }, {});

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#1f2937]">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
                        <SparkleIcon size="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white font-bold text-sm" style={{ fontFamily: "'Sora',sans-serif" }}>Nexus AI</span>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={onNew}
                        className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all" title="New chat">
                        <PlusIcon />
                    </button>
                    {onClose && (
                        <button onClick={onClose}
                            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all lg:hidden">
                            <CloseIcon />
                        </button>
                    )}
                </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 scrollbar-thin scrollbar-thumb-[#1f2937]">
                {Object.entries(groups).map(([group, list]) => (
                    <div key={group}>
                        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-2 mb-1.5" style={{ fontFamily: "'Sora',sans-serif" }}>
                            {group}
                        </p>
                        {list.map(conv => (
                            <button key={conv.id} onClick={() => onSelect(conv.id)}
                                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 group/item relative mb-0.5
                  ${activeId === conv.id ? "bg-[#1e1b4b]/60 text-white border border-indigo-500/20" : "text-slate-400 hover:bg-white/[0.04] hover:text-white border border-transparent"}`}
                                style={{ fontFamily: "'Sora',sans-serif" }}>
                                <p className="text-xs font-medium truncate pr-7">{conv.title}</p>
                                <button onClick={e => onDelete(conv.id, e)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg opacity-0 group-hover/item:opacity-100 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150">
                                    <TrashIcon />
                                </button>
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* User */}
            <div className="p-3 border-t border-[#1f2937]">
                <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer group/user">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">JD</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate" style={{ fontFamily: "'Sora',sans-serif" }}>John Doe</p>
                        <p className="text-[10px] text-slate-600" style={{ fontFamily: "'Sora',sans-serif" }}>Free plan</p>
                    </div>
                    <button className="text-slate-600 hover:text-slate-400 opacity-0 group-hover/user:opacity-100 transition-all">
                        <EditIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function ChatPage() {
    const [convs, setConvs] = useState<Conversation[]>(INIT_CONVS);
    const [activeId, setActiveId] = useState("1");
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const active = convs.find(c => c.id === activeId);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active?.messages, typing]);

    const autoResize = useCallback(() => {
        const ta = textareaRef.current; if (!ta) return;
        ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }, []);

    const newChat = () => {
        const id = Date.now().toString();
        setConvs(c => [{ id, title: "New conversation", messages: [], group: "Today" }, ...c]);
        setActiveId(id); setSidebarOpen(false);
    };

    const deleteConv = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setConvs(c => c.filter(x => x.id !== id));
        if (activeId === id) setActiveId(convs.find(c => c.id !== id)?.id ?? "");
    };

    const selectConv = (id: string) => { setActiveId(id); setSidebarOpen(false); };

    const send = async () => {
        const text = input.trim(); if (!text || typing) return;
        const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
        setConvs(cs => cs.map(c => c.id === activeId
            ? { ...c, title: c.messages.length === 0 ? text.slice(0, 38) : c.title, messages: [...c.messages, userMsg] }
            : c));
        setInput(""); if (textareaRef.current) textareaRef.current.style.height = "auto";
        setTyping(true);
        await new Promise(r => setTimeout(r, 900 + Math.random() * 900));
        const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)] };
        setConvs(cs => cs.map(c => c.id === activeId ? { ...c, messages: [...c.messages, botMsg] } : c));
        setTyping(false);
    };

    return (
        <div className="flex h-screen bg-[#09090f] overflow-hidden" style={{ fontFamily: "'Sora',sans-serif" }}>
            <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-[260px] xl:w-[280px] flex-shrink-0 border-r border-[#1f2937] bg-[#0d1117]">
                <SidebarContent convs={convs} activeId={activeId} onSelect={selectConv} onNew={newChat} onDelete={deleteConv} />
            </aside>

            {/* ── Mobile Sidebar Overlay ── */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative z-10 flex flex-col w-[280px] max-w-[85vw] bg-[#0d1117] border-r border-[#1f2937] h-full shadow-2xl">
                        <SidebarContent convs={convs} activeId={activeId} onSelect={selectConv} onNew={newChat} onDelete={deleteConv} onClose={() => setSidebarOpen(false)} />
                    </aside>
                </div>
            )}

            {/* ── Main area ── */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0">
                {/* Header */}
                <header className="flex items-center gap-3 px-4 py-3 border-b border-[#1f2937] bg-[#09090f]/80 backdrop-blur-sm flex-shrink-0">
                    <button onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                        <MenuIcon />
                    </button>
                    <button onClick={() => setSidebarOpen(s => !s)}
                        className="hidden lg:flex p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                        <MenuIcon />
                    </button>
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white flex-shrink-0">
                            <SparkleIcon size="w-3 h-3" />
                        </div>
                        <h1 className="text-sm font-semibold text-white truncate">{active?.title ?? "New conversation"}</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button onClick={newChat} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white border border-[#1f2937] hover:bg-white/[0.04] transition-all">
                            <PlusIcon />
                            <span>New chat</span>
                        </button>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">JD</div>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-2xl xl:max-w-3xl mx-auto px-4 sm:px-6 py-6">
                        {!active || active.messages.length === 0
                            ? <EmptyState onSuggest={s => { setInput(s); textareaRef.current?.focus(); }} />
                            : (
                                <>
                                    {active.messages.map(msg => <Message key={msg.id} msg={msg} />)}
                                    {typing && <TypingIndicator />}
                                    <div ref={bottomRef} />
                                </>
                            )}
                    </div>
                </div>

                {/* Input */}
                <div className="flex-shrink-0 px-4 sm:px-6 pb-5 pt-3 bg-[#09090f]">
                    <div className="max-w-2xl xl:max-w-3xl mx-auto">
                        <div className="rounded-2xl border border-[#1f2937] bg-[#111827] focus-within:border-indigo-500/50 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                rows={1}
                                onChange={e => { setInput(e.target.value); autoResize(); }}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                                placeholder="Message Nexus AI…"
                                className="w-full bg-transparent px-4 pt-3.5 pb-2.5 text-white text-[13px] placeholder-slate-600 outline-none resize-none leading-relaxed"
                                style={{ fontFamily: "'Sora',sans-serif", maxHeight: "160px" }}
                            />
                            <div className="flex items-center justify-between px-3 pb-2.5">
                                <button className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.04] transition-all">
                                    <AttachIcon />
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className="hidden sm:block text-[10px] text-slate-700">⏎ to send · Shift+⏎ newline</span>
                                    <button onClick={send} disabled={!input.trim() || typing}
                                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                                        style={{
                                            background: input.trim() && !typing ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#1f2937",
                                            color: "white",
                                            boxShadow: input.trim() && !typing ? "0 0 16px rgba(99,102,241,0.35)" : "none",
                                        }}>
                                        <SendIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-[10px] text-slate-700 mt-2" style={{ fontFamily: "'Sora',sans-serif" }}>
                            Nexus AI can make mistakes. Verify important information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}