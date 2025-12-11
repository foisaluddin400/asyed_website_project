"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message, Spin } from "antd";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";
import { useLoginAdminMutation } from "@/redux/Api/userApi";

import { toast } from "react-toastify";

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [loginUser] = useLoginAdminMutation();
  const [showPassword, setShowPassword] = useState(false);
const redirectUrl = searchParams.get("redirect") || "/";
  // Load saved credentials on mount

  
  useEffect(() => {
    const saved = localStorage.getItem("rememberedCredentials");
    if (saved) {
      const { email, password } = JSON.parse(saved);
      form.setFieldsValue({ email, password, remember: true });
    }
  }, [form]);

 const onFinish = async (values) => {
    const { email, password, remember } = values;
    setLoading(true);
    try {
      const payload = await loginUser({ email, password }).unwrap();

      if (payload?.data?.accessToken) {
        dispatch(setToken(payload?.data?.accessToken));

        if (remember) {
          localStorage.setItem(
            "rememberedCredentials",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedCredentials");
        }

        toast.success(payload?.message || "Login successful!");

        
        router.push(decodeURIComponent(redirectUrl));
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg lg:p-8 p-4 border">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your email address or choose a different way to sign in.
        </p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Email */}
          <Form.Item
            label="Enter Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              placeholder="Enter Email Address"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              style={{ height: "50px" }}
              placeholder="••••••••"
              visibilityToggle={{
                visible: showPassword,
                onVisibleChange: setShowPassword,
              }}
            />
          </Form.Item>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-700">Remember me</Checkbox>
            </Form.Item>
            <Link
              href="/signIn/forgot"
              className="text-sm text-[#2F799E] hover:underline focus:outline-none"
            >
              Forget password?
            </Link>
          </div>

          {/* Continue Button */}
          <Form.Item>
            <button
              className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-primary hover:bg-blue-500"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spin size="small" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google */}
        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300 mb-3"
        >
          <FaGoogle className="text-red-500 mr-2" /> Continue With Google
        </Button>

        {/* Facebook */}
        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300"
        >
          <FaFacebookF className="text-blue-600 mr-2" /> Continue With Facebook
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href="/signUp" className="text-blue-600 cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
