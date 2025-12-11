"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


import ReletedProduct from "@/components/productPage/ReletedProduct";
import ReviewDetails from "@/components/productPage/ReviewDetails";
import { useGetSingleProductQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const params = useParams();
const router = useRouter();
const accessToken = useSelector((state) => state.logInUser?.token);
  const id = params?.id;
  const { data: singleProductData, isLoading, isError } = useGetSingleProductQuery({ id });
console.log(id)
  const splideRef = useRef(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Error loading product</p>;
  if (!singleProductData?.data) return <p className="text-center py-6">No product found</p>;

  const product = singleProductData.data;
  const variants = product.variants || [];
  const selectedVariant = variants[selectedVariantIndex] || {};
const handleStartDesigning = () => {
  if (!accessToken) {
    toast.info('Please sign in to start designing.');
    router.push(`/signIn?redirect=${encodeURIComponent(window.location.pathname)}`);
    return;
  }
  router.push(`/customizeDesign/${product?._id}`);
};
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🧭 Breadcrumb */}
      <nav className="text-sm mb-4">
        <span className="text-primary cursor-pointer" onClick={() => router.push("/allProduct")}>
          All Product
        </span>{" "}
        &gt;{" "}
        <span className="text-primary">{product?.category?.name}</span> &gt;{" "}
        <span className="text-primary">{product?.subcategory?.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🖼 Left: Product Images */}
        <div className="relative">
          <div className="absolute top-1/2 left-4 z-20">
            <button
              onClick={() => splideRef.current?.go("<")}
              className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 z-20">
            <button
              onClick={() => splideRef.current?.go(">")}
              className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          <Splide
            ref={splideRef}
            options={{
              type: "loop",
              autoplay: true,
              interval: 7000,
              arrows: false,
              pagination: false,
            }}
          >
           {[selectedVariant.frontImage, selectedVariant.backImage,selectedVariant.rightImage ,selectedVariant.leftImage].map(
              (img, i) =>
                img && (
                  <SplideSlide key={i}>
                    <div className="border">
                      <img
                        src={`${imageUrl}${img}`}
                        alt="Product"
                        className="h-[400px] w-full object-contain"
                      />
                    </div>
                  </SplideSlide>
                )
            )}
          </Splide>
        </div>

        {/* 🧾 Right: Product Info */}
        <div>
          {/* 🏷 Brand */}
          <div className="flex items-center gap-2 mb-2">
            {product.brand?.brandLogo && (
              <img
                src={`${imageUrl}${product.brand?.brandLogo}`}
                alt={product.brand.brandName}
                className="w-10 h-10 object-contain"
              />
            )}
            <span className="text-gray-600 text-sm">{product.brand?.brandName}</span>
          </div>

          {/* 🛍 Title */}
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>

          {/* 💲 Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-bold text-primary">${product.discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="line-through text-gray-500">${product.price}</span>
                <span className="text-green-600">-{product.discountPercentage}%</span>
              </>
            )}
          </div>

          {/* 📦 Stock */}
          <p className="text-sm mb-4">
            Stock Status: <span className="font-medium">{selectedVariant.stockStatus}</span>
          </p>

          {/* 🎨 Color Options */}
          <div className="mb-4">
            <p className="font-medium mb-2">Color :</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant, index) => (
                <button
                  key={variant._id}
                  onClick={() => {
                    setSelectedVariantIndex(index);
                    setSelectedSize(null);
                  }}
                  style={{ backgroundColor: variant.color?.hexValue }}
                  className={`w-[30px] h-[30px] rounded-full border ${
                    selectedVariantIndex === index
                      ? "ring-2 ring-primary"
                      : "hover:scale-110 transition"
                  }`}
                  title={variant.color?.name}
                />
              ))}
            </div>
          </div>

          {/* 📏 Size Options */}
          <div className="mb-6">
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-2 flex-wrap">
              {selectedVariant?.size?.map((sz) => (
                <button
                  key={sz._id}
                  onClick={() => setSelectedSize(sz.name)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === sz.name
                      ? "bg-primary text-white border-pink-500"
                      : "hover:border-pink-500"
                  }`}
                >
                  {sz.name}
                </button>
              ))}
            </div>
          </div>

          {/* 🚀 Buttons */}
          <div className="flex gap-4 mb-6">
             <Link href={`/addToCart/${product?._id}`}><button className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded font-medium">Add To Cart</button></Link>
          <button
      onClick={handleStartDesigning}
      className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded font-medium"
    >
      START DESIGNING →
    </button>
           
          </div>

          {/* 📋 Short Description */}
          <div className="border rounded">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-gray-700 font-medium"
            >
              Short Description
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isDetailsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDetailsOpen && (
              <div className="px-4 py-3 text-sm text-gray-600 border-t">
                <p>{product.shortDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🧠 Description */}
      <div
        className="mt-11"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      {/* 🛒 Related + Review */}
      <ReletedProduct id={id}/>
      <ReviewDetails id={id}/>
    </div>
  );
}
