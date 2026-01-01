"use client";
import React from "react";
import cover from "../../../public/img/cover.png";
import { useGetPrivecyQuery } from "@/redux/Api/metaApi";
import NoDataFound from "@/components/NoDataFound";
const PrivecyAndPolicy = () => {
  const { data: privecyPolicy } = useGetPrivecyQuery();
  console.log(privecyPolicy)
  return (
    <div>
      <div>
        <div
          className="relative bg-cover bg-center py-28 text-white"
          style={{ backgroundImage: `url(${cover.src})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>

          <div className="relative z-10 container m-auto items-center h-full  ">
            <h1 className=" md:text-5xl text-3xl font-semibold leading-tight">
              Privacy Policy
            </h1>
            <p className="pt-4 w-full md:w-1/2 ">
              Your personal information is safe with us as you design, shop, and customize with confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-9 px-4 md:px-0 ">
        <div className="mt-5">
          {privecyPolicy?.data?.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: privecyPolicy?.data?.content }}
            />
          ) : (
            <NoDataFound></NoDataFound>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivecyAndPolicy;
