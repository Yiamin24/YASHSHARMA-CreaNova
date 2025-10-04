import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [shutter, setShutter] = useState(false);
  const navigate = useNavigate();

  // Particle state
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 10 + 10,
        offsetX: 0,
        offsetY: 0,
      });
    }
    setParticles(temp);
  }, []);

  // Shutter animation
  const triggerShutter = () => {
    if (!shutter) {
      setShutter(true);
      setTimeout(() => navigate("/home"), 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("click", triggerShutter);
    window.addEventListener("wheel", triggerShutter);
    window.addEventListener("keydown", triggerShutter);

    return () => {
      window.removeEventListener("click", triggerShutter);
      window.removeEventListener("wheel", triggerShutter);
      window.removeEventListener("keydown", triggerShutter);
    };
  }, [shutter]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,700;1,6..96,400&family=Roboto+Mono:wght@400&display=swap');

        html, body {
          margin: 0; padding: 0;
          height: 100%; width: 100%;
          background: #0a0a0a;
          font-family: 'Roboto Mono', monospace;
          overflow-x: hidden;
          color: #fff;
        }

        * { box-sizing: border-box; }

        /* Particle Background */
        .particles { position: fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; }
        .particle { position:absolute; background: rgba(255,255,255,0.2); border-radius:50%; animation-name: particleMove; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes particleMove { 0%{transform:translateY(0) translateX(0); opacity:0.2} 50%{opacity:0.5} 100%{transform:translateY(-100vh) translateX(50vw); opacity:0.2} }

        .page-container {
          display:flex; flex-direction:column; justify-content:space-between;
          height:100vh; width:100%; position:relative;
          transition: transform 1s ease-in-out;
          transform:translateY(${shutter ? "-100%" : "0"});
          z-index:1;
        }

        .content-wrapper { display:flex; flex-direction:column; justify-content:space-between; align-items:center; flex:1; width:100%; padding:2vw 0; }

        /* Header with letter-by-letter reveal, fully white */
        .header-group {
          display:flex;
          flex-wrap: nowrap; /* force all on single line */
          justify-content:center;
          align-items:baseline;
          font-size:clamp(2rem, 10vw, 10rem);
          gap:0.2ch; 
          white-space:nowrap;
          margin:0;
        }

        .header-letter {
          opacity: 0;
          transform: translateY(20px);
          animation: letterReveal 0.8s forwards;
        }
          
        @keyframes letterReveal { 
          to { opacity:1; transform:translateY(0); }
        }

        .header-title, .year-tag { 
          font-family:'Bodoni Moda', serif; font-weight:900; margin:0; font-size:inherit;
          color: #ffffff; /* fully white */
          text-shadow: none; /* remove shadow for full clarity */
        }

        .year-tag { font-style: italic; }

        .main-nav { display:flex; justify-content:space-between; align-items:center; width:100%; max-width:1200px;
          font-size:clamp(0.7rem,1vw,1rem); text-transform:uppercase; letter-spacing:0.1em; margin:auto 0; }

        .nav-button { background:none; border:none; color:white; padding:0.3rem 0.7rem; cursor:pointer; font-family:inherit; font-size:inherit; transition: all 0.3s ease; }
        .nav-button:hover { color:#00e0ff; transform: translateY(-3px); }

        .middle-text { text-align:center; white-space:nowrap; opacity:0; animation: fadeSlide 2s forwards; animation-delay:0.5s; margin:1rem 0; color:white; }
        @keyframes fadeSlide { 0%{opacity:0; transform:translateY(20px);} 100%{opacity:1; transform:translateY(0);} }

        footer { text-align:center; width:100%; padding:2vh 0; opacity:0; transform:scale(0.95); animation: footerScale 1s forwards; animation-delay:1s; position:relative; }
        @keyframes footerScale { to{opacity:1; transform:scale(1);} }
        .footer-title { font-family:'Bodoni Moda', serif; font-style:italic; font-size:clamp(2rem,5vw,5rem); display:inline-block; position:relative; }

        /* Arrow under hyphen, animated floating */
        .arrow-layer {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:5px;
          position:absolute;
          top:100%;
          left:50%;
          transform:translateX(-50%);
        }

        .arrow {
          width:2rem; height:2rem;
          border-left:3px solid rgba(255,255,255,0.7);
          border-bottom:3px solid rgba(255,255,255,0.7);
          transform: rotate(135deg); /* upside down pointing up */
          animation: floatUpDown 2s ease-in-out infinite;
        }

        .arrow:nth-child(2){ animation-delay:0.2s; }

        @keyframes floatUpDown {
          0% { transform: rotate(135deg) translateY(0); }
          50% { transform: rotate(135deg) translateY(-15px); }
          100% { transform: rotate(135deg) translateY(0); }
        }

        @media (max-width:768px){ .header-group{font-size:clamp(1.5rem, 8vw, 8rem);} .main-nav{flex-direction:column; gap:1rem;} }
        @media (max-width:480px){ .header-group{font-size:clamp(1.2rem, 7vw, 6rem);} }
      `}</style>

      {/* Particle Background */}
      <div className="particles">
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            animationDuration: `${p.duration}s`,
            transform: `translate(${p.offsetX}px, ${p.offsetY}px)`
          }}></div>
        ))}
      </div>

      <div className="page-container">
        <div className="content-wrapper">
          <header>
            <div className="header-group">
              {"YASH SHARMA".split("").map((char, idx) => (
                <span
                  key={idx}
                  className="header-letter header-title"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
              <span
                className="header-letter year-tag"
                style={{ animationDelay: `${"YASH SHARMA".length * 0.1}s` }}
              >
                '25
              </span>
            </div>
          </header>

          <main className="main-nav">
            <button className="nav-button left">(ABOUT)</button>
            <span className="middle-text">MIXING INTERACTIONS, CODE, & IMAGINATION</span>
            <button className="nav-button right">(CONTACT)</button>
          </main>

          <footer>
            <h2 className="footer-title">
              DESIGN <span style={{position: "relative"}}>-<div className="arrow-layer"><div className="arrow"></div><div className="arrow"></div></div></span> FOLIO
            </h2>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
