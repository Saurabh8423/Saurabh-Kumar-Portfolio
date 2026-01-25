import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import WhatsappFloating from "@/app/components/WhatsappFloating";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});


export const metadata = {
  title: "Portfolio- Saurabh Kumar",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} 
        antialiased leading-8 overflow-x-hidden`}
      >
        {children}
        <WhatsappFloating />
      </body>
    </html>
  );
}
