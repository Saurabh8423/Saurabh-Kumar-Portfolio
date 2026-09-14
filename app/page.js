import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Services from "./components/Services";
import MyWork from "./components/MyWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Header />
        <About />
        <Skills />
        <Experience />
        <Services />
        <MyWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
