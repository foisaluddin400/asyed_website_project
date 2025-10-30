"use client";


import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Reusable Button Component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-3 py-2 rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Reusable Input Component
const Input = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 border rounded ${className}`}
    {...props}
  />
);

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div>
            <h1 className="text-xl font-semibold mb-4">Exclusive</h1>
            <h2 className="text-lg font-medium mb-3">Subscribe</h2>
            <p className="text-gray-300 mb-4">Get 10% off your first order</p>
           
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <div className="space-y-2 text-gray-300">
              <p>Your Location, state , country,</p>
              <p> your zip code.</p>
              <p>yourGmail@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-2">
              <Link href="/profilePage" className="block text-gray-300 hover:text-white transition-colors">
                My Account
              </Link>
              <Link href="/auth/login" className="block text-gray-300 hover:text-white transition-colors">
                Login / Register
              </Link>
              <Link href="/cart" className="block text-gray-300 hover:text-white transition-colors">
                Cart
              </Link>
            </div>
          </div>

          {/* Quick Link Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Link</h2>
            <div className="space-y-2">
              <Link href="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-condition" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Download App Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Download App</h2>
            <p className="text-sm text-gray-300 mb-4">Save $3 with App New User Only</p>

            <div className="flex gap-3 mb-4">
              {/* QR Code Placeholder */}
         

              
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank">
                <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Twitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <Instagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
