"use client";

import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useEffect } from "react";
import { gsap } from "@/app/lib/gsap";

export default function Footer() {
  useEffect(() => {
    gsap.from(".footer-anim", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
    });
  }, []);

  return (
    <footer className="footer w-full px-[12%] py-10 bg-gradient-to-t from-[#020617] to-[#0f172a] border-t border-white/10 overflow-hidden">


      {/* Logo */}
      <div className="footer-anim text-center mb-8">
        <h2 className="text-4xl font-semibold bg-gradient-to-r from-pink-500 to-white bg-clip-text text-transparent animate-gradient">
          Saurabh Kumar
        </h2>
      </div>

      {/* Social Icons */}
      <div className="footer-anim flex justify-center gap-8 mb-7">
        {[
          { icon: <FaGithub />, link: "https://github.com/Saurabh8423" },
          { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/saurabh-kumar-091741209/" },
          { icon: <FaInstagram />, link: "https://instagram.com" },
          { icon: <FaXTwitter />, link: "https://x.com/Saurabh26393134" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            className="social-icon"
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Footer Text */}
      <p className="footer-anim text-center text-gray-400 text-sm">
        © 2026 All Rights Reserved | Designed & Built by{" "}
        <span className="bg-gradient-to-r from-pink-500 to-white bg-clip-text text-transparent font-semibold">
          Saurabh
        </span>
      </p>
    </footer>
  );
}
