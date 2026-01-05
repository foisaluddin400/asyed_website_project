"use client";

import React, { useState } from "react";
import Image from "next/image";
import cover from "../../../public/img/cover.png";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useGetBlogsQuery } from "@/redux/Api/blogApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Pagination } from "antd";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: blogData, isLoading } = useGetBlogsQuery({
    page: currentPage,
    limit: pageSize,
  });

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className=" ">
      {/* Hero Banner */}
      <div
        className="relative bg-cover bg-center h-96 md:h-[28rem] flex items-center"
        style={{ backgroundImage: `url(${cover.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Our Blogs
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
              Ideas, inspiration, and stories behind custom T-shirt design.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      
        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10">
              {blogData?.data?.length > 0 ? (
                blogData.data.map((blog) => (
                  <Link href={`/blogDetails/${blog._id}`} key={blog._id}>
                    <div className="group bg-white rounded-md  border  transition-all duration-500 overflow-hidden cursor-pointer">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <Image
                          src={`${imageUrl}${blog.imageUrl}`}
                          alt={blog.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                          {blog.title}
                        </h3>

                        {/* Read More Button */}
                        <div className="flex ">
                          <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            <Eye size={20} />
                            <span className="font-medium">Read Article</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-2xl text-gray-500">No blogs available at the moment.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {blogData?.meta?.total > pageSize && (
              <div className="mt-16 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={blogData?.meta?.total || 0}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  className="custom-pagination"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;