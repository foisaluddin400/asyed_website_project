'use client';

import React, { useState, useEffect } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { message, Spin } from 'antd';
import MyOrder from './MyOrder';
import MyReview from './MyReview';
import PasswordChange from './PasswordChange';
import MyAddress from './MyAddress';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/Api/userApi';
import { imageUrl } from '@/redux/Api/baseApi';
import { toast } from 'react-toastify';



export const ProfilePage = () => {
  /* ---------- FETCH PROFILE ---------- */
  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const profile = profileData?.data;
const [loading, setLoading] = useState(false);
  /* ---------- UPDATE MUTATION ---------- */
  const [updateProfile] = useUpdateProfileMutation();

  /* ---------- UI STATE ---------- */
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  /* ---------- FORM STATE ---------- */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  /* ---------- SYNC FETCHED DATA TO FORM ---------- */
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setPreviewUrl(profile.imageUrl ? `${imageUrl}${profile.imageUrl}` : '');
    }
  }, [profile]);

  /* ---------- IMAGE HANDLER ---------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  /* ---------- SAVE HANDLER ---------- */
  const handleSave = async () => {
    if (!profile?._id) {
      toast.error('User ID missing');
      return;
    }

    const data = new FormData();
    if (imageFile) data.append('image', imageFile);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
setLoading(true)
    try {
      const res = await updateProfile({ data, id: profile._id }).unwrap();
      toast.success(res.message || 'Profile updated');
      setIsEditing(false);
      setLoading(false)
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Update failed');
      console.error(err);
      setLoading(false)
    }
  };

  /* ---------- CANCEL HANDLER ---------- */
  const handleCancel = () => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setImageFile(null);
      setPreviewUrl(profile.imageUrl ? `${imageUrl}${profile.imageUrl}` : '');
    }
    setIsEditing(false);
  };

  /* ---------- RENDER ---------- */
  if (isLoading) return <div className="text-center py-10">Loading…</div>;

  return (
    <div className="md:flex w-full container mx-auto mt-6 px-4 lg:px-0 pb-20">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-light md:bg-transparent p-3 lg:px-0">
        <h2 className="text-lg font-semibold mb-6">Manage My Account</h2>
        <ul className="space-y-4">
          {['profile', 'order', 'review', 'address', 'password'].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer capitalize ${
                activeTab === tab ? 'text-blue-800 font-semibold' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'profile'
                ? 'My Profile'
                : tab === 'order'
                ? 'My Order'
                : tab.charAt(0).toUpperCase() + tab.slice(1) + (tab === 'order' ? '' : 's')}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-blue-900 mx-6"></div>

      {/* Content */}
      <div className="md:flex-1 mt-6 md:mt-0">
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            {/* Avatar */}
            <div className="relative w-[140px] h-[140px] mx-auto mb-6">
              <input
                type="file"
                accept="image/*"
                id="profile-img"
                className="hidden"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
              <img
                src={previewUrl || '/placeholder-avatar.png'}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border"
              />
              {isEditing && (
                <label
                  htmlFor="profile-img"
                  className="absolute bottom-0 right-0 bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer shadow-md"
                >
                  <IoCameraOutline className="text-xl text-gray-700" />
                </label>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-medium">{firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-medium">{lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">E-mail Address</label>
                <p className="font-medium">{profile?.email}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              {isEditing ? (
                <>
                 


<button        onClick={handleSave}
                    className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                      loading
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-primary hover:bg-red-500"
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spin size="small" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>

                  <button
                    onClick={handleCancel}
                    className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        )}

        {/* OTHER TABS (unchanged) */}
        {activeTab === 'order' && <MyOrder />}
        {activeTab === 'review' && <MyReview />}
        {activeTab === 'address' && <MyAddress />}
        {activeTab === 'password' && <PasswordChange />}
      </div>
    </div>
  );
};