"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { MarkIcon } from "./Image";
import { useGetContactQuery } from "@/redux/Api/metaApi";

// Reusable Social Icon Componentfd
const SocialIcon = ({ href, icon: Icon }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
  >
    <Icon className="w-5 h-5" />
  </Link>
);

export const Footer = () => {
  const { data: contactData } = useGetContactQuery();
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 mt-20">
      <div className="container mx-auto px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Logo & About - Wider column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <MarkIcon className="h-10 w-auto" />
            </Link>
           
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Your one-stop destination for premium, custom-designed t-shirts. Create, wear, and express your unique style with ease.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{contactData?.data?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{contactData?.data?.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{contactData?.data?.City}, {contactData?.data?.State}, {contactData?.data?.Country}</span>
              </div>
            </div>
          </div>

          {/* Account Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-white">Account</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/profilePage" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  My Account
                </Link>
              </li>
             
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/my_product" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  My Product
                </Link>
              </li>
              <li>
                <Link href="/my-recent-design" className="text-gray-400 hover:text-primary transition-colors duration-200">
                 My recent design
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-condition" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contactUs" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Only */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold mb-6 text-white">Follow Us</h3>
            <p className="text-gray-400 mb-8">Connect with us on social media for the latest designs and updates.</p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <SocialIcon href="https://facebook.com" icon={Facebook} />
              <SocialIcon href="https://twitter.com" icon={Twitter} />
              <SocialIcon href="https://instagram.com" icon={Instagram} />
              <SocialIcon href="https://linkedin.com" icon={Linkedin} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} T-Shirt Express. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-condition" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};