export const experience = [
  {
    role: "Founder & Full-Stack Developer",
    company: "TooleraAI",
    type: "Self-Employed",
    period: "2026 — Present",
    current: true,
    summary: "Founded and built a growing platform of practical online tools, from product development to production infrastructure.",
    points: [
      "Developed PDF, image, SEO, developer, calculator and productivity tools for global users.",
      "Engineered full-stack tools and REST APIs with Next.js, React, TypeScript, Node.js and MongoDB.",
      "Implemented technical SEO, structured data, indexing, internal linking, analytics and performance optimizations.",
      "Deployed on Linux VPS with Docker, Nginx, PM2, SSL and GitHub Actions CI/CD; integrated AI and LLM services.",
    ],
    metrics: [],
    stack: ["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "REST APIs", "Technical SEO", "Docker", "GitHub Actions"],
  },
  {
    role: "Full Stack & AI Developer",
    company: "ForestGate Global Advisors",
    type: "Full Time",
    period: "Mar 2026 — Present",
    current: true,
    summary: "Own AI SaaS products end to end — architecture to deployment.",
    /* Kept to one line each. The detail lives in the résumé. */
    points: [
      "Architected and launched YogiAI.live — AI Vedic astrology SaaS on Next.js, TypeScript, Firebase and LLM APIs.",
      "Built RBAC admin, Razorpay subscriptions, AI chat and WebRTC voice.",
      "Shipped StudyMates.live — live video rooms and chat on MERN, Socket.IO and Agora RTC.",
      "Runs on Docker, Nginx, PM2 and GitHub Actions CI/CD.",
    ],
    metrics: [
      { value: "2", label: "SaaS launched" },
      { value: "2", label: "Platforms: web + mobile" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Razorpay",
      "LLM APIs",
      "WebRTC",
      "Socket.IO",
      "Docker",
      "Nginx",
      "GitHub Actions",
    ],
  },
  {
    role: "MERN Stack Web Developer",
    company: "Riddhi Control System",
    type: "Full Time",
    period: "Mar 2025 — Feb 2026",
    current: false,
    summary: "Shipped production MERN apps with a focus on measurable speed.",
    points: [
      "Built scalable MERN apps with modular architecture and JWT auth.",
      "Optimised REST APIs serving 1000+ requests a day.",
      "Cut frontend load time by 30%.",
    ],
    metrics: [
      { value: "1000+", label: "Daily API requests" },
      { value: "30%", label: "Faster frontend" },
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
  },
];

export const education = {
  degree: "B.Tech — Computer Science & IT",
  institute: "MJP Rohilkhand University, Bareilly",
  period: "2020 — 2024",
  score: "7.50 DGPA",
  coursework: ["DSA", "DBMS", "Operating Systems", "Networks", "OOP"],
};

/**
 * Only things a recruiter cannot infer from the project list belong here.
 * Government research funding and a peer-reviewed conference paper are rare for
 * a developer, so they get real weight. The DSA count lives in the Skills stats
 * instead of being repeated, and reads as a fresher metric next to 1.5 years of
 * shipped production work.
 */
export const recognition = [
  {
    metric: "₹20,000",
    title: "Research funding",
    detail:
      "Awarded by CST, UP Government for the Nomophobia Prediction project.",
  },
  {
    metric: "ICISC 2023",
    title: "Conference paper",
    detail:
      "Presented “Unraveling Nomophobia: Exploratory Data Analysis using Python” at Jaipur.",
  },
];

/**
 * Empty on purpose. An unverifiable certificate is worth close to nothing, so
 * only add one you can link to:
 *   { name: "Full Stack Web Development — Cuvette Tech", url: "https://…" }
 * The card hides this block entirely while the list is empty.
 */
export const certificates = [];
