"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Headphones, Package, RotateCcw, Shield } from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Import your images from public folder (recommended in Next.js)
import hero from "../../../public/img/hero.png";
import shirt from "../../../public/img/shirt.png";
import tshirt from "../../../public/img/shirt1.png";


const Hero = () => {
  const splideRef = useRef(null);


  const slides = [
    {
      id: 1,
      title: "Design Your Own Custom T-Shirt",
      desc: "Bring your ideas to life with our easy-to-use custom T-shirt design tool.",
      img: hero,
    },
    {
      id: 2,
      title: "Make Your Unique Style",
      desc: "Personalize T-Shirts with your own designs in just minutes.",
      img: hero,
    },
    {
      id: 3,
      title: "High Quality Printing",
      desc: "Get premium prints that last longer and look stylish.",
      img: hero,
    },
  ];

  return (
    <div className="py-5">
      <div className="lg:grid grid-cols-12 gap-4">
        <div className="col-span-8 relative">
          {/* Custom Arrows */}
          <div className="absolute top-1/2 left-4 z-20">
            <button
              onClick={() => splideRef.current?.go("<")}
              className="bg-[#1D3557] rounded-full p-2 text-white cursor-pointer"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 z-20">
            <button
              onClick={() => splideRef.current?.go(">")}
              className="bg-[#1D3557] rounded-full p-2 text-white cursor-pointer"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Splide Carousel */}
          <Splide
            ref={splideRef}
            options={{
              type: "loop",
              autoplay: true,
              interval: 5000,
              arrows: false,
              pagination: false,
            }}
          >
            {slides.map((slide) => (
              <SplideSlide key={slide.id}>
                <div className="md:grid grid-cols-12 gap-4">
                  <div className="md:flex items-center col-span-12">
                    <div className="bg-light md:grid grid-cols-2 md:p-16 p-4 h-[80vh] py-16 w-full">
                      {/* Left Text Section */}
                      <div className="flex items-center">
                        <div>
                          <p className="text-blue-600 font-medium mb-2">
                            — THE BEST
                          </p>
                          <h1 className="text-4xl lg:text-6xl font-semibold text-gray-900 mb-4">
                            {slide.title}
                          </h1>
                          <p className="text-gray-600 mb-6 max-w-md">
                            {slide.desc}
                          </p>
                          <Link href="/allProduct/productDetails/design">
                            <button className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded font-medium">
                              START DESIGNING →
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Right Image Section */}
                      <div className="flex items-center pt-11 md:pt-0">
                        <div className="relative">
                          <div className="flex justify-end">
                            <button className="absolute right-11 bg-[#1D3557] border-b-4 text-white px-4 py-5 rounded-full text-sm font-medium z-10">
                              50% Offer Now
                            </button>
                          </div>
                          <div>
                            <Image
                              src={slide.img}
                              alt="hero"
                              priority
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* Right side two grid blocks */}
        <div className="col-span-4 space-y-4 mt-4 lg:mt-0">
          {/* Block 1 */}
          <div className="bg-[#191C1F] grid grid-cols-2 h-[39vh] p-4 md:p-6">
            <div className="flex items-center -mt-11">
              <div>
                <h1 className="text-[#EBC80C] text-xl">SUMMER SALES</h1>
                <h1 className="font-semibold text-3xl text-white">New Hudi</h1>
                <p className="font-semibold text-3xl text-white">50% Off</p>
                <div>
                  <Link href="/allProduct/productDetails/design">
                    <button className="bg-primary mt-6 hover:bg-red-600 text-white px-2 py-3 rounded">
                      START DESIGNING →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image className="w-[200px]" src={shirt} alt="shirt" />
              <div className="absolute top-0 right-0">
                <button className="bg-secondary py-1 px-4 font-semibold">
                  50% Off
                </button>
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-light grid grid-cols-2 h-[39vh] p-4 md:p-6">
            <div>
              <div className="relative">
                <Image className="w-[200px]" src={tshirt} alt="tshirt" />
              </div>
            </div>
            <div className="flex items-center -mt-11">
              <div>
                <h1 className="font-semibold text-3xl text-primary">
                  T-Shirts & V-Necks
                </h1>
                <p className="font-semibold text-2xl text-[#2DA5F3]">$299 USD</p>
                <div>
                  <Link href="/allProduct/productDetails/design">
                    <button className="bg-primary mt-6 hover:bg-red-600 text-white px-2 py-3 rounded">
                      START DESIGNING →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Section */}
      <div className="mt-16 grid md:grid-cols-4 gap-8 border p-5">
        <div className="flex items-center gap-4 border-r">
          <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">FASTED DELIVERY</h4>
            <p className="text-gray-600 text-sm">Delivery in 24/H</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-r">
          <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">24 HOURS RETURN</h4>
            <p className="text-gray-600 text-sm">100% money-back guarantee</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-r">
          <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">SECURE PAYMENT</h4>
            <p className="text-gray-600 text-sm">Your money is safe</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
            <Headphones className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">SUPPORT 24/7</h4>
            <p className="text-gray-600 text-sm">Live contact/message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
