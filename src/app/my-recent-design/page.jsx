"use client";
import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAddDesignMutation } from "@/redux/Api/productApi";

export default function SaveDesign() {
  const [designName, setDesignName] = useState("");

  const {
    frontPreview,
    backPreview,
    elementFrontPreview,
    elementBackPreview,
    rightPreview,
    leftPreview,
    elementRightPreview,
    elementLeftPreview,
  } = useSelector((state) => state.design);

  const placeholderImage = "https://via.placeholder.com/300x300?text=No+Design";

  return (
    <div className=" ">
      <div className="bg-white  rounded-lg w-full container m-auto">
        {/* ======== Left Preview Section ======== */}
      <div className="mt-9 mb-6 flex justify-between">
          <div className="flex items-center ">
          <div className="w-[5px] h-12 rounded-r bg-primary mr-4 "></div>
          <div>
            <h2 className="text-2xl font-semibold ">Recent Design</h2>
            <p className="text-gray-600 text-sm md:block hidden">
              Discover top opportunities curated for entrepreneurs.
            </p>
          </div>
        </div>
        <div>
            <Link href={'/saveDesign'}><button className="bg-primary p-2 px-5 text-white rounded">Continue</button></Link>
        </div>
      </div>
        <div className="">
          <div className="grid grid-cols-4 gap-4">
            {/* Only show if available */}
            {frontPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-white p-2 text-center bg-primary  mb-2">
                  Front Image
                </h3>
                <img
                  src={frontPreview || placeholderImage}
                  alt="Composite Front Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {backPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-white p-2 text-center bg-primary  mb-2">
                  Back Image
                </h3>
                <img
                  src={backPreview || placeholderImage}
                  alt="Composite Back Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {rightPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-white p-2 text-center bg-primary  mb-2">
                  Right Image
                </h3>
                <img
                  src={rightPreview || placeholderImage}
                  alt="Composite Right Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {leftPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-white p-2 text-center bg-primary  mb-2">
                  Left Image
                </h3>
                <img
                  src={leftPreview || placeholderImage}
                  alt="Composite Left Design"
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
