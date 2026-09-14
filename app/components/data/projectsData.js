/**
 * `image: null` makes ProjectCard render its generated poster instead — no
 * network request, no 404. Point `image` at a real file once you have one;
 * never at a path that doesn't exist yet, or Next's image optimiser will log
 * "isn't a valid image" on every render.
 */

export const webProjects = [
  {
    title: "TooleraAI",
    subtitle: "Free online tools for everyday work",
    image: "/projects/toolera.jpeg",
    featured: true,
    description: "Founded and built a growing toolkit for PDF editing, image conversion, SEO, calculators and developer utilities. Most tools process files directly in the browser, with no sign-up required.",
    skills: ["Next", "React", "TypeScript", "Node", "MongoDB"],
    extraSkills: ["Technical SEO", "REST APIs", "Docker"],
    liveLinks: [{ label: "Explore TooleraAI", url: "https://tooleraai.com" }],
    github: null,
  },
  {
    title: "YogiAI.live",
    subtitle: "AI-Powered Vedic Astrology SaaS",
    image: "/projects/yogi.jpeg",
    featured: true,
    description:
      "Custom Vedic engine, LLM chat, WebRTC voice and Razorpay subscriptions. No third-party astrology APIs.",
    skills: ["Next", "TypeScript", "React", "Node", "Firebase"],
    extraSkills: ["Razorpay", "LLM APIs", "WebRTC", "Docker"],
    liveLinks: [{ label: "Live", url: "https://yogiai.live" }],
    github: null,
  },
  {
    title: "StudyMates.live",
    subtitle: "Real-Time Virtual Study Platform",
    image: "/projects/study.jpeg",
    featured: true,
    description:
      "Live video rooms, chat, focus timers and session tracking on Socket.IO and Agora RTC.",
    skills: ["React", "Node", "Express", "MongoDB"],
    extraSkills: ["Socket.IO", "Agora RTC", "Docker", "Nginx"],
    liveLinks: [{ label: "Live", url: "https://studymates.live" }],
    github: null,
  },
  {
    title: "Hubly CRM",
    subtitle: "Full Stack + Real-Time System",
    image: "/projects/hubly.jpg",
    description:
      "Real-time chat, ticket automation and an analytics dashboard for support teams.",
    skills: ["React", "Node", "Express", "MongoDB"],
    liveLinks: [{ label: "Live", url: "https://hubly-crm-two.vercel.app/" }],
    github: "https://github.com/Saurabh8423/Hubly-CRM",
  },
  {
    title: "Restaurant Management System",
    subtitle: "Digital Menu & Order Tracking",
    image: "/projects/rms.jpeg",
    description:
      "Digital menu, table auto-assignment and live order tracking.",
    skills: ["React", "Node", "Express", "MongoDB"],
    liveLinks: [
      {
        label: "Admin",
        url: "https://restaurant-management-system-yny5.vercel.app/analytics",
      },
      {
        label: "User",
        url: "https://restaurant-management-system-puce.vercel.app/",
      },
    ],
    github: "https://github.com/Saurabh8423/Restaurant-Management-System",
  },
  {
    title: "Learning Management System",
    subtitle: "Courses, Auth & Payments",
    image: "/projects/lms.jpeg",
    description:
      "Student and admin dashboards, course management and payments.",
    skills: ["React", "Node", "Express", "MongoDB"],
    liveLinks: [{ label: "Live", url: "https://lms-frontend-s4x9.vercel.app/" }],
    github: "https://github.com/Saurabh8423/lms-frontend",
  },
  {
    title: "Weather Forecast App",
    subtitle: "Real-Time Weather Data",
    image: "/projects/Weather.jpeg",
    description:
      "Real-time forecasts, city search and an animated responsive UI.",
    skills: ["Next", "React", "TypeScript", "Tailwind"],
    liveLinks: [
      { label: "Live", url: "https://weather-app-jade-eight-56.vercel.app/" },
    ],
    github: "https://github.com/Saurabh8423/Weather-App",
  },
  {
    title: "Galaxy Travels",
    subtitle: "Travel Discovery Platform",
    image: "/projects/glx.jpeg",
    description:
      "Interactive destination cards with smooth animations.",
    skills: ["React", "JavaScript", "CSS"],
    liveLinks: [{ label: "Live", url: "https://galaxy-travels.vercel.app/" }],
    github: "https://github.com/Saurabh8423/Galaxy-Travels",
  },
  {
    title: "Workouts",
    subtitle: "Full Stack Fitness Tracker",
    image: "/projects/workouts.png",
    description:
      "Full CRUD workouts tracker on a secure REST backend.",
    skills: ["React", "Node", "Express", "MongoDB"],
    liveLinks: [
      { label: "Live", url: "https://workouts-website-frontends.vercel.app/" },
    ],
    github: "https://github.com/Saurabh8423/Workouts-Website",
  },
  {
    title: "Notes App",
    subtitle: "Group-Based Notes",
    image: "/projects/notes.jpeg",
    description:
      "Group-based notes with colour tagging and real-time updates.",
    skills: ["React", "JavaScript", "CSS"],
    liveLinks: [{ label: "Live", url: "https://notes-app-woad-eight.vercel.app/" }],
    github: "https://github.com/Saurabh8423/Notes-App",
  },
  {
    title: "Portfolio",
    subtitle: "Animated Personal Site",
    image: "/projects/portfolio.jpeg",
    description:
      "GSAP-animated personal site with smooth section navigation.",
    skills: ["React", "JavaScript", "CSS"],
    liveLinks: [{ label: "Live", url: "https://saurabhportfolio45.netlify.app/" }],
    github: "https://github.com/Saurabh8423/Saurabh-Portfolio",
  },
  {
    title: "Rock Paper Scissors",
    subtitle: "Browser Game",
    image: "/projects/game.jpeg",
    description:
      "Score tracking and game logic in vanilla JavaScript.",
    skills: ["JavaScript", "HTML", "CSS"],
    liveLinks: [
      {
        label: "Live",
        url: "https://rock-paper-scissors-game-tawny-pi.vercel.app/",
      },
    ],
    github: "https://github.com/Saurabh8423/ROCK-PAPER-SCISSORS-GAME",
  },
];

