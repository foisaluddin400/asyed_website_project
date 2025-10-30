"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useGetMyReviewQuery } from "@/redux/Api/metaApi";
import { imageUrl } from "@/redux/Api/baseApi";


const MyReview = () => {
  const { data: reviewResponse, isLoading, isError } = useGetMyReviewQuery();
  const reviewData = reviewResponse?.data || [];

  // Loading & Error
  if (isLoading) return <p className="text-center py-6">Loading reviews...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Failed to load reviews</p>;
  if (!reviewData.length) return <p className="text-center py-6 text-gray-500">No reviews yet</p>;

  // Star Rating Component
  function StarRating({ rating, size = 16 }) {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : star <= rating
                ? "fill-yellow-400/50 text-yellow-400/50"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  }

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {reviewData.map((review) => {
        const user = review.user || {};
        const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous";
        const avatarUrl = user.imageUrl ? `${imageUrl}${user.imageUrl}` : null;

        return (
          <div key={review._id} className="space-y-3">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center text-sm font-medium">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={userName}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-medium text-gray-900">{userName}</h4>
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed">
                  {review.comment || "No comment"}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {review.images.map((img, index) => {
                      
                      return (
                        <div
                          key={index}
                          className="w-16 h-16 rounded-lg border overflow-hidden bg-gray-50"
                        >
                          <Image
                            src={`${imageUrl}${img}`}
                            alt={`Review image ${index + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyReview;