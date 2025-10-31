"use client";

import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/Api/userApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const NewPassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [resetPass, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = async (values) => {
    const { password } = values;
    const resetToken = localStorage.getItem("resetToken");

    if (!resetToken) {
      Swal.fire({
        icon: "error",
        title: "Invalid Session",
        text: "Reset token not found. Please try again.",
      });
      return;
    }

    try {
      const payload = await resetPass({
        newPassword:password,
        resetToken,
      }).unwrap();

     
      localStorage.removeItem("resetToken"); 

    toast.success(payload?.message)

      router.push("/signIn");
    } catch (error) {
      console.error("Reset password error:", error);
    toast.error(error?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-6 lg:p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set New Password</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Your new password must be different from previously used passwords.
        </p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Password */}
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
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

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
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
            <Input.Password
              style={{ height: "50px" }}
              placeholder="••••••••"
              visibilityToggle={{
                visible: showConfirmPassword,
                onVisibleChange: setShowConfirmPassword,
              }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary-dark"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;