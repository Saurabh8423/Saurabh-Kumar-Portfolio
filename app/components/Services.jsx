"use client";

import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const services = [
  {
    title: "Web Development",
    shortDesc: "Fast, responsive, and SEO-optimized web applications.",
    fullDesc:
      "I build scalable and high-performance web applications using React and Next.js. My focus is on clean UI, SEO optimization, accessibility, and maintainable code with modern best practices.",
    icon: assets.web_icon,
  },

  {
    title: "Machine Learning Solutions",
    shortDesc: "ML-powered prediction & analytics systems.",
    fullDesc:
      "I develop machine learning solutions including prediction models, data analytics dashboards, computer vision systems, and FastAPI-based ML services for real-world deployment.",
    icon: assets.mobile_icon,
  },

  {
    title: "UI / Card Design",
    shortDesc: "Modern festival, brand card designs and Catalog design.",
    fullDesc:
      "I design visually appealing festival and corporate greeting cards for Diwali, New Year, Holi, Christmas, and brand campaigns to strengthen emotional connection with customers, and company Catalog design.",
    icon: assets.graphics_icon,
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      {/* SERVICES SECTION */}
      <section id="services" className="w-full px-[12%] py-20 scroll-mt-20">
        <h4 className="text-center text-gray-500 font-Ovo mb-2">
          What I offer
        </h4>
        <h2 className="text-center text-3xl md:text-4xl font-Ovo font-semibold text-gray-600 dark:text-gray-400 mb-16">
          My services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-[#0f172a]/70 backdrop-blur-xl
  border border-gray-200/60 dark:border-white/10 rounded-2xl p-8
  transition-all duration-500 ease-out
  hover:-translate-y-3 hover:scale-[1.02]
  hover:shadow-[0_20px_60px_rgba(236,72,153,0.35)]
  hover:border-pink-400/50 dark:hover:border-pink-500/40"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-500/10">
                <Image src={service.icon} alt={service.title} width={28} />
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-white">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-7">
                {service.shortDesc}
              </p>

              <button
                onClick={() => setActiveService(service)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-pink-500 transition"
              >
                Read more
                <span className="text-lg group-hover:translate-x-1 transition">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {activeService && (
        <div
          onClick={() => setActiveService(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#020617] rounded-2xl max-w-lg w-full p-8 relative animate-scaleIn"
          >
            {/* Close */}
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-500/10">
                <Image
                  src={activeService.icon}
                  alt={activeService.title}
                  width={28}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {activeService.title}
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-7">
              {activeService.fullDesc}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
