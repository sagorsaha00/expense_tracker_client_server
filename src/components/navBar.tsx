import React from 'react'
import { useNavigate } from 'react-router-dom';

export function NavBar() {
    const navigate = useNavigate();
    return (
        <nav className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">E</div>
                <span className="text-sm font-semibold text-gray-800">ExpenseTracker</span>
            </div>
            {/* Profile */}
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium text-gray-800">John Doe</p>

                </div>
                <div onClick={() => navigate("/profile")} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                    JD
                </div>
            </div>
        </nav>
    )
}


