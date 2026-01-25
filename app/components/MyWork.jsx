"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiSend } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import { assets } from "@/assets/assets";
import { webProjects, mlProjects, designProjects } from "./data/projectsData";

const categories = [
  { id: "web", title: "Web Development", image: assets.web_project },
  { id: "ml", title: "Machine Learning", image: assets.ml_project },
  { id: "design", title: "UI / Card Design", image: assets.design_project },
];

export default function MyWork() {
  const [active, setActive] = useState("web");

  return (
    <section id="work" className="px-[12%] py-20">
      <p className="text-center text-gray-500 mb-2">My Portfolio</p>
      <h2 className="text-center text-4xl font-Ovo font-semibold text-gray-600 dark:text-gray-400 mb-4">
        My Latest Work
      </h2>
      <p className="text-center text-gray-500 max-w-xl mx-auto mb-16">
        A curated collection of projects across web development, machine
        learning, and creative design.
      </p>

      {/* ===== Categories ===== */}
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className="group relative cursor-pointer rounded-3xl overflow-hidden
transition-all duration-500
hover:-translate-y-3 hover:scale-[1.02]
hover:shadow-[0_25px_80px_rgba(236,72,153,0.35)]"
          >
            {/* Background Image */}
            <Image
              src={cat.image}
              alt={cat.title}
              width={600}
              height={400}
              className="h-[280px] w-full object-cover 
              group-hover:scale-105 transition duration-500"
            />

            {/* Floating White Card */}
            <div
              className="absolute bottom-5 left-5 right-5
bg-white/90 backdrop-blur-xl
border border-white/40
rounded-2xl px-5 py-4
flex items-center justify-between
transition-all duration-500
group-hover:-translate-y-3
group-hover:shadow-[0_10px_50px_rgba(139,92,246,0.35)]"
            >
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-500">View projects</p>
              </div>

              {/* Send Arrow */}
              <div
                className="w-10 h-10 rounded-full 
bg-gradient-to-br from-pink-500 to-purple-600
text-white text-lg
flex items-center justify-center
shadow-[0_0_25px_rgba(236,72,153,0.6)]
group-hover:scale-110 transition"
              >
                <FiSend />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Web Projects ===== */}
      {active === "web" && (
        <div className="grid md:grid-cols-3 gap-10">
          {webProjects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      )}

      {/* ===== ML Projects ===== */}
      {active === "ml" && (
        <div className="grid md:grid-cols-3 gap-10">
          {mlProjects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      )}

      {/* ===== Design Projects ===== */}
      {active === "design" && (
        <div className="grid md:grid-cols-3 gap-10">
          {designProjects.map((img, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden
transition-all duration-500
hover:-translate-y-3 hover:scale-[1.02]
hover:shadow-[0_25px_80px_rgba(139,92,246,0.4)]"
            >
              <Image
                src={img}
                alt="Design Card"
                width={600}
                height={400}
                className="w-full h-[280px] object-cover 
                group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
