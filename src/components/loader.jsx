// src/loader.jsx

import React, { useState, useEffect } from 'react';

// This injected stylesheet for responsiveness remains the same.
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 600px) {
    .loader-content-dynamic {
      flex-direction: column;
      gap: 1rem;
      font-size: 0.8rem;
    }
  }
`;
document.head.appendChild(styleSheet);


const Loader = ({ isFinished }) => {
  const [progress, setProgress] = useState(0);
  // NEW: State to control the expand animation
  const [isAnimating, setIsAnimating] = useState(false);

  // This useEffect for the percentage counter remains the same
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // NEW: useEffect to trigger the animation shortly after the component appears
  useEffect(() => {
    // Start the animation after a brief 200ms delay
    const animationTimer = setTimeout(() => setIsAnimating(true), 200);
    return () => clearTimeout(animationTimer);
  }, []); // The empty array ensures this runs only once on mount


  const displayProgress = Math.min(progress, 100);

  // --- STYLES ---

  const loaderContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: "'Space Mono', monospace",
    zIndex: 9999,
    opacity: isFinished ? 0 : 1,
    visibility: isFinished ? 'hidden' : 'visible',
    transition: 'opacity 0.7s ease-out, visibility 0.7s ease-out',
  };
  
  // UPDATED: This style object is now dynamic for the animation
  const loaderContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    maxWidth: '900px', // Prevents it from being too wide on large screens
    // The animation is controlled by changing the width and gap
    width: isAnimating ? '80%' : '300px', // Animate from a fixed width to a percentage
    gap: isAnimating ? '1rem' : '1.5rem', // Animate the gap between elements
    transition: 'width 2s ease-out, gap 2s ease-out', // Smooth transition over 2 seconds
  };

  const textStyle = {
    whiteSpace: 'nowrap',
  };

  const percentageStyle = {
    textAlign: 'center',
    flexGrow: 1,
  };


  return (
    <div style={loaderContainerStyle}>
      <div style={loaderContentStyle} className="loader-content-dynamic">
        <span style={textStyle}>YASH SHARMA</span>
        <span style={percentageStyle}>[ {displayProgress}% ]</span>
        <span style={textStyle}>PORTFOLIO '25</span>
      </div>
    </div>
  );
};

export default Loader;