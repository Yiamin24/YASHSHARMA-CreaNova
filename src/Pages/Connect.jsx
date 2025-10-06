import React, { useState, useEffect } from "react";

/* === Instagram Button (Refined Version) === */
const InstagramButton = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        .instagram-btn {
          font-family: 'Space Mono', monospace;
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #333;
          text-decoration: none;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          letter-spacing: 1.5px;
          position: relative;
          padding-bottom: 4px;
          font-weight: 400;
          transition: color 0.3s ease, font-weight 0.3s ease;
        }

        .instagram-btn:hover {
          color: #000;
          font-weight: 700;
        }

        /* --- Underline Animation (Back to Original Style) --- */
        .instagram-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .instagram-btn:hover::after {
          transform: scaleX(1);
        }

        /* --- Arrow Animation --- */
        .arrow-container {
          display: inline-block;
          position: relative;
          width: 1.3em;
          height: 1.1em;
          margin-left: 0.6em;
        }

        .arrow-default,
        .arrow-hover {
          position: absolute;
          left: 0;
          top: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          font-size: 1.1em;
        }

        .arrow-hover {
          transform: translateX(-10px);
          opacity: 0;
        }

        .instagram-btn:hover .arrow-default {
          transform: translateX(10px);
          opacity: 0;
        }

        .instagram-btn:hover .arrow-hover {
          transform: translateX(0);
          opacity: 1;
        }

        .instagram-btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5rem 0 2rem 0;
        }
      `}</style>

      <div className="instagram-btn-container">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-btn"
        >
          DISCUSS THE PROJECT
          <span className="arrow-container">
            <span className="arrow-default">↗</span>
            <span className="arrow-hover">→</span>
          </span>
        </a>
      </div>
    </>
  );
};

/* === Main App === */
const App = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
          
          body {
            margin: 0;
            font-family: 'Share Tech Mono', monospace;
            background-color: #F3F3F3;
            color: #1a1a1a;
          }

          .font-bebas { font-family: 'Bebas Neue', cursive; }
          .font-tech-mono { font-family: 'Share Tech Mono', monospace; }

          .connect-container {
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
          }

          .connect-content {
            width: 100%;
            max-width: 1920px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .header { text-align: center; margin-bottom: 4rem; }
          .header-subtitle { letter-spacing: 0.2em; font-size: 0.875rem; margin-bottom: 1.5rem; }
          .header-title { font-size: 3.75rem; line-height: 1; letter-spacing: -0.05em; display: flex; flex-wrap: wrap; justify-content: center; }
          .header-interlude { letter-spacing: 0.4em; margin: 1rem 0; font-size: 0.875rem; }

          .letter-wrap { display: inline-block; overflow: hidden; line-height: 1em; }
          .letter { display: inline-block; transform: translateY(-120%); opacity: 0; }
          .start-animation .letter {
            animation-name: u-animation;
            animation-duration: 0.8s;
            animation-timing-function: cubic-bezier(0.6, 0.01, -0.05, 0.95);
            animation-fill-mode: forwards;
          }
          @keyframes u-animation {
            0% { transform: translateY(-120%); opacity: 0; }
            50% { transform: translateY(20px); opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .connect-form { width: 100%; max-width: 56rem; }
          .form-layout { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 3rem; }
          .form-field { position: relative; font-weight: 300; }
          .form-label { position: absolute; top: 50%; transform: translateY(-50%); left: 0; font-size: 1rem; color: #888; pointer-events: none; transition: all 0.3s ease; }
          .form-input { background-color: transparent; border: none; border-bottom: 1px solid #1a1a1a; outline: none; transition: border-color 0.3s ease; padding: 0.5rem 0; width: 100%; font-family: 'Share Tech Mono', monospace; font-size: 1rem; font-weight: 300; }
          .form-input:focus { border-bottom-color: #555; }
          .form-input:focus ~ .form-label,
          .form-input:not(:placeholder-shown) ~ .form-label { top: -0.75rem; transform: translateY(0); font-size: 0.75rem; color: #1a1a1a; }

          .budget-section { padding-top: 1rem; margin-bottom: 3rem; font-weight: 300; }
          .budget-label { font-size: 0.875rem; margin-bottom: 1.5rem; display: block; }
          .budget-options { display: flex; flex-wrap: wrap; gap: 2.5rem; }
          .budget-option { font-size: 1.125rem; letter-spacing: 0.05em; background: none; border: none; padding: 0; cursor: pointer; font-family: 'Share Tech Mono', monospace; color: #888; font-weight: 400; transition: color 0.3s ease-in-out, font-weight 0.3s ease-in-out; }
          .budget-option.selected { font-weight: 700; color: #1a1a1a; }
          .budget-option:hover { color: #1a1a1a; }

          /* --- Adjust Great Collaboration text size & spacing --- */
          @media (min-width: 640px) { 
            .connect-container { padding: 1.5rem; } 
            .header-subtitle, .header-interlude { font-size: 1rem; } 
            .header-title { font-size: 6rem; } 
            .budget-option { font-size: 1.25rem; } 
          }

          @media (min-width: 768px) { 
            .connect-container { padding: 2rem; } 
            .header { margin-bottom: 5rem; } 
            .header-title { font-size: 7rem; letter-spacing: -0.02em; } 
            .form-layout { gap: 2.5rem; } 
            .budget-option { font-size: 1.5rem; } 
          }

          @media (min-width: 1024px) { 
            .header-title { font-size: 8rem; letter-spacing: -0.03em; } 
          }

          @media (min-width: 1280px) { 
            .header-title { font-size: 9rem; letter-spacing: -0.025em; } 
          }
        `}
      </style>
      <Connect />
    </>
  );
};

