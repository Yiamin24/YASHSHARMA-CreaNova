import React, { useEffect, useRef } from "react";

// HELPER COMPONENT: Uses the Intersection Observer API to trigger animations.
const AnimatedSection = ({ children, className }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("is-hidden");
          } else {
            entry.target.classList.remove("is-visible");
            entry.target.classList.add("is-hidden");
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`animated-section ${className || ""}`}>
      {/* Shutter overlay for cinematic top-to-bottom reveal */}
      <div className="shutter-overlay"></div>
      {children}
    </div>
  );
};

const AboutSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        :root {
          --bg-color: #111111;
          --text-color: #f5f5f5;
          --font-mono: 'Space Mono', monospace;
          --font-display: 'Anton', sans-serif;
        }

        /* ===== CONTAINER ===== */
        .about-page-container {
          background-color: var(--bg-color);
          color: var(--text-color);
          font-family: var(--font-mono);
          width: 100%;
          overflow-x: hidden;
        }

        /* ===== SHUTTER ANIMATION ===== */
        .shutter-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9); /* Slight transparency for cinematic feel */
          transform: translateY(-100%);
          transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 5;
        }

        /* Open shutter (top → bottom) */
        .animated-section.is-visible .shutter-overlay {
          transform: translateY(100%);
        }

        /* Close shutter (bottom → top) */
        .animated-section.is-hidden .shutter-overlay {
          transform: translateY(-100%);
        }

        /* ===== CONTENT REVEAL (FADE + BLUR) ===== */
        .animated-section .reveal-item {
          opacity: 0;
          transform: translateY(-30px);
          filter: blur(10px);
          transition: opacity 1s ease 0.4s, transform 1s ease 0.4s, filter 1s ease 0.4s;
        }

        .animated-section.is-visible .reveal-item {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .animated-section.is-hidden .reveal-item {
          opacity: 0;
          transform: translateY(-30px);
          filter: blur(10px);
        }

        /* ===== SECTION BASE ===== */
        .about-section {
          width: 100%;
          min-height: 100vh;
          padding: 5rem 2rem;
          display: grid;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* ===== INTRO SECTION ===== */
        .about-section-intro {
          place-items: center;
        }

        .about-header {
          position: absolute;
          top: 2rem;
          left: 2rem;
          font-size: 0.875rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .intro-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .intro-image {
          width: 100%;
          max-width: 300px;
          aspect-ratio: 1 / 1;
          margin-bottom: 1.5rem;
        }

        .intro-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .intro-greeting h2 {
          text-transform: uppercase;
          font-size: 1rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .intro-experience h3 {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 400;
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .intro-experience p {
          max-width: 550px;
          margin: 0 auto;
          font-size: 1rem;
          line-height: 1.8;
          text-transform: uppercase;
        }

        /* ===== PHILOSOPHY SECTION ===== */
        .about-section-philosophy {
          grid-template-columns: repeat(12, 1fr);
          gap: 0 2rem;
          align-content: center;
        }

        .philosophy-headline {
          grid-column: 2 / span 6;
          grid-row: 1 / span 3;
          align-self: start;
          margin-top: -2rem;
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 7vw, 6rem);
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: clamp(2px, 0.5vw, 6px);
        }

        .philosophy-text-block-1 {
          grid-column: 8 / span 4;
          grid-row: 1;
          align-self: end;
          margin-bottom: 2rem;
        }

        .philosophy-text-block-2 {
          grid-column: 8 / span 4;
          grid-row: 2;
          align-self: start;
        }

        .philosophy-text-block-2 h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .philosophy-text-block-1 p,
        .philosophy-text-block-2 p {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          line-height: 1.8;
          text-transform: uppercase;
          max-width: 450px;
        }

        /* ===== LIFESTYLE SECTION ===== */
        .about-section-lifestyle {
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
          align-content: center;
        }

        .lifestyle-left-col {
          grid-column: 2 / span 5;
          align-self: center;
        }

        .lifestyle-image-stack {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
          max-width: 450px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }

        .lifestyle-image-1 {
          grid-column: 1 / span 4;
          grid-row: 1 / span 4;
        }

        .lifestyle-image-2 {
          grid-column: 3 / span 3;
          grid-row: 2 / span 4;
          z-index: 2;
        }

        .lifestyle-image-1 img,
        .lifestyle-image-2 img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lifestyle-contact {
          text-align: center;
          margin-top: 3rem;
        }

        .lifestyle-contact a {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          text-transform: uppercase;
          color: var(--text-color);
          text-decoration: none;
          letter-spacing: 2px;
        }

        .lifestyle-text-col {
          grid-column: 8 / span 4;
          align-self: center;
          display: flex;
          flex-direction: column;
          gap: 5rem;
        }

        .lifestyle-text-col h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .lifestyle-text-col p {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          line-height: 1.8;
          text-transform: uppercase;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .about-section {
            padding: 6rem 1rem;
            min-height: auto;
          }
          .about-section-philosophy,
          .about-section-lifestyle {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .philosophy-headline,
          .philosophy-text-block-1,
          .philosophy-text-block-2,
          .lifestyle-left-col,
          .lifestyle-text-col {
            grid-column: 1 / -1;
            grid-row: auto;
            margin-top: 0;
            margin-bottom: 0;
            align-self: center;
          }
          .philosophy-headline {
            text-align: center;
          }
          .philosophy-text-block-1,
          .philosophy-text-block-2,
          .lifestyle-text-col {
            text-align: left;
          }
        }
      `}</style>

      <div className="about-page-container">
        {/* Section 1: Intro */}
        <AnimatedSection className="about-section about-section-intro">
          <header className="about-header reveal-item">ABOUT ME</header>
          <div className="intro-content-wrapper">
            <div className="intro-image reveal-item">
              <img src="/assets/Hero.webp" alt="Portrait of Yash Sharma" />
            </div>
            <div className="intro-greeting reveal-item">
              <h2>HELLO!</h2>
              <h2>I'M YASH SHARMA</h2>
            </div>
            <div className="intro-experience">
              <h3 className="reveal-item">MY EXPERIENCE ↘</h3>
              <p className="reveal-item">
                A SENIOR WEB DEVELOPER WITH OVER 5 YEARS OF EXPERIENCE IN CREATING DIGITAL PRODUCTS FOR INTERNATIONAL COMPANIES.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2: Philosophy */}
        <AnimatedSection className="about-section about-section-philosophy">
          <h1 className="philosophy-headline reveal-item">
            IT'S NOT JUST A<br />
            PROFESSION - IT'S A WAY<br />
            OF THINKING.
          </h1>
          <div className="philosophy-text-block-1 reveal-item">
            <p>
              MY WORK IS PART OF MY LIFESTYLE. AS A UX/UI DESIGNER, I AM CONSTANTLY OBSERVING THE WORLD: I NOTICE HOW PEOPLE INTERACT WITH SPACE, TECHNOLOGY, OBJECTS.
            </p>
          </div>
          <div className="philosophy-text-block-2 reveal-item">
            <h3>MY PHILOSOPHY ↘</h3>
            <p>
              I VALUE CLARITY, MEANING, AND FUNCTIONALITY – BOTH IN DESIGN AND IN LIFE. I AM CLOSE TO THE IDEA OF CONSCIOUS MINIMALISM: LEAVING ONLY WHAT MAKES SENSE AND WORKS FOR RESULTS. I LOVE SIMPLE INTERFACES WITH DEEP MEANING – AS WELL AS SIMPLE THINGS THAT BRING TRUE PLEASURE.
            </p>
          </div>
        </AnimatedSection>

        {/* Section 3: Lifestyle */}
        <AnimatedSection className="about-section about-section-lifestyle">
          <div className="lifestyle-left-col">
            <div className="lifestyle-image-stack reveal-item">
              <div className="lifestyle-image-1">
                <img src="/assets/Hero.webp" alt="Lifestyle portrait" />
              </div>
              <div className="lifestyle-image-2">
                <img src="/assets/Hero.webp" alt="Lifestyle architecture" />
              </div>
            </div>
            <div className="lifestyle-contact reveal-item">
              <a href="#contact">LETS CONTACT ↗</a>
            </div>
          </div>
          <div className="lifestyle-text-col">
            <div className="reveal-item">
              <h3>MY LIFESTYLE ↘</h3>
              <p>
                I LOOK FOR AESTHETICS EVERYWHERE: IN THE FORMS OF NATURE, IN THE DETAILS OF ARCHITECTURE, IN THE COLORS OF CITY STREETS, AND EVEN IN THE SIMPLE THINGS OF EVERYDAY LIFE. IT’S NOT JUST A HOBBY – IT’S A WAY OF SEEING THE WORLD.
              </p>
            </div>
            <div className="reveal-item">
              <p>
                EVERY PROJECT FOR ME IS MORE THAN A TASK. IT’S A STORY THAT I HELP TELL THROUGH DESIGN. I BELIEVE THAT A GOOD INTERFACE IS NOT JUST ABOUT COLORS AND FONTS, BUT ABOUT THE FEELINGS IT EVOKES.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default AboutSection;
