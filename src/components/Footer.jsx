import React, { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const nameRef = useRef(null);
  const bottomRef = useRef(null);

  // Update time & timezone
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
      );
      const offsetHours = -now.getTimezoneOffset() / 60;
      setTimezone(`(GMT${offsetHours >= 0 ? "+" : ""}${offsetHours})`);
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Observe bottom bar for entry & exit
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            setAnimateOut(false);
          } else {
            setVisible(false);
            setAnimateOut(true);
          }
        });
      },
      { threshold: 0 }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();
  const name = "YASH SHARMA".split("");
  const bottomItems = [
    `DEHRADUN, INDIA: ${timezone} ${time}`,
    "DEVELOPMENT - YS",
    `© ALL RIGHTS RESERVED. ${currentYear} YASH SHARMA`,
  ];

  return (
    <>
      <style>{`
        .simple-footer-container {
          width: 100%;
          padding: 1rem clamp(0rem, 5vw, 2rem) 0.5rem;
          background-color: #f5f5f5;
          color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          overflow-x: hidden;
        }

        .footer-big-name {
          display: flex;
          justify-content: center;
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          font-size: clamp(3rem, 18vw, 15rem);
          line-height: 0.85;
          text-transform: uppercase;
          color: #000;
          overflow: hidden;
        }

        .footer-letter {
          display: inline-block;
          transform: translateY(150%) rotateX(70deg) scale(0.8);
          opacity: 0;
        }

        /* Elastic wave in */
        .footer-big-name.visible .footer-letter {
          animation: elasticWaveIn 1.4s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards;
        }

        /* Elastic wave out */
        .footer-big-name.animate-out .footer-letter {
          animation: elasticWaveOut 1.2s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards;
        }

        @keyframes elasticWaveIn {
          0% { transform: translateY(150%) scale(0.8) rotateX(70deg); opacity:0; }
          50% { transform: translateY(-10%) scale(1.05) rotateX(0deg); opacity:1; }
          70% { transform: translateY(5%) scale(0.95) rotateX(0deg); }
          100% { transform: translateY(0%) scale(1) rotateX(0deg); opacity:1; }
        }

        @keyframes elasticWaveOut {
          0% { transform: translateY(0%) scale(1) rotateX(0deg); opacity:1; }
          40% { transform: translateY(25%) scaleY(1.15) scaleX(0.9); opacity:1; }
          65% { transform: translateY(70%) scaleY(0.85) scaleX(1.05); opacity:1; }
          100% { transform: translateY(150%) scale(0.8) rotateX(70deg); opacity:0; }
        }

        /* Bottom bar animation */
        .footer-bottom-bar {
          width: 100%;
          max-width: 1920px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-family: 'Space Mono', monospace;
          font-size: clamp(11px, 1vw, 14px);
          text-transform: uppercase;
        }

        .bottom-bar-item {
          opacity: 0;
          transform: translateY(20px);
          display: inline-block;
          animation-fill-mode: forwards;
        }

        /* Entry animation */
        .footer-big-name.visible ~ .footer-bottom-bar .bottom-bar-item {
          animation: fadeSlideUp 0.8s ease forwards;
        }

        /* Exit animation staggered reverse from center */
        .footer-big-name.animate-out ~ .footer-bottom-bar .bottom-bar-item {
          animation: fadeSlideDown 0.8s ease forwards;
        }

        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeSlideDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }

        @media (max-width: 768px) {
          .simple-footer-container { gap: 2rem; }
          .footer-bottom-bar { flex-direction: column; text-align: center; }
        }
      `}</style>

      <footer className="simple-footer-container">
        <div
          ref={nameRef}
          className={`footer-big-name ${visible ? "visible" : ""} ${animateOut ? "animate-out" : ""}`}
        >
          {name.map((letter, i) => {
            const center = Math.floor(name.length / 2);
            const dist = Math.abs(i - center);
            const delay = dist * 0.15;
            return (
              <span
                key={i}
                className="footer-letter"
                style={{ animationDelay: `${delay}s` }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        <div className="footer-bottom-bar" ref={bottomRef}>
          {bottomItems.map((text, idx) => {
            // Reverse stagger for exit: center item first, then sides
            const center = Math.floor(bottomItems.length / 2);
            const dist = Math.abs(idx - center);
            const delay = visible ? 0.3 + idx * 0.15 : dist * 0.15; // entry vs exit
            return (
              <div
                key={idx}
                className="bottom-bar-item"
                style={{ animationDelay: `${delay}s` }}
              >
                <span>{text}</span>
              </div>
            );
          })}
        </div>
      </footer>
    </>
  );
};

export default Footer;