/* === Animated Title === */
const AnimatedTitle = ({ text, baseDelay = 0 }) => {
  const [startAnim, setStartAnim] = useState(false);
  const letters = text.split("").map((letter) => (letter === " " ? "\u00A0" : letter));

  useEffect(() => {
    const timer = setTimeout(() => setStartAnim(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className={`header-title font-bebas ${startAnim ? "start-animation" : ""}`}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <span className="letter-wrap" key={index} aria-hidden="true">
          <span className="letter" style={{ animationDelay: `${baseDelay + index * 50}ms` }}>
            {letter}
          </span>
        </span>
      ))}
    </h1>
  );
};

/* === Connect Section === */
const Connect = () => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", help: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const budgetOptions = ["1K-5K", "5K-10K", "MORE"];

  return (
    <div className="connect-container font-tech-mono">
      <div className="connect-content">
        <header className="header">
          <p className="header-subtitle">LET'S START THE CONVERSATION</p>
          <AnimatedTitle text="GREAT DESIGN" />
          <p className="header-interlude">STARTS WITH</p>
          <AnimatedTitle text="GREAT COLLABORATION" baseDelay={400} />
        </header>

        <form className="connect-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-layout">
            <div className="form-field">
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder=" "
                value={formData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="name" className="form-label">
                YOUR NAME*
              </label>
            </div>

            <div className="form-field">
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-input"
                placeholder=" "
                value={formData.phone}
                onChange={handleInputChange}
              />
              <label htmlFor="phone" className="form-label">
                PHONE*
              </label>
            </div>

            <div className="form-field">
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder=" "
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email" className="form-label">
                YOUR EMAIL*
              </label>
            </div>

            <div className="form-field">
              <input
                type="text"
                id="help"
                name="help"
                className="form-input"
                placeholder=" "
                value={formData.help}
                onChange={handleInputChange}
              />
              <label htmlFor="help" className="form-label">
                HOW CAN I HELP YOU
              </label>
            </div>
          </div>

          <div className="budget-section">
            <label className="budget-label">PROJECT BUDGET (USD)</label>
            <div className="budget-options">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedBudget(option)}
                  className={`budget-option ${
                    selectedBudget === option ? "selected" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* === Instagram Button === */}
          <InstagramButton />
        </form>
      </div>
    </div>
  );
};

export default App;
