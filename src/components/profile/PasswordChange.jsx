'use client'
import React from "react";
import { Form, Input, Button, Card } from "antd";
const PasswordChange = () => {
      const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Password change submitted:", values);
    // 🔑 Call your API for password change here
  };
  return (
    <div>
         <Card className="w-full max-w-lg ">
      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        {/* Old Password */}
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please enter your old password" }]}
        >
          <Input.Password placeholder="Enter old password" size="large" />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter new password" size="large" />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ backgroundColor: "#E63946",  }}
          >
            Save Change
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  )
}

export default PasswordChange