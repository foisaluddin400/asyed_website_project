"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeleteDesignMutation, useGetDesignQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Shirt, Sparkles } from "lucide-react";

const IndividualProduct = () => {
  const token = useSelector((state) => state.logInUser?.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/signIn");
    }
  }, [token, router]);

  if (!token) return null;

  const { data: myProduct, isLoading } = useGetDesignQuery();
  const [deleteDesign] = useDeleteDesignMutation();

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );

  const designs = myProduct?.data || [];

  const handleDelete = async (id) => {
    try {
      const res = await deleteDesign(id).unwrap();
      toast.success(res?.message || "Design deleted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete design");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        My Design Collection
      </h1>

      {designs.length === 0 ? (
        /* ============ Beautiful Empty State (Same as RecentDesign) ============ */
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
              No Designs Yet!
            </h3>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md mx-auto">
              Start creating your custom designs and they will appear here in your personal collection.
            </p>

            {/* Action Button */}
            <Link href="/allProduct">
              <button className="bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 text-white font-semibold px-8 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto shadow-lg">
                <Sparkles className="w-6 h-6" />
                Start Designing Now
              </button>
            </Link>

            <p className="text-sm text-gray-500 mt-8">
              Your saved designs will show up here once you create them.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design) => {
            const availableImages = [
              design.frontImage,
              design.backImage,
              design.leftImage,
              design.rightImage,
            ].filter((img) => img && img !== null);

            return (
              <div
                key={design._id}
                className="rounded-xl duration-300 border overflow-hidden group shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {design.designName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {design.baseProduct?.productName || "Custom Product"}
                  </p>

                  {/* Price Section */}
                  <div className="mb-4">
                    <span className="text-lg font-bold text-[#0091FF] mr-2">
                      ${design.baseProduct?.discountedPrice || "0.00"}
                    </span>
                    {design.baseProduct?.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${design.baseProduct.price}
                      </span>
                    )}
                  </div>

                  {/* Image Grid */}
                  {availableImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {availableImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="w-full rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={`${imageUrl}${img}`}
                            alt={`Design view ${idx + 1}`}
                            width={1000}
                            height={300}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/addToDesignCart/${design._id}`}>
                      <button className="block text-center w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(design._id)}
                      className="block text-center w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IndividualProduct;