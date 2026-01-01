"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { useGetIconQuery } from "@/redux/Api/productApi";
import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { imageUrl } from "@/redux/Api/baseApi";

const ImageIconControls = ({ selectedTool, onImageSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(""); // iconName for filtering
  const [search, setSearch] = useState(""); // free text search
  const pageSize = 12;

  const { data: iconsResponse, isLoading } = useGetIconQuery({
    search: selectedCategory || search, // priority: category first, then free search
    page: currentPage,
    limit: pageSize * 10, // fetch more to extract categories reliably
  });

  const icons = iconsResponse?.data || [];
  const total = iconsResponse?.meta?.total || 0;

  // Extract unique iconNames (categories) from fetched data
  const categories = Array.from(new Set(icons.map((item) => item.iconName))).sort();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle individual image drag
  const handleDragStart = (e, imageUrl, iconName) => {
    const fullUrl = `${imageUrl}`;
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        type: "uploadedIcon",
        dataUrl: fullUrl,
        name: iconName,
      })
    );
  };

  // Handle individual image click (add to canvas)
  const handleIconClick = (imageUrl) => {
    const fullUrl = `${imageUrl}`;
    onImageSelect(fullUrl, true);
  };

  // Force download single image
  const handleDownload = async (e, imageUrl, iconName) => {
    e.stopPropagation();

    const fullUrl = `${imageUrl}`;
    const extension = imageUrl.split(".").pop().split("?")[0];
    const filename = `${iconName.replace(/\s+/g, "_")}.${extension}`;

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  // Filter icons based on selected category
  const filteredIcons = selectedCategory
    ? icons.filter((item) => item.iconName === selectedCategory)
    : icons;

  // Get all images from filtered groups
  const allImages = [];
  filteredIcons.forEach((group) => {
    group.iconUrls.forEach((url) => {
      allImages.push({
        url: `${imageUrl}${url}`,
        groupName: group.iconName,
        groupId: group._id,
      });
    });
  });

  if (selectedTool !== "imageIcon") return null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 bg-white p-4 rounded shadow-lg flex flex-col gap-4 max-w-sm max-h-[85vh] overflow-y-auto z-10 w-full">
      {/* Search + Category Tabs */}
      <div className="flex flex-col gap-3">
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedCategory(""); 
            setCurrentPage(1);
          }}
          placeholder="Search icons by name..."
          prefix={<SearchOutlined />}
          style={{ height: "40px" }}
          allowClear
        />

        {/* Category Tabs (iconName as categories) */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory("");
              setSearch("");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              !selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Icons
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearch("");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat} ({icons.filter((i) => i.iconName === cat)[0]?.iconUrls.length || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-3 gap-4">
        {allImages.length === 0 ? (
          <div className="col-span-4 text-center py-8 text-gray-500">
            No icons found
          </div>
        ) : (
          allImages.map((img, index) => (
            <div
              key={`${img.groupId}-${index}`}
              className="relative flex flex-col items-center border-2 border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition cursor-move group"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, img.url, img.groupName)}
              onClick={() => handleIconClick(img.url)}
            >
              <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded bg-gray-50">
                <img
                  src={img.url}
                  alt={img.groupName}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                />
              </div>

              <p className="text-xs text-gray-600 font-medium mt-2 text-center truncate w-full">
                {img.groupName}
              </p>

              <button
                onClick={(e) => handleDownload(e, img.url, img.groupName)}
                className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 font-medium shadow-sm"
                title="Download"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {total > pageSize && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger={false}
            size="small"
          />
        </div>
      )}
    </div>
  );
};

export default ImageIconControls;