// src/loader.jsx
import React, { useState, useEffect } from 'react';

// Inject responsive & animation styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 600px) {
    .loader-content-dynamic {
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.7rem;
      justify-content: flex-start;
      align-items: center;
      height: 70vh;
      max-width: 90%;
    }
  }

  /* Letter shatter keyframes */
  @keyframes letterShatter {
    0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
    100% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; }
  }

  /* Particle spark keyframes */
  @keyframes particleFly {
    0% { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(var(--px), var(--py)) scale(0.4); opacity: 0; }
  }

  /* Camera shake + zoom-out keyframes */
  @keyframes cameraShake {
    0% { transform: scale(1) translate(0,0); }
    20% { transform: scale(1.05) translate(-5px, 3px); }
    40% { transform: scale(0.95) translate(4px, -4px); }
    60% { transform: scale(1.02) translate(-3px, 2px); }
    80% { transform: scale(0.98) translate(2px, -2px); }
    100% { transform: scale(0.8) translate(0,0); }
  }

  /* Landing page fade-in */
  .landing-fade-in {
    opacity: 0;
    transition: opacity 1s ease-in;
  }
  .landing-fade-in.active {
    opacity: 1;
  }

  .shatter span {
    display: inline-block;
    animation: letterShatter 1s forwards;
    position: relative;
  }

  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #fff;
    border-radius: 50%;
    animation: particleFly 1s forwards;
    pointer-events: none;
  }
`;
document.head.appendChild(styleSheet);

// Helpers
const randomValue = (min, max, unit = 'px') => `${Math.floor(Math.random() * (max - min) + min)}${unit}`;
const randomRotation = () => `${Math.floor(Math.random() * 360 - 180)}deg`;
const generateParticles = (count = 6, scale = 1) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      '--px': randomValue(-150 * scale, 150 * scale),
      '--py': randomValue(-150 * scale, 150 * scale),
    });
  }
  return particles;
};

const Loader = ({ onFinish, landingBgColor = '#0a0a0a' }) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [shatterStyles, setShatterStyles] = useState([]);
  const [particles, setParticles] = useState([]);
  const [landingActive, setLandingActive] = useState(false);
  const [bgColor, setBgColor] = useState('#000');

  // Detect screen size for scaling
  const scale = window.innerWidth < 600 ? 0.5 : 1;

  // Loader counter 2.5s
  useEffect(() => {
    const duration = 2500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(Math.floor((currentStep / steps) * 100), 100));

      if (currentStep >= steps) {
        clearInterval(interval);

        // Letter-level shatter
        const allText = ['YASH SHARMA', `[ ${100}% ]`, "PORTFOLIO '25"];
        const letterStyles = [];
        allText.forEach(line => {
          const lineStyles = line.split('').map(() => ({
            '--x': randomValue(-200 * scale, 200 * scale),
            '--y': randomValue(-200 * scale, 200 * scale),
            '--r': randomRotation(),
          }));
          letterStyles.push(lineStyles);
        });
        setShatterStyles(letterStyles);

        // Particle shards
        const allParticles = [];
        allText.forEach(line => {
          line.split('').forEach(() => {
            allParticles.push(generateParticles(4, scale));
          });
        });
        setParticles(allParticles.flat());

        setIsBreaking(true);

        // Background color transition & landing fade-in
        setTimeout(() => {
          setBgColor(landingBgColor);
          setLandingActive(true);
          if (onFinish) onFinish();
        }, 1000); // Wait for shatter+particles
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinish, landingBgColor, scale]);

  // Expand animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const displayProgress = Math.min(progress, 100);

  const loaderContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
    color: '#fff',
    fontFamily: "'Space Mono', monospace",
    zIndex: 9999,
    overflow: 'hidden',
    flexDirection: 'column',
    transition: 'background-color 1s ease-in-out', // smooth bg transition
    padding: scale === 0.5 ? '0 10px' : '0', // small padding for small screens
  };

  const loaderContentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: scale === 0.5 ? '0.9rem' : '1rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    maxWidth: '90%',
    width: isAnimating ? '80%' : '300px',
    gap: isAnimating ? '0.5rem' : '1rem',
    transition: 'width 2s ease-out, gap 2s ease-out',
    flexWrap: 'wrap',
    position: 'relative',
    transformOrigin: 'center',
    ...(isBreaking ? { animation: 'cameraShake 1s forwards' } : {}),
  };

  const elements = ['YASH SHARMA', `[ ${displayProgress}% ]`, "PORTFOLIO '25"];

  return (
    <>
      <div style={loaderContainerStyle}>
        <div
          style={loaderContentStyle}
          className={`loader-content-dynamic ${isBreaking ? 'shatter' : ''}`}
        >
          {elements.map((line, i) =>
            line.split('').map((char, j) => (
              <span
                key={`${i}-${j}`}
                style={isBreaking ? shatterStyles[i]?.[j] : {}}
              >
                {char}
              </span>
            ))
          )}

          {/* Particle fragments */}
          {isBreaking &&
            particles.map((p, idx) => (
              <div
                key={idx}
                className="particle"
                style={{
                  '--px': p['--px'],
                  '--py': p['--py'],
                }}
              />
            ))}
        </div>
      </div>

      {/* Landing page placeholder */}
      <div className={`landing-fade-in ${landingActive ? 'active' : ''}`}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '40vh', fontSize: scale === 0.5 ? '1.2rem' : '2rem' }}>
          Welcome to the Portfolio
        </h1>
      </div>
    </>
  );
};

export default Loader;
