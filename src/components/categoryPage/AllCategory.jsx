'use client'

import React from "react";
import Link from "next/link";
import { useGetCategoryQuery } from "@/redux/Api/categoryApi";
import { imageUrl } from "@/redux/Api/baseApi";

const AllCategory = () => {
  const { data: category } = useGetCategoryQuery();

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0">
      {/* Heading */}
      <h2 className="text-3xl md:text-2xl font-bold text-gray-800 mb-8">
        Explore Our Categories
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {category?.data?.map((item, index) => (
          <Link
            key={index}
            href={`/allProduct?category=${item._id}`}
            className="group bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-56 flex justify-center items-center">
              <img
                src={`${imageUrl}${item?.imageUrl}`}
                alt={item.name}
                className="h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <div className="p-5 text-center">
              <h3 className="text-xl text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
