'use client'
import React, { useState } from "react";
import cover from "../../../public/img/cover.png";
import { useGetFaqQuery } from "@/redux/Api/metaApi";

const Faq = () => {
  const {data:faqData} = useGetFaqQuery()
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "How does customization work?",
    "Can I upload my own design or logo?",
    "What kind of products can I customize?",
    "Do you offer bulk or business orders?",
    "How does customization work?",
    "How does customization work?",
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
      <div>
        <div>
             <div
                   className="relative bg-cover bg-center py-28 text-white"
                   style={{ backgroundImage: `url(${cover.src})` }}
                 >
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>
           
            <div className="relative z-10 container m-auto items-center h-full  ">
              <h1 className=" md:text-5xl text-3xl font-semibold leading-tight">
                FAQ
              </h1>
              <p className="pt-4 w-full md:w-1/2 ">
                ou can choose any product, then use our easy design tool to add
                your own text, images, or graphics. You’ll see a live preview
                before ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl m-auto space-y-3 my-16">
        {faqs.map((question, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-md cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between items-center px-4 py-3">
            <span className="font-medium">
              {index + 1}. {question}
            </span>
            <span className="text-xl">{openIndex === index ? "−" : "⌄"}</span>
          </div>
          {openIndex === index && (
            <div className="px-4 pb-3 text-gray-600">
              <p>
                This is a dummy answer for: <b>{question}</b>. You can replace
                it with your actual FAQ answer content.
              </p>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Faq;
