import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { GoogleIcon } from "../icon";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../datastore/store";



const loginUser = async (data: { email: string; password: string }) => {
    try {
        const res = await axios.post("https://backend-of-expense-and-calenderevent-ai-2.onrender.com/auth/login", data);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Invalid email or password");
    }
};



const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password required"),
});


function Input({
    label,
    error,
    touched,

    ...props
}: any) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-slate-600">{label}</label>

            <div className="relative">
                <input
                    {...props}
                    className={`w-full h-11 px-3 pr-10 rounded-lg bg-white border outline-none transition
          ${touched && error
                            ? "border-red-500"
                            : "border-slate-300 focus:border-indigo-500"
                        }`}
                />


            </div>

            {touched && error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}


export default function LoginPage() {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            const user = data.userData
            const token = data.token
            useAuthStore.getState().setAuth(user, token);
            navigate("/");
        },
        onError: (err: Error) => {
            setMessage(err.message);
        },
    });


    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: (values) => {
            setMessage("");
            mutation.mutate(values);
        },
    });
    const handleLoginByGoogle = () => {
        const popup = window.open(
            'https://backend-of-expense-and-calenderevent-ai-2.onrender.com/auth/google',
            'Google Login',
            'width=500,height=600,left=300,top=100'
        )
        window.addEventListener('message', (event: MessageEvent) => {
            if (event.origin !== 'https://backend-of-expense-and-calenderevent-ai-2.onrender.com') return
            console.log("event", event)
            const { userData, token } = event.data
            console.log(userData, token)
            if (userData && token) {
                useAuthStore.getState().setAuth(userData, token);
                popup?.close();
            }

            navigate('/');
        })
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 shadow-md">


                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Sign in
                </h2>


                {message && (
                    <p className="text-sm mb-3 text-indigo-500">{message}</p>
                )}


                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}

                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter passWord"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                        touched={formik.touched.password}

                    />


                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition disabled:opacity-60"
                    >
                        {mutation.isPending ? "Signing in..." : "Sign in"}
                    </button>
                </form>


                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-slate-300" />
                    <span className="text-xs text-slate-400">or</span>
                    <div className="flex-1 h-px bg-slate-300" />
                </div>


                <button onClick={handleLoginByGoogle} className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">
                    <span><GoogleIcon /></span>
                    Continue with Google
                </button>

                <p className="text-center text-sm text-slate-500 mt-5">
                    please sign up BY Google account
                    {/* Don't have an account?{" "} */}
                    {/* <span onClick={handleLogin} className="text-indigo-600 font-semibold cursor-pointer">
                        Register
                    </span> */}
                </p>
            </div>
        </div>
    );
}