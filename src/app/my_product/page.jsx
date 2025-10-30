"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeleteDesignMutation, useGetDesignQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { message } from "antd";
import { toast } from "react-toastify";

const IndividualProduct = () => {
  const { data: myProduct, isLoading } = useGetDesignQuery();
  const [deleteDesign] = useDeleteDesignMutation()

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading products...
      </div>
    );

  const designs = myProduct?.data || [];
  const handleDelete = async (id) => {
    try {
      const res = await deleteDesign(id).unwrap();
      toast.success(res?.message );
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        My Design Collection
      </h1>

      {designs.length === 0 ? (
        <p className="text-center text-gray-500">No designs found.</p>
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
                className="rounded-xl duration-300 border overflow-hidden group"
              >
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {design.designName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {design.baseProduct?.productName}
                  </p>

                  {/* Price Section */}
                  <div className="mb-4">
                    <span className="text-lg font-bold text-[#0091FF] mr-2">
                      ${design.baseProduct?.discountedPrice}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${design.baseProduct?.price}
                    </span>
                  </div>

                  {/* Image Grid */}
                  {availableImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {availableImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="w-full rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={`${imageUrl}${img}`}
                            alt={`Design ${idx}`}
                            width={1000}
                            height={300}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/addToDesignCart/${design._id}`}>
                      <button className="block text-center w-full bg-sky-400 text-white py-2 rounded-lg font-medium hover:bg-[#007be0] transition-colors">
                        View Details
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(design._id)} className="block text-center w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-[#007be0] transition-colors">
                      delete
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
