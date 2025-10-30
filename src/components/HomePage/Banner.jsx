import React from "react";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../public/img/banner.png";
import shirt from "../../../public/img/grup.png";

const Banner = () => {
  return (
    <div className="pt-20">
      <div
        className="w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${banner.src})` }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Side */}
          <div className="space-y-6 text-left">
            <button className="bg-dark px-2 py-1 text-white">
              SAVE UP TO $200.00
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-black leading-snug">
              Ladies Modish Threads
            </h1>
            <p className="text-lg text-gray-700 max-w-md">
              Bring your ideas to life with our easy-to-use custom T-shirt design
              tool.
            </p>
            <Link href="/allProduct/productDetails/design">
              <button className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded font-medium">
                START DESIGNING →
              </button>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-[400px] md:h-[500px] drop-shadow-lg">
              <Image
                src={shirt}
                alt="Group Shirt"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
