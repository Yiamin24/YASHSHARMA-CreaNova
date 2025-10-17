import React, { useEffect, useRef, useState } from "react";

// Local image path
const designerImageUrl = "/assets/A.webp";

// ------------------- Mobile Layout Component -------------------
const HeroSectionMobile = () => {
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

  const mobileTitleLine1 = "CREATIVE".split("");
  const mobileTitleLine2 = "DESIGNER".split("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        html, body { overflow-x: hidden; }

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
          opacity: 0;
          animation: fade-up-slight 1s ease-out 1s forwards;
        }

        .hero-section-main-content { text-align: center; }

        .hero-section-title {
          font-size: 18vw;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.05em;
          margin-top: 12px;
        }

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
          margin-top: 4px;
          font-family: 'Space Mono', monospace;
          font-size: clamp(12px, 2vw, 20px);
          letter-spacing: 19px;
          font-weight: 300;
          text-transform: uppercase;
          opacity: 0;
          animation: fade-up-slight 1s ease-out 1.2s forwards;
        }

        .hero-section-mobile-image-container {
          width: 80%;
          max-width: 400px;
          margin: 2.5rem auto 0 auto;
          opacity: 0;
          animation: image-fade-slide-up 1s ease-out 0.8s forwards;
          position: relative;
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
          opacity: 0;
          animation: fade-up-slight 1s ease-out 1.4s forwards;
        }
        .hero-section-mobile-services p { margin: 0; }

        .hero-section-mobile-description {
          margin-top: 2rem;
          font-family: 'Space Mono', monospace;
          font-size: clamp(12px, 3vw, 14px);
          line-height: 1.6;
          text-align: center;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          animation: fade-up-slight 1s ease-out 1.6s forwards;
        }

        @keyframes slide-from-top-to-bottom { 0% { transform: translateY(-120%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes image-fade-slide-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fade-up-slight { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="hero-section-mobile-container">
        <header className="hero-section-header">{String(visitorCount).padStart(4, "0")}</header>
        <div className="hero-section-main-content">
          <h1 className="hero-section-title">
            <div>{mobileTitleLine1.map((letter, i) => (
              <span className="letter-wrap" key={i}>
                <span className="letter" style={{ animationDelay: `${i * 50}ms` }}>{letter}</span>
              </span>
            ))}</div>
            <div>{mobileTitleLine2.map((letter, i) => (
              <span className="letter-wrap" key={i}>
                <span className="letter" style={{ animationDelay: `${(mobileTitleLine1.length + i) * 50}ms` }}>{letter}</span>
              </span>
            ))}</div>
          </h1>
          <p className="hero-section-subtitle">BASED IN INDIA</p>
          <div className="hero-section-mobile-image-container">
            <img src={designerImageUrl} alt="Designer portrait" />
          </div>
          <div className="hero-section-mobile-services">
            <p>/INTERACTIVE WEB  </p>
            <p>/SCALABLE SYSTEMS </p>
            <p>/END-TO-END DEVELOPMENT</p>
          </div>
          <div className="hero-section-mobile-description">
           I CRAFT POWERFUL WEB-EXPERIENCES,<br/>
            THAT BLENDS PERFORMANCE, DESIGN & MAGIC<br/>
            FOR BRANDS OF ALL SIZES.
          </div>
        </div>
      </div>
    </>
  );
};

// ------------------- Desktop Layout Component (full original code) -------------------
const HeroSectionDesktop = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const heroTitleRef = useRef(null);
  const basedInRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const servicesRef = useRef(null);
  const portraitImgRef = useRef(null);

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = "visitorCount";
      let currentCount = localStorage.getItem(key);
      currentCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
      localStorage.setItem(key, currentCount);
      setVisitorCount(currentCount);
    }
  }, []);

  useEffect(() => {
    const computeAndApplySpacing = () => {
      try {
        const heroTitleEl = heroTitleRef.current;
        const basedInEl = basedInRef.current;
        if (!heroTitleEl || !basedInEl) return;
        const letterEls = Array.from(heroTitleEl.querySelectorAll(".letter"));
        if (letterEls.length === 0) return;
        const rLetterEl = [...letterEls].reverse().find(el => {
          const txt = (el.textContent || "").trim();
          return txt === "R" || txt === "r";
        });
        const rRight = rLetterEl
          ? rLetterEl.getBoundingClientRect().right
          : heroTitleEl.getBoundingClientRect().right;
        const basedInRect = basedInEl.getBoundingClientRect();
        const basedStartX = basedInRect.left;
        const clone = document.createElement("div");
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.pointerEvents = "none";
        clone.style.whiteSpace = "nowrap";
        clone.style.fontFamily = window.getComputedStyle(basedInEl).fontFamily || "inherit";
        clone.style.fontWeight = window.getComputedStyle(basedInEl).fontWeight || "400";
        clone.style.fontSize = window.getComputedStyle(basedInEl).fontSize || "23px";
        clone.style.letterSpacing = "0px";
        clone.style.textTransform = window.getComputedStyle(basedInEl).textTransform || "uppercase";
        clone.textContent = basedInEl.textContent || "BASED IN INDIA";
        document.body.appendChild(clone);
        const baseWidth = clone.getBoundingClientRect().width;
        document.body.removeChild(clone);
        const totalNeededSpacing = rRight - (basedStartX + baseWidth);
        const rawText = (basedInEl.textContent || "").trim();
        const chars = Array.from(rawText);
        const gaps = Math.max(1, chars.length - 1);
        let perGap = totalNeededSpacing / gaps;
        const MIN_GAP = -2;
        const MAX_GAP = 70;
        if (perGap < MIN_GAP) perGap = MIN_GAP;
        if (perGap > MAX_GAP) perGap = MAX_GAP;
        basedInEl.style.letterSpacing = `${Math.round(perGap * 100) / 100}px`;
      } catch (e) {}
    };

    const computeServicesPosition = () => {
      try {
        const portraitEl = portraitWrapRef.current;
        const servicesEl = servicesRef.current;
        if (!portraitEl || !servicesEl) return;
        const portraitRect = portraitEl.getBoundingClientRect();
        const heroRect = portraitEl.parentElement.getBoundingClientRect();
        const servicesHeight = servicesEl.offsetHeight;
        const top = portraitRect.bottom - heroRect.top - servicesHeight;
        const left = portraitRect.left - heroRect.left - servicesEl.offsetWidth - 20;
        servicesEl.style.position = "absolute";
        servicesEl.style.top = `${Math.max(0, top)}px`;
        servicesEl.style.left = `${Math.max(0, left)}px`;
      } catch (e) {}
    };

    const debounced = debounce(() => {
      computeAndApplySpacing();
      computeServicesPosition();
    }, 80);

    const initTimeout = setTimeout(() => {
      computeAndApplySpacing();
      computeServicesPosition();
    }, 150);

    window.addEventListener("resize", debounced);

    let ro;
    try {
      ro = new ResizeObserver(() => {
        computeAndApplySpacing();
        computeServicesPosition();
      });
      if (heroTitleRef.current) ro.observe(heroTitleRef.current);
      if (basedInRef.current) ro.observe(basedInRef.current);
      if (portraitWrapRef.current) ro.observe(portraitWrapRef.current);
      if (servicesRef.current) ro.observe(servicesRef.current);
    } catch (err) {}

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("resize", debounced);
      if (ro) {
        try { ro.disconnect(); } catch (e) {}
      }
    };
  }, []);

  const handleImageLoad = () => {
    if (portraitWrapRef.current && servicesRef.current) {
      const portraitRect = portraitWrapRef.current.getBoundingClientRect();
      const heroRect = portraitWrapRef.current.parentElement.getBoundingClientRect();
      const servicesEl = servicesRef.current;
      const top = portraitRect.bottom - heroRect.top - servicesEl.offsetHeight;
      servicesEl.style.top = `${Math.max(0, top)}px`;
    }
  };

  const titleText = "CREATIVE DESIGNER";
  const desktopLetters = titleText
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        :root{
          --bg: #f5f5f5;
          --text: #000;
          --display: 'Anton', sans-serif;
          --mono: 'Space Mono', monospace;
        }

        .hero-wrap { width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 2rem; position: relative; }
        .hero-grid { width: 100%; display: grid; grid-template-columns: 1fr minmax(420px, 700px) 1fr; grid-template-rows: auto 1fr auto; row-gap: 1.5rem; align-items: start; position: relative; min-height: 620px; }
        .visitor { grid-column: 1 / 2; grid-row: 1 / 2; justify-self: start; align-self: start; font-family: var(--mono); font-size: clamp(12px, 1.4vw, 22px); letter-spacing: 1px; opacity: 0; animation: fade-up-slight 0.8s ease-out 0.9s forwards; }
        .hero-title { grid-column: 1 / 4; grid-row: 1 / 2; justify-self: center; align-self: start; margin-top: 30px; font-family: var(--display); font-weight: 400; font-size: clamp(8rem, 13vw, 14rem); line-height: 0.85; text-transform: uppercase; text-align: center; z-index: 5; color: var(--text); position: relative; }
        .hero-title .second-word { display: inline-block; position: relative; }
        .portrait-wrap { grid-column: 2 / 3; grid-row: 2 / 3; justify-self: center; align-self: start; margin-top: -20px; width: clamp(180px, 20vw, 360px); aspect-ratio: 4/5; overflow: visible; border-radius: 6px; filter: grayscale(100%); position: relative; opacity: 0; animation: image-fade-slide-up 0.9s ease-out 0.6s forwards; }
        .portrait-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .based-in { position: absolute; top: -3%; left: 100%; transform: translateX(16%) translateY(0); font-family: var(--mono); font-weight: 400; text-transform: uppercase; font-size: 23px; white-space: nowrap; opacity: 0; animation: fade-up-slight 0.9s ease-out 1s forwards; }
        .services { display: flex; flex-direction: column; gap: clamp(6px, 1vw, 14px); font-family: var(--mono); font-weight: 700; text-transform: uppercase; font-size: clamp(14px, 1.5vw, 20px); text-align: left; opacity: 0; animation: fade-up-slight 0.9s ease-out 1.05s forwards; position: absolute; }
        .description { grid-column: 1 / 4; grid-row: 3 / 4; justify-self: center; align-self: end; font-family: var(--mono); font-size: clamp(12px, 1vw, 14px); line-height: 1.5; text-align: center; width: min(900px, 92%); opacity: 0; animation: fade-up-slight 0.9s ease-out 1.15s forwards; z-index: 4; margin-bottom: 12px; }
        .letter-wrap { display: inline-block; overflow: hidden; }
        .letter { display: inline-block; transform: translateY(-120%); opacity: 0; animation-name: slide-from-top-to-bottom; animation-duration: 0.8s; animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1); animation-fill-mode: forwards; }
        @keyframes slide-from-top-to-bottom { 0% { transform: translateY(-120%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes image-fade-slide-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fade-up-slight { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="hero-wrap">
        <div className="hero-grid">
          <div className="visitor">{String(visitorCount).padStart(4, "0")}</div>
          <h1 className="hero-title" ref={heroTitleRef}>
            {desktopLetters.slice(0, 8).map((letter, i) => (
              <span className="letter-wrap" key={i}>
                <span className="letter" style={{ animationDelay: `${i * 45}ms` }}>{letter}</span>
              </span>
            ))}
            <span className="second-word">
              {desktopLetters.slice(9).map((letter, i) => (
                <span className="letter-wrap" key={i}>
                  <span className="letter" style={{ animationDelay: `${(i + 9) * 45}ms` }}>{letter}</span>
                </span>
              ))}
            </span>
          </h1>

          <div className="portrait-wrap" ref={portraitWrapRef}>
            <img src={designerImageUrl} alt="Portrait" onLoad={handleImageLoad} ref={portraitImgRef} />
            <div className="based-in" ref={basedInRef}>BASED IN INDIA</div>
          </div>

          <div className="services" ref={servicesRef}>
            <div>/INTERACTIVE WEB  </div>
            <div>/SCALABLE SYSTEMS </div>
            <div>/END-TO-END DEVELOPMENT</div>
          </div>

          <div className="description">
            I CRAFT POWERFUL WEB-EXPERIENCES,<br/>
            THAT BLENDS PERFORMANCE, DESIGN & MAGIC<br/>
            FOR BRANDS OF ALL SIZES
          </div>
        </div>
      </div>
    </>
  );
};

// ------------------- Main Hero Section (switches layouts) -------------------
const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />;
};

export default HeroSection;
