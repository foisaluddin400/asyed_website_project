"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useApplyCouponMutation,
  useGetCartQuery,
  useRemoveCouponMutation,
} from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { toast } from "react-toastify";
import {
  useAddOrderCheckoutMutation,
  useGetAddressQuery,
} from "@/redux/Api/metaApi";
import { v4 as uuidv4 } from "uuid";
import MyAddress from "@/components/profile/MyAddress";
import { Form, Input, Spin } from "antd";

const OrderDetails = () => {
  const router = useRouter();

  // ---------- CART ----------
  const {
    data: cartData,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetCartQuery();
  const [form] = Form.useForm();
  const [applyCoupon] = useApplyCouponMutation();
  const [removeCoupon] = useRemoveCouponMutation();
  // ---------- ADDRESS ----------
  const { data: addressResp, isLoading: addrLoading } = useGetAddressQuery();
  const addressData = addressResp?.data || [];
  const [loading, setLoading] = useState(false);
  // Auto-select default address
  const defaultAddressId =
    addressData.find((a) => a.isDefault)?._id || addressData[0]?._id || null;
const appliedCoupon = cartData?.data?.summary?.coupon?.code;
  // ---------- PAYMENT ----------
  const [checkout, { isLoading: paying }] = useAddOrderCheckoutMutation();

  // ---------- CART UI STATE ----------
  const [selectedColors, setSelectedColors] = useState([]);

useEffect(() => {
  if (appliedCoupon) {
    form.setFieldsValue({ code: appliedCoupon });
  }
}, [appliedCoupon]);

  useEffect(() => {
    if (cartData?.data?.items && selectedColors.length === 0) {
      const filteredItems = cartData.data.items.filter(
        (item) => item.isSelected
      );

      const newSelectedColors = filteredItems.map((item) => ({
        itemId: item._id,
        variants: item.variants.map((variant) => ({
          variantId: variant.variantId,
          color: variant.color,
          sizes: variant.sizeQuantities.map((s) => ({
            _id: s.size,
            name: s.sizeName,
            quantity: s.quantity,
          })),
        })),
      }));
      setSelectedColors(newSelectedColors);
    }
  }, [cartData, selectedColors.length]);

  // ---------- QUANTITY CHANGE ----------
  const handleQuantityChange = (itemId, variantId, sizeName, qty) => {
    setSelectedColors((prev) =>
      prev.map((item) => {
        if (item.itemId !== itemId) return item;
        return {
          ...item,
          variants: item.variants.map((v) => {
            if (v.variantId !== variantId) return v;
            const newSizes = v.sizes.map((s) =>
              s.name === sizeName ? { ...s, quantity: Number(qty) } : s
            );
            return { ...v, sizes: newSizes };
          }),
        };
      })
    );
  };

  // ---------- CALCULATE TOTALS ----------
  const getItemTotals = (item) => {
    const cartItem = cartData?.data?.items?.find((i) => i._id === item.itemId);
    if (!cartItem) return { totalQuantity: 0, totalPrice: 0 };

    const totalQuantity = item.variants.reduce(
      (sum, v) => sum + v.sizes.reduce((s, sz) => s + (sz.quantity || 0), 0),
      0
    );

    const totalPrice = item.variants.reduce(
      (sum, v) =>
        sum +
        v.sizes.reduce(
          (s, sz) => s + (sz.quantity || 0) * cartItem.product.discountedPrice,
          0
        ),
      0
    );

    return { totalQuantity, totalPrice };
  };

  const overallTotalQuantity = selectedColors.reduce(
    (sum, i) => sum + getItemTotals(i).totalQuantity,
    0
  );
  const overallTotalPrice = selectedColors.reduce(
    (sum, i) => sum + getItemTotals(i).totalPrice,
    0
  );

const onFinish = async (values) => {
  setLoading(true);
  try {
    const res = await applyCoupon({ code: values.code }).unwrap();
    toast.success(res?.message || "Coupon applied successfully!");
  } catch (err) {
    toast.error(err?.data?.message || "Coupon failed!");
  } finally {
    setLoading(false);
  }
};

const handleRemoveCoupon = async () => {
  setLoading(true);
  try {
    const res = await removeCoupon().unwrap();
    toast.success(res?.message || "Coupon removed successfully!");
    form.resetFields();
  } catch (err) {
    toast.error(err?.data?.message || "Failed to remove coupon!");
  } finally {
    setLoading(false);
  }
};
  

  const handlePayment = async () => {
    if (!defaultAddressId) {
      toast.error("No delivery address available");
      return;
    }

    const idempotencyKey = uuidv4();
    const payload = {
      addressId: defaultAddressId,
      paymentMethod: "stripe",
    };

    try {
      const res = await checkout({
        body: payload,
        headers: { "Idempotency-Key": idempotencyKey },
      }).unwrap();
      console.log(res)

      toast.success("Order placed successfully!");
      router.push(res.data.payment.url);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Payment failed");
    }
  };

  // ---------- LOADING STATES ----------
  if (cartLoading || addrLoading)
    return <p className="text-center py-6">Loading...</p>;
  if (cartError)
    return <p className="text-center py-6 text-red-500">Error loading cart</p>;

  const selectedItems =
    cartData?.data?.items?.filter((item) => item.isSelected) || [];
  if (!selectedItems.length)
    return <p className="text-center py-6">No selected items for checkout</p>;

  // ---------- RENDER ----------
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* ===== LEFT: CART SUMMARY ===== */}
        <div>
          {/* Breadcrumb */}
          <nav className="text-sm mb-4">
            <span
              className="text-primary cursor-pointer"
              onClick={() => router.push("/")}
            >
              All Product
            </span>{" "}
            &gt; <span className="text-primary">Clothing</span> &gt;{" "}
            <span className="text-primary">T-Shirts</span>
          </nav>

          {/* Cart Items */}
          {selectedColors.map((item) => {
            const cartItem = cartData.data.items.find(
              (i) => i._id === item.itemId
            );
            const leftImage =
              cartItem?.design !== null
                ? cartItem?.variants[0]?.displayImages?.frontImage
                : cartItem?.product?.thumbnail;

            const { totalQuantity, totalPrice } = getItemTotals(item);

            return (
              <div key={item.itemId} className="mb-8 border rounded-lg p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <img
                    src={`${imageUrl}${leftImage}`}
                    alt="product"
                    className="w-24 h-24 object-contain rounded"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h1 className="font-semibold text-xl">
                      {cartItem?.product?.productName}
                    </h1>

                    {item.variants.map((variant) => (
                      <div key={variant.variantId} className="mt-3">
                        <div className="flex items-center gap-3">
                          {/* Color */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              Color:
                            </span>
                            <div
                              className="w-6 h-6 rounded-full border"
                              style={{
                                backgroundColor: variant.color?.hexValue,
                              }}
                            />
                          </div>

                          {/* Sizes */}
                          <div className="flex flex-wrap gap-2">
                            {variant.sizes.map((size) => (
                              <div key={size._id} className="text-center">
                                <p className="text-xs text-gray-600">
                                  {size.name}
                                </p>
                                <input
                                  disabled
                                  type="number"
                                  min="0"
                                  value={size.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item.itemId,
                                      variant.variantId,
                                      size.name,
                                      e.target.value
                                    )
                                  }
                                  className="w-16 border rounded px-1 py-0.5 text-sm"
                                />
                              </div>
                            ))}
                          </div>

                          {/* Variant Subtotal */}
                          <div className="ml-auto text-sm">
                            $
                            {variant.sizes
                              .reduce(
                                (s, sz) =>
                                  s +
                                  sz.quantity *
                                    cartItem.product.discountedPrice,
                                0
                              )
                              .toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Item Totals */}
                    <div className="mt-4 flex justify-between border-t pt-2">
                      <p>
                        Qty: <strong>{totalQuantity}</strong>
                      </p>
                      <p>
                        Total:{" "}
                        <strong className="text-primary">
                          ${totalPrice.toFixed(2)}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className=" p-2 border rounded-md">
            <Form form={form} layout="vertical" onFinish={onFinish}>
  <Form.Item
    label="Enter Coupon Code"
    name="code"
    rules={[
      {
        required: !appliedCoupon,
        message: "Please enter your coupon code!",
      },
    ]}
  >
    <div className="flex gap-2">
      {/* Input - 90% */}
      <Input
        style={{ height: "50px" }}
        placeholder="Enter Coupon Code"
        disabled={!!appliedCoupon}
        value={appliedCoupon || undefined}
        className="flex-[9]"
      />

      {/* Button - 10% */}
      {!appliedCoupon ? (
        /* APPLY BUTTON */
        <button
          type="submit"
          disabled={loading}
          className={`flex-[1] h-[50px] rounded text-white flex justify-center items-center transition-all ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? <Spin size="small" /> : "Apply"}
        </button>
      ) : (
        /* DELETE BUTTON */
        <button
          type="button"
          onClick={handleRemoveCoupon}
          disabled={loading}
          className={`flex-[1] h-[50px] rounded text-white flex justify-center items-center transition-all ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? <Spin size="small" /> : "✕"}
        </button>
      )}
    </div>
  </Form.Item>
</Form>


            {/* Overall Totals */}
            <div className="mt-8 border-t pt-4 flex justify-between font-medium">
              <p>
                Total Qty: <strong>{overallTotalQuantity}</strong>
              </p>
              <p>
                Total Price:
                <strong className="text-primary">
                  ${cartData?.data?.summary?.selectedTotalAmount}
                </strong>
              </p>
            </div>

            {/* PAYMENT BUTTON */}
            <button
              onClick={handlePayment}
              disabled={paying || !defaultAddressId}
              className={`mt-6 w-full py-3 rounded text-white transition ${
                paying || !defaultAddressId
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-red-600"
              }`}
            >
              {paying ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>

        {/* ===== RIGHT: DELIVERY ADDRESS ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          <MyAddress></MyAddress>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
