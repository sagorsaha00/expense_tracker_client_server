import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, CalendarDays, BadgeCheck, User } from "lucide-react";
import { useAuthStore } from "../datastore/store";
import SetPasswordForm from "./sePassword";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const fullName = user?.name || "Unknown User";
    const email = user?.email || "No email";
    const picture = user?.picture || "";
    const verifiedEmail = user?.verifiedEmail;
    const joined = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Not available";

    const initials = useMemo(() => {
        if (!fullName) return "U";

        const parts = fullName.trim().split(" ");
        if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";

        return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
    }, [fullName]);
    const handleLogout = () => {
        useAuthStore.getState().logout();
        navigate("/auth/login");

    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-md mx-auto">
                {/* Top */}
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage your personal account
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 py-8 flex flex-col items-center text-center">
                    {picture ? (
                        <img
                            src={picture}
                            alt={fullName}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-50 shadow-sm"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                            {initials}
                        </div>
                    )}

                    <h2 className="mt-4 text-lg font-semibold text-gray-800">
                        {fullName}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">{email}</p>

                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
                        <BadgeCheck
                            size={14}
                            className={verifiedEmail ? "text-green-500" : "text-gray-400"}
                        />
                        <span
                            className={`text-xs font-medium ${verifiedEmail ? "text-green-600" : "text-gray-500"
                                }`}
                        >
                            {verifiedEmail ? "Email verified" : "Email not verified"}
                        </span>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-4 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-800">
                            Account Information
                        </p>
                    </div>

                    <div className="divide-y divide-gray-50">
                        <div className="px-5 py-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <User size={16} className="text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Full name</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {fullName}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 py-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <Mail size={16} className="text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Email address</p>
                                    <p className="text-sm font-medium text-gray-800 break-all">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 py-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <CalendarDays size={16} className="text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Joined</p>
                                    <p className="text-sm font-medium text-gray-800">{joined}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SetPasswordForm />
                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 bg-white border border-red-100 rounded-2xl px-5 py-4 flex items-center justify-center gap-2 hover:bg-red-50 transition cursor-pointer"
                >
                    <LogOut size={16} className="text-red-400" />
                    <span className="text-sm font-medium text-red-500">Log out</span>
                </button>
            </div>
        </div>
    );
}