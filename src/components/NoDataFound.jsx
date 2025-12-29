import { Shirt, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const NoDataFound = () => {
  return (
    <div>
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
            No Data Found
          </h3>
          <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md mx-auto">
            Start creating your custom t-shirt design and see your masterpiece
            come to life here.
          </p>

      

          <p className="text-sm text-gray-500 mt-8">
            Your recent designs will appear here once you create them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
