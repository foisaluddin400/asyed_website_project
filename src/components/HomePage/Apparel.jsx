"use client";

import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";
import Image from "next/image";

import { useGetCategoryQuery } from "@/redux/Api/categoryApi";
import { imageUrl } from "@/redux/Api/baseApi";

const Apparel = () => {
  const { data: category } = useGetCategoryQuery();
  const splideRef = useRef(null);

  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  return (
    <div className="mb-11">
      <div>
        {/* Header Section */}
        <div className="flex justify-between items-center mt-20 mb-6">
          <div className="flex items-center">
            <div className="w-[5px] h-12 rounded-r bg-primary mr-4"></div>
            <div>
              <h2 className="text-2xl font-semibold">Category</h2>
              <p className="text-gray-600 text-sm md:block hidden">
                Discover top opportunities curated for entrepreneurs.
              </p>
            </div>
          </div>
          <div>
            <Link href="/allCategory">
              <h1 className="text-primary cursor-pointer">View All</h1>
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-6 mb-4">
          <button
            onClick={handlePrevClick}
            className="text-black cursor-pointer hover:text-primary"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNextClick}
            className="text-black cursor-pointer hover:text-primary"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Splide Carousel */}
        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            perPage: 6,
            gap: "1rem",
            arrows: false,
            pagination: false,
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
          aria-label="Category Slide"
        >
          {category?.data?.slice(0, 8)?.map((item, index) => (
            <SplideSlide key={index}>
              <div className="text-center">
                {/* Category Item */}
                <Link href={`/allProduct?category=${item._id}`}>
                  <div className="flex justify-center">
                    <div className="bg-gray-50 border rounded-full flex items-center justify-center w-[180px] h-[180px] hover:shadow-lg transition-shadow">
                      <Image
                        src={`${imageUrl}${item?.imageUrl}`}
                        alt={item?.name || "Category"}
                        width={110}
                        height={110}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Link>

                <h1 className="p-2 text-xl font-medium">{item.name}</h1>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Apparel;
