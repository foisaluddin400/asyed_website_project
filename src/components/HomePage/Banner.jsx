"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { useGetCouponQuery } from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";

const Banner = () => {
  const { data: couponData, isLoading } = useGetCouponQuery();
  const [copiedId, setCopiedId] = useState(null);

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
            <div className="relative w-full  lg:h-[70vh]">
              {/* Background Image */}
              {/* Background Image */}
              <Image
                src={`${imageUrl}${item.image}`}
                alt={item.name}
                width={1000}
                height={500}
                className="w-full  lg:h-[70vh] object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex items-center z-20">
                <div className="md:px-16 px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
                  <div className="text-white space-y-4">
                    <span
                      onClick={() => {
                        const code = item.code;

                        if (
                          navigator.clipboard &&
                          navigator.clipboard.writeText
                        ) {
                          navigator.clipboard
                            .writeText(code)
                            .then(() => {
                              setCopiedId(item._id);
                              setTimeout(() => setCopiedId(null), 2000);
                            })
                            .catch((err) => {
                              console.error("Clipboard API failed:", err);
                              fallbackCopy(code);
                            });
                        } else {
                          fallbackCopy(code);
                        }

                        function fallbackCopy(text) {
                          const textArea = document.createElement("textarea");
                          textArea.value = text;

                          textArea.style.top = "0";
                          textArea.style.left = "0";
                          textArea.style.position = "fixed";

                          document.body.appendChild(textArea);
                          textArea.focus();
                          textArea.select();

                          try {
                            const successful = document.execCommand("copy");
                            if (successful) {
                              setCopiedId(item._id);
                              setTimeout(() => setCopiedId(null), 2000);
                            } else {
                              alert(
                                "Copy failed! Please copy manually: " + code
                              );
                            }
                          } catch (err) {
                            console.error("Fallback copy failed:", err);
                            alert("Copy failed! Please copy manually: " + code);
                          }

                          document.body.removeChild(textArea);
                        }
                      }}
                      className="relative inline-block bg-primary px-3 py-1 text-sm rounded cursor-pointer group select-none"
                    >
                      Coupon Code: {item.code}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {copiedId === item._id ? "Copied!" : "Copy"}
                      </span>
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold">
                      {item.name}
                    </h1>

                    <p className="text-lg">
                      Save{" "}
                      <span className="font-semibold">
                        {item?.discountType === "PERCENTAGE" ? `${item.discountValue}%` : `$${item.discountValue}`}
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
