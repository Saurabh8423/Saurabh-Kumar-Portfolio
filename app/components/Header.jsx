"use client";

import { useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Header = () => {
  useEffect(() => {
    gsap.from(".hero-img", {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".hero-text", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="w-11/12 max-w-5xl mx-auto h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      {/* Profile Image */}
      <div className="relative">
        <Image
          src={assets.profile_img}
          alt="Profile"
          width={160}
          height={160}
          className="hero-img rounded-full border-4 border-white shadow-2xl glow-hover"
        />
      </div>

      <h3 className="hero-text flex items-center justify-center gap-2 text-xl md:text-2xl font-Ovo text-gray-600 dark:text-gray-400">
        Hi! I'm <span className="font-semibold">Saurabh Kumar</span>
        <Image
          src={assets.hand_icon}
          alt="Hand Icon"
          width={28}
          height={28}
          className="animate-wave h-auto"
        />
      </h3>

      <h1 className="hero-text text-3xl sm:text-5xl lg:text-6xl font-Ovo font-bold text-gray-600 dark:text-gray-400">
        MERN Stack Developer
      </h1>

      <p className="hero-text max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400">
        I am a FullStack (MERN) Web Developer from India, passionate about
        building modern, responsive, and scalable applications.
      </p>

      <div className="hero-text flex flex-col sm:flex-row items-center gap-4 mt-6">
        <a
          href="#contact"
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg glow-hover flex items-center gap-2"
        >
          Contact Me
        </a>

        <a
          href="/Saurabh-Kumar.pdf"
          download
          className="px-8 py-3 border border-gray-400 rounded-full text-gray-300 hover:bg-gray-800 transition"
        >
          My Resume
        </a>
      </div>
    </div>
  );
};

export default Header;
