"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Check, Sparkles, Shirt } from "lucide-react";
import { Modal, Form, Input, Select, Checkbox, Button, message } from "antd";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} from "@/redux/Api/metaApi";
import { toast } from "react-toastify";

const { Option } = Select;

const MyAddress = () => {
  const { data, isLoading, refetch } = useGetAddressQuery();
  console.log(data)
  const [addAddress, { isLoading: adding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: deleting }] = useDeleteAddressMutation();

  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form] = Form.useForm();

  // Sync data
  useEffect(() => {
    if (data?.data) {
      setAddresses(data.data);
    }
  }, [data]);

  // Open modal (Add or Edit)
  const openModal = (addr = null) => {
    setEditingAddress(addr);
    if (addr) {
      form.setFieldsValue({
        type: addr.type,
        fullName: addr.fullName,
        phone: addr.phone,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country,
        isDefault: addr.isDefault,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    form.resetFields();
  };

  // Save (Add or Update)
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingAddress) {
        await updateAddress({ id: editingAddress._id, data: values }).unwrap();
        message.success("Address updated successfully");
      } else {
        await addAddress(values).unwrap();
        message.success("Address added successfully");
      }

      closeModal();
      refetch();
    } catch (error) {
      if (error.errorFields) {
        // AntD validation error
      } else {
        message.error("Failed to save address");
      }
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      const res = await deleteAddress(id).unwrap();
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  ">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <button
          className="bg-primary px-4 py-1 rounded text-white"
          onClick={() => openModal()}
        >
          Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4 mb-8">
        {addresses.length === 0 ? (
            <div className="text-center py-12">
        <div className="text-center py-16 px-6">
          <div className="mx-auto max-w-md">
            {/* Illustration */}
            <div className="mb-8 relative">
              <div className="mx-auto w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center">
                <Shirt className="w-24 h-24 text-primary/60" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              No Address Yet!
            </h3>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md mx-auto">
              Start creating your custom designs and they will appear here in your personal collection.
            </p>

            

           
          </div>
        </div>
      </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-5 border rounded-lg relative transition-all ${
                addr.isDefault
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium capitalize text-gray-700">
                    {addr.type}
                  </p>
                  <p className="font-semibold text-lg">{addr.fullName}</p>
                  <p className="text-sm text-gray-600">{addr.phone}</p>
                  <p className="text-sm">
                    {addr.street}, {addr.city}
                    {addr.state && `, ${addr.state}`} {addr.zipCode}
                  </p>
                  <p className="text-sm font-medium">{addr.country}</p>
                </div>

                <div className="flex gap-2">
                  {/* Default Toggle */}

                  {/* Edit */}
                  <Button
                    size="small"
                    icon={<Edit size={14} />}
                    onClick={() => openModal(addr)}
                    disabled={updating}
                  />

                  {/* Delete */}
                  <Button
                    size="small"
                    danger
                    icon={<Trash2 size={14} />}
                    onClick={() => handleDelete(addr._id)}
                    disabled={deleting}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* AntD Modal with Form */}
      <Modal
        title={editingAddress ? "Edit Address" : "Add New Address"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            type: "home",
            isDefault: false,
          }}
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select>
              <Option value="home">Home</Option>
              <Option value="office">Office</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Enter full name" }]}
          >
            <Input placeholder="Mr John Doe" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Enter phone number" }]}
          >
            <Input placeholder="+44 070 0850 9395" />
          </Form.Item>

          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Enter street" }]}
          >
            <Input placeholder="15 Hexham Road" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Enter city" }]}
          >
            <Input placeholder="Isle Abbotts" />
          </Form.Item>

          <Form.Item label="State" name="state">
            <Input placeholder="Somerset" />
          </Form.Item>

          <Form.Item
            label="Zip Code"
            name="zipCode"
            rules={[{ required: true, message: "Enter zip code" }]}
          >
            <Input placeholder="TA3 9WG" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Enter country" }]}
          >
            <Input placeholder="United Kingdom" />
          </Form.Item>

          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default address</Checkbox>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={closeModal}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={adding || updating}
              >
                {editingAddress ? "Update" : "Add"} Address
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyAddress;
