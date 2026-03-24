// components/SetPasswordForm.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../datastore/store";
import api from "../lib/refreshTokenCall";

const setPassword = async (data: { userId: string; password: string }) => {
    console.log("data", data)
    const res = await api.post("http://localhost:3001/auth/setpassword", data);
    return res.data;
};

const SetPasswordForm = () => {
    const { user } = useAuthStore();
    const userId = user!._id
    const mutation = useMutation({
        mutationFn: setPassword,
        onSuccess: () => {
            alert("Password set successfully!");
        },
        onError: (error: Error) => {
            alert(error.response?.data?.message || "Something went wrong");
        },
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "At least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Please confirm your password"),
        }),
        onSubmit: (values) => {
            mutation.mutate({ userId, password: values.password });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-1 shadow-sm">
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="New password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded-lg px-4 py-2"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded-lg px-4 py-2"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition disabled:opacity-60"
            >
                {mutation.isPending ? "Saving..." : "Set Password"}
            </button>
        </form>
    );
};

export default SetPasswordForm;