import Nav from "../components/navigation/Nav";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Contact from "../components/Contact";
import About from "../components/About";
import Footer from "../components/Footer";
import ScrollToTop from "../components/utility/ScrollToTop";
import { Element } from "react-scroll";

const Home = () => {
  return (
    <div className="bg-gradient-to-tl from-slate-500 lg:from-slate-600 to-slate-800 lg:to-slate-950">
      <header>
        <Nav />
      </header>
      <main>
        <Element name="hero">
          <Hero />
        </Element>
        <Element name="featured">
          <Featured />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <ScrollToTop />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
