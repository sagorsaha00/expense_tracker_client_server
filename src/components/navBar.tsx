import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../datastore/store";

export function NavBar() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const picture = user?.picture;
    const name = user?.name || "User";

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <nav className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">

            <div
                onClick={() => navigate("/")}
                className="flex items-center gap-3 cursor-pointer group"
            >
                <div className="w-9 h-9 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:scale-105 transition">
                    W
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-800 leading-none">
                        alletTrack
                    </p>
                    <p className="text-[11px] text-gray-400 hidden sm:block">
                        Track your money
                    </p>
                </div>
            </div>


            <div className="flex items-center gap-3">

                {/* Name (optional) */}
                <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-800">
                        {name}
                    </p>
                </div>


                <div
                    onClick={() => navigate("/profile")}
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer shadow-sm hover:scale-105 transition"
                >
                    {picture ? (
                        <img
                            src={picture}
                            alt={name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            {initials}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}