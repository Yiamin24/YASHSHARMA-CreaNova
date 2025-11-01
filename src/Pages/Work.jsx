import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// --- CSS Styles ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Mono:wght@400;700&display=swap');

    .projects-section-container {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #E0E0E0;
      overflow: hidden;
      padding: 140px 20px 140px 20px;
    }

    .section-top-text {
      position: absolute;
      top: 20px;
      width: 100%;
      text-align: center;
      font-family: 'Roboto Mono', monospace;
      font-size: 1rem;
      font-weight: 500;
      color: rgba(34,34,34,0.85);
      z-index: 50;
      line-height: 1.4;
    }

    .section-bottom-text-container {
      position: absolute;
      bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 50;
    }

    .section-bottom-text {
      font-family: 'Roboto Mono', monospace;
      font-size: 1rem;
      font-weight: 500;
      color: rgba(34,34,34,0.85);
      line-height: 1.4;
      text-align: center;
      max-width: 700px;
    }

    .static-background-content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;
    }

    .projects-title-watermark {
      font-family: 'Anton', sans-serif;
      font-size: clamp(10rem, 25vw, 24rem);
      color: rgba(0, 0, 0, 0.07);
      user-select: none;
    }

    /* Cube */
    .cube-scene {
      width: 300px;
      height: 300px;
      perspective: 2000px;
      margin-bottom: 2rem;
      margin-top: 50px;
    }

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      cursor: grab;
    }

    .cube-face {
      position: absolute;
      width: 300px;
      height: 300px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background-color: #111;
      border: 1px solid #333;
      overflow: hidden;
    }

    .cube-face a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: white;
      position: relative;
      z-index: 2;
    }

    .cube-face img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .cube-face:hover img {
      transform: scale(1.05);
    }

    .cube-face .card-content {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 1rem;
      background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
    }

    .card-title {
      font-family: 'Anton', sans-serif;
      font-size: 1.5rem;
      text-align: center;
      color: white;
    }

    .face-front  { transform: rotateY(0deg) translateZ(150px); }
    .face-back   { transform: rotateY(180deg) translateZ(150px); }
    .face-right  { transform: rotateY(90deg) translateZ(150px); }
    .face-left   { transform: rotateY(-90deg) translateZ(150px); }
    .face-top    { transform: rotateX(90deg) translateZ(150px); }
    .face-bottom { transform: rotateX(-90deg) translateZ(150px); }

    /* Exploded Cards Desktop */
    .exploded-row {
      display: flex;
      gap: 1rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0 20px;
      flex-wrap: nowrap;
    }

    .exploded-card {
      width: 250px;
      height: 200px;
      position: relative;
      background-color: #111;
      overflow: hidden;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .exploded-card img {
      width: 100%;
      height: auto;
      max-height: 100%;
      object-fit: contain;
      border-radius: 15px;
      transition: transform 0.3s ease;
      display: block;
    }

    .exploded-card .card-content {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0.5rem;
      background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
      border-radius: 0 0 15px 15px;
      text-align: center;
      color: white;
    }

    .exploded-card:hover img {
      transform: scale(1.05) rotate(1deg);
    }

    /* Mobile Carousel */
    .mobile-carousel {
      display: none;
      width: 90%;
      overflow: hidden;
      position: relative;
      margin-top: 50px;
    }

    .carousel-inner {
      display: flex;
      transition: transform 0.5s ease;
    }

    .carousel-card {
      min-width: 100%;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
    }

    .carousel-card img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .carousel-card .card-content {
      padding: 0.5rem;
      background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
      position: absolute;
      bottom: 0;
      width: 100%;
      color: white;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0,0,0,0.4);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
    }

    .carousel-btn:hover { background: rgba(0,0,0,0.6); }
    .carousel-btn-left { left: 10px; }
    .carousel-btn-right { right: 10px; }

    /* Controls */
    .controls-container {
      position: absolute;
      bottom: 20px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0 40px;
      z-index: 100;
      align-items: center;
    }

    .joystick-container {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: none;
      background: rgba(0,0,0,0.1);
      box-shadow: inset 0 4px 8px rgba(0,0,0,0.2);
    }

    .joystick-thumb {
      width: 40px;
      height: 40px;
      background: linear-gradient(145deg,#666,#222);
      border-radius: 50%;
      pointer-events: none;
      transition: transform 0.05s ease;
    }

    .explode-btn {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: none;
      background-color: #c0392b;
      color: white;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: inset 0 4px 8px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }

    .explode-btn:hover { background-color: #e74c3c; transform: scale(1.05); }

    @media (max-width: 768px) {
      .cube-scene { width: 80vw; height: 80vw; }
      .section-bottom-text { font-size: 0.85rem; }
      .joystick-container { width: 60px; height: 60px; }
      .joystick-thumb { width: 30px; height: 30px; }

      /* Explode button same size as joystick on mobile */
      .explode-btn { width: 60px; height: 60px; font-size: 0.7rem; }

      .mobile-carousel { display: block; }
    }
  `}</style>
);

const projects = [
  { id: 1, title: 'TAX BAR ASSOCIATION', img: '/assets/TXBSS.webp', face: 'face-front', link: 'https://taxbarassociationrishikesh.com/' },
  { id: 2, title: 'SWIPE N RISE', img: '/assets/SNR.webp', face: 'face-right', link: 'https://www.swipenrise.com/' },
  { id: 3, title: 'YASH SHARMA PORTFOLIO', img: '/assets/YSSS.webp', face: 'face-back', link: 'http://localhost:5173' },
  { id: 4, title: 'SAVAYA STAY', img: '/assets/SAVY.webp', face: 'face-left', link: 'https://www.savayastay.com/' },
  { id: 5, title: 'MOVIEFLIX', img: '/assets/MOVIEFLIX.webp', face: 'face-top', link: 'https://movieflix-frontend-silk.vercel.app/' },
];

const Work = () => {
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(20);
  const rotateXClamped = useTransform(rotateX, val => val);
  const [exploded, setExploded] = useState(false);
  const joystickRef = useRef(null);
  const thumbRef = useRef(null);
  const velocity = useRef({ x: 0, y: 0 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (exploded) return;
    const controls = animate(rotateY, rotateY.get() + 360, {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [exploded, rotateY]);

  const handleJoystickMove = (e) => {
    e.preventDefault();
    if (exploded) return;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const rect = joystickRef.current.getBoundingClientRect();
    const x = Math.max(Math.min(clientX - rect.left - rect.width / 2, 50), -50);
    const y = Math.max(Math.min(clientY - rect.top - rect.height / 2, 50), -50);

    rotateY.set(rotateY.get() + x * 0.25);
    rotateX.set(rotateXClamped.get() - y * 0.25);
    velocity.current = { x: x * 0.25, y: -y * 0.25 };
    thumbRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleJoystickEnd = () => {
    thumbRef.current.style.transform = `translate(0px,0px)`;
    if (exploded) return;
    const glide = () => {
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      rotateY.set(rotateY.get() + velocity.current.x);
      rotateX.set(rotateXClamped.get() + velocity.current.y);
      if (Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01) {
        requestAnimationFrame(glide);
      }
    };
    glide();
  };

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) handlePrev();
    else if (delta < -50) handleNext();
    setTouchStartX(null);
  };

  return (
    <>
      <GlobalStyles />
      <section className="projects-section-container">

        <div className="section-top-text">
          <div>I LOVE DESIGN & MOTION</div>
          <div>AND BRING IDEAS TO LIFE WITH VIBE CODING</div>
          <div>HERE'S SOME OF MY WORKS</div>
        </div>

        <div className="static-background-content">
          <h1 className="projects-title-watermark">PROJECTS</h1>
        </div>

        {!exploded && (
          <div className="cube-scene">
            <motion.div className="cube" style={{ rotateY, rotateX: rotateXClamped }}>
              {projects.map(project => (
                <div key={project.id} className={`cube-face ${project.face}`}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img src={project.img} alt={project.title} />
                    <div className="card-content">
                      <h3 className="card-title">{project.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {exploded && !isMobile && (
          <div className="exploded-row">
            {projects.map((project, i) => (
              <motion.div key={project.id} className="exploded-card"
                initial={{ opacity: 0, y: -150, scale: 0.5, rotate: -15 + i*5 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img src={project.img} alt={project.title} />
                  <div className="card-content">
                    <h3 className="card-title">{project.title}</h3>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {exploded && isMobile && (
          <div className="mobile-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {projects.concat(projects).map((project, idx) => (
                <div className="carousel-card" key={idx}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img src={project.img} alt={project.title} />
                    <div className="card-content">
                      <h3>{project.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <button className="carousel-btn carousel-btn-left" onClick={handlePrev}>‹</button>
            <button className="carousel-btn carousel-btn-right" onClick={handleNext}>›</button>
          </div>
        )}

        <div className="section-bottom-text-container">
          <div className="section-bottom-text">
            I AM A DIGITAL DESIGNER BASED IN UTTARAKHAND, INDIA <br/>
            FOCUSED ON WEB EXPERIENCE & MOTION DESIGN
          </div>
        </div>

        <div className="controls-container">
          {!exploded && (
            <div
              ref={joystickRef}
              className="joystick-container"
              onMouseMove={handleJoystickMove}
              onMouseUp={handleJoystickEnd}
              onMouseLeave={handleJoystickEnd}
              onTouchMove={handleJoystickMove}
              onTouchEnd={handleJoystickEnd}
              onTouchStart={(e) => e.preventDefault()} // fix drag on mobile
            >
              <div ref={thumbRef} className="joystick-thumb" />
            </div>
          )}

          <button className="explode-btn" onClick={() => setExploded(!exploded)}>
            {exploded ? "RESET" : "EXPLODE"}
          </button>
        </div>
      </section>
    </>
  );
};

export default Work;
