"use client";

import React from "react";
import Image from "next/image";
import { useGetMyOrderQuery } from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { format } from "date-fns";

const MyOrder = () => {
  const { data: myOrderData, isLoading, isError } = useGetMyOrderQuery();

  if (isLoading)
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );

  if (isError)
    return <p className="text-center py-12 text-red-500">Failed to load orders</p>;

  if (!myOrderData?.data?.length)
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-8">
        {myOrderData.data.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-mono font-semibold">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on: {format(new Date(order.orderDate), "MMM dd, yyyy 'at' h:mm a")}
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
            <div className="p-6 space-y-6">
              {order.items.map((item) => {
                const product = item.product;
                const thumbnail = product?.thumbnail || "/placeholder.jpg";

                return (
                  <div key={item._id} className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-28 h-28 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                        <Image
                          src={`${imageUrl}${thumbnail}`}
                          alt={product.productName}
                          width={112}
                          height={112}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Brand: <span className="font-medium">{product.brand.brandName}</span>
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
                            <div key={vq.variant} className="border-t pt-3 first:border-t-0 first:pt-0">
                              {/* Color */}
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-5 h-5 rounded-full border"
                                  style={{ backgroundColor: variant?.color?.hexValue }}
                                />
                                <p className="text-sm font-medium text-gray-800">{colorName}</p>
                              </div>

                              {/* Sizes with Price */}
                              <div className="ml-7 space-y-1">
                                {vq.sizeQuantities.map((sq) => {
                                  const sizeObj = variant?.size.find(
                                    (s) => s._id === sq.size
                                  );

                                  return (
                                    <div
                                      key={sq.size}
                                      className="flex items-center justify-between text-xs"
                                    >
                                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                                        {sizeObj?.name || "N/A"}: <strong>{sq.quantity}</strong>
                                      </span>
                                      <span className="text-gray-600">
                                        ৳{sq.price} × {sq.quantity} ={" "}
                                        <strong className="text-gray-900">৳{sq.sizeTotal}</strong>
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Variant Total */}
                              <div className="flex justify-end mt-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Variant Total:{" "}
                                  <span className="text-primary font-bold">৳{vq.variantTotal}</span>
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
                            ৳{item.itemTotal}
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
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    Delivery to:{" "}
                    <span className="font-medium">
                      {order.address.city}, {order.address.state}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Order Total</p>
                  <p className="text-2xl font-bold text-primary">৳{order.total}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;