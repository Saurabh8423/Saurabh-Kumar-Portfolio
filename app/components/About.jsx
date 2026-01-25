"use client";

import { assets, infoList } from "@/assets/assets";
import Image from "next/image";
import { useRef } from "react";
import useScrollReveal from "@/app/hooks/useScrollReveal";

const About = () => {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <div
      ref={ref}
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo text-gray-500">
        Introduction
      </h4>
      <h2 className="text-center text-3xl md:text-4xl font-Ovo font-semibold text-gray-600 dark:text-gray-400">
        About me
      </h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <div className="w-64 sm:w-80 rounded-3xl overflow-hidden shadow-2xl glow-hover">
          <Image src={assets.user_image} alt="User" className="w-full object-cover"/>
        </div>

        <div className="flex-1 text-gray-600 dark:text-gray-400">
          <p className="mb-10 max-w-2xl font-Ovo">
            I am a <span className="font-semibold">Full Stack Developer & Machine Learning Engineer</span> with hands-on experience building scalable web and ML systems.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map((item, index) => (
              <li
                key={index}
                className="glass rounded-xl p-6 glow-hover transition-all duration-500"
              >
                <Image src={item.icon} alt={item.title} className="w-7"/>
                <h3 className="my-4 font-semibold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
