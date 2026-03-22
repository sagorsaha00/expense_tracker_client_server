import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../auth/login';
import HomePage from '../components/home';
import RegisterPage from "../auth/register";
import App from "../App";
import ExpenseChatUI from "../components/chatUi";
import ProfileDropdown from "../components/profile";
import ExpenseList from "../components/expenseList";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
        ],
    },
    {
        path: "auth",
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