export const mlProjects = [
  {
    title: "AQI Predictor",
    subtitle: "Air Quality Prediction",
    image: "/projects/aqi.jpeg",
    description:
      "Random Forest, SVM and KNN models served via FastAPI.",
    skills: ["Machine", "Python", "React", "FastAPI", "JavaScript"],
    liveLinks: [{ label: "Live", url: "https://aqi-predictor-five.vercel.app/" }],
    github: "https://github.com/Saurabh8423/AQI-PREDICTOR",
  },
  {
    title: "Smartphone Addiction Care",
    subtitle: "Digital Wellbeing System",
    image: "/projects/phone.jpeg",
    description:
      "ML usage-pattern analysis on real-time wellbeing dashboards.",
    skills: ["Machine", "Python", "React", "FastAPI"],
    liveLinks: [
      { label: "Live", url: "https://smartphone-addiction-care.vercel.app/" },
    ],
    github: "https://github.com/Saurabh8423/Smartphone-Addiction-Care",
  },
  {
    title: "Ra & Porosity Analysis",
    subtitle: "Surface Roughness Prediction",
    image: "/projects/ra.jpeg",
    description:
      "SVR roughness prediction with image-based porosity analysis.",
    skills: ["Machine", "Python", "React", "FastAPI", "CSS"],
    liveLinks: [{ label: "Live", url: "https://ra-pradiction.vercel.app/" }],
    github: "https://github.com/Saurabh8423/Ra-Pradiction",
  },
];

/**
 * The UI / Card Design category was removed from both Services and Work.
 * The source images are still in public/design/ if it is ever brought back.
 */
