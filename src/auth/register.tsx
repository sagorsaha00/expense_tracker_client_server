"use client";
import { useState } from "react";
import { useFormik } from "formik";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "../utils/input";
import { schema } from "../utils/schma";
import { EyeClose, EyeOpen, GoogleIcon } from "../icon";


const registerUser = async ({ values }: any) => {
  console.log("registerfunc", values)
};





/* ───── Register Page ───── */
export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const naviage = useNavigate()
  const handleLogin = () => {
    naviage('/auth/login')
  }
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess:() =>  {
        
    }
  });

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", confirm: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("values", values)
      mutation.mutate({
        values
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c14] px-4">
      <div className="w-full max-w-sm bg-[#0d1521] border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-[#f1f5f9] mb-4">Create Account</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

          <Input
            label="Username"
            name="username"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.username}
            touched={formik.touched.username}
          />

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
            type={showPw ? "text" : "password"}
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            rightIcon={showPw ? <EyeClose /> : <EyeOpen />}
            onRightClick={() => setShowPw(!showPw)}
          />

          <Input
            label="Confirm Password"
            name="confirm"
            type={showCf ? "text" : "password"}
            placeholder="Confirm password"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirm}
            touched={formik.touched.confirm}
            rightIcon={showCf ? <EyeClose /> : <EyeOpen />}
            onRightClick={() => setShowCf(!showCf)}
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-11 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition disabled:opacity-60"
          >
            {mutation.isPending ? "Creating..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-xs text-slate-500">or continue with</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-[#0f172a] hover:bg-slate-700 text-white font-semibold transition"
          >
            <GoogleIcon />
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-5">
          Already have an account?{" "}
          <span onClick={handleLogin} className="text-indigo-400 cursor-pointer hover:text-indigo-300">Login</span>
        </p>
      </div>
    </div>
  );
}