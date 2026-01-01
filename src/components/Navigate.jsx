"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export const Navigate = ({ title }) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1
          onClick={() => router.back()}
          className="flex gap-3 cursor-pointer items-center"
        >
          <button className="bg-[#E63946] text-sm w-5 h-5 rounded-full flex justify-center items-center text-white">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">{title}</span>
        </h1>
      </div>
    </div>
  );
};
