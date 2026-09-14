import {
  SiAgora,
  SiBrevo,
  SiCapacitor,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPm2,
  SiPosthog,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiRazorpay,
  SiReact,
  SiResend,
  SiScikitlearn,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiWebrtc,
} from "react-icons/si";
import {
  TbApi,
  TbBrain,
  TbClockHour4,
  TbInfinity,
  TbMessageChatbot,
  TbRobot,
  TbServer2,
  TbShieldLock,
  TbSparkles,
  TbTextScan2,
} from "react-icons/tb";

/**
 * Single source of truth for every technology's icon and brand colour, so the
 * core-stack ribbon and the category cards can never disagree.
 *
 * `color` is the official brand colour, rendered on a white disc — which is
 * what keeps officially-black marks (Next.js, Express, Flask, Socket.IO,
 * GitHub) legible on the navy canvas. Omit `color` for concepts and monochrome
 * marks; those fall back to near-black on the same white disc.
 *
 * `short` is the label used in the ribbon, where space is tight.
 */
const TECH = {
  // Languages & Frontend
  JavaScript: { Icon: SiJavascript, color: "#f7df1e" },
  TypeScript: { Icon: SiTypescript, color: "#3178c6" },
  Python: { Icon: SiPython, color: "#3776ab" },
  "C / C++": { Icon: SiCplusplus, color: "#00599c" },
  "React.js": { Icon: SiReact, color: "#087ea4", short: "React" },
  "Next.js": { Icon: SiNextdotjs },
  HTML5: { Icon: SiHtml5, color: "#e34f26" },
  CSS3: { Icon: SiCss3, color: "#1572b6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#0ea5e9", short: "Tailwind" },
  "Material UI": { Icon: SiMui, color: "#007fff" },
  "ShadCN UI": { Icon: SiShadcnui },
  "Framer Motion": { Icon: SiFramer, color: "#0055ff" },
  Capacitor: { Icon: SiCapacitor, color: "#119eff" },

  // Backend, Database & Services
  "Node.js": { Icon: SiNodedotjs, color: "#5fa04e" },
  "Express.js": { Icon: SiExpress, short: "Express" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  Flask: { Icon: SiFlask },
  MongoDB: { Icon: SiMongodb, color: "#47a248" },
  MySQL: { Icon: SiMysql, color: "#4479a1" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169e1" },
  "Firebase Firestore": {
    Icon: SiFirebase,
    color: "#dd2c00",
    short: "Firebase",
  },
  "Firebase Auth": { Icon: SiFirebase, color: "#ffa000" },
  "REST APIs": { Icon: TbApi },
  "JWT Auth": { Icon: SiJsonwebtokens, color: "#d63aff" },
  "Socket.IO": { Icon: SiSocketdotio },
  "Agora RTC": { Icon: SiAgora, color: "#099dfd" },
  WebRTC: { Icon: SiWebrtc, color: "#333333" },
  Razorpay: { Icon: SiRazorpay, color: "#0c2451" },
  Brevo: { Icon: SiBrevo, color: "#0b996e" },
  Resend: { Icon: SiResend },

  // AI / ML
  "OpenAI APIs": { Icon: SiOpenai, color: "#412991", short: "OpenAI" },
  "LLM Integration": { Icon: TbBrain },
  "Prompt Engineering": { Icon: TbMessageChatbot },
  "AI Automation": { Icon: TbRobot },
  "Vedic AI Systems": { Icon: TbSparkles },
  OCR: { Icon: TbTextScan2 },
  "Scikit-learn": { Icon: SiScikitlearn, color: "#f7931e" },

  // Cloud, DevOps & Tools
  Docker: { Icon: SiDocker, color: "#2496ed" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088ff" },
  "CI/CD": { Icon: TbInfinity },
  Linux: { Icon: SiLinux, color: "#e9a100" },
  "VPS Deployment": { Icon: TbServer2 },
  Nginx: { Icon: SiNginx, color: "#009639" },
  PM2: { Icon: SiPm2, color: "#2b037a" },
  SSL: { Icon: TbShieldLock },
  "Cron Jobs": { Icon: TbClockHour4 },
  Git: { Icon: SiGit, color: "#f05032" },
  GitHub: { Icon: SiGithub },
  Postman: { Icon: SiPostman, color: "#ff6c37" },
  Figma: { Icon: SiFigma, color: "#f24e1e" },
  PostHog: { Icon: SiPosthog, color: "#f54e00" },
};

/** Throws at import time if a list references a name missing from TECH. */
function resolve(name, { useShort = false } = {}) {
  const tech = TECH[name];
  if (!tech) throw new Error(`skillsData: no TECH entry for "${name}"`);
  return {
    name: useShort ? tech.short ?? name : name,
    Icon: tech.Icon,
    color: tech.color,
  };
}

/** The headline stack, shown as a single scrolling ribbon. */
export const coreStack = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Firebase Firestore",
  "Python",
  "FastAPI",
  "OpenAI APIs",
  "Tailwind CSS",
  "Docker",
].map((name) => resolve(name, { useShort: true }));

/** The full list by domain. Each technology appears exactly once. */
export const skillGroups = [
  {
    index: "01",
    title: "Languages & Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C / C++",
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Material UI",
      "ShadCN UI",
      "Framer Motion",
      "Capacitor",
    ].map((name) => resolve(name)),
  },
  {
    index: "02",
    title: "Backend, Database & Services",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Firebase Firestore",
      "Firebase Auth",
      "REST APIs",
      "JWT Auth",
      "Socket.IO",
      "Agora RTC",
      "WebRTC",
      "Razorpay",
      "Brevo",
      "Resend",
    ].map((name) => resolve(name)),
  },
  {
    index: "03",
    title: "AI / ML",
    items: [
      "OpenAI APIs",
      "LLM Integration",
      "Prompt Engineering",
      "AI Automation",
      "Vedic AI Systems",
      "OCR",
      "Scikit-learn",
    ].map((name) => resolve(name)),
  },
  {
    index: "04",
    title: "Cloud, DevOps & Tools",
    items: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "VPS Deployment",
      "Nginx",
      "PM2",
      "SSL",
      "Cron Jobs",
      "Git",
      "GitHub",
      "Postman",
      "Figma",
      "PostHog",
    ].map((name) => resolve(name)),
  },
];

/** Derived so the headline figure can never drift from the lists. */
export const techCount = skillGroups.reduce(
  (total, group) => total + group.items.length,
  0
);
