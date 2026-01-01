'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useChangePasswordMutation } from '@/redux/Api/userApi';
import { toast } from 'react-toastify';

const PasswordChange = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passError, setPassError] = useState('');

  const onFinish = async (values) => {
    // extra safety (AntD already validates, but we keep it)
    if (values.oldPassword === values.newPassword) {
      setPassError('New password cannot be the same as the old password.');
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      setPassError('Passwords do not match.');
      return;
    }
    setPassError('');

    const payload = {
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      const res = await changePassword(payload).unwrap();
      toast.success(res?.message || 'Password changed successfully!');
      form.resetFields();               // clear all fields
    } catch (err) {
      const errMsg = err?.data?.message || 'Failed to change password';
      toast.error(errMsg);
      console.error(err);
    }
  };

  return (
    <div className="  max-w-2xl m-auto">
      <div className="">
      

        {/* Optional inline error */}
        {passError && (
          <div className="mb-4 text-red-600 text-sm">{passError}</div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Old Password */}
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: 'Please enter your old password' },
            ]}
          >
            <Input.Password
            className='py-3'
              placeholder="Enter old password"
              size="large"
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
            className='py-3'
              placeholder="Enter new password"
              size="large"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input.Password
            className='py-3'
              placeholder="Confirm new password"
              size="large"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-[#E63946] text-white py-3 rounded-md"
              
            >
              Save Change
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChange;