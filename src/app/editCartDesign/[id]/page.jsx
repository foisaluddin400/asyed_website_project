"use client";

import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {
  useGetSingleCartQuery,
  useGetSingleProductQuery,
  useUpdateCartItemMutation,
} from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Spin } from "antd";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AddToDesign() {
  const params = useParams();
  const router = useRouter();
  const splideRef = useRef(null);
  const id = params?.id;
  console.log(id);

  const {
    data: singleDesignData,
    isLoading: loadingCart,
    isError: errorCart,
  } = useGetSingleCartQuery({ id });
  console.log(singleDesignData);
  const [updateCart] = useUpdateCartItemMutation();

  const [selectedColors, setSelectedColors] = useState([]);
  const [removedVariants, setRemovedVariants] = useState([]); // ← NEW: Track removed
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  // ── Get product ID ─────────────────────────────────────
  const product = singleDesignData?.data?.product;
  const productId = product?._id;

  // ── Fetch full product (all colors + all sizes) ───────
  const {
    data: singleAllColorData,
    isLoading: loadingProduct,
    isError: errorProduct,
  } = useGetSingleProductQuery({ id: productId }, { skip: !productId });

  // ── DEBUG: Print full product data ─────────────────────
  useEffect(() => {
    if (singleAllColorData) {
      console.log("singleAllColorData (full product):", singleAllColorData);
    }
  }, [singleAllColorData]);

  // ── Extract **all sizes** from product (same for all colors) ──
  const allProductSizes = singleAllColorData?.data?.variants?.[0]?.size || [];

  // ── Initialize selectedColors from cart + merge with full sizes ──
  useEffect(() => {
    if (
      singleDesignData?.data &&
      selectedColors.length === 0 &&
      allProductSizes.length > 0
    ) {
      const cartVariants = singleDesignData.data.variants || [];

      const init = cartVariants.map((v) => {
        const cartSizeMap = new Map(
          v.sizeQuantities.map((s) => [s.size, s.quantity])
        );
        const fullSizes = allProductSizes.map((sz) => ({
          _id: sz._id,
          name: sz.name,
          quantity: cartSizeMap.get(sz._id) || 0,
        }));

        return {
          variantId: v.variantId,
          color: v.color,
          sizes: fullSizes,
        };
      });

      setSelectedColors(init);
    }
  }, [singleDesignData, allProductSizes]);

  // ── Loading / Error UI ─────────────────────────────────
  if (loadingCart || loadingProduct)
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  if (errorCart || errorProduct)
    return <p className="text-center py-6 text-red-500">Error loading data</p>;
  if (!singleDesignData?.data || !singleAllColorData?.data)
    return <p className="text-center py-6">No data found</p>;

  const cartVariants = singleDesignData.data.variants || [];
  const allProductVariants = singleAllColorData.data.variants || [];

  // ── Handlers ───────────────────────────────────────────
  const handleAddColor = (variant) => {
    if (selectedColors.some((c) => c.variantId === variant._id)) {
      setShowColorPopup(false);
      return;
    }

    const newSizes = allProductSizes.map((sz) => ({
      _id: sz._id,
      name: sz.name,
      quantity: 0,
    }));

    setSelectedColors((prev) => [
      ...prev,
      {
        variantId: variant._id,
        color: variant.color,
        sizes: newSizes,
      },
    ]);

    // Remove from removed list if it was removed before
    setRemovedVariants((prev) => prev.filter((id) => id !== variant._id));

    setShowColorPopup(false);
  };

  const handleQuantityChange = (variantId, sizeId, qty) => {
    setSelectedColors((prev) =>
      prev.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              sizes: item.sizes.map((s) =>
                s._id === sizeId ? { ...s, quantity: Number(qty) } : s
              ),
            }
          : item
      )
    );
  };

  // ── REMOVE COLOR → Move to removedVariants ──
  const handleRemoveColor = (variantId) => {
    setSelectedColors((prev) => prev.filter((c) => c.variantId !== variantId));
    setRemovedVariants((prev) => [...prev, variantId]); // ← Track it
  };

  // ── UPDATE CART – INCLUDE REMOVED VARIANTS WITH sizeQuantities: [] ──
  // ── UPDATE CART – INCLUDE ALL SIZES (EVEN 0) + REMOVED VARIANTS ──
  const handleAddToDesign = () => {
    if (selectedColors.length === 0 && removedVariants.length === 0) {
      alert("Please select at least one color!");
      return;
    }

    // 1. Active variants – SEND ALL SIZES (including 0)
    const activeVariants = selectedColors.map((sel) => ({
      variant: sel.variantId,
      sizeQuantities: sel.sizes.map((s) => ({
        size: s._id,
        quantity: s.quantity, // ← No filtering! 0 is allowed
      })),
    }));

    // 2. Removed variants → send with empty sizeQuantities
    const removedVariantEntries = removedVariants.map((variantId) => ({
      variant: variantId,
      sizeQuantities: [],
    }));

    // 3. Combine both
    const variantQuantities = [...activeVariants, ...removedVariantEntries];

    // 4. Calculate total quantity (only count > 0)
    const totalQuantity = activeVariants.reduce(
      (sum, v) =>
        sum +
        v.sizeQuantities.reduce(
          (acc, sq) => acc + (sq.quantity > 0 ? sq.quantity : 0),
          0
        ),
      0
    );

    if (totalQuantity === 0) {
      toast.info("Please set quantity for at least one size!");
      return;
    }

    const cartData = {
      variantQuantities,
      quantity: totalQuantity,
      isSelected: true,
    };

    console.log("Sending to API:", cartData);
    setLoading(true);
    updateCart({ data: cartData, id })
      .unwrap()
      .then((res) => {
        toast.success("Cart updated successfully!");
        setLoading(false);
        console.log("Update response:", res);

        // Clean UI: remove colors with ALL zero
        setSelectedColors((prev) =>
          prev.filter((c) => c.sizes.some((s) => s.quantity > 0))
        );
        setRemovedVariants([]);
      })
      .catch((err) => {
        console.error("Update error:", err);
        setLoading(false);
        toast.error("Failed to update cart.");
      });
  };
  // ── Totals ─────────────────────────────────────────────
  const totalQuantity = selectedColors.reduce(
    (sum, c) => sum + c.sizes.reduce((acc, sz) => acc + (sz.quantity || 0), 0),
    0
  );
  const totalPrice = selectedColors.reduce(
    (sum, c) =>
      sum +
      c.sizes.reduce(
        (acc, sz) => acc + (sz.quantity || 0) * product.discountedPrice,
        0
      ),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <span
          className="text-primary cursor-pointer"
          onClick={() => router.push("/")}
        >
          All Product
        </span>{" "}
        &gt; <span className="text-primary">Clothing</span> &gt;{" "}
        <span className="text-primary">Jackat</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left – Images */}
        <div className="relative">
          <Splide
            ref={splideRef}
            options={{
              type: "loop",
              autoplay: true,
              interval: 5000,
              arrows: false,
              pagination: false,
            }}
          >
            {cartVariants.length > 0 ? (
              [
                cartVariants[0].displayImages?.frontImage,
                cartVariants[0].displayImages?.backImage,
                cartVariants[0].displayImages?.leftImage,
                cartVariants[0].displayImages?.rightImage,
              ].map(
                (img, i) =>
                  img && (
                    <SplideSlide key={i}>
                      <div className="border">
                        <Image
                          width={1000}
                          height={500}
                          src={`${imageUrl}${img}`}
                          alt={`Design ${i + 1}`}
                          className="h-[420px] w-full object-contain rounded-md"
                          onError={(e) =>
                            (e.currentTarget.src = "/placeholder.png")
                          }
                        />
                      </div>
                    </SplideSlide>
                  )
              )
            ) : (
              <SplideSlide>
                <div className="border h-[420px] flex items-center justify-center text-gray-500">
                  No images
                </div>
              </SplideSlide>
            )}
          </Splide>
        </div>

        {/* Right – Form */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-bold text-primary">
              ${product.discountedPrice}
            </span>
          </div>

          {/* Selected Colors */}
          <div className="space-y-6">
            {selectedColors.map((c) => {
              const matched = cartVariants.find(
                (v) => v.variantId === c.variantId
              );
              return (
                <div
                  key={c.variantId}
                  className="bg-white rounded p-5 border border-gray-200 relative"
                >
                  <button
                    onClick={() => handleRemoveColor(c.variantId)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-4">
                    {/* <img
                      src={
                        matched?.displayImages?.frontImage
                          ? `${imageUrl}${matched.displayImages.frontImage}`
                          : "/placeholder.png"
                      }
                      alt={c.color.name}
                      className="w-20 h-20 object-contain rounded-md"
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder.png")
                      }
                    /> */}
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {product.productName}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Color:{" "}
                        <span className="font-medium">{c.color.name}</span>
                      </p>
                    </div>
                    <div className="mt-5 text-right">
                      <button
                        onClick={() => setShowColorPopup(true)}
                        className="text-sm text-primary font-medium border border-primary px-4 py-1 rounded-md hover:bg-primary hover:text-white transition"
                      >
                        Change Color
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      ADULT
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {c.sizes.map((sz) => (
                        <div key={sz._id} className="text-center">
                          <p className="text-gray-600 text-sm mb-1">
                            {sz.name}
                          </p>
                          <input
                            type="number"
                            min="0"
                            value={sz.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                c.variantId,
                                sz._id,
                                e.target.value
                              )
                            }
                            className="w-16 border rounded-md px-2 py-1 text-center text-sm focus:outline-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 text-right text-sm font-medium text-gray-700">
                    Subtotal: $
                    {c.sizes
                      .reduce(
                        (s, sz) => s + sz.quantity * product.discountedPrice,
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="mt-8 flex justify-between items-center border-t pt-5">
            <p className="text-gray-700 font-medium">
              Total Quantity: <span className="font-bold">{totalQuantity}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Total Price:{" "}
              <span className="text-primary font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            onClick={handleAddToDesign}
            className={`mt-5 px-6 py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-primary hover:bg-red-500"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spin size="small" />
                <span>Updating...</span>
              </>
            ) : (
              "Update Cart"
            )}
          </button>
        </div>
      </div>

      {/* Color Popup */}
      {showColorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-lg">
            <button
              onClick={() => setShowColorPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Choose a Color
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {allProductVariants.map((variant) => {
                const isAdded = selectedColors.some(
                  (c) => c.variantId === variant._id
                );
                return (
                  <button
                    key={variant._id}
                    onClick={() => handleAddColor(variant)}
                    style={{
                      backgroundColor: variant.color?.hexValue || "#ccc",
                    }}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      isAdded
                        ? "border-blue-500 scale-110"
                        : "border-gray-300 hover:scale-110"
                    }`}
                    title={variant.color?.name}
                    disabled={isAdded}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
