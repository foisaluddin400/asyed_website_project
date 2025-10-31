'use client';

import { useEffect } from "react";
import { Form, Input } from "antd";
import { useForgotPasswordMutation } from "@/redux/Api/userApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgetPass = () => {
  const [form] = Form.useForm();
  const [forgetPass] = useForgotPasswordMutation();
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

    try {
      const payload = await forgetPass({ email }).unwrap();

      // On success, save email to localStorage
      if (payload?.success) {
        localStorage.setItem("forgotEmail", email);
        toast.success("Password reset email sent successfully!");
        router.push('/signIn/verify')
      }
    } catch (error) {
      console.error("Forget Password error:", error);
      toast.error(error?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg lg:p-8 p-4 border">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Forget Password</h2>
        <p className="text-gray-600 mb-6 text-sm">Enter your email</p>

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
            <Input style={{ height: "50px" }} placeholder="Enter Email Address" />
          </Form.Item>

          {/* Continue Button */}
          <Form.Item>
            <button
              type="submit"
              className="w-full bg-primary py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPass;
