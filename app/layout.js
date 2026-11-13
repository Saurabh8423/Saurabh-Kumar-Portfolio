import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import WhatsappFloating from "@/app/components/WhatsappFloating";
import { MotionProvider, ScrollProgress } from "@/app/components/ui/Motion";
import { THEME_COLORS, themeInitScript } from "@/app/components/ui/ThemeToggle";

// Apple devices render SF Pro via the system stack in globals.css; Inter is the cross-platform fallback.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const siteUrl = "https://saurabhportfolio45.netlify.app";
const title = "Saurabh Kumar — Full Stack Web Developer | AI Automation, Chatbots & SaaS";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Saurabh Kumar" },
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
    title,
    description:
      "Full Stack Web Developer | AI Automation, Chatbots & SaaS building scalable web and AI products with Next.js, MERN, TypeScript and LLM APIs.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Full Stack Web Developer | AI Automation, Chatbots & SaaS building scalable web and AI products.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: THEME_COLORS.dark,
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    // The init script sets data-theme before hydration, so the attribute legitimately differs from the server.
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* Plain inline script so it runs before first paint and the page never flashes the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh font-sans">
        <MotionProvider>
          <ScrollProgress />
          {children}
          <WhatsappFloating />
        </MotionProvider>
      </body>
    </html>
  );
}
