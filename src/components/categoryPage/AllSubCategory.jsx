"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetSingleCategoryQuery } from "@/redux/Api/categoryApi";
import { imageUrl } from "@/redux/Api/baseApi";


const AllSubCategory = () => {
  const params = useParams();
  const id = params?.id;

  // Fetch category details
  const { data: singleSubData, isLoading, isError } = useGetSingleCategoryQuery({ id });

  if (isLoading)
    return <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>;
  if (isError)
    return <div className="text-center py-20">Something went wrong!</div>;

  const category = singleSubData?.data;

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <span className="text-primary">All Sub category</span> &gt;{" "}
        <span className="text-primary">{category?.name}</span>
      </nav>

      {/* Subcategory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {category?.subcategories?.map((sub) => (
          <Link
            href={`/allProduct?category=${category._id}&subcategory=${sub._id}`}
            key={sub._id}
            className="group bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-56 flex justify-center items-center">
              <img
                src={`${imageUrl}${sub.imageUrl}`}
                alt={sub.name}
                className="h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <div className="p-5 text-center">
              <h3 className="text-xl text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                {sub.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllSubCategory;
