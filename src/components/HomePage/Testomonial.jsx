"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sufiyan Sarker",
    role: "UX & UI Designer",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    review:
      "I've used other kits, but this one is the best. The attention to detail and usability are truly amazing.",
  },
  {
    id: 2,
    name: "Sadiya Akter",
    role: "UI/UX Designer",
    avatar:
      "https://images.pexels.com/photos/3978586/pexels-photo-3978586.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 5,
    review:
      "The quality of the design is top-notch, and I love how organized the files are.",
  },
  {
    id: 3,
    name: "Sakib Al Hasan",
    role: "Front End Developer",
    avatar:
      "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 5,
    review:
      "This kit exceeded my expectations! The components are versatile and easy to use.",
  },
  {
    id: 4,
    name: "Roshan Pro",
    role: "UI/UX Designer",
    avatar:
      "https://images.pexels.com/photos/16323430/pexels-photo-16323430/free-photo-of-smiling-man-in-blue-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    review:
      "Perfect for quick prototyping! The designs are professional and smooth.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-orange-400 text-orange-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
  </div>
);

const TestimonialSlider = () => {
  return (
    <section className="py-24 ">
      <h1 className="text-4xl font-bold text-center mb-14">What People Say</h1>

      <div className="max-w-6xl  mx-auto px-4">
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            gap: "1.5rem",
            autoplay: true,
            interval: 3500,
            speed: 900,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
        >
          {testimonials.map((item) => (
            <SplideSlide key={item.id}>
              <div className="h-full p-6 overflow-visible  border rounded-md">
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <StarRating rating={item.rating} />

                {/* Review */}
                <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                  “{item.review}”
                </p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default TestimonialSlider;
