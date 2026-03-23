import { BarChart2, Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28">
            <span className="text-xs font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full mb-6">
                AI-powered expense tracking
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mb-4">
                Track your money,<br />stay in control
            </h1>
            <p className="text-gray-400 text-base max-w-md mb-3 leading-relaxed">
                Just chat with AI to record your expenses. say i spent 500 on food
            </p>

            {/* Inline text highlights */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-gray-500 ">
                <span onClick={() => window.open("https://calendar.google.com", "_blank")} className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full cursor-pointer">
                    <Calendar size={12} className="text-blue-400" /> Calendar events
                </span>
                <span onClick={() => navigate('/chatUi')} className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full cursor-pointer">
                    <MessageCircle size={12} className="text-blue-400" /> Chat with AI
                </span>
                <span onClick={() => navigate('/expenseList')} className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full cursor-pointer">
                    <BarChart2 size={12} className="text-blue-400" />  see expense list
                </span>
            </div>

            <button
                onClick={() => navigate("/chatUi")}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-7 py-3 rounded-xl transition-colors"
            >
                <MessageCircle size={15} />
                Chat with AI now
            </button>
        </section>
    );
};

export default HeroSection;