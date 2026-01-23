"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Headphones, Package, RotateCcw, Shield } from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetBannerQuery } from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";

const Hero = () => {
  const splideRef = useRef(null);
  const { data: bannerData, isLoading } = useGetBannerQuery();

  if (isLoading) return null;

  return (
    <div className="py-5">
      <div className="relative">
        {/* Custom Arrows */}
        <div className="absolute top-1/2 left-5 z-20">
          <button
            onClick={() => splideRef.current?.go("<")}
            className="bg-black/60 hover:bg-black text-white p-3 rounded-full"
          >
            <FaArrowLeft />
          </button>
        </div>

        <div className="absolute top-1/2 right-5 z-20">
          <button
            onClick={() => splideRef.current?.go(">")}
            className="bg-black/60 hover:bg-black text-white p-3 rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Banner Slider */}
        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            autoplay: true,
            interval: 5000,
            arrows: false,
            pagination: true,
          }}
        >
          {bannerData?.data?.map((banner) => (
            <SplideSlide key={banner._id}>
              <div className="relative w-full  lg:h-[80vh] flex items-center">
                {/* Left Text */}
                <div className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 z-10 max-w-xl text-white space-y-4">
                  <span className="inline-block bg-primary px-4 py-1 text-sm rounded">
                    NEW ARRIVAL
                  </span>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {banner.title}
                  </h1>

                  <p className="text-base md:text-lg opacity-90">
                    {banner.description}
                  </p>

                  <Link href="/allProduct">
                    <button className="mt-4 bg-primary hover:bg-red-600 transition px-8 py-3 rounded font-medium">
                      GET SHOP →
                    </button>
                  </Link>
                </div>

                {/* Banner Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={`${imageUrl}${banner.image}`}
                    alt={banner.title}
                  width={1000}
                height={500}
                    className="object-cover w-full lg:h-[80vh]"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Bottom Feature Section */}
      <div className="mt-16 grid md:grid-cols-4 gap-8 border p-5">
        <Feature
          icon={<Package />}
          title="FAST DELIVERY"
          desc="Delivery in 24/H"
        />
        <Feature
          icon={<RotateCcw />}
          title="24 HOURS RETURN"
          desc="Money-back guarantee"
        />
        <Feature
          icon={<Shield />}
          title="SECURE PAYMENT"
          desc="100% safe payment"
        />
        <Feature
          icon={<Headphones />}
          title="SUPPORT 24/7"
          desc="Live chat support"
        />
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

export default Hero;
