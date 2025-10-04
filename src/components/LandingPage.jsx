import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ScrambleText = ({ text, onClick }) => {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'0123456789";

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char) =>
          char === " " || char === "(" || char === ")" ? char : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        )
        .join("");
      setDisplayText(scrambled);
    }, 50);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span
      className="scramble-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {displayText}
    </span>
  );
};

const LandingPage = () => {
  const [shutter, setShutter] = useState(false);
  const [particles, setParticles] = useState([]);
  const [lettersVisible, setLettersVisible] = useState(0);
  const [headerTextState, setHeaderTextState] = useState("YASH SHARMA '25".split(""));
  const headerRef = useRef([]);
  const navigate = useNavigate();
  const headerText = "YASH SHARMA '25".split("");
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'0123456789";

  const flickerIntervalRef = useRef(null);
  const flickerEnabledRef = useRef(true);

  const arrowLayerRef = useRef(null);
  const hyphenRef = useRef(null);

  // Particles
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 10 + 10,
      });
    }
    setParticles(temp);
  }, []);

  // Header letters reveal
  useEffect(() => {
    if (lettersVisible < headerText.length) {
      const timer = setTimeout(() => setLettersVisible((prev) => prev + 1), 150);
      return () => clearTimeout(timer);
    }
  }, [lettersVisible]);

  const triggerShutter = () => {
    if (!shutter) {
      setShutter(true);
      setTimeout(() => navigate("/home"), 1500);
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

  // Header flicker
  useEffect(() => {
    const startFlicker = () => {
      flickerEnabledRef.current = true;
      flickerIntervalRef.current = setInterval(() => {
        if (!flickerEnabledRef.current) return;
        setHeaderTextState((prev) =>
          prev.map((char) => {
            if (Math.random() < 0.2 && char !== " " && char !== "'") {
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
            return char;
          })
        );
        setTimeout(() => setHeaderTextState(headerText), 80 + Math.random() * 100);
      }, 250);
    };

    startFlicker();
    const cooldownInterval = setInterval(() => {
      flickerEnabledRef.current = false;
      setTimeout(() => (flickerEnabledRef.current = true), 2000);
    }, 10000);

    return () => {
      clearInterval(flickerIntervalRef.current);
      clearInterval(cooldownInterval);
    };
  }, []);

  // Update arrow position under hyphen
  useEffect(() => {
    const updateArrowPosition = () => {
      if (!hyphenRef.current || !arrowLayerRef.current) return;
      const hyphenRect = hyphenRef.current.getBoundingClientRect();
      const parentRect = hyphenRef.current.parentElement.getBoundingClientRect();
      const centerX = hyphenRect.left + hyphenRect.width / 2 - parentRect.left;
      arrowLayerRef.current.style.left = `${centerX}px`;
    };
    updateArrowPosition();
    window.addEventListener("resize", updateArrowPosition);
    return () => window.removeEventListener("resize", updateArrowPosition);
  }, []);

  return (
    <>
      <style>{`
        html, body { margin:0; padding:0; height:100%; width:100%; overflow-x:hidden; background:#0a0a0a; font-family:'Roboto Mono', monospace; color:#fff; }
        * { box-sizing:border-box; }
        .particles { position: fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; }
        .particle { position:absolute; background: rgba(255,255,255,0.2); border-radius:50%; animation-name: particleMove; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes particleMove { 0%{transform:translateY(0) translateX(0); opacity:0.2} 50%{opacity:0.5} 100%{transform:translateY(-100vh) translateX(50vw); opacity:0.2} }
        .page-container { display:flex; flex-direction:column; justify-content:space-between; height:100vh; width:100%; position:relative; transition: transform 1s ease-in-out, opacity 1s ease-in-out; transform: ${shutter ? "scale(0.7) translateY(-30px)" : "scale(1) translateY(0)"}; opacity: ${shutter ? 0 : 1}; z-index:1; }
        .content-wrapper { display:flex; flex-direction:column; justify-content:space-between; align-items:center; flex:1; width:100%; padding:2vw 0; overflow:hidden; }
        .header-group { display:flex; flex-wrap: nowrap; justify-content:center; align-items:baseline; font-size: clamp(2rem, 12vw, 6rem); gap:0.2ch; white-space: nowrap; margin: 0 auto; max-width: 95vw; overflow: hidden; position: relative; }
        .header-letter { opacity:0; transform: translateY(20px); display:inline-block; font-family:'Bodoni Moda', serif; font-weight:900; color:#fff; transition: all 0.2s ease; position: relative; padding: 0 2px; }
        .header-letter.visible { opacity:1; transform:translateY(0); }
        .main-nav { display:flex; justify-content:space-between; align-items:center; width:100%; max-width:1200px; font-size:clamp(0.8rem,1.2vw,1rem); text-transform:uppercase; letter-spacing:0.1em; margin:auto 0; position:relative; gap: 1rem; }
        .middle-text { text-align:center; white-space:nowrap; opacity:0; animation: fadeSlide 2s forwards; animation-delay:0.5s; margin:1rem 0; color:white; font-size:clamp(0.8rem,1.5vw,1.2rem);}
        @keyframes fadeSlide { 0%{opacity:0; transform:translateY(20px);} 100%{opacity:1; transform:translateY(0);} }
        footer { text-align:center; width:100%; padding:2vh 0; position:relative; }
        .footer-title { font-family:'Bodoni Moda', serif; font-style:italic; font-size:clamp(2rem, 5vw, 5rem); display:flex; justify-content:center; align-items:center; position:relative; gap:1ch; }
        .footer-design, .footer-folio { transition: all 1s ease-in-out; }
        .footer-hyphen { transition: opacity 0.8s ease-in-out; display:inline-block; position:relative; }
        .arrow-layer { display:flex; flex-direction:column; align-items:center; position:absolute; top:100%; transform:translateX(-50%); gap:5px; }
        .arrow { width:2rem; height:2rem; border-left:3px solid rgba(255,255,255,0.7); border-bottom:3px solid rgba(255,255,255,0.7); transform: rotate(135deg); animation: arrowMove 1s ease-in-out infinite alternate; }
        .arrow:nth-child(2) { animation-delay:0.3s; }
        @keyframes arrowMove { 0% { transform: rotate(135deg) translateY(0); opacity:0.7; } 50% { transform: rotate(135deg) translateY(6px); opacity:1; } 100% { transform: rotate(135deg) translateY(0); opacity:0.7; } }
        .scramble-container { font-family:'Roboto Mono', monospace; color:#fff; font-weight:700; font-size:1rem; letter-spacing:0.1em; transition: all 0.3s; cursor:pointer; }
        @media (max-width:1024px){ .header-group{font-size:clamp(2rem,10vw,5rem);} .main-nav{gap:0.5rem;} }
        @media (max-width:768px){ .header-group{font-size:clamp(1.5rem,8vw,4.5rem);} .main-nav{flex-direction:column; align-items:center; gap:1rem;} .middle-text{font-size:clamp(0.7rem,2vw,1rem);} }
        @media (max-width:480px){ .header-group{font-size:clamp(1.2rem,6vw,4rem);} .main-nav{gap:0.8rem;} .middle-text{font-size:clamp(0.6rem,3vw,0.9rem);} }
      `}</style>

      <div className="particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{ width: `${p.size}px`, height: `${p.size}px`, left: `${p.x}vw`, top: `${p.y}vh`, animationDuration: `${p.duration}s` }}
          ></div>
        ))}
      </div>

      <div className="page-container">
        <div className="content-wrapper">
          <header>
            <div className="header-group">
              {headerTextState.map((char, idx) => (
                <span
                  key={idx}
                  ref={(el) => (headerRef.current[idx] = el)}
                  className={`header-letter ${lettersVisible > idx ? "visible" : ""}`}
                  onMouseEnter={() => headerRef.current[idx] && (headerRef.current[idx].style.textShadow = "0 0 10px rgba(255,255,255,0.8)")}
                  onMouseLeave={() => headerRef.current[idx] && (headerRef.current[idx].style.textShadow = "none")}
                >
                  {char}
                </span>
              ))}
            </div>
          </header>

          <main className="main-nav">
            <ScrambleText text="(ABOUT)" onClick={() => navigate("/about")} />
            <span className="middle-text">MIXING INTERACTIONS, CODE, & IMAGINATION</span>
            <ScrambleText text="(CONTACT)" onClick={() => navigate("/contact")} />
          </main>

          <footer>
            <h2 className="footer-title">
              <span className={`footer-design`} style={shutter ? { transform: "translateX(-200%)" } : {}}>DESIGN</span>
              <span className="footer-hyphen" ref={hyphenRef} style={shutter ? { opacity: 0 } : {}}> - </span>
              <span className={`footer-folio`} style={shutter ? { transform: "translateX(200%)" } : {}}>FOLIO</span>
              <div className="arrow-layer" ref={arrowLayerRef}>
                <div className="arrow"></div>
                <div className="arrow"></div>
              </div>
            </h2>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
