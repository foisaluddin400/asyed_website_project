'use client';
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useGetContactQuery } from "@/redux/Api/metaApi";
import ContactForm from "./ContactForm";

const ContuctUsPage = () => {
  const { data: contactData } = useGetContactQuery();

  const getMapQuery = () => {
    const country = contactData?.data?.Country || "";
    const state = contactData?.data?.State || "";
    const city = contactData?.data?.City || "";

    if (city) return `${city}, ${state}, ${country}`;
    if (state) return `${state}, ${country}`;
    return country;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Our Location Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Our Location</h2>
        {contactData?.data?.Country && (
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            className="rounded border"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              getMapQuery()
            )}&output=embed`}
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
      </section>

      {/* Contact Form and Business Info Section */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Business Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Business Phone, Hours, Address, and Email
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{contactData?.data?.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{contactData?.data?.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">
                  {contactData?.data?.City}, {contactData?.data?.State}, {contactData?.data?.Country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContuctUsPage;
