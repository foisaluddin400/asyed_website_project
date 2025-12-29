"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { useGetCouponQuery } from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";

const Banner = () => {
  const { data: couponData, isLoading } = useGetCouponQuery();

  if (isLoading) return null;

  return (
    <div className="pt-20">
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          interval: 4000,
          pauseOnHover: true,
          arrows: false,
          pagination: true,
        }}
        className="w-full"
      >
        {couponData?.data?.map((item) => (
          <SplideSlide key={item._id}>
            <div className="relative w-full h-[500px] md:h-[600px]">
              {/* Background Image */}
              <img
                src={`${imageUrl}${item.image}`}
                alt={item.name}
                className="w-full h-[500px] md:h-[600px] object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className=" md:px-16 px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                  {/* Left Content */}
                  <div className="text-white space-y-4">
                    <span className="inline-block bg-primary px-3 py-1 text-sm rounded">
                      Coupon Code: {item.code}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold">
                      {item.name}
                    </h1>

                    <p className="text-lg">
                      Save{" "}
                      <span className="font-semibold">
                        ${item.discountValue}
                      </span>
                    </p>

                    <p className="text-sm opacity-80">
                      Valid till: {new Date(item.endDate).toLocaleDateString()}
                    </p>

                    <Link
                      href={
                        item.category
                          ? `/allProduct?category=${item.category}`
                          : "/allProduct"
                      }
                    >
                      <button className="mt-4 bg-primary hover:bg-red-600 transition px-8 py-3 rounded font-medium">
                        Get Shop
                      </button>
                    </Link>
                  </div>

                  {/* Right Space */}
                  <div className="hidden md:block" />
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Banner;
