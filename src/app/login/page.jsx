"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Card,
} from "@heroui/react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Login successful!", { position: "top-right" });
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }

      if (error) {
        toast.error(error.message || "Invalid email or password!", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google sign-in failed!", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-12 px-4 bg-linear-to-b from-slate-50 via-cyan-50/20 to-slate-50">
      
      {/* React Toastify Container */}
      <ToastContainer autoClose={3000} hideProgressBar={false} theme="light" />

      {/* Header Section */}
      <div className="text-center mb-8 space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
          Login
        </h1>
        <p className="text-gray-500 text-sm">
          Start your adventure with Wanderlust
        </p>
      </div>

      {/* Styled Card Component */}
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-cyan-100/80 shadow-xl shadow-cyan-950/5 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-300 hover:-translate-y-1.5 transition-all duration-300 ease-out animate-in fade-in zoom-in-95 duration-700">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          {/* Email Address */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
            className="space-y-1"
          >
            <Label className="text-xs font-semibold text-gray-700">Email Address</Label>
            <div className="relative flex items-center group">
              <FiMail className="absolute left-3.5 text-gray-400 group-focus-within:text-cyan-600 transition-colors text-base" />
              <Input
                placeholder="Enter your email"
                className="pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all w-full"
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
            className="space-y-1"
          >
            <Label className="text-xs font-semibold text-gray-700">Password</Label>
            <div className="relative flex items-center group">
              <FiLock className="absolute left-3.5 text-gray-400 group-focus-within:text-cyan-600 transition-colors text-base" />
              <Input
                placeholder="Enter your password"
                className="pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all w-full"
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm mt-2 shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Divider */}
          <div className="relative my-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/80"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">
              Or sign up with
            </span>
          </div>

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="flat"
            onClick={handleGoogleSignin}
            className="w-full border border-gray-200 hover:bg-gray-50/80 hover:border-gray-300 active:scale-[0.99] text-gray-700 font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 bg-white transition-all shadow-xs"
          >
            <FcGoogle className="text-base" />
            Sign in with Google
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline transition-all"
            >
              Sign Up
            </Link>
          </p>

        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;