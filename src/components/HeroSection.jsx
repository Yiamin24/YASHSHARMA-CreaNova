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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin:0; padding:0; }

        :root {
          --bg: #f5f5f5;
          --text: #000;
          --display: 'Anton', sans-serif;
          --mono: 'Space Mono', monospace;
        }

        body { background: var(--bg); color: var(--text); }

        .hero-wrap {
          width: 100%;
          max-width: 1920px;
          height: 100vh;
          margin: 0 auto;
          position: relative;
          overflow-x: hidden;
          background: var(--bg);
        }

        .hero-container { width: 100%; height: 100%; position: relative; }

        .visitor-count {
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          font-family: var(--mono);
          font-size: clamp(12px, 1.2vw, 16px);
          letter-spacing: 1px;
          z-index: 80;
        }

        .hero-title {
          position: absolute;
          top: 3rem;
          left: 2rem;
          font-family: var(--display);
          font-size: clamp(60px, 19vw, 170px);
          font-weight: 400;
          text-transform: uppercase;
          line-height: 1;
          color: var(--text);
          z-index: 10;
          white-space: nowrap;
        }

        .portrait-wrap {
          position: absolute;
          top: 40%;
          left: 60%;
          width: clamp(200px, 25vw, 400px);
          aspect-ratio: 4 / 5; /* fixed 4:5 ratio */
          transform: translateX(-50%);
          z-index: 40;
        }

        .portrait-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 4px;
        }

        .services-list {
          position: absolute;
          top: 93%;
          left: 28%;
          font-family: var(--mono);
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 2;
          z-index: 45;
        }

        .based-in {
          position: absolute;
          top: 40%;
          right: 2%;
          font-family: var(--mono);
          font-weight: 800;
          font-size: clamp(18px, 18vw, 16px);
          letter-spacing: clamp(5px, 10vw, 11px);
          z-index: 45;
        }

        .description {
          position: absolute;
          bottom: -13rem;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(250px, 60%, 600px);
          text-align: center;
          font-family: var(--mono);
          font-size: clamp(10px, 1vw, 14px);
          line-height: 1.6;
          letter-spacing: 0.5px;
          z-index: 45;
        }

        /* Media Queries for smaller screens */
        @media (max-width: 1024px) {
          .hero-title { font-size: clamp(60px, 15vw, 140px); }
          .services-list { top: auto; bottom: 0px; left: 18%; font-size: clamp(12px, 2vw, 22px); }
          .based-in { top: auto; bottom: 410px; right: 0%; font-size:clamp(14px, 8vw, 8px);letter-spacing: clamp(5px, 9vw, 8px); }
          .portrait-wrap { top: 30%; width: 34vw; }
          .description { width: 80%; bottom: -140px; font-size: clamp(12px, 2vw, 14px); }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(40px, 13vw, 140px); }
          .services-list {top: auto; bottom: 135px; left: 14%; font-size: clamp(10px, 3vw, 18px); }
          .based-in { top: auto; bottom: 440px; right: 5%; font-size: clamp(10px, 3vw, 12px); letter-spacing: 2px; }
          .portrait-wrap { width: 34vw; top: 25%; }
          .description { width: 90%;  font-size: clamp(10px, 2vw, 14px);bottom: 15px; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: clamp(40px, 13vw, 140px); }
          .services-list {top: auto; bottom: 170px; left: 7%; font-size: clamp(10px, 3vw, 18px); }
          .based-in { top: auto; bottom: 332px; right: 2%; font-size: clamp(10px, 2.5vw, 11px); letter-spacing: 1px; }
          .portrait-wrap { width: 30vw; top: 25%; }
          .description { width: 90%;  font-size: clamp(10px, 2vw, 14px);bottom: 80px; }
        }
      `}</style>

      <div className="hero-wrap">
        <div className="hero-container">
          <div className="visitor-count">
            {String(visitorCount).padStart(4, "0")}
          </div>

          <h1 className="hero-title">CREATIVE DESIGNER</h1>

          <div className="portrait-wrap">
            <img src="/assets/Hero.webp" alt="Portrait of designer" />
          </div>

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
      </div>
    </>
  );
};

export default HeroSection;
