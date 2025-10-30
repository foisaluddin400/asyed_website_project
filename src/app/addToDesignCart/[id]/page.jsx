"use client";

import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useAddToDesignMutation, useGetSingleDesignQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddToDesign() {
   const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
   const accessToken = useSelector((state) => state.logInUser?.token);
  const splideRef = useRef(null);
  const id = params?.id;

  const { data: singleDesignData, isLoading, isError } = useGetSingleDesignQuery({ id });
  const [addToDesign] = useAddToDesignMutation();

  const [selectedColors, setSelectedColors] = useState([]);
  const [showColorPopup, setShowColorPopup] = useState(false);

  // Default first variant
  useEffect(() => {
    if (singleDesignData?.data && selectedColors.length === 0) {
      const product = singleDesignData.data.baseProduct;
      const variants = product.variants || [];
      if (variants.length > 0) {
        const firstVariant = variants[0];
        setSelectedColors([
          {
            variantId: firstVariant._id,
            color: firstVariant.color,
            sizes: firstVariant.size.map((s) => ({ ...s, quantity: 0 })),
          },
        ]);
      }
    }
  }, [singleDesignData]);

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Error loading design</p>;
  if (!singleDesignData?.data) return <p className="text-center py-6">No design found</p>;

  const product = singleDesignData.data.baseProduct;
  const variants = product.variants || [];

  // Add color
  const handleAddColor = (variant) => {
    if (!selectedColors.find((c) => c.variantId === variant._id)) {
      setSelectedColors([
        ...selectedColors,
        {
          variantId: variant._id,
          color: variant.color,
          sizes: variant.size.map((s) => ({ ...s, quantity: 0 })),
        },
      ]);
    }
    setShowColorPopup(false);
  };

  // Update quantity
  const handleQuantityChange = (variantId, sizeName, qty) => {
    const updated = selectedColors.map((item) => {
      if (item.variantId === variantId) {
        const newSizes = item.sizes.map((s) =>
          s.name === sizeName ? { ...s, quantity: Number(qty) } : s
        );
        return { ...item, sizes: newSizes };
      }
      return item;
    });
    setSelectedColors(updated);
  };

  // Remove color
  const handleRemoveColor = (variantId) => {
    setSelectedColors(selectedColors.filter((item) => item.variantId !== variantId));
  };

  // Handle Add To Design
  const handleAddToDesign = () => {
      
        if (!accessToken) {
          toast.info('Please sign in to add items to your cart.');
          router.push('/signIn');       
          return;
        }
    if (selectedColors.length === 0) {
      alert("Please select at least one color and size with quantity!");
      return;
    }

    const variantQuantities = selectedColors
      .map((colorItem) => {
        const matchedVariant = variants.find((v) => v._id === colorItem.variantId);
        if (!matchedVariant) return null;

        const sizeQuantities = colorItem.sizes
          .filter((s) => s.quantity > 0)
          .map((s) => ({ size: s._id, quantity: s.quantity }));

        if (sizeQuantities.length === 0) return null;

        return {
          variant: matchedVariant._id,
          sizeQuantities,
        };
      })
      .filter(Boolean);

    if (variantQuantities.length === 0) {
      toast.info("Please select at least one size with quantity!");
      return;
    }

    const cartData = {
      design: singleDesignData.data._id,
      variantQuantities,
     
    };

    console.log("🛒 Cart Data:", cartData);
setLoading(true)
    addToDesign(cartData)
      .unwrap()
      .then((res) => {
        setLoading(false)
        toast.success("Design added to cart successfully!");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false)
        console.error(err);
        toast.error("Failed to add design to cart.");
      });
  };

  const colorCards = selectedColors;

  // Totals
  const totalQuantity = colorCards.reduce(
    (sum, item) => sum + item.sizes.reduce((s, size) => s + (size.quantity || 0), 0),
    0
  );

  const totalPrice = colorCards.reduce(
    (sum, item) =>
      sum +
      item.sizes.reduce((s, size) => s + (size.quantity || 0) * product.discountedPrice, 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <span className="text-primary cursor-pointer" onClick={() => router.push("/")}>
          All Product
        </span>{" "}
        &gt; <span className="text-primary">{product?.category?.name}</span>{" "}
        &gt; <span className="text-primary">{product?.subcategory?.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Images */}
        <div className="relative">
          <Splide
            ref={splideRef}
            options={{ type: "loop", autoplay: true, interval: 5000, arrows: false, pagination: false }}
          >
            {[
              singleDesignData.data.frontImage,
              singleDesignData.data.backImage,
              singleDesignData.data.leftImage,
              singleDesignData.data.rightImage,
            ].map(
              (img, i) =>
                img && (
                  <SplideSlide key={i}>
                    <div className="border">
                      <img
                        src={`${imageUrl}${img}`}
                        alt={`Design ${i + 1}`}
                        className="h-[420px] w-full object-contain rounded-md"
                      />
                    </div>
                  </SplideSlide>
                )
            )}
          </Splide>
        </div>

        {/* Right Section */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-bold text-primary">${product.discountedPrice}</span>
          </div>

          {/* Selected Cards */}
          <div className="space-y-6">
            {colorCards.map((colorItem) => (
              <div key={colorItem.variantId} className="bg-white rounded p-5 border border-gray-200 relative">
                <button
                  onClick={() => handleRemoveColor(colorItem.variantId)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>

                <div className="flex items-center gap-4">
                  {(() => {
                    const matchedVariant = variants.find((v) => v._id === colorItem.variantId);
                    return (
                      <img
                        src={`${imageUrl}${matchedVariant?.frontImage || ""}`}
                        alt={colorItem.color.name}
                        className="w-20 h-20 object-contain rounded-md"
                      />
                    );
                  })()}
                  <div>
                    <h2 className="font-semibold text-gray-800">{product.productName}</h2>
                    <p className="text-gray-600 text-sm">
                      Color: <span className="font-medium">{colorItem.color.name}</span>
                    </p>
                  </div>
                  <div className="mt-5 text-right">
                    <button
                      onClick={() => setShowColorPopup(true)}
                      className="text-sm text-primary font-medium border border-primary px-4 py-1 rounded-md hover:bg-primary hover:text-white transition"
                    >
                      Select Another Color
                    </button>
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">ADULT</h3>
                  <div className="flex flex-wrap gap-3">
                    {colorItem.sizes.map((size) => (
                      <div key={size._id} className="text-center">
                        <p className="text-gray-600 text-sm mb-1">{size.name}</p>
                        <input
                          type="number"
                          min="0"
                          value={size.quantity}
                          onChange={(e) => handleQuantityChange(colorItem.variantId, size.name, e.target.value)}
                          className="w-16 border rounded-md px-2 py-1 text-center text-sm focus:outline-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 text-right text-sm font-medium text-gray-700">
                  Subtotal: $
                  {colorItem.sizes.reduce((sum, s) => sum + s.quantity * product.discountedPrice, 0).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 flex justify-between items-center border-t pt-5">
            <p className="text-gray-700 font-medium">
              Total Quantity: <span className="font-bold">{totalQuantity}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Total Price: <span className="text-primary font-bold">${totalPrice.toFixed(2)}</span>
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
                <span>Adding...</span>
              </>
            ) : (
              "Add To Cart"
            )}
          </button>





        </div>
      </div>

      {/* Popup Modal */}
      {showColorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-lg">
            <button
              onClick={() => setShowColorPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose a Color</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {variants.map((variant) => {
                const isSelected = selectedColors.some((c) => c.variantId === variant._id);
                return (
                  <button
                    key={variant._id}
                    onClick={() => handleAddColor(variant)}
                    style={{ backgroundColor: variant.color?.hexValue }}
                    className={`w-10 h-10 rounded-full border hover:scale-110 transition ${
                      isSelected ? "border-blue-500 border-2 scale-110" : "border-gray-300"
                    }`}
                    title={variant.color?.name}
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