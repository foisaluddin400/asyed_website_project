import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Hridoy Hossain",
    role: "UX & UI Designer",
    avatar: "/professional-male-designer-glasses.png",
    rating: 5,
    review:
      "I've used other kits, but this one is the best. The attention to detail and usability are truly amazing.",
  },
  {
    id: 2,
    name: "Mojahid Leder",
    role: "UI/UX Designer",
    avatar: "/professional-bearded-designer.png",
    rating: 5,
    review:
      "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
  },
  {
    id: 3,
    name: "Sufiya (M) Leder",
    role: "Front End Developer",
    avatar: "/placeholder-qe61h.png",
    rating: 5,
    review:
      "This kit exceeded my expectations! The components are versatile and make implementation much easier.",
  },
  {
    id: 4,
    name: "Roshan Pro Max",
    role: "UI/UX Designer",
    avatar: "/professional-designer.png",
    rating: 5,
    review:
      "Perfect for quick prototyping! The designs are professional and work seamlessly with my workflow.",
  },
  {
    id: 5,
    name: "Mirana Marci",
    role: "3D Designer",
    avatar: "/professional-female-3d-designer.png",
    rating: 5,
    review:
      "I was blown away by how complete this UI kit is. It has everything I need, from assets to components.",
  },
  {
    id: 6,
    name: "Hearts of Taras",
    role: "Logo Designer",
    avatar: "/creative-designer.png",
    rating: 5,
    review:
      "Amazing work! The color schemes are vibrant, and the icons fit perfectly with all my projects.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

const Testomonial = () => {
  return (
    <div>
         <section className=" pb-20">
     <h1 className="text-4xl text-center pb-4 pt-20">
              Testimonials
          </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-6 border rounded-lg shadow-sm  space-y-4"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Rating */}
            <StarRating rating={testimonial.rating} />

            {/* Review */}
            <p className="text-foreground leading-relaxed">
              {testimonial.review}
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center">
        <button className="text-red-500 hover:text-red-600 font-medium transition-colors">
          See All Reviews
        </button>
      </div>
    </section>
    </div>
  )
}

export default Testomonial