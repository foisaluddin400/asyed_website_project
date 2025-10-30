import React from "react";
import cover from "../../../public/img/cover.png";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-28 text-white"
        style={{ backgroundImage: `url(${cover.src})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>

        <div className="relative z-10 container mx-auto flex flex-col justify-center h-full">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            About Us
          </h1>
          <p className="pt-4 w-full md:w-1/2">
            We started as a small team of creatives and developers who were
            frustrated by the limitations of traditional online shopping. Why
            settle for generic products when you can design your own?
          </p>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="container mx-auto py-16 px-4 md:px-0">
        <h1 className="text-3xl font-semibold text-center pb-4 pt-9">
          Meet the team
        </h1>
        <p className="text-center">
          We’re a team of designers, tech builders, and customer service champs
          — all passionate about helping you express yourself through every
          product you create. Whether you’re personalizing a gift or launching
          your own product line, we’re here to empower your ideas — one custom
          creation at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
