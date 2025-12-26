'use client';

import { useEffect, useState } from "react";
import { Form, Input, Spin } from "antd";
import { useForgotPasswordMutation } from "@/redux/Api/userApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgetPass = () => {
  const [form] = Form.useForm();
  const [forgetPass] = useForgotPasswordMutation();
   const [loading, setLoading] = useState(false);
const router = useRouter()
  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("forgotEmail");
    if (savedEmail) {
      form.setFieldsValue({ email: savedEmail });
    }
  }, [form]);

  const onFinish = async (values) => {
    const { email } = values;
setLoading(true)
    try {
      const payload = await forgetPass({ email }).unwrap();

      // On success, save email to localStorage
      if (payload?.success) {
        localStorage.setItem("forgotEmail", email);
        toast.success("Password reset email sent successfully!");
        setLoading(false)
        router.push('/signIn/verify')
      }
    } catch (error) {
      console.error("Forget Password error:", error);
      setLoading(false)
      toast.error(error?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg lg:p-8 p-4 border">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Forget Password</h2>
        <p className="text-gray-600 mb-6 text-sm">Enter your email</p>

        <Form form={form} layout="vertical" onFinish={onFinish}>


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
                "Continue"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPass;
