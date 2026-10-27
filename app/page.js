import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Services from "./components/Services";
import MyWork from "./components/MyWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackgroundStars from "./components/BackgroundStars";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  return (
    <>
      <BackgroundStars />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Header />
        <About />
        <Skills />
        <Experience />
        <MyWork />
        <Services />
        <aside className="resume-banner mx-auto max-w-6xl">
          <div>
            <span className="eyebrow">Experience at a glance</span>
            <h2 className="heading mt-4">From the first commit to production.</h2>
            <p className="lede mt-3 max-w-2xl">Full-stack web development, AI automation, chatbot development and SaaS products. Explore my experience, education and technical skills in one place.</p>
          </div>
          <a href="/Saurabh-Kumar.pdf" download className="btn btn-primary shrink-0">Download my resume <span aria-hidden="true">↗</span></a>
        </aside>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
