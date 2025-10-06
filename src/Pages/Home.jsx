// Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection'; // adjust the path if needed
import AboutMeTitle from '../components/AboutMeTitle';
import AboutSection from './AboutSection';
import WorksTitle from '../components/WorksTitle';
import Work from './Work';
import ServicesTitle from '../components/ServicesTitle';
import Services from './Services';
//import Connect from './Connect';
//import FooterX from '../components/FooterX';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutMeTitle/>
      <AboutSection/>
      <WorksTitle/>
      <Work/>
      <ServicesTitle/>
      <Services/>
      
      
    </div>
  );
}


     
      