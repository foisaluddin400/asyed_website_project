"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGetCompleteOrdersQuery } from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Form, Input, Modal, Pagination, Rate, Spin, Upload, message } from "antd";
import {
  useAddCustomarReviewMutation,
  useGetSingleProductReviewQuery,
} from "@/redux/Api/productApi";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import Link from "next/link";
import { Shirt, Sparkles } from "lucide-react";

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const MyReview = () => {
  const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
  const { data: profileData } = useGetProfileQuery();
  const profileId = profileData?.data?._id;

  const [addReview] = useAddCustomarReviewMutation();

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // for both add & view

  const { data: myOrderData, isLoading, isError } = useGetCompleteOrdersQuery({ page: currentPage,
    limit: pageSize,});

  // Fetch review for the selected product (only when view modal is open)
  const { data: singleReviewData, isFetching: reviewLoading } =
    useGetSingleProductReviewQuery(
      { id: selectedProductId },
      { skip: !selectedProductId || !openViewModal }
    );
  console.log(singleReviewData);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
    setSelectedProductId(null);
  };

  const handleViewCancel = () => {
    setOpenViewModal(false);
    setSelectedProductId(null);
  };

  if (isLoading)
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );

  if (isError)
    return (
      <p className="text-center py-12 text-red-500">Failed to load orders</p>
    );

  if (!myOrderData?.data?.length)
    return (
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
              No Order Yet!
            </h3>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md mx-auto">
              Start creating your custom designs and they will appear here in your personal collection.
            </p>

            {/* Action Button */}
            <Link href="/allProduct">
              <button className="bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 text-white font-semibold px-8 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto shadow-lg">
                <Sparkles className="w-6 h-6" />
                Start Shopping Now
              </button>
            </Link>

           
          </div>
        </div>
      </div>
    );

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one image!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      formData.append("product", selectedProductId);
      formData.append("comment", values.comment);
      formData.append("rating", values.rating);

      const res = await addReview(formData).unwrap();

      toast.success(res?.message || "Review added successfully!");
      form.resetFields();
      setFileList([]);
      setOpenAddModal(false);
      setSelectedProductId(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openAddReviewModal = (productId) => {
    setSelectedProductId(productId);
    setOpenAddModal(true);
  };

  const openViewReviewModal = (productId) => {
    setSelectedProductId(productId);
    setOpenViewModal(true);
  };
const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div className="container mx-auto ">
     

      <div className="space-y-4">
        {myOrderData.data.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gray-50 md:px-6 px-2 py-4 border-b border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Order ID:{" "}
                    <span className="font-mono font-semibold">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on:{" "}
                    {format(
                      new Date(order.orderDate),
                      "MMM dd, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-orange-100 text-orange-800"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="md:p-6 p-2 space-y-6">
              {order.items.map((item) => {
                const product = item.product;
                const thumbnail = product?.thumbnail || "/placeholder.jpg";

                return (
                  <div key={item._id} className="md:flex gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-28 h-28 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                        <img
                          src={`${imageUrl}${thumbnail}`}
                          alt={product.productName}
                          width={112}
                          height={112}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3 mt-4 md:mt-0">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Brand:{" "}
                          <span className="font-medium">
                            {product.brand.brandName}
                          </span>
                        </p>
                      </div>

                      {/* Variant Quantities */}
                      <div className="space-y-4">
                        {item.variantQuantities.map((vq) => {
                          const variant = product.variants.find(
                            (v) => v._id === vq.variant
                          );
                          const colorName = variant?.color?.name || "N/A";

                          return (
                            <div
                              key={vq.variant}
                              className="border-t pt-3 first:border-t-0 first:pt-0"
                            >
                              {/* Color */}
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-5 h-5 rounded-full border"
                                  style={{
                                    backgroundColor: variant?.color?.hexValue,
                                  }}
                                />
                                <p className="text-sm font-medium text-gray-800">
                                  {colorName}
                                </p>
                              </div>

                              {/* Sizes with Price */}
                              <div className="ml-7 space-y-1">
                                {vq.sizeQuantities.map((sq) => (
                                  <div
                                    key={sq.size._id}
                                    className="flex items-center justify-between text-xs"
                                  >
                                    <span className="bg-gray-100 px-2 py-0.5 rounded">
                                      {sq.size.name}:{" "}
                                      <strong>{sq.quantity}</strong>
                                    </span>
                                    <span className="text-gray-600">
                                      {sq.price} × {sq.quantity} ={" "}
                                      <strong className="text-gray-900">
                                        {sq.sizeTotal}
                                      </strong>
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Variant Total */}
                              <div className="flex justify-end mt-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Variant Total:{" "}
                                  <span className="text-primary font-bold">
                                    {vq.variantTotal}
                                  </span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Item Total */}
                      <div className="flex justify-end border-t pt-2">
                        <p className="text-sm font-medium text-gray-700">
                          Item Total:{" "}
                          <span className="text-lg font-bold text-primary">
                            {item.itemTotal}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Delivery to:{" "}
                    <span className="font-medium">
                      {order.address.city}, {order.address.state}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Order Total</p>
                    <p className="text-2xl font-bold text-primary">
                      {order.total}
                    </p>
                  </div>

                  {/* Loop through items to show correct button per product */}
                  {order.items.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      {item.isReviewed ? (
                        <button
                          onClick={() => openViewReviewModal(item.product._id)}
                          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md text-white font-medium transition"
                        >
                          My Review
                        </button>
                      ) : (
                        <button
                          onClick={() => openAddReviewModal(item.product._id)}
                          className="bg-primary hover:bg-primary/90 px-5 py-2 rounded-md text-white font-medium transition"
                        >
                          Add Review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={myOrderData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      </div>

      {/* Add Review Modal */}
      <Modal
        centered
        open={openAddModal}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div>
          <div className="font-semibold text-center text-2xl mb-6">
            + Add Review
          </div>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Comment"
              name="comment"
              rules={[{ required: true, message: "Please input Comment!" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Write your review here..."
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </Form.Item>

            <Form.Item
              label="Review Rating"
              name="rating"
              rules={[{ required: true, message: "Please input rating!" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item label="Upload Product Images">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
                beforeUpload={() => false}
                showUploadList={{ showRemoveIcon: true }}
              >
                {fileList.length >= 5 ? null : (
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="mt-2 text-sm text-gray-600">
                      + Upload Images
                    </div>
                    <div className="text-xs text-gray-500">Up to 5 images</div>
                  </div>
                )}
              </Upload>
              <div className="text-xs text-gray-500 mt-2">
                You can upload multiple images (JPG, PNG)
              </div>
            </Form.Item>

            <Form.Item>
              <button
                className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                  loading
                    ? "bg-[#fa8e97] cursor-not-allowed"
                    : "bg-[#E63946] hover:bg-[#941822]"
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
                  "Submit Review"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* View My Review Modal */}
      <Modal
        centered
        open={openViewModal}
        onCancel={handleViewCancel}
        footer={null}
        width={600}
        title={<div className="text-center font-bold text-2xl">My Review</div>}
      >
        {reviewLoading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : singleReviewData?.data?.length > 0 ? (
          <div className="space-y-4">
            {singleReviewData?.data
              ?.filter((review) => review?.user?._id === profileId)
              .map((review) => (
                <div key={review?._id} className="bg-gray-50 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`${imageUrl}${review?.user?.imageUrl}`}
                      alt={review?.user?.firstName}
                      width={48}
                      height={48}
                      className="rounded-full w-[50px] h-[50px] object-cover border"
                    />
                    <div>
                      <p className="font-semibold">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </p>
                      <Rate
                        disabled
                        value={review?.rating}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{review?.comment}</p>

                  <p className="text-xs text-gray-500">
                    Reviewed on:{" "}
                    {format(new Date(review?.createdAt), "MMM dd, yyyy")}
                  </p>

                  {review?.images?.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {review?.images?.map((img, idx) => (
                        <img
                          key={idx}
                          src={`${imageUrl}${img}`}
                          alt="Review"
                          width={100}
                          height={100}
                          className="rounded border object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">No review found</p>
        )}
      </Modal>
    </div>
  );
};

export default MyReview;
