import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const NavLink = ({ children }) => {
    const intervalRef = useRef(null);
    const [text, setText] = useState(children);
    const originalText = children;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleMouseOver = () => {
      let iteration = 0;
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setText(
          originalText
            .split("")
            .map((letter, index) => {
              if (index < iteration) return originalText[index];
              if (letter === " ") return " ";
              return chars[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iteration >= originalText.length) clearInterval(intervalRef.current);
        iteration += 1 / 3;
      }, 30);
    };

    const handleMouseLeave = () => {
      clearInterval(intervalRef.current);
      setText(originalText);
    };

    return (
      <a
        href="#"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className="nav-link"
      >
        [{text}]
      </a>
    );
  };

  const ContactLink = () => (
    <a href="#" className="contact-link">
      CONTACT ME
      <span className="arrow-container">
        <span className="arrow default-arrow">↗</span>
        <span className="arrow hover-arrow">→</span>
      </span>
      <span className="underline"></span>
    </a>
  );

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="#" className={`logo ${isMenuOpen ? "logo-center" : ""}`}>
            <div>YASH</div>
            <div>SHARMA</div>
          </a>

          <nav className="nav-desktop">
            <NavLink>ABOUT ME</NavLink>
            <NavLink>WORKS</NavLink>
            <NavLink>SERVICES</NavLink>
            <NavLink>CONNECT</NavLink>
          </nav>

          <div className="contact-desktop">
            <ContactLink />
          </div>

          <div
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`line line1 ${isMenuOpen ? "rotate45" : ""}`}></span>
            <span className={`line line2 ${isMenuOpen ? "hide" : ""}`}></span>
            <span className={`line line3 ${isMenuOpen ? "-rotate45" : ""}`}></span>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <NavLink>ABOUT ME</NavLink>
            <NavLink>WORKS</NavLink>
            <NavLink>SERVICES</NavLink>
            <NavLink>CONNECT</NavLink>
            <div className="mobile-contact-wrapper">
              <ContactLink />
            </div>
          </nav>
        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');
        
        body {
          background-color: #f5f5f5; /* Ensure body has a background */
        }

        .header {
          width: 100%;
          background: #f5f5f5;
          position: relative;
          font-family: 'Roboto Mono', monospace;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          z-index: 100;
        }

        .container {
          max-width: 1920px;
          margin: 0 auto;
          padding: 32px 48px; /* Increased padding for bigger header */
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          height: 100px; /* Increased height */
        }

        .logo {
          font-weight: 700;
          font-size: 24px; /* Bigger logo */
          line-height: 1;
          text-decoration: none;
          color: #1a1a1a;
          transition: transform 0.3s ease;
        }
        .logo-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-desktop {
          display: flex;
          gap: 64px; /* Bigger spacing for larger header */
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-link {
          text-transform: uppercase;
          font-weight: 400; /* Reduced font weight */
          font-size: 18px; /* Increased size */
          color: #555;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #000;
        }

        .contact-desktop {
          display: block;
        }

        .contact-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 18px; /* Increased size */
          color: #000;
          text-decoration: none;
        }
        
        .arrow-container {
          display: inline-block;
          position: relative;
          width: 1.2em;
          height: 1em;
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .contact-link .arrow {
          position: absolute;
          inset: 0;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease;
        }

        .contact-link .hover-arrow {
          transform: translateX(-100%);
          opacity: 0;
        }

        .contact-link:hover .default-arrow {
          transform: translateX(100%);
          opacity: 0;
        }

        .contact-link:hover .hover-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        .contact-link .underline {
          position: absolute;
          bottom: -3px;
          left: 0;
          height: 2px;
          width: 100%;
          background: #000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .contact-link:hover .underline {
          transform: scaleX(1);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 28px; /* Slightly bigger */
          height: 20px;
          cursor: pointer;
          z-index: 120;
          position: absolute;
          right: 48px;
        }

        .hamburger .line {
          height: 2px;
          width: 100%;
          background: #000;
          transition: all 0.3s ease-in-out;
        }

        .rotate45 {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hide {
          opacity: 0;
        }
        .-rotate45 {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .mobile-menu {
          display: flex;
          position: fixed;
          inset: 0;
          background: #f5f5f5;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);
          z-index: 110;
          justify-content: center;
          align-items: center;
        }
        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 48px;
          text-align: center;
        }

        .mobile-nav .nav-link {
          font-size: 24px; /* Larger mobile nav links */
        }

        .mobile-contact-wrapper {
          margin-top: 16px;
        }

        .mobile-nav .contact-link {
          font-size: 24px; /* Larger mobile contact */
        }

        @media screen and (max-width: 1024px) {
          .nav-desktop, .contact-desktop {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .logo {
            position: absolute;
            left: 32px;
            transform: none;
          }
          .logo.logo-center {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
