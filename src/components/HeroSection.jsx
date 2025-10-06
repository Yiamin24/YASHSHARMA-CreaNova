import React, { useEffect, useState } from "react";

const HeroSection = ({ servicesPosition = {} }) => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = "visitorCount";
      let currentCount = localStorage.getItem(key);
      currentCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
      localStorage.setItem(key, currentCount);
      setVisitorCount(currentCount);
    }
  }, []);

  const titleText = "CREATIVE DESIGNER";
  const letters = titleText
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));

  // Default values if no props are passed
  const { top = "50%", left = "100%", transform = "translate(-50%, -50%)" } = servicesPosition;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin:0; padding:0; }
        html, body { overflow-x: hidden; width: 100vw; }

        :root {
          --bg: #f5f5f5;
          --text: #000;
          --display: 'Anton', sans-serif;
          --mono: 'Space Mono', monospace;
        }

        body { background: var(--bg); color: var(--text); }

        .hero-wrap {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center; 
          justify-content: center;
          padding: 2rem rem;
        }

        .hero-container {
          width: 100%;
          max-width: 1400px;
          position: relative; 
          display: fill;
          align-items: center;
          justify-content: center;
          min-height: 500px;
        }

        @keyframes slide-from-top-to-bottom {
          0% { transform: translateY(-120%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes image-fade-slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up-slight {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-family: var(--display);
          font-size: clamp(3rem, 13vw, 13rem);
          font-weight: 400;
          text-transform: uppercase;
          line-height: 0.9;
          color: var(--text);
          text-align: center;
          z-index: 10; 
        }

        .letter-wrap { display: inline-block; overflow: hidden; }
        .letter {
          display: inline-block;
          transform: translateY(-120%);
          opacity: 0;
          animation-name: slide-from-top-to-bottom;
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
          animation-fill-mode: forwards;
        }

        .visitor-count {
          position: absolute;
          top: -5%;
          left: 2%;
          font-family: var(--mono);
          font-size: clamp(12px, 2vw, 18px);
          letter-spacing: 1px;
          z-index: 30;
          animation: fade-up-slight 1s ease-out 1s forwards;
          opacity: 0;
        }

        .portrait-wrap {
          position: absolute;
          top: 31%;
          left: 45%;
          transform: translate(-50%, -50%);
          width: clamp(180px, 18vw, 280px);
          aspect-ratio: 4 / 5;
          animation: image-fade-slide-up 1s ease-out 0.5s forwards;
          opacity: 0;
          flex-shrink: 0;
          z-index: 20;
        }

        .portrait-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* --- Services List (Now controllable) --- */
        .services-list {
          position: absolute;
          bottom: 30%;
          left: -13%;
          transform: translate(0, -50%);
          font-family: var(--mono);
          font-weight: 700;
          text-transform: uppercase;
          font-size: clamp(12px, 1.1vw, 15px);
          animation: fade-up-slight 1s ease-out 1s forwards;
          opacity: 0;
          z-index: 30;
        }

        .based-in {
          position: absolute;
          top: 30%;
          right: 1%;
          transform: translate(50%, -50%);
          text-align: right;
          font-family: var(--mono);
          font-weight: 700;
          text-transform: uppercase;
          font-size: clamp(12px, 10vw, 16px);
          letter-spacing: 20px;
          animation: fade-up-slight 1s ease-out 1s forwards;
          opacity: 0;
          z-index: 30;
        }

        .description {
          position: absolute;
          bottom: -10%;
          left: 3%;
          transform: translateX(-50%);
          font-family: var(--mono);
          font-size: clamp(12px, 1vw, 14px);
          line-height: 1.5;
          text-align: center;
          z-index: 30;
          width: 100%;
          opacity: 0;
          animation: fade-up-slight 1s ease-out 1s forwards;
        }

        @media (max-width: 900px) {
          .hero-wrap { align-items: flex-start; padding-top: 4rem; }
          .hero-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: static;
            min-height: auto;
          }
          .hero-title { font-size: clamp(2.5rem, 18vw, 6rem); position: static; order: 2; margin: 2rem 0; }
          .services-list, .based-in, .portrait-wrap, .visitor-count, .description {
            position: static; transform: none; top: auto; left: auto; right: auto; bottom: auto; text-align: center;
          }
        }
      `}</style>

      <div className="hero-wrap">
        <div className="hero-container">
          <div className="visitor-count">
            {String(visitorCount).padStart(4, "0")}
          </div>

          <h1 className="hero-title" aria-label={titleText}>
            {letters.map((letter, index) => (
              <span className="letter-wrap" key={index} aria-hidden="true">
                <span
                  className="letter"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {letter}
                </span>
              </span>
            ))}
          </h1>

          <div className="services-list">
            /ART DIRECTION
            <br />
            /WEB DESIGN (UX/UI)
            <br />
            /WEB DEVELOPMENT
          </div>

          <div className="portrait-wrap">
            <img src="/assets/OG.jpg" alt="Portrait of Yash Sharma" />
          </div>

          <div className="based-in">BASED IN INDIA</div>

          <div className="description">
            I'M EXPERIENCED WEB AND UX/UI DESIGNER,
            <br />
            WHO DESIGN MEMORABLE WEB EXPERIENCES FOR
            <br />
            BRANDS OF ALL SIZES
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
