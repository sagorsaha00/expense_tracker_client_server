import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../auth/login';
import HomePage from '../components/home';
import RegisterPage from "../auth/register";
import App from "../App";

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
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "register",
                        element: <RegisterPage />,
                    }
                ],
            },
        ],
    },
]);