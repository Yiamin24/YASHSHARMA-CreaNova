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
      { threshold: 0.2 }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`animated-section ${className || ""}`}>
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

        *, *::before, *::after { box-sizing: border-box; }

        .about-page-container {
          background-color: var(--bg-color); 
          color: var(--text-color);
          font-family: var(--font-mono); 
          width: 100%; 
          overflow-x: hidden;
        }

        .shutter-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.9); transform: translateY(-100%);
          transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1); z-index: 5;
        }
        .animated-section.is-visible .shutter-overlay { transform: translateY(100%); }
        .animated-section .reveal-item {
          opacity: 0; transform: translateY(-30px); filter: blur(10px);
          transition: opacity 1s ease 0.4s, transform 1s ease 0.4s, filter 1s ease 0.4s;
        }
        .animated-section.is-visible .reveal-item { opacity: 1; transform: translateY(0); filter: blur(0); }

        .about-section {
          width: 100%;
          min-height: 100vh;
          padding: 5rem 2rem;
          display: grid;
          position: relative;
          overflow: hidden;
          max-width: 1440px; 
          margin-inline: auto;
        }

        /* ===== INTRO SECTION ===== */
        .about-section-intro { place-items: center; }
        .about-header { position: absolute; top: 2rem; left: 2rem; font-size: 0.875rem; letter-spacing: 1px; text-transform: uppercase; }
        .intro-content-wrapper { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .intro-image { width: 100%; max-width: 300px; aspect-ratio: 1 / 1; margin-bottom: 1.5rem; }
        .intro-image img { width: 100%; height: 100%; object-fit: contain; }
        .intro-greeting h2 { text-transform: uppercase; font-size: 2rem; line-height: 1.6; font-weight: 400; }
        .intro-experience { width: 100%; max-width: 450px; }
        .intro-experience h3 { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 400; margin-top: 3.5rem; margin-bottom: 1.5rem; }
        .intro-experience p { margin: 0 auto; font-size: 1rem; line-height: 1.8; text-transform: uppercase; }

        /* ===== PHILOSOPHY SECTION ===== */
        .about-section-philosophy {
          align-content: center;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto auto;
          gap: 2rem 2rem;
        }
        .philosophy-headline {
          grid-column: 2 / span 8;
          grid-row: 1;
          align-self: end;
          font-family: var(--font-mono);
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 1.25; letter-spacing: 1px;
          text-transform: uppercase; font-weight: 400;
        }
        .philosophy-text-block-1 { grid-column: 7 / span 5; grid-row: 1; align-self: end; padding-bottom: 2rem; }
        .philosophy-text-block-2 { grid-column: 7 / span 5; grid-row: 2; align-self: start; }
        .philosophy-text-block-1 p, .philosophy-text-block-2 p { font-size: clamp(0.9rem, 1.2vw, 1rem); line-height: 1.8; text-transform: uppercase; max-width: 500px; }
        .philosophy-text-block-2 h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; font-weight: 400; }

        /* ===== LIFESTYLE SECTION ===== */
        .about-section-lifestyle {
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto auto auto;
          align-items: center;
          gap: 1rem 2rem;
          align-content: center;
        }
        .lifestyle-image-container {
          grid-column: 2 / span 5;
          grid-row: 1 / span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 1.5rem;
          align-items: start;
          justify-items: center;
        }
        .lifestyle-image-1 { grid-column: 1 / span 1; grid-row: 1; align-self: end; margin-top: -30px; }
        .lifestyle-image-2 { grid-column: 2 / span 1; grid-row: 2; align-self: start; margin-top: 30px; }
        .lifestyle-image-container img { width: 100%; max-width: 220px; height: auto; aspect-ratio: 3 / 4; object-fit: cover; }

        .lifestyle-text-col {
          grid-column: 8 / span 4;
          grid-row: 1 / span 2;
          display: flex; flex-direction: column; gap: 3.5rem;
          align-self: center;
        }
        .lifestyle-contact { grid-column: 2 / span 5; grid-row: 3; align-self: start; text-align: center; padding-top: 3rem; }
        .lifestyle-text-col h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; font-weight: 400; }
        .lifestyle-text-col p { font-size: clamp(0.9rem, 1.2vw, 1rem); line-height: 1.8; text-transform: uppercase; }
        .lifestyle-contact a { position: relative; display: inline-flex; align-items: center; gap: 0.5em; padding-bottom: 5px; font-size: clamp(0.9rem, 1.5vw, 1rem); text-transform: uppercase; color: var(--text-color); text-decoration: none; letter-spacing: 1.5px; }
        .lifestyle-contact a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background-color: var(--text-color); transform: scaleX(0); transform-origin: right; transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        .lifestyle-contact a:hover::after { transform: scaleX(1); transform-origin: left; }
        .link-arrow { display: inline-block; position: relative; width: 1.2em; height: 1.2em; }
        .arrow-default, .arrow-hover { position: absolute; top: 0; left: 0; display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%; transition: transform 0.4s ease, opacity 0.4s ease; }
        .arrow-hover { transform: translateY(100%); opacity: 0; }
        .lifestyle-contact a:hover .arrow-default { transform: translateY(-100%); opacity: 0; }
        .lifestyle-contact a:hover .arrow-hover { transform: translateY(0); opacity: 1; }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 900px) {
          .about-section { min-height: auto; padding: 6rem 1rem; }
          .about-section-philosophy, .about-section-lifestyle {
              grid-template-columns: 1fr; gap: 4rem;
          }
          .philosophy-headline, .philosophy-text-block-1, .philosophy-text-block-2,
          .lifestyle-image-container, .lifestyle-text-col, .lifestyle-contact { 
            grid-column: 1 / -1; grid-row: auto; text-align: center;
          }
          .lifestyle-contact { text-align: center; padding-top: 0; } 
          .intro-experience { text-align: center; }

          /* ===== MOBILE LIFESTYLE STACK FIX ===== */
          .about-section-lifestyle {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          .lifestyle-image-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            width: 100%;
          }
          .lifestyle-image-1, .lifestyle-image-2 {
            width: 60%;
            max-width: 220px;
            margin: 0 auto;
          }
          .lifestyle-text-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2rem;
            width: 100%;
          }
          .lifestyle-contact {
            text-align: center;
            //margin-top: 1rem;
            margin-top: 2rem;      /* Add some spacing above */
            width: 100%;           /* Full width for perfect centering */
            display: flex;
            justify-content: center;
          }
        }
      `}</style>

      <div className="about-page-container">
        <AnimatedSection className="about-section about-section-intro">
          <header className="about-header reveal-item">ABOUT ME</header>
          <div className="intro-content-wrapper">
            <div className="intro-image reveal-item">
              <img src="/assets/ALBADI/YYYY.webp" alt="Portrait of Yash Sharma" />
            </div>
            <div className="intro-greeting reveal-item">
              <h2>HELLO!</h2>
              <h2>I'M YASH SHARMA</h2>
            </div>
            <div className="intro-experience">
              <h3 className="reveal-item">MY EXPERIENCE ↘</h3>
              <p className="reveal-item">
                A web developer creating high-fidelity, immersive digital experiences that bring visionary concepts to life
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="about-section about-section-philosophy">
          <h1 className="philosophy-headline reveal-item">
            IT'S NOT JUST A CODE<br />
            IT'S A WAY<br/>
            OF THINKING.
          </h1>
          <div className="philosophy-text-block-1 reveal-item">
            <p>
              My work reflects how I approach challenges. As a web developer,I constantly explore how users interact with digital products, striving to create seamless, intuitive, and meaningful experiences..
            </p>
          </div>
          <div className="philosophy-text-block-2 reveal-item">
            <h3>MY PHILOSOPHY ↘</h3>
            <p>
              I champion clarity, elegance, and functionality in every project. Guided by thoughtful simplicity, I focus on building solutions that truly matter and deliver real impact. I craft digital experiences that are deceptively simple yet profoundly effective, blending technical precision with a user-centered mindset.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="about-section about-section-lifestyle">
          {/* Mobile stacking ensures image1 → para1 → image2 → para2 → connect */}
          <div className="lifestyle-image-container reveal-item">
            <img src="/assets/ALBADI/SH.webp" alt="Lifestyle portrait" className="lifestyle-image-1" />
            <img src="/assets/ALBADI/HHH.webp" alt="Lifestyle architecture" className="lifestyle-image-2" />
          </div>
          <div className="lifestyle-text-col">
            <div className="reveal-item">
              <h3>MY LIFESTYLE ↘</h3>
              <p>
                I SEE ELEGANCE AND PURPOSE EVERYWHERE: IN CLEAN, STRUCTURED CODE, IN SMOOTH AND INTUITIVE USER INTERACTIONS, IN THOUGHTFUL LAYOUTS, AND IN THE SMALL DETAILS THAT MAKE DIGITAL EXPERIENCES MEMORABLE. IT’S NOT JUST A WAY OF WORKING – IT’S A WAY OF THINKING. I CONSTANTLY OBSERVE HOW USERS ENGAGE WITH WEBSITES AND APPS, DRAWING INSPIRATION FROM EVERYTHING AROUND ME, FROM THE STRUCTURE OF NATURE TO THE COLORS AND PATTERNS OF DAILY LIFE.
              </p>
            </div>
            <div className="reveal-item">
              <p>
                EVERY PROJECT IS MORE THAN JUST BUILDING FEATURES OR FUNCTIONALITY. IT’S A STORY I HELP BRING TO LIFE THROUGH CODE, CREATING EXPERIENCES THAT ARE SEAMLESS, ENGAGING, AND INTUITIVE. I BELIEVE A GOOD DIGITAL PRODUCT IS NOT ONLY FUNCTIONAL BUT ALSO EVOKES EMOTION, DELIGHT, AND LASTING IMPACT FOR ITS USERS.
              </p>
            </div>
          </div>
          <div className="lifestyle-contact reveal-item">
            <a href="#connect">
              <span>LETS CONNECT</span>
              <span className="link-arrow">
                <span className="arrow-default">↗</span>
                <span className="arrow-hover">→</span>
              </span>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default AboutSection;
