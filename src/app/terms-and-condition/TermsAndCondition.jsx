"use client";
import React from "react";
import cover from "../../../public/img/cover.png";
import {  useGetTermsQuery } from "@/redux/Api/metaApi";
import NoDataFound from "@/components/NoDataFound";
const TermsAndCondition = () => {
  const { data: privecyPolicy } = useGetTermsQuery();
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
              Terms And Condition
            </h1>
            <p className="pt-4 w-full md:w-1/2 ">
              At [Your Brand Name], your privacy is our priority. This Privacy
              Policy explains how we collect, use, and protect your personal
              information when you use our website and services.
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

export default TermsAndCondition;
