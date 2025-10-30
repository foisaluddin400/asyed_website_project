"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useGetSingleProductReviewQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";

// ⭐ Star Rating Component
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// 📊 Progress Bar Component
function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-yellow-400 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

export default function ReviewDetails({ id }) {
  const { data: productReview, isLoading, isError } = useGetSingleProductReviewQuery({ id });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-8 w-8 border-4 border-t-primary rounded-full"></div>
      </div>
    );

  if (isError) return <p className="text-red-500">Failed to load reviews.</p>;

  const reviews = productReview?.data || [];
  const meta = productReview?.meta;

  return (
    <div className="space-y-8">
      {/* ⭐ Rating Summary */}
      <div className="md:grid grid-cols-3 gap-6 my-11">
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {meta?.avgRating?.toFixed(1) || 0}
            </div>
            <StarRating rating={meta?.avgRating || 0} size={20} />
            <div className="text-sm text-gray-500 mt-2">
              {meta?.totalReviews || 0} Reviews
            </div>
          </div>

          {/* optional breakdown bar placeholder */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8">
                  <span className="text-sm">{star}</span>
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                </div>
                <ProgressBar value={0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🧾 Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 && (
          <p className="text-gray-500 text-center">No reviews yet.</p>
        )}

        {reviews.map((review) => (
          <div key={review._id} className="space-y-3 border-b pb-4">
            <div className="flex items-start gap-3">
              {/* 👤 Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center text-sm font-medium">
                <Image
                  src={"/img/profile.png"}
                  alt={`${review.user?.firstName || "User"}`}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-medium text-gray-900">
                    {review.user?.firstName} {review.user?.lastName}
                  </h4>
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed">
                  {review.comment}
                </p>

                {review.images?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {review.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-lg border overflow-hidden"
                      >
                        <Image
                          src={`${imageUrl}${image}`}
                          alt={`Review image ${index + 1}`}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
