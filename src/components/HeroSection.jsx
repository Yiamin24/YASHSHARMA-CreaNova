import React, { useEffect, useState } from "react";

const HeroSection = () => {
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
  const letters = titleText.split("").map((letter) =>
    letter === " " ? "\u00A0" : letter
  );

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
          position: relative;
          overflow-x: hidden;
          padding: 0 1rem;
        }

        .hero-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .visitor-count {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--mono);
          font-size: clamp(12px, 1.2vw, 16px);
          letter-spacing: 1px;
          z-index: 80;
        }

        @keyframes slide-from-top-to-bottom {
          0% { transform: translateY(-120%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .hero-title {
          font-family: var(--display);
          font-size: clamp(40px, 6vw, 90px);
          font-weight: 400;
          text-transform: uppercase;
          line-height: 1.1;
          color: var(--text);
          display: flex;
          flex-wrap: wrap;
          max-width: 100%;
          margin-bottom: 1rem;
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

        .portrait-wrap {
          width: clamp(200px, 25vw, 350px);
          aspect-ratio: 4 / 5;
          margin-top: 1rem;
          animation: image-fade-slide-up 1s ease-out forwards;
          flex-shrink: 0;
        }

        .portrait-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 4px;
        }

        @keyframes image-fade-slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up-slight {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .text-block {
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .services-list,
        .based-in,
        .description {
          opacity: 0;
          animation: fade-up-slight 1s ease-out forwards;
          animation-delay: 1s;
          word-wrap: break-word;
        }

        .services-list { font-family: var(--mono); font-weight: 700; text-transform: uppercase; font-size: clamp(14px, 2vw, 18px); }
        .based-in { font-family: var(--mono); font-weight: 800; font-size: clamp(14px, 2.5vw, 16px); letter-spacing: 2px; }
        .description { font-family: var(--mono); font-size: clamp(12px, 1.5vw, 14px); line-height: 1.5; }

        @media (max-width: 768px) {
          .hero-container { flex-direction: column; align-items: center; text-align: center; }
          .hero-title { font-size: clamp(30px, 8vw, 60px); margin-bottom: 0.5rem; }
          .portrait-wrap { width: 60vw; margin-top: 1rem; }
          .text-block { align-items: center; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: clamp(25px, 10vw, 50px); }
          .portrait-wrap { width: 80vw; }
          .services-list, .based-in, .description { font-size: clamp(12px, 3vw, 14px); }
        }
      `}</style>

      <div className="hero-wrap">
        <div className="hero-container">
          <div className="text-block">
            <div className="visitor-count">
              {String(visitorCount).padStart(4, "0")}
            </div>

            {/* Animated Title */}
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
              /ART DIRECTION<br />
              /WEB DESIGN (UX/UI)<br />
              /WEB DEVELOPMENT
            </div>

            <div className="based-in">BASED IN INDIA</div>

            <div className="description">
              I'M EXPERIENCED WEB AND UX/UI DESIGNER,<br />
              WHO DESIGN MEMORABLE WEB EXPERIENCES FOR<br />
              BRANDS OF ALL SIZES
            </div>
          </div>

          {/* Portrait Image */}
          <div className="portrait-wrap">
            <img src="/assets/Hero.webp" alt="Portrait of designer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
