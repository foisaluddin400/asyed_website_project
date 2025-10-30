'use client'
import React from "react";
import { useRouter } from "next/router";

import { Spin } from "antd";
import cover from "../../../../public/img/cover.png";
import { imageUrl } from "@/redux/Api/baseApi";
import { useGetSingleBlogsQuery } from "@/redux/Api/blogApi";
import { useParams } from "next/navigation";

const BlogDetails = () => {
   const params = useParams();

  const { data: singleBlogData, isLoading } = useGetSingleBlogsQuery({ id: params?.id  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  const blog = singleBlogData?.data;

  return (
    <div>
      {/* Banner */}
       <div
             className="relative bg-cover bg-center py-28 text-white"
             style={{ backgroundImage: `url(${cover.src})` }}
           >
             {/* Overlay */}
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>
        <div className="relative z-10 container m-auto items-center h-full">
          <h1 className="md:text-5xl text-3xl font-semibold leading-tight">
            The Custom Tee Blog
          </h1>
          <p className="pt-4 w-full md:w-1/2">
            We started as a small team of creatives and developers who were
            frustrated by the limitations of traditional online shopping. Why
            settle for generic products when you can design your own?
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 container m-auto py-11 gap-7">
        {blog?.imageUrl && (
          <img
            src={`${imageUrl}${blog.imageUrl}`}
            alt={blog.title}
            className="w-full object-cover rounded mb-6"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
