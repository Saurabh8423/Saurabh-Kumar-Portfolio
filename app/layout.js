import { Geist, Ovo } from "next/font/google";
import "./globals.css";
import "./portfolio-theme.css";
import WhatsappFloating from "@/app/components/WhatsappFloating";

const outfit = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
  display: "swap",
});

const siteUrl = "https://saurabhportfolio45.netlify.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saurabh Kumar — Full Stack Web Developer | AI Automation, Chatbots & SaaS",
    template: "%s | Saurabh Kumar",
  },
  description:
    "Full Stack Web Developer | AI Automation, Chatbots & SaaS specialising in MERN, Next.js, TypeScript and LLM-powered products. Founder & CEO of TooleraAI and creator of YogiAI.live and StudyMates.live.",
  keywords: [
    "Saurabh Kumar",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "AI Developer",
    "AI Automation Developer",
    "Chatbot Developer",
    "React Developer",
    "Portfolio",
  ],
  authors: [{ name: "Saurabh Kumar" }],
  creator: "Saurabh Kumar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Saurabh Kumar",
    title: "Saurabh Kumar — Full Stack Web Developer | AI Automation, Chatbots & SaaS",
    description:
      "Full Stack Web Developer | AI Automation, Chatbots & SaaS building scalable web and AI products with Next.js, MERN, TypeScript and LLM APIs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Kumar — Full Stack Web Developer | AI Automation, Chatbots & SaaS",
    description:
      "Full Stack Web Developer | AI Automation, Chatbots & SaaS building scalable web and AI products.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0e100f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${ovo.variable} font-sans antialiased overflow-x-hidden`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <WhatsappFloating />
      </body>
    </html>
  );
}
