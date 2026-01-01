"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useAddReOrderCheckoutMutation,
  useGetMyOrderQuery,
} from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import { Shirt, Sparkles } from "lucide-react";
import Link from "next/link";

const MyOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const {
    data: myOrderData,
    isLoading,
    isError,
  } = useGetMyOrderQuery({ page: currentPage, limit: pageSize });
  const [rePayment, { isLoading: isRePaying }] =
    useAddReOrderCheckoutMutation();

  const handleRePayment = async (orderId) => {
    try {
      const response = await rePayment({
        id: orderId,
        data: { status: "shipped" },
      }).unwrap();

      const paymentUrl = response.data.url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Re-payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
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
  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div className="container mx-auto  ">
     

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

                  {/* Re Payment Button */}
                  {order.paymentStatus === "pending" && (
                    <button
                      onClick={() => handleRePayment(order._id)}
                      disabled={isRePaying}
                      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                        isRePaying
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      {isRePaying ? "Processing..." : "Re Payment"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
  );
};

export default MyOrder;
