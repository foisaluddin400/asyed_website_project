'use client'

import { useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaStar } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import { useGetReletedProductQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";

const ReletedProduct = ({ id }) => {
  const { data: reletedProducts } = useGetReletedProductQuery({ id });
  console.log(reletedProducts);
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
        <h1 className="text-2xl font-semibold pb-4 pt-20">
          Recommended for you
        </h1>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-6 mb-4">
          <div onClick={handlePrevClick} className="cursor-pointer text-black">
            <FaArrowLeft />
          </div>
          <div onClick={handleNextClick} className="cursor-pointer text-black">
            <FaArrowRight />
          </div>
        </div>

        {/* Slider Section */}
        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            perPage: 5,
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
          {reletedProducts?.data?.map((item) => (
            <SplideSlide key={item._id}>
              <div className="relative border bg-white rounded-lg p-4 hover:shadow-lg transition group">
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
                  <div className="flex justify-center mb-4 relative w-32 h-32">
                    <img
                      src={`${imageUrl}${item.thumbnail}`}
                      alt={item.productName}
                      layout="fill"
                      objectFit="contain"
                    />
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
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ReletedProduct;