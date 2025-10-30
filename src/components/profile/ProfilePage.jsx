'use client'
import React, { useState } from "react";
import MyOrder from "./MyOrder";
import MyReview from "./MyReview";
import PasswordChange from "./PasswordChange";
import MyAddress from "./MyAddress";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="md:flex w-full container mx-auto mt-6 px-4 lg:px-0 pb-20">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-light md:bg-transparent p-3 lg:px-0">
        <h2 className="text-lg font-semibold mb-6">ManageMy Account</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              activeTab === "profile"
                ? "text-blue-800 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "order"
                ? "text-blue-800 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("order")}
          >
            My Order
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "review"
                ? "text-blue-800 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("review")}
          >
            My Review
          </li>
           <li
            className={`cursor-pointer ${
              activeTab === "address"
                ? "text-blue-800 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("address")}
          >
            My Address
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "password"
                ? "text-blue-800 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password Change
          </li>
        </ul>
      </div>

      {/* Divider */}
      <div className="w-px bg-blue-900 mx-6"></div>

      {/* Content */}
      <div className="md:flex-1 mt-6 md:mt-0">
        {activeTab === "profile" && (
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="text-black font-medium">Hridoy</p>
              </div>
              <div>
                <p className="text-gray-500">E-mail Address</p>
                <p className="text-black font-medium">hridoy654@gmail.com</p>
              </div>
            </div>
            <button className="mt-8 bg-primary text-white px-6 py-2 rounded">
              Edit Profile
            </button>
          </div>
        )}

        {activeTab === "order" && (
          <MyOrder></MyOrder>
        )}

        {activeTab === "review" && (
          <MyReview></MyReview>
        )}
        {activeTab === "address" && (
          <MyAddress></MyAddress>
        )}

        {activeTab === "password" && (
          <PasswordChange></PasswordChange>
        )}
      </div>
    </div>
  );
};
