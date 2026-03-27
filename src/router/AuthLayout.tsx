import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../datastore/store";

const AuthLayout = () => {
    const { user } = useAuthStore();
    if (user) return <Navigate to="/" replace />;

    return <Outlet />;
};
export default AuthLayout;