"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { Popconfirm, message } from "antd"; // ← AntD Popconfirm + message

import { useRouter, usePathname } from "next/navigation";
import { useGetCategoryQuery } from "@/redux/Api/categoryApi";
import { useGetCartQuery } from "@/redux/Api/productApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MarkIcon } from "./Image";

// Dynamically import Ant Design Drawer
const Drawer = dynamic(() => import("antd").then((mod) => mod.Drawer), {
  ssr: false,
});

export const Navbar = () => {
  const { data: cartData } = useGetCartQuery();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { data: category } = useGetCategoryQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

const navItems = [
  { label: "Home", path: "/", isHighlighted: true },
  { label: "Custom Apparel", path: "/allProduct" },

  ...(isLoggedIn
    ? [
        { label: "My Product", path: "/my_product" },
        { label: "Recent Design", path: "/my-recent-design" },
      ]
    : []),

  { label: "About", path: "/about" },
  { label: "Contact", path: "/contactUs" },
  { label: "Blog", path: "/blog" },
];


  // Mega Men
  const renderMegaMenu = () => {
    if (!category?.data?.length) return null;
    return (
      <div className="absolute left-0 top-full w-[1000px] text-sm bg-white shadow-lg rounded-sm border py-4 px-8 grid grid-cols-2 md:grid-cols-4 gap-4 z-50">
        {category.data.map((cat) => (
          <div
            key={cat._id}
            className="cursor-pointer text-black hover:text-blue-600 transition-colors"
            onClick={() => router.push(`/allSubcategory/${cat._id}`)}
          >
            {cat.name}
          </div>
        ))}
      </div>
    );
  };

  const DrawerItem = ({ item, level = 0 }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      if (item.label === "Custom Apparel") {
        setOpen(!open);
      } else if (item.path) {
        router.push(item.path);
        setDrawerOpen(false);
      }
    };

    return (
      <div>
        <div
          className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all"
          style={{ paddingLeft: `${16 + level * 16}px` }}
          onClick={handleClick}
        >
          <span className="flex-1 text-white">{item.label}</span>
          {item.label === "Custom Apparel" && (
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
        {item.label === "Custom Apparel" && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#2b3a57] ${
              open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {open &&
              category?.data?.length > 0 &&
              category.data.map((cat) => (
                <div
                  key={cat._id}
                  className="pl-10 py-2 text-sm text-gray-300 hover:text-blue-400 cursor-pointer transition"
                  onClick={() => {
                    router.push(`/allSubcategory/${cat._id}`);
                    setDrawerOpen(false);
                  }}
                >
                  {cat.name}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const isPathActive = (item) => {
    if (pathname === item.path) return true;
    if (item.children) {
      return item.children.some(
        (child) => pathname.startsWith(child.path) || isPathActive(child)
      );
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(logout());
    setIsLoggedIn(false);
    message.success("You have been logged out");

    setTimeout(() => {
      window.location.href = "/signIn"; 
    }, 300);
  };

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-primary border-b border-gray-400 text-white py-3 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <span>Welcome to T-Shirts Express online e-commerce store.</span>
          <div className="flex items-center gap-2">
            <span>Follow us:</span>
            <FaTwitter />
            <SiFacebook />
            <FaYoutube />
            <RiInstagramFill />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="bg-primary px-4 lg:px-0">
          <div className="container mx-auto py-4 flex items-center justify-between gap-4">
            {/* Logo + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                className="md:hidden text-white"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="text-2xl font-bold">
                <MarkIcon></MarkIcon>
              </Link>
            </div>

            {/* Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const query = e.target.elements.searchInput.value.trim();
                    if (query) {
                      router.push(
                        `/allProduct?search=${encodeURIComponent(query)}`
                      );
                    }
                  }}
                >
                  <input
                    type="text"
                    name="searchInput"
                    placeholder="Search for anything..."
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 text-black focus:ring-2 focus:ring-red-500 rounded-md"
                  />
                  <button type="submit" className="absolute right-2 top-2">
                    <Search className="w-5 h-5 text-gray-600" />
                  </button>
                </form>
              </div>
            </div>

            {/* Auth Buttons – WITH POPCONFIRM */}
            <div className="hidden md:block">
              <div className="flex  items-center gap-3">
                {isLoggedIn ? (
                  <Popconfirm
                    title="Are you sure you want to log out?"
                    okText="Yes"
                    cancelText="No"
                    okType="danger"
                    onConfirm={handleLogout}
                  >
                    <button className="bg-white text-primary px-4 py-2 rounded-md flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </Popconfirm>
                ) : (
                  <>
                    <Link
                      href="/signUp"
                      className=" border text-white px-4 py-2 rounded-md"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/signIn"
                      className=" bg-white text-primary px-4 py-2 rounded-md"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Cart + Profile (Mobile) */}
            <div className="block lg:hidden">
              {isLoggedIn && (
                <div className="flex gap-3">
                  <Link href="/cart">
                    <div className="relative cursor-pointer">
                      <ShoppingCart className="w-6 h-6 text-white" />
                      <span className="absolute -top-2 -right-2 bg-white text-black text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        {cartData?.data?.items?.length || 0}
                      </span>
                    </div>
                  </Link>
                  <Link href="/profilePage">
                    <User className="w-6 h-6 text-white cursor-pointer" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <div className="container mx-auto">
            <nav className="flex items-center justify-between py-3 relative">
              <div className="flex items-center space-x-8">
                {navItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-1 px-2 py-1 rounded ${
                        pathname === item.path || isPathActive(item)
                          ? "bg-primary text-white font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                      {item.label === "Custom Apparel" && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      {item.badge && (
                        <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                    {item.label === "Custom Apparel" &&
                      openDropdown === "Custom Apparel" &&
                      renderMegaMenu()}
                  </div>
                ))}
              </div>

              {/* Cart + Profile (Desktop) */}
              <div className="hidden lg:block">
                {isLoggedIn && (
                  <div className="flex gap-3">
                    <Link href="/cart">
                      <div className="relative cursor-pointer">
                        <ShoppingCart className="w-6 h-6 text-black" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                          {cartData?.data?.items?.length || 0}
                        </span>
                      </div>
                    </Link>
                    <Link href="/profilePage">
                      <User className="w-6 h-6 text-black cursor-pointer" />
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        style={{ backgroundColor: "#1D3557", color: "white" }}
        title={
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={30}
            className="w-[120px] mx-auto block"
            priority
          />
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {/* Search */}
        <div className="mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.elements.searchInput.value.trim();
              if (query) {
                router.push(`/allProduct?search=${encodeURIComponent(query)}`);
                setDrawerOpen(false);
              }
            }}
          >
            <div className="relative">
              <input
                type="text"
                name="searchInput"
                placeholder="Search..."
                className="w-full pl-4 pr-12 py-2 text-black border border-gray-300 focus:ring-2 focus:ring-red-500 rounded-md"
              />
              <button type="submit" className="absolute right-2 top-2">
                <Search className="w-5 h-5 text-black" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col space-y-2">
          {navItems.map((item, idx) => (
            <DrawerItem key={idx} item={item} />
          ))}
        </div>
        <div className="mt-6">
          {isLoggedIn ? (
            <Popconfirm
              title="Are you sure you want to log out?"
              okText="Yes"
              cancelText="No"
              okType="danger"
              onConfirm={handleLogout}
            >
              <button className="w-full bg-gradient-to-r from-indigo-200 via-blue-400 to-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </Popconfirm>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/signUp"
                className="border px-4 py-2 rounded-md text-white flex-1 text-center"
                onClick={() => setDrawerOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href="/signIn"
                className="bg-gradient-to-r from-indigo-200 via-blue-400 to-blue-700 text-white px-4 py-2 rounded-md flex-1 text-center"
                onClick={() => setDrawerOpen(false)}
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
};
