import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import AboutMeTitle from "../components/AboutMeTitle";
import AboutSection from "./AboutSection";
import WorksTitle from "../components/WorksTitle";
import Work from "./Work";
import ServicesTitle from "../components/ServicesTitle";
import Services from "./Services";
import Connect from "./Connect";
import FooterX from "../components/FooterX";
import Footer from "../components/Footer";
import { downloadResume } from "../API/downloadapi";

export default function Home() {
  useEffect(() => {
    // ✅ small timeout ensures DOM is ready
    const timer = setTimeout(() => {
      downloadResume();
    }, 500); // half a second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutMeTitle />
        <AboutSection />
      </section>

      <section id="works">
        <WorksTitle />
        <Work />
      </section>

      <section id="services">
        <ServicesTitle />
        <Services />
      </section>

      <section id="connect">
        <Connect />
      </section>

      <section id="footerx">
        <FooterX />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
