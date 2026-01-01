"use client";

import React from "react";

import { Star, Calendar } from "lucide-react";
import { useGetSingleProductReviewQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Image } from "antd";


// Star Rating Component
function StarRating({  rating, size = 18 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,  2, 3, 4,  5].map((star) => (
        <Star
        
          key={star}
          size={size}
          className={`transition-colors ${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star <= rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-gray-200 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewDetails({ id }) {
  const { data: productReview, isLoading, isError } = useGetSingleProductReviewQuery({ id });

  if (isLoading) {
    return (
     <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg">Failed to load reviews.</p>
      </div>
    );
  }

  const reviews = productReview?.data || [];
  const meta = productReview?.meta || { avgRating: 0, totalReviews: 0 };

  return (
    <div className="container mx-auto space-y-12 py-8">
      {/* Rating Summary - Clean & Centered */}
      <div className="text-center rounded-md border py-12 px-8 ">
        <div className="inline-flex flex-col items-center">
          <div className="text-8xl font-extrabold text-gray-900 mb-4">
            {meta.avgRating.toFixed(1)}
          </div>
          <StarRating rating={meta.avgRating} size={32} />
          <p className="text-xl text-gray-700 mt-4 font-medium">
            Based on <span className="font-bold text-gray-900">{meta.totalReviews}</span> customer reviews
          </p>
          
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-10">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Customer Reviews
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-md">
            <div className="text-7xl mb-6 opacity-30">⭐</div>
            <p className="text-2xl text-gray-600 font-medium">No reviews yet</p>
            <p className="text-gray-500 mt-3 text-lg">
              Be the first to share your experience with this product!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="  duration-400 p-8 border rounded-md border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  {/* User Avatar */}
                  <div className="flex-shrink-0 self-start">
                  
                      <img
                        src={`${imageUrl}${review.user?.imageUrl || "/img/profile.png"}`}
                        alt={review.user?.firstName || "User"}
                        width={54}
                        height={54}
                        className="w-[60px] h-[60px] rounded-full object-cover"
                      />
                 
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className=" font-bold text-gray-900">
                        {review.user?.firstName} {review.user?.lastName}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                        <StarRating rating={review.rating} size={16} />
                        <span className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} />
                          <span className="text-sm font-medium">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-800 leading-relaxed ">
                      {review.comment}
                    </p>

                    {/* Review Images */}
                    {review.images?.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-6">
                        {review.images.map((image, index) => (
                          <div
                            key={index}
                            
                          >
                          <div className="object-cover border p-2 rounded-md w-[70px] h-[70px]">
                              <Image
                              src={`${imageUrl}${image}`}
                              alt={`Review image ${index + 1}`}
                              fill
                              className=" w-[70px]  "
                            />
                          </div>
                           
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}