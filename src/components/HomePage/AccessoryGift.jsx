'use client'

import React, { useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useGetPopularProductQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";

const AccessoryGift = () => {
  const { data: popularProducts } = useGetPopularProductQuery();
  console.log(popularProducts);


  return (
    <div className="">
      {/* Title */}
      <div className="flex justify-between items-center mt-20 mb-6">
        <div className="flex items-center">
          <div className="w-[5px] h-12 rounded-r bg-primary mr-4"></div>
          <div>
            <h2 className="text-2xl font-semibold">Product</h2>
            <p className="text-gray-600 text-sm md:block hidden">
              Discover top opportunities curated for entrepreneurs.
            </p>
          </div>
        </div>
        <div>
          <Link href={"/allProduct"}>
            <h1 className="text-primary cursor-pointer">View All</h1>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {popularProducts?.data?.map((item) => (
          <div
            key={item._id}
            className="relative border bg-white rounded-lg p-4 hover:shadow-lg transition group"
          >
            {/* Discount Badge */}
            <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              -{item.discountPercentage}%
            </span>

            {/* Wishlist */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button className="bg-white p-2 rounded-full shadow hover:text-red-500">
                <FaHeart />
              </button>
            </div>

            {/* Image */}
            <Link href={`/productDetails/${item._id}`}>
             <div className="flex justify-center">
               <div className=" mb-4 relative w-32 h-32">
                <Image
                  src={`${imageUrl}${item.thumbnail}`}
                  alt={item.productName}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
             </div>
            </Link>

         <Link href={`/addToCart/${item._id}`}>   <button className="bg-red-500 text-white w-full py-2 mt-3 rounded hover:bg-red-600 opacity-0 group-hover:opacity-100 transition">
              Add To Cart
            </button></Link>

            {/* Name */}
            <h3 className="text-gray-800 font-semibold text-sm mb-2">
              {item.productName}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary font-bold">${item.discountedPrice}</span>
              <span className="text-gray-400 line-through text-sm">${item.price}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center text-yellow-400 text-sm">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
              <span className="text-gray-500 ml-2">({item.reviewCount})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoryGift;