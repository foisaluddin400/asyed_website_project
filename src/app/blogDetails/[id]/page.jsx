"use client";
import React from "react";
import { useRouter } from "next/router";

import { Spin } from "antd";
import cover from "../../../../public/img/cover.png";
import { imageUrl } from "@/redux/Api/baseApi";
import { useGetSingleBlogsQuery } from "@/redux/Api/blogApi";
import { useParams } from "next/navigation";
import { Navigate } from "@/components/Navigate";
import Image from "next/image";

const BlogDetails = () => {
  const params = useParams();

  const { data: singleBlogData, isLoading } = useGetSingleBlogsQuery({
    id: params?.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const blog = singleBlogData?.data;

  return (
    <div>
      {/* Banner */}
     

      {/* Blog Content */}
      <div className="container mx-auto pt-4 ">
        <Navigate title={"Blog Details"}></Navigate>
        {blog?.imageUrl && (
          <Image
            width={2000}
            height={700}
            src={`${imageUrl}${blog.imageUrl}`}
            alt={blog.title}
            className="w-full h-[70vh] object-cover rounded mb-6"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

          <div className="container mx-auto px-4">
            <div
              className="jodit-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
