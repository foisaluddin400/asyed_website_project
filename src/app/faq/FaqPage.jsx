"use client";
import React, { useState } from "react";
import cover from "../../../public/img/cover.png";
import { useGetFaqQuery } from "@/redux/Api/metaApi";

const Faq = () => {
  const { data: faqData, isLoading, isError } = useGetFaqQuery();
  const [openIndex, setOpenIndex] = useState(null);

  // Loading and Error handle
  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        Loading FAQs...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Failed to load FAQs.
      </div>
    );
  }


  const faqs = faqData?.data || [];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Cover Section */}
      <div
        className="relative bg-cover bg-center py-28 text-white"
        style={{ backgroundImage: `url(${cover.src})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>

        <div className="relative z-10 container m-auto items-center h-full">
          <h1 className="md:text-5xl text-3xl font-semibold leading-tight">
            FAQ
          </h1>
          <p className="pt-4 w-full md:w-1/2">
            You can choose any product, then use our easy design tool to add
            your own text, images, or graphics. You’ll see a live preview before
            ordering.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-16 container">
  {/* Section Title */}
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      Frequently Asked Questions
    </h2>
    <p className="text-lg text-gray-600">
      Click on a question to view the answer
    </p>
  </div>

  {faqs.length === 0 ? (
    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-3">
        No FAQs Available
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        We're working on adding helpful information. Check back soon!
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer ${
            openIndex === index ? "ring-4 ring-primary/20" : ""
          }`}
          onClick={() => toggleFAQ(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" || e.key === " " && toggleFAQ(index)}
        >
          {/* Question Header */}
          <div className="flex justify-between items-center p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-8 leading-relaxed">
              {faq.question}
            </h3>
            <div className={`text-primary transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Answer Panel - Smooth Expand */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 md:px-8 pb-8 pt-4 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
};

export default Faq;
