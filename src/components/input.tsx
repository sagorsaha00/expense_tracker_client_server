import { useState, useRef, useEffect } from 'react';

type ChatInputProps = {
    onSubmitfun: (message: string) => void;
};


export function ChatInput({ onSubmitfun }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        console.log("handleSUbmit CLik")
        e.preventDefault();
        const userInput = input.trim();
        console.log("userinPut", userInput)
        if (userInput) {
            onSubmitfun(userInput);
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const userInput = input.trim();
            if (userInput) {
                onSubmitfun(userInput);
                setInput('');
                if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                }
            }
            console.log('You typed:', input.trim());

        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className="w-full bg-white border-t border-gray-100 px-4 py-4">
            <div className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-end gap-2 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-gray-400 transition-colors bg-white">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type an expense like 200 food..."
                            rows={1}
                            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 resize-none focus:outline-none text-sm leading-relaxed py-1 max-h-32"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors flex-shrink-0 mb-0.5"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}