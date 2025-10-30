'use client';
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAddContactMutation } from "@/redux/Api/metaApi";
import Swal from "sweetalert2";

const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [addContact, { isLoading }] = useAddContactMutation();

const onFinish = async (values) => {
  try {
    const res = await addContact(values).unwrap();

    // SweetAlert2 success alert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: res?.message || 'Message sent successfully!',
      confirmButtonColor: '#3085d6',
    });

    form.resetFields(); // reset form after success
  } catch (err) {
    // SweetAlert2 error alert
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err?.data?.message || 'Something went wrong!',
      confirmButtonColor: '#d33',
    });
  }
};
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Form</h2>
      <p className="text-gray-600 mb-8">
        We'd love to hear from you! Whether it's a question, feedback, or just a
        hello — drop us a message.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input className="h-[40px]" placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="E-mail Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input className="h-[40px]" placeholder="Your email address" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <TextArea rows={6} placeholder="Message" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="bg-blue-500"
          >
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
