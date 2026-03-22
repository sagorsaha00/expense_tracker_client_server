import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";


export default function ProfilePage() {
    const navigate = useNavigate();

    const user = {
        firstName: "John",
        lastName: "Doe",
        email: "john@email.com",
        picture: "",
        plan: "Free plan",
        joined: "March 2024",
    };

    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <div className="h-screen bg-gray-50 flex flex-col">



            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-sm space-y-4">

                    <div className="bg-white rounded-2xl border border-gray-100 px-5 py-8 flex flex-col items-center text-center">
                        {user.picture ? (
                            <img
                                src={user.picture}
                                alt={fullName}
                                className="w-20 h-20 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                                {initials}
                            </div>
                        )}
                        <p className="text-base font-semibold text-gray-800">{fullName}</p>
                        <p className="text-sm text-gray-400 mt-1">{user.email}</p>

                    </div>

                    {/* Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-50">
                            <div className="px-5 py-3.5 flex items-center justify-between">
                                <p className="text-xs text-gray-400">First name</p>
                                <p className="text-sm text-gray-800 font-medium">{user.firstName}</p>
                            </div>
                            <div className="px-5 py-3.5 flex items-center justify-between">
                                <p className="text-xs text-gray-400">Last name</p>
                                <p className="text-sm text-gray-800 font-medium">{user.lastName}</p>
                            </div>
                            <div className="px-5 py-3.5 flex items-center justify-between">
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm text-gray-800 font-medium">{user.email}</p>
                            </div>
                            <div className="px-5 py-3.5 flex items-center justify-between">
                                <p className="text-xs text-gray-400">Joined</p>
                                <p className="text-sm text-gray-800 font-medium">{user.joined}</p>
                            </div>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => navigate("/auth/login")}
                        className="w-full bg-white border border-red-100 rounded-2xl px-5 py-4 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={15} className="text-red-400" />
                        <p className="text-sm text-red-500 font-medium">Log out</p>
                    </button>

                </div>
            </div>

        </div>

    );
}