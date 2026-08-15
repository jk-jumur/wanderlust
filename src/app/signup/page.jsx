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
  Card 
} from "@heroui/react";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Confirm Password Validation
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.fullName,
        image: user.imageUrl,
      });

      if (data) {
        toast.success("Account created successfully!", { position: "top-right" });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }

      if (error) {
        toast.error(error.message || "Failed to create account!", { position: "top-right" });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

   const handleGoogleSignin = async() =>{
         await authClient.signIn.social({
        provider: "google",
     });
   }
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-12 px-4 bg-linear-to-b from-slate-50 via-cyan-50/20 to-slate-50">
      
      {/* Toast Notification Container */}
      <ToastContainer autoClose={3000} hideProgressBar={false} theme="light" />

      {/* Animated Header */}
      <div className="text-center mb-8 space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
          Create Account
        </h1>
        <p className="text-gray-500 text-sm">
          Start your adventure with Wanderlust
        </p>
      </div>

      {/* Main Card Container */}
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-cyan-100/80 shadow-xl shadow-cyan-950/5 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-300 hover:-translate-y-1.5 transition-all duration-300 ease-out animate-in fade-in zoom-in-95 duration-700">
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Full Name */}
          <TextField name="fullName" isRequired className="space-y-1">
            <Label className="text-xs font-semibold text-gray-700">Full Name</Label>
            <div className="relative flex items-center group">
              <FiUser className="absolute left-3.5 text-gray-400 group-focus-within:text-cyan-600 transition-colors text-base" />
              <Input 
                placeholder="Enter your name" 
                className="pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all w-full"
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Email Address */}
          <TextField 
            name="email" 
            type="email" 
            isRequired
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

          {/* Profile Image URL Field */}
          <TextField name="imageUrl" isRequired className="space-y-1">
            <Label className="text-xs font-semibold text-gray-700">Profile Image URL</Label>
            <div className="relative flex items-center group">
              <FiImage className="absolute left-3.5 text-gray-400 group-focus-within:text-cyan-600 transition-colors text-base" />
              <Input 
                type="url"
                placeholder="https://example.com/avatar.jpg" 
                className="pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all w-full"
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Password */}
          <TextField 
            name="password" 
            type="password" 
            isRequired
            minLength={8}
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              return null;
            }}
            className="space-y-1"
          >
            <Label className="text-xs font-semibold text-gray-700">Password</Label>
            <div className="relative flex items-center group">
              <FiLock className="absolute left-3.5 text-gray-400 group-focus-within:text-cyan-600 transition-colors text-base" />
              <Input 
                placeholder="Create a password" 
                className="pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all w-full"
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Confirm Password */}
          <TextField 
            name="confirmPassword" 
            type="password" 
            isRequired 
            className="space-y-1"
          >
            <Label className="text-xs font-semibold text-gray-700">Confirm Password</Label>
            <div className="relative flex items-center group">
              <FiLock className="absolute left-3.5 text-gray-400 group-focus-within:text-cyan-600 transition-colors text-base" />
              <Input 
                placeholder="Confirm your password" 
                className="pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all w-full"
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Gradient Action Button */}
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm mt-3 shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
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

          {/* Google Button */}
          <Button onClick={handleGoogleSignin}
            type="button" 
            variant="flat"
            className="w-full border border-gray-200 hover:bg-gray-50/80 hover:border-gray-300 active:scale-[0.99] text-gray-700 font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 bg-white transition-all shadow-xs"
          >
            <FcGoogle className="text-base" />
            Sign Up With Google
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-xs text-gray-500 mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline transition-all">
              Sign In
            </Link>
          </p>

        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;