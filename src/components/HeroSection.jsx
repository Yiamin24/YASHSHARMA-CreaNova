import React, { useEffect, useState } from "react";

// Local image path
const designerImageUrl = "/assets/Hero.webp";

const HeroSection = ({ servicesPosition = {} }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Unified visitor counter for both Mobile and Desktop
  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = "visitorCount";
      let currentCount = localStorage.getItem(key);
      // Increment the count or initialize it to 1
      currentCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
      localStorage.setItem(key, currentCount);
      setVisitorCount(currentCount);
    }
  }, []); // Runs once when the component mounts

  // Title letters for both layouts
  const titleText = "CREATIVE DESIGNER";
  const desktopLetters = titleText
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));
  
  const mobileTitleLine1 = "CREATIVE".split("");
  const mobileTitleLine2 = "DESIGNER".split("");

  // --- MOBILE LAYOUT ---
  if (isMobile) {
    return (
      <>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

            html, body { overflow-x: hidden; }

            /* --- Animation Keyframes for Mobile --- */
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

            .hero-section-mobile-container {
              font-family: 'Inter', sans-serif;
              background-color: #F8F8F8;
              color: black;
              padding: 4rem 1.5rem;
            }

            .hero-section-header {
              font-family: 'Space Mono', monospace;
              font-weight: 700;
              margin-bottom: 1rem;
              text-align: left;
              /* Animation */
              opacity: 0;
              animation: fade-up-slight 1s ease-out 1s forwards;
            }
            
            .hero-section-main-content {
                text-align: center;
            }

            .hero-section-title {
              font-size: 18vw;
              font-weight: 900;
              text-transform: uppercase;
              line-height: 0.9;
              letter-spacing: -0.05em;
            }

            /* Letter animation styles for mobile title */
            .hero-section-title .letter-wrap { display: inline-block; overflow: hidden; }
            .hero-section-title .letter {
              display: inline-block;
              transform: translateY(-120%);
              opacity: 0;
              animation-name: slide-from-top-to-bottom;
              animation-duration: 0.8s;
              animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
              animation-fill-mode: forwards;
            }

            .hero-section-subtitle {
              margin-top: 1rem;
              font-family: 'Space Mono', monospace;
              font-size: 0.75rem;
              letter-spacing: 0.3em;
              font-weight: 700;
              /* Animation */
              opacity: 0;
              animation: fade-up-slight 1s ease-out 1.2s forwards;
            }
            
            .hero-section-mobile-image-container {
              width: 80%;
              max-width: 400px;
              margin: 2.5rem auto 0 auto;
              /* Animation */
              opacity: 0;
              animation: image-fade-slide-up 1s ease-out 0.8s forwards;
            }

            .hero-section-mobile-image-container img {
              width: 100%;
              height: auto;
              filter: grayscale(100%);
              object-fit: cover;
              aspect-ratio: 4 / 5;
              display: block;
            }

            .hero-section-mobile-services {
              font-family: 'Space Mono', monospace;
              font-weight: 600;
              font-size: clamp(12px, 3vw, 14px);
              line-height: 1.6;
              margin-top: 2rem;
              text-align: center;
              /* Animation */
              opacity: 0;
              animation: fade-up-slight 1s ease-out 1.4s forwards;
            }
            .hero-section-mobile-services p {
              margin: 0;
            }
            
            .hero-section-mobile-description {
                margin-top: 2rem;
                font-family: 'Space Mono', monospace;
                font-size: clamp(12px, 3vw, 14px);
                line-height: 1.6;
                text-align: center;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
                /* Animation */
                opacity: 0;
                animation: fade-up-slight 1s ease-out 1.6s forwards;
            }
          `}
        </style>

        <div className="hero-section-mobile-container">
          <header className="hero-section-header">
            {String(visitorCount).padStart(4, "0")}
          </header>

          <div className="hero-section-main-content">
            <h1 className="hero-section-title">
              <div>
                {mobileTitleLine1.map((letter, index) => (
                  <span className="letter-wrap" key={`l1-${index}`}>
                    <span className="letter" style={{ animationDelay: `${index * 50}ms` }}>
                      {letter}
                    </span>
                  </span>
                ))}
              </div>
              <div>
                {mobileTitleLine2.map((letter, index) => (
                  <span className="letter-wrap" key={`l2-${index}`}>
                    <span className="letter" style={{ animationDelay: `${(mobileTitleLine1.length + index) * 50}ms` }}>
                      {letter}
                    </span>
                  </span>
                ))}
              </div>
            </h1>
            <p className="hero-section-subtitle">BASED IN INDIA</p>

            <div className="hero-section-mobile-image-container">
              <img src={designerImageUrl} alt="Designer portrait" />
            </div>

            <div className="hero-section-mobile-services">
              <p>/ART DIRECTION</p>
              <p>/WEB DESIGN (UX/UI)</p>
              <p>/WEB DEVELOPMENT</p>
            </div>
          
            <div className="hero-section-mobile-description">
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
  }

  // --- DESKTOP LAYOUT ---
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

        .hero-wrap {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center; 
          justify-content: center;
          padding: 2rem 0;
        }

        .hero-container {
          width: 100%;
          max-width: 1400px;
          position: relative; 
          display: flex;
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

        /* DESKTOP ONLY */
        @media (min-width: 901px) {
          .hero-title {
            font-family: var(--display);
            font-size: clamp(3rem, 13vw, 13rem);
            font-weight: 400;
            text-transform: uppercase;
            line-height: 0.9;
            color: var(--text);
            text-align: center;
            z-index: 10; 
            position: absolute;
            top: 1%;
            left: 5%;
            transform: translateY(0);
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
            top: -6%;
            left: 5%;
            font-family: var(--mono);
            font-size: clamp(12px, 2vw, 24px);
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
            filter: grayscale(100%);
          }

          .hero-services-list {
            position: absolute;
            top: 70%;
            left: 26%;
            transform: translate(-100%, 0%);
            font-family: var(--mono);
            font-weight: 600;
            font-size: 20px;
            line-height: 1.5;
            text-transform: uppercase;
            opacity: 0;
            animation: fade-up-slight 1s ease-out 1s forwards;
            z-index: 30;
          }

          .based-in {
            position: absolute;
            top: 31%;
            right: 3.3%;
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
            bottom: -15%;
            left: 1%;
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
        }
      `}</style>

      <div className="hero-wrap">
        <div className="hero-container">
          <div className="visitor-count">
            {String(visitorCount).padStart(4, "0")}
          </div>

          <h1 className="hero-title" aria-label={titleText}>
            {desktopLetters.map((letter, index) => (
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

          <div className="hero-services-list">
            /ART DIRECTION
            <br />
            /WEB DESIGN (UX/UI)
            <br />
            /WEB DEVELOPMENT
          </div>

          <div className="portrait-wrap">
            <img src={designerImageUrl} alt="Portrait of Yash Sharma" />
          </div>

          <div className="based-in">BASED IN INDIA</div>

          <div className="description">
            I CRAFT POWERFUL WEB-EXPERIENCES,
            <br />
            THAT BLENDS PERFORMANCE, DESIGN & MAGIC
            <br />
              FOR BRANDS OF ALL SIZES
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
