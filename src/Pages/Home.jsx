// Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection'; // adjust the path if needed
import AboutMeTitle from '../components/AboutMeTitle';
import AboutSection from './AboutSection';
import WorksTitle from '../components/WorksTitle';
import Work from './Work';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutMeTitle/>
      <AboutSection/>
      <WorksTitle/>
      <Work/>
    </div>
  );
}
