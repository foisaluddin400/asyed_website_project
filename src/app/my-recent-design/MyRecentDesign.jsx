"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, Shirt, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecentDesign() {
  const token = useSelector((state) => state.logInUser?.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/signIn");
    }
  }, [token, router]);

  if (!token) return null;

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

  // Check if any preview exists
  const hasAnyDesign = frontPreview || backPreview || rightPreview || leftPreview;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="bg-white rounded-lg shadow-sm w-full container mx-auto p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center">
            <div className="w-[5px] h-12 rounded-r bg-primary mr-4"></div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Recent Design
              </h2>
              <p className="text-gray-600 text-sm mt-1 hidden md:block">
                Discover top opportunities curated for entrepreneurs.
              </p>
            </div>
          </div>

          <Link href="/saveDesign">
            <button className="bg-primary hover:bg-primary/90 transition-colors text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Continue Designing
            </button>
          </Link>
        </div>

        {/* Content */}
        {hasAnyDesign ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frontPreview && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-white bg-primary text-center py-3">
                  Front View
                </h3>
                <img
                  src={frontPreview}
                  alt="Front Design"
                  className="w-full h-64 object-cover bg-gray-100"
                />
              </div>
            )}

            {backPreview && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-white bg-primary text-center py-3">
                  Back View
                </h3>
                <img
                  src={backPreview}
                  alt="Back Design"
                  className="w-full h-64 object-cover bg-gray-100"
                />
              </div>
            )}

            {rightPreview && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-white bg-primary text-center py-3">
                  Right View
                </h3>
                <img
                  src={rightPreview}
                  alt="Right Design"
                  className="w-full h-64 object-cover bg-gray-100"
                />
              </div>
            )}

            {leftPreview && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-white bg-primary text-center py-3">
                  Left View
                </h3>
                <img
                  src={leftPreview}
                  alt="Left Design"
                  className="w-full h-64 object-cover bg-gray-100"
                />
              </div>
            )}
          </div>
        ) : (
          /* ============ Beautiful Empty State ============ */
          <div className="text-center py-16 px-6">
            <div className="mx-auto max-w-md">
              {/* Illustration */}
              <div className="mb-8 relative">
                <div className="mx-auto w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shirt className="w-24 h-24 text-primary/60" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                </div>
              </div>

              {/* Text */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                No Design Yet!
              </h3>
              <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md mx-auto">
                Start creating your custom t-shirt design and see your masterpiece come to life here.
              </p>

              {/* Action Button */}
              <Link href="/allProduct">
                <button className="bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 text-white font-semibold px-8 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto shadow-lg">
                  <Sparkles className="w-6 h-6" />
                  Start Designing Now
                </button>
              </Link>

              <p className="text-sm text-gray-500 mt-8">
                Your recent designs will appear here once you create them.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}