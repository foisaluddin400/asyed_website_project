'use client';
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

  // যদি ডেটা আসে তাহলে faqData.data থেকে map করা হবে
  const faqs = faqData?.data || [];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Cover Section */}
      <div className="relative bg-cover bg-center py-28 text-white"
        style={{ backgroundImage: `url(${cover.src})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>

        <div className="relative z-10 container m-auto items-center h-full">
          <h1 className="md:text-5xl text-3xl font-semibold leading-tight">
            FAQ
          </h1>
          <p className="pt-4 w-full md:w-1/2">
            You can choose any product, then use our easy design tool to add your
            own text, images, or graphics. You’ll see a live preview before
            ordering.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl m-auto space-y-3 my-16">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-500">No FAQs available.</p>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq._id}
              className="bg-gray-100 rounded-md cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-medium">
                  {index + 1}. {faq.question}
                </span>
                <span className="text-xl">
                  {openIndex === index ? "−" : "⌄"}
                </span>
              </div>

              {openIndex === index && (
                <div className="px-4 pb-3 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Faq;
