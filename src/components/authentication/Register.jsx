'use client'

import { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useRegisterLoginMutation } from "@/redux/Api/userApi";
import { toast } from "react-toastify";

const SignUp = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerLogin] = useRegisterLoginMutation();

  const onFinish = async (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
const email = values.email
    try {
      const payload = await registerLogin(data).unwrap();
      if (payload) {
       toast.success(payload?.message)
        localStorage.setItem("email", email);
        router.push("/signUp/accountverify"); 
      } else {
      toast.error(payload?.message)
      }
    } catch (error) {
      console.error("SignUp error:", error);
    toast.error(error?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg lg:p-8 p-4 border">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Create An Account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Secure your account by creating a password and verifying your email.
        </p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Enter First Name"
              name="firstName"
              rules={[{ required: true, message: "Please Enter First Name!" }]}
            >
              <Input style={{ height: "50px" }} placeholder="Enter First Name" />
            </Form.Item>

            <Form.Item
              label="Enter Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please Enter Last Name!" }]}
            >
              <Input style={{ height: "50px" }} placeholder="Enter Last Name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Enter Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input style={{ height: "50px" }} placeholder="Enter Email Address" />
          </Form.Item>

          <Form.Item
            label="Enter New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              suffix={
                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              suffix={
                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          <Form.Item>
            <button
              htmlType="submit"
              className="w-full bg-primary py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button>
          </Form.Item>
        </Form>

        <p className="text-xs text-gray-600 mb-6 text-center">
          By Clicking Continue, I agree to the{" "}
          <span className="text-blue-600 cursor-pointer">Terms of Service</span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
        </p>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300 mb-3"
        >
          <FaGoogle className="text-red-500 mr-2" /> Continue With Google
        </Button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href={"/signIn"}>
            <span className="text-blue-600 cursor-pointer">Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
