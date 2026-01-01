"use client";

import React, { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { Button, Input, message, Modal, Spin } from "antd";
import MyOrder from "./MyOrder";
import MyReview from "./MyReview";
import PasswordChange from "./PasswordChange";
import MyAddress from "./MyAddress";
import {
  useDeleteUserAccountMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/Api/userApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/features/auth/authSlice";

export const ProfilePage = () => {
  const [deleteAccount, { isLoading: deleting }] =
    useDeleteUserAccountMutation();
  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const profile = profileData?.data;

  const [updateProfile] = useUpdateProfileMutation();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Check login from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  const token = useSelector((state) => state.logInUser?.token);
  console.log(token);
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, []);
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setPreviewUrl(profile.imageUrl ? `${imageUrl}${profile.imageUrl}` : "");
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!profile?._id) {
      toast.error("User ID missing");
      return;
    }

    const data = new FormData();
    if (imageFile) data.append("image", imageFile);
    data.append("firstName", firstName);
    data.append("lastName", lastName);

    setLoading(true);
    try {
      const res = await updateProfile({ data, id: profile._id }).unwrap();
      toast.success(res.message || "Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalVisible(true);

    setConfirmInput("");
  };

  const confirmDelete = async () => {
    if (confirmInput.toLowerCase() !== "delete") {
      toast.error("Please type 'delete' to confirm");
      return;
    }

    try {
      const res = await deleteAccount().unwrap();

      setDeleteModalVisible(false);

      setProductToDelete(null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      localStorage.removeItem("rememberedCredentials");
      dispatch(logout());
      setIsLoggedIn(false);

      setTimeout(() => {
        window.location.href = "/signIn";
      }, 300);

      toast.success(res?.message || "Account deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setImageFile(null);
      setPreviewUrl(profile.imageUrl ? `${imageUrl}${profile.imageUrl}` : "");
    }
    setIsEditing(false);
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

  const tabs = [
    { key: "profile", label: "My Profile" },
    { key: "order", label: "My Orders" },
    { key: "review", label: "Complete Order" },
    { key: "address", label: "My Addresses" },
    { key: "password", label: "Change Password" },
  ];

  return (
    <div className="  pt-5">
      <div className=" mx-auto px-4 container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg border p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Manage My Account
              </h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                      activeTab === tab.key
                        ? "bg-primary text-white font-medium shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="border-t mt-3">
                <button
                  onClick={() => handleDeleteClick()}
                  className="border border-primary  text-primary w-full rounded-md py-3 mt-4"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden col-span-full">
            <div className="bg-white rounded-lg border p-4">
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap px-5 py-3 rounded-full font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg border p-2 md:p-4">
              {activeTab === "profile" && (
                <>
                  {/* Profile Header */}
                  <div className=" mb-10">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 mx-auto mb-6">
                        <input
                          type="file"
                          accept="image/*"
                          id="profile-img"
                          className="hidden"
                          onChange={handleImageChange}
                          disabled={!isEditing}
                        />

                        <div className="relative">
                          {previewUrl ? (
                            // If there's a profile image (either uploaded preview or existing one)
                            <img
                              src={previewUrl}
                              alt="Profile"
                              className="w-[130px] h-[130px] rounded-full object-cover ring-4 ring-gray-200 shadow-lg"
                            />
                          ) : (
                            // Fallback: Show initials on primary background
                            <div className="w-[130px] h-[130px] rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-bold uppercase shadow-lg ring-4 ring-gray-200">
                              {firstName ? firstName.charAt(0) : "U"}
                            </div>
                          )}

                          {/* Camera icon overlay - only in edit mode */}
                          {isEditing && (
                            <label
                              htmlFor="profile-img"
                              className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-xl hover:bg-primary/90 transition-all duration-200"
                            >
                              <IoCameraOutline className="text-xl" />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-gray-600 mt-1">{profile?.email}</p>
                  </div>

                  {/* Form Fields */}
                  <div className=" space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Enter first name"
                          />
                        ) : (
                          <p className="text-lg text-gray-800 font-medium">
                            {firstName || "-"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Enter last name"
                          />
                        ) : (
                          <p className="text-lg text-gray-800 font-medium">
                            {lastName || "-"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <p className="text-lg text-gray-800 font-medium">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className=" mt-10 flex flex-col sm:flex-row gap-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                          {loading ? (
                            <>
                              <Spin size="small" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>

                        <button
                          onClick={handleCancel}
                          className="flex-1 border border-gray-300 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full sm:w-auto px-10 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Other Tabs */}
              {activeTab === "order" && <MyOrder />}
              {activeTab === "review" && <MyReview />}
              {activeTab === "address" && <MyAddress />}
              {activeTab === "password" && <PasswordChange />}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={<span className="text-red-600 font-semibold text-2xl">Are you sure you want to delete your account?</span>}
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setDeleteModalVisible(false)}
            disabled={deleting}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={deleting}
            onClick={confirmDelete}
            disabled={confirmInput.toLowerCase() !== "delete"}
          >
            Delete User
          </Button>,
        ]}
        centered
        width={420}
      >
        <div className="py-6">
          <p className="text-gray-700 mb-4">
            This action <strong>cannot be undone</strong>. This will permanently
            delete the Aoount:{" "}
            <span className="font-bold text-md ">
              "{productToDelete?.name}"
            </span>
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Please type <span className="font-bold text-red-600">delete</span>{" "}
            to confirm:
          </p>
          <Input
            placeholder="Type 'delete' here"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            className="text-lg"
            autoFocus
          />
        </div>
      </Modal>
    </div>
  );
};
