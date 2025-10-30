'use client'
import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { useGetBrandsNameQuery } from "@/redux/Api/categoryApi";
import { imageUrl } from "@/redux/Api/baseApi";
import Link from "next/link";

const Brands = () => {
  const { data: brands } = useGetBrandsNameQuery();
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
      <div className="">
        <div className="">
          <div className="flex items-center mt-20 mb-6">
            <div className="w-[5px] h-12 rounded-r bg-primary mr-4 "></div>
            <div>
              <h2 className="text-2xl font-semibold ">Brands</h2>
              <p className="text-gray-600 text-sm md:block hidden">
                Discover top opportunities curated for entrepreneurs.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-6 mb-4">
            <div onClick={handlePrevClick}>
              <div className="text-black cursor-pointer">
                <FaArrowLeft />
              </div>
            </div>
            <div onClick={handleNextClick}>
              <div className="text-black cursor-pointer">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>

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
          aria-label="Brands Slide"
        >
          {brands?.data?.map((item, index) => (
            <SplideSlide key={index}>
              <div className="">
                <Link href={`/allProduct?brand=${item._id}`}>
                  <div className="relative w-[110px] h-[110px]">
                    <Image
                      src={`${imageUrl}${item?.brandLogo}`}
                      alt={item.brandName}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </Link>
                <h1 className="p-2 text-xl text-center">{item.brandName}</h1>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Brands;
