import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../auth/login';
import HomePage from '../components/home';
import RegisterPage from "../auth/register";
import ExpenseChatUI from "../components/chatUi";
import ProfileDropdown from "../components/profile";
import ExpenseList from "../components/expenseList";
import { RootLayout } from "../layouts/RootLayout";
import AuthLayout from "./AuthLayout";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "chatUi",
                element: <ExpenseChatUI />,
            },
            {
                path: "profile",
                element: <ProfileDropdown />
            },
            {
                path: "expenseList",
                element: <ExpenseList />
            }
        ]
    },

    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
        ],
    },
]);