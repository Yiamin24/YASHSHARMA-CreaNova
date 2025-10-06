import React, { useState, useRef } from 'react';

// A helper component to handle the text scramble animation on hover
const ScrambledLink = ({ children, href }) => {
  const [text, setText] = useState(children);
  const intervalRef = useRef(null);
  const originalText = children;
  const chars = "!<>-_\\/[]{}—=+*^?#";

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            // Ignore scrambling spaces and brackets
            if (letter === " " || letter === "[" || letter === "]") {
              return letter;
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };
  
  const stopScramble = () => {
      clearInterval(intervalRef.current);
      setText(originalText);
  }

  return (
    <a href={href} className="scramble-link" onMouseEnter={scramble} onMouseLeave={stopScramble}>
      {text}
    </a>
  );
};


// Main Footer Component
const FooterX = () => {
  return (
    <>
      <style>{`
        /* 1. FONT IMPORTS & GLOBAL STYLES */
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        :root {
          --footer-bg: #ffffff;
          --footer-text: #000000;
          --font-mono: 'Space Mono', monospace;
        }
        
        /* 2. MAIN FOOTER WRAPPER & CONTAINER */
        .footer-wrapper {
          width: 100%;
          background-color: var(--footer-bg);
          color: var(--footer-text);
          font-family: var(--font-mono);
        }
        
        .footer-container {
          box-sizing: border-box;
          width: 100%;
          max-width: 1920px; /* Max width for large screens */
          margin: 0 auto; /* Center the container */
          min-height: 50vh;
          padding: 4rem;
          
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto 1fr auto;
          gap: 1rem;
          
          grid-template-areas:
            "nav contact contact"
            ". . address"
            "social-bottom social-bottom social-bottom";
        }

        /* 3. GRID AREA STYLING */
        .footer-nav { grid-area: nav; }
        .footer-contact { grid-area: contact; text-align: right; }
        .footer-address { grid-area: address; align-self: end; text-align: right; }
        .footer-social-bottom { grid-area: social-bottom; display: flex; justify-content: space-between; align-items: flex-end; }

        /* 4. GENERAL ELEMENT STYLING */
        .footer-container a {
          color: var(--footer-text);
          text-decoration: none;
          text-transform: uppercase;
        }

        .footer-nav ul, .footer-contact ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-nav li {
          margin-bottom: 0.75rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }
        .contact-details a { font-size: clamp(1.2rem, 3vw, 2rem); font-weight: 700; text-transform: none; }
        
        .footer-contact .social-links-top { margin-top: 2rem; }
        .footer-contact .social-links-top li { display: inline-block; margin-left: 2rem; }
        .footer-contact .social-links-top a { font-size: clamp(0.9rem, 1.5vw, 1.1rem); letter-spacing: 1px; }

        .footer-address p { font-size: clamp(0.75rem, 1vw, 0.8rem); line-height: 1.5; margin: 0; }
        
        /* 5. HOVER ANIMATIONS */

        /* --- Generic Underline Animation --- */
        .underline-anim {
            position: relative;
            padding-bottom: 4px;
        }
        .underline-anim::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: var(--footer-text);
            transform: scaleX(0);
            transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .underline-anim:hover::after {
            transform: scaleX(1);
        }
        .underline-anim.origin-center::after { transform-origin: center; }
        .underline-anim.origin-left::after { transform-origin: left; }
        
        /* --- Scramble Effect Styling --- */
        .scramble-link { 
          font-size: clamp(0.9rem, 1.5vw, 1.1rem); 
          letter-spacing: 1.5px; 
          display: inline-block;
        }

        /* --- Arrow Animation for Top Social Links --- */
        .arrow-animated-link { display: inline-flex; align-items: center; }
        .arrow-container {
          display: inline-block;
          position: relative;
          width: 1.2em;
          height: 1em;
          margin-left: 0.5em;
        }
        .arrow-default, .arrow-hover {
          position: absolute;
          left: 0;
          top: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .arrow-hover { transform: translateX(-10px); opacity: 0; }
        .arrow-animated-link:hover .arrow-default { transform: translateX(10px); opacity: 0; }
        .arrow-animated-link:hover .arrow-hover { transform: translateX(0); opacity: 1; }
        
        /* 6. RESPONSIVENESS */
        @media (max-width: 900px) {
            .footer-container {
                padding: 3rem 2rem;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto 1fr auto;
                gap: 2rem;
                grid-template-areas:
                    "contact contact"
                    "nav address"
                    ". ."
                    "social-bottom social-bottom";
            }
            .footer-contact, .footer-address { text-align: left;}
            .contact-details { align-items: flex-start; }
            .footer-contact .social-links-top li { margin-left: 0; margin-right: 1.5rem; }
        }

        @media (max-width: 600px) {
            .footer-container {
                grid-template-columns: 1fr;
                grid-template-rows: auto;
                gap: 3rem;
                padding: 3rem 1.5rem;
                grid-template-areas:
                    "contact"
                    "nav"
                    "address"
                    "social-bottom";
            }
            .footer-social-bottom {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
        }
      `}</style>

      <div className="footer-wrapper">
          <footer className="footer-container">
            <nav className="footer-nav">
              <ul>
                {/* CORRECTED: Now using ScrambledLink for nav items */}
                <li><ScrambledLink href="#about">About Me</ScrambledLink></li>
                <li><ScrambledLink href="#services">Services</ScrambledLink></li>
                <li><ScrambledLink href="#works">Works</ScrambledLink></li>
              </ul>
            </nav>

            <div className="footer-contact">
              <div className="contact-details">
                <a href="tel:+91 8267848027" className="underline-anim origin-left">+91 82678 48027</a>
                <a href="mailto:yashsharma02412@gmail.com" className="underline-anim origin-left">YashSharma02412@gmail.com</a>
              </div>
              <ul className="social-links-top">
                <li>
                  <a href="#instagram" className="arrow-animated-link underline-anim origin-left">
                    Instagram
                    <span className="arrow-container">
                      <span className="arrow-default">↗</span>
                      <span className="arrow-hover">→</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#telegram" className="arrow-animated-link underline-anim origin-left">
                    Telegram
                    <span className="arrow-container">
                      <span className="arrow-default">↗</span>
                      <span className="arrow-hover">→</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#facebook" className="arrow-animated-link underline-anim origin-left">
                    Facebook
                    <span className="arrow-container">
                      <span className="arrow-default">↗</span>
                      <span className="arrow-hover">→</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-address">
                <p>Address:</p>
                <p>63/A Dangwal Marg</p>
                <p>Dehradun, India</p>
            </div>

            <div className="footer-social-bottom">
              <ScrambledLink href="#dribbble">[ Dribbble ]</ScrambledLink>
              <ScrambledLink href="#behance">[ Behance ]</ScrambledLink>
              <ScrambledLink href="#linkedin">[ Linkedin ]</ScrambledLink>
            </div>
          </footer>
      </div>
    </>
  );
};

export default FooterX;