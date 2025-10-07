// Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection'; 
import AboutMeTitle from '../components/AboutMeTitle';
import AboutSection from './AboutSection';
import WorksTitle from '../components/WorksTitle';
import Work from './Work';
import ServicesTitle from '../components/ServicesTitle';
import Services from './Services';
import Connect from './Connect';
import FooterX from '../components/FooterX';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      {/* === Hero Section === */}
      <section id="home">
        <HeroSection />
      </section>

      {/* === About Section === */}
      <section id="about">
        <AboutMeTitle />
        <AboutSection />
      </section>

      {/* === Works Section === */}
      <section id="works">
        <WorksTitle />
        <Work /> 
      </section>

      {/* === Services Section === */}
      <section id="services">
        <ServicesTitle />
        <Services />
      </section>

      {/* === Connect Section === */}
      <section id="connect">
        <Connect />
      </section>

      {/* === Footer Sections === */}
      <section id="footerx">
        <FooterX />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
