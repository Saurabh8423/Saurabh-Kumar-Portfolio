"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { assets } from "@/assets/assets";

const skillIcons = {
  React: assets.react_icon,
  Node: assets.node_icon,
  Express: assets.express_icon,
  MongoDB: assets.mongodb,
  Machine: assets.ml_icon,
  FastAPI: assets.fastapi_icon,
  JavaScript: assets.javaScript_icon,
  CSS: assets.css_icon,
  Python: assets.python_icon,
  HTML: assets.html_icon,
  HTML: assets.html_icon,
  Tailwind: assets.tailwind_icon,
  TypeScript: assets.typeScript_icon,
  Next: assets.next_icon,
};

export default function ProjectCard({ project }) {
  return (
    <div
      className="group bg-white/80 dark:bg-[#0f172a]/70 backdrop-blur-xl
      border border-gray-200/60 dark:border-white/10
      rounded-2xl overflow-hidden
      transition-all duration-500
      hover:-translate-y-3 hover:scale-[1.02]
      hover:shadow-[0_25px_80px_rgba(236,72,153,0.35)]"
    >
      {/* Image Wrapper */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>

        <p className="text-sm text-gray-500 mb-4">{project.description}</p>

        {/* Skills */}
        <div className="flex gap-3 mb-4">
          {project.skills.map((skill, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full
              bg-gray-100 dark:bg-gray-800
              flex items-center justify-center
              transition-all duration-300
              hover:scale-110
              hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={skillIcons[skill]}
                  alt={skill}
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              className="text-pink-500 text-sm flex items-center gap-2
              hover:text-pink-400 transition"
            >
              <FaExternalLinkAlt /> {link.label}
            </a>
          ))}

          <a
            href={project.github}
            target="_blank"
            className="text-sm flex items-center gap-2
            text-gray-600 dark:text-gray-300
            hover:text-white transition"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
