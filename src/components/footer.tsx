import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <>
            <section className="px-6 py-16 bg-blue-500">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to take control?</h2>
                    <p className="text-blue-100 text-sm mb-8">
                        Chat with AI, track by calendar, hit your savings goals.
                    </p>
                    <button
                        onClick={() => navigate("/chatUi")}
                        className="flex items-center gap-2 mx-auto bg-white text-blue-500 text-sm font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                        <MessageCircle size={15} />
                        Open the Chat
                    </button>
                </div>
            </section>
            <footer className="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-semibold">E</div>
                    <span onClick={() => navigate('/')} className="text-xs text-gray-400">WalletTrack</span>
                </div>
                <p className="text-xs text-gray-400">Keep your finances simple.</p>
            </footer>
        </>
    )
}
