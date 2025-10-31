"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,

} from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import Link from "next/link";
import { toast } from "react-toastify";
import { Spin, Modal, Checkbox } from "antd";

const Cart = () => {
  const router = useRouter();
  const { data: cartData, isLoading, isError } = useGetCartQuery();

  const [updateSelected, { isLoading: isUpdatingSelection }] = useUpdateCartItemMutation();
  const [deleteCartData] = useDeleteCartMutation();
  const [selectedColors, setSelectedColors] = useState([]);

  // Modal & Selection State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({}); // { cartItemId: true/false }
  const [loadingItems, setLoadingItems] = useState({}); // নতুন: loading tracker

  // Initialize selectedColors + default selectedItems
  useEffect(() => {
    if (cartData?.data?.items && selectedColors.length === 0) {
      const newSelectedColors = cartData.data.items.map((item) => ({
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

      // Set default checkbox state from isSelected
      const defaultSelected = {};
      cartData.data.items.forEach((item) => {
        defaultSelected[item._id] = item.isSelected || false;
      });
      setSelectedItems(defaultSelected);
    }
  }, [cartData, selectedColors.length]);

  // Handle Checkbox → API Call with Loading
  const handleCheckboxChange = async (cartItemId, productId, checked) => {
    // Start loading
    setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));
    setSelectedItems((prev) => ({ ...prev, [cartItemId]: checked }));

    const payload = {
      product: productId,
      isSelected: checked,
    };

    try {
      await updateSelected({ id: cartItemId, data: payload }).unwrap();
      toast.success(`Item ${checked ? "selected" : "unselected"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update selection");
      setSelectedItems((prev) => ({ ...prev, [cartItemId]: !checked }));
    } finally {
      // End loading
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  // Open Modal
  const openOrderModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Error loading cart</p>;
  if (!cartData?.data?.items?.length) return <p className="text-center py-6">No items in cart</p>;

  // Calculate totals for selected items in modal
  const selectedCartItems = cartData.data.items.filter(
    (item) => selectedItems[item._id]
  );

  const modalTotalQuantity = selectedCartItems.reduce(
    (sum, item) =>
      sum +
      item.variants.reduce(
        (vSum, v) =>
          vSum +
          v.sizeQuantities.reduce((sSum, s) => sSum + s.quantity, 0),
        0
      ),
    0
  );

  const modalSubtotal = selectedCartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  // Update quantity
  const handleQuantityChange = (itemId, variantId, sizeName, qty) => {
    setSelectedColors((prev) =>
      prev.map((item) => {
        if (item.itemId === itemId) {
          return {
            ...item,
            variants: item.variants.map((variant) => {
              if (variant.variantId === variantId) {
                const newSizes = variant.sizes.map((s) =>
                  s.name === sizeName ? { ...s, quantity: Number(qty) } : s
                );
                return { ...variant, sizes: newSizes };
              }
              return variant;
            }),
          };
        }
        return item;
      })
    );
  };

  // Remove item
  const handleRemoveItem = async (itemId) => {
    try {
      await deleteCartData({ cartItemId: itemId }).unwrap();
      toast.success("Item removed");
      setSelectedColors((prev) => prev.filter((i) => i.itemId !== itemId));
      setSelectedItems((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  // Calculate item totals
  const getItemTotals = (item) => {
    const cartItem = cartData.data.items.find((i) => i._id === item.itemId);
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

  // Check if any item is loading
  const isAnyLoading = Object.values(loadingItems).some(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <span className="text-primary cursor-pointer" onClick={() => router.push("/")}>
          All Product
        </span>{" "}
        &gt; <span className="text-primary">Clothing</span> &gt;{" "}
        <span className="text-primary">T-Shirts</span>
      </nav>

      {/* Cart Items */}
      {selectedColors.map((item) => {
        const cartItem = cartData.data.items.find((i) => i._id === item.itemId);
        const leftImage =
          cartItem?.design !== null
            ? cartItem?.variants[0]?.displayImages?.frontImage
            : cartItem?.product?.thumbnail;

        const { totalQuantity, totalPrice } = getItemTotals(item);

        return (
          <div key={item.itemId} className="mb-12">
            <div className="grid relative grid-cols-12 gap-6 border p-4 rounded-lg">
              {/* Delete */}
              <button
                onClick={() => handleRemoveItem(item.itemId)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <div className="col-span-3">
                <img
                  src={`${imageUrl}${leftImage}`}
                  alt="Product"
                  className="w-full h-40 object-contain rounded"
                />
              </div>

              {/* Details */}
              <div className="col-span-9">
                <h1 className="font-semibold text-xl">{cartItem?.product?.productName}</h1>

                <Link href={`/editCartDesign/${cartItem?._id}`}>
                  <button className="text-blue-500 text-sm hover:text-primary/90">
                    Update Design / Color
                  </button>
                </Link>

                {/* Variants */}
                <div className="mt-4 space-y-3">
                  {item.variants.map((variant) => (
                    <div key={variant.variantId} className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Color:</p>
                            <div
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: variant.color?.hexValue }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {variant.sizes.map((size) => (
                            <div key={size._id} className="text-center">
                              <p className="text-xs text-gray-600">{size.name}</p>
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
                                className="w-16 border rounded px-2 py-1 text-sm"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="text-sm font-medium">
                          ${(
                            variant.sizes.reduce(
                              (s, sz) =>
                                s + sz.quantity * cartItem.product.discountedPrice,
                              0
                            )
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Item Totals */}
                <div className="mt-6 flex justify-between border-t pt-4">
                  <p>
                    Qty: <strong>{totalQuantity}</strong>
                  </p>
                  <p>
                    Total: <strong className="text-primary">${totalPrice.toFixed(2)}</strong>
                  </p>
                </div>

                <div className="mt-4">
                  <Link href={`/editCartDesign/${cartItem?._id}`}>
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                      Update Item
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Overall Totals */}
      <div className="mt-8 border-t pt-4 flex justify-between font-medium">
        <p>
          Total Qty: <strong>{overallTotalQuantity}</strong>
        </p>
        <p>
          Total Price: <strong className="text-primary">${overallTotalPrice.toFixed(2)}</strong>
        </p>
      </div>

      {/* Get Order Button */}
      <button
        onClick={openOrderModal}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
      >
        Get Order
      </button>

      {/* Modal */}
      <Modal
        title={<span className="text-xl font-bold">Select Items for Order</span>}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={900}
      >
        <div className="max-h-96 overflow-y-auto space-y-4">
          {cartData.data.items.map((item) => {
            const product = item.product;
            const thumbnail = product.thumbnail;
            const isChecked = selectedItems[item._id] ?? false;
            const isLoadingThis = loadingItems[item._id];

            return (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  checked={isChecked}
                  onChange={(e) =>
                    handleCheckboxChange(item._id, product._id, e.target.checked)
                  }
                  disabled={isLoadingThis}
                >
                  {isLoadingThis && <Spin size="small" className="ml-2" />}
                </Checkbox>

                <img
                  src={`${imageUrl}${thumbnail}`}
                  alt={product.productName}
                  className="w-16 h-16 object-contain rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{product.productName}</p>
                  <p className="text-sm text-gray-600">
                    {item.variants.map((v) => `${v.color.name}`).join(", ")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm">
                    {item.variants.reduce(
                      (sum, v) =>
                        sum +
                        v.sizeQuantities.reduce((s, sq) => s + sq.quantity, 0),
                      0
                    )}{" "}
                    pcs
                  </p>
                  <p className="font-medium text-primary">
                    ${item.total?.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex justify-between text-lg font-semibold">
            <p>Selected Items: {selectedCartItems.length}</p>
            <p>Total Quantity: {modalTotalQuantity}</p>
          </div>
          <div className="flex justify-between mt-2 text-xl font-bold text-primary">
            <p>Subtotal:</p>
            <p>${modalSubtotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-5 py-2 border rounded hover:bg-gray-100"
            disabled={isAnyLoading}
          >
            Cancel
          </button>
          <Link href="/orderDetails">
            <button
              className={`px-6 py-2 rounded text-white font-medium transition ${
                isAnyLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              }`}
              disabled={isAnyLoading}
            >
              {isAnyLoading ? "Updating..." : "Proceed to Checkout"}
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;