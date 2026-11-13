import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Services from "./components/Services";
import MyWork from "./components/MyWork";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <Navbar />
      {/* overflow-x-clip: elements waiting to fly in from the sides never widen the page on phones (clip keeps sticky working). */}
      <main id="main" className="overflow-x-clip">
        <Header />
        <About />
        <Skills />
        <Experience />
        <Services />
        <MyWork />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
