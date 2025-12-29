"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Star, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "antd";
import FiltersSidebar from "./FiltersSidebar";
import { useGetAllBusinesFilterQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { useSearchParams, useRouter } from "next/navigation";

const AllProduct = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get filter values from URL params
  const selectedFilters = {
    category: searchParams.get("category") || null,
    subcategory: searchParams.get("subcategory") || null,
    color: searchParams.get("color") || null,
    size: searchParams.get("size") || null,
    brand: searchParams.get("brand") || null,
    price: searchParams.get("price") || null,
  };

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetAllBusinesFilterQuery({
    category: selectedFilters.category,
    subcategory: selectedFilters.subcategory,
    color: selectedFilters.color,
    size: selectedFilters.size,
    brand: selectedFilters.brand,
    price: selectedFilters.price,
    search: searchParams.get("search") || "",
    page: currentPage,
    limit: pageSize,
  });

  console.log(productsData);

  const getCategoryName = () => {
    const categoryName = searchParams.get("categoryName") || "All Products";
    return categoryName;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearAllFilters = () => {
    const params = new URLSearchParams();
    const search = searchParams.get("search");

    if (search) {
      params.set("search", search);
    }

    router.push(`?${params.toString()}`);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">
            Something went wrong while fetching products.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h1 className="text-xl font-bold">
          {selectedFilters.category ? getCategoryName() : "All Products"}
        </h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 border rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-64 flex-shrink-0 border rounded-lg shadow">
          <FiltersSidebar />
        </aside>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative bg-white w-80 h-full shadow-lg z-50 overflow-y-auto">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-200 z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <FiltersSidebar />
            </div>
          </div>
        )}
        <main className="flex-1">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="text-gray-700 cursor-pointer hover:text-primary">
              All Products
            </span>
            {selectedFilters.category && (
              <>
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                <span className="text-primary font-medium">
                  {getCategoryName()}
                </span>
              </>
            )}
          </nav>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">
              {selectedFilters.category ? getCategoryName() : "All Products"}
            </h1>
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {productsData?.meta?.total || 0} products found
                {searchParams.get("search") && (
                  <span className="ml-2 text-blue-600">
                    • {searchParams.get("search")}
                  </span>
                )}
              </p>
            </div>
          </div>
          {productsData?.data?.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsData.data
                  .filter(
                    (product) => product.variants && product.variants.length > 0
                  )
                  .map((product) => {
                    const visibleVariants = product.variants.filter(
                      (variant) => variant.status === "Visible"
                    );

                    if (visibleVariants.length === 0) return null;
                    const frontImage = product?.thumbnail || "/placeholder.png";
                    console.log(product);
                    return (
                      <div
                        key={product._id}
                        className="group overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="relative bg-gray-50 py-6 flex justify-center">
                          <Link href={`/productDetails/${product._id}`}>
                            <Image
                              src={`${imageUrl}${frontImage}`}
                              alt={product.productName}
                              width={128}
                              height={176}
                              className="w-32 h-44 object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {product.discountPercentage > 0 && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-br">
                              -{product.discountPercentage}%
                            </span>
                          )}

                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-lg">
                            
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-medium mb-2 line-clamp-2 text-sm leading-tight">
                            {product.productName}
                          </h3>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                $
                                {product.discountedPrice?.toFixed(2) ||
                                  product.price?.toFixed(2)}
                              </span>
                              {product.discountPercentage > 0 && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.price?.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 text-xs text-yellow-500">
                              <Star className="h-3 w-3 fill-current" />
                              <span>{product.rating || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="flex justify-center mt-11 items-center gap-2">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={productsData?.meta?.total || 0}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center">
                <div className="text-gray-400 text-4xl">🔍</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchParams.get("search")
                  ? "No products found"
                  : "No products available"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchParams.get("search")
                  ? `No products match "${searchParams.get(
                      "search"
                    )}". Try different keywords.`
                  : "Browse our categories to discover amazing products."}
              </p>
              {searchParams.get("search") && (
                <button
                  onClick={handleClearSearch}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mr-3"
                >
                  Clear Search
                </button>
              )}
            
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProduct;
