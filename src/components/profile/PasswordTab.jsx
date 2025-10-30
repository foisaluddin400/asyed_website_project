"use client";

import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
// import { useChangePasswordMutation } from "@/redux/api/userApi"; // Uncomment when you connect API

export const PasswordTab = () => {
  // const [changePassword] = useChangePasswordMutation();
  const [passError, setPassError] = useState("");
  const router = useRouter();

  const handlePasswordChange = async (values) => {
    // Password validation
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password.");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match.");
    } else {
      setPassError("");
    }

    // Prepare payload
    const data = {
      current_password: values.currentPassword,
      new_password: values.newPassword,
    };

    try {
      // const response = await changePassword(data).unwrap();
      // message.success(response.message);
      // console.log(response);
      // router.push("/"); // redirect if needed
      message.success("Password changed successfully!");
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Failed to change password!");
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handlePasswordChange}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Change Your Password
        </h2>

        <Form.Item
          name="currentPassword"
          label="Old Password"
          rules={[{ required: true, message: "Please enter your current password!" }]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="Old Password"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: "Please enter a new password!" }]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="Confirm Password"
          />
        </Form.Item>

        {/* Display custom error message */}
        {passError && <p className="text-red-500 text-sm mb-2">{passError}</p>}

        <Form.Item>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#E63946] text-white py-2 hover:bg-[#d62828] transition"
            >
              Change Password
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordTab;
