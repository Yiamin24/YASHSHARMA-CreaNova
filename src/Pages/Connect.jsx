import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* === Instagram Button === */
const InstagramButton = () => (
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
      .instagram-btn:hover { color: #000; font-weight: 700; }
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
      .instagram-btn:hover::after { transform: scaleX(1); }

      .arrow-container { display: inline-block; position: relative; width: 1.3em; height: 1.1em; margin-left: 0.6em; }
      .arrow-default, .arrow-hover { position: absolute; left: 0; top: 0; transition: transform 0.3s ease, opacity 0.3s ease; font-size: 1.1em; }
      .arrow-hover { transform: translateX(-10px); opacity: 0; }
      .instagram-btn:hover .arrow-default { transform: translateX(10px); opacity: 0; }
      .instagram-btn:hover .arrow-hover { transform: translateX(0); opacity: 1; }

      .instagram-btn-container { display: flex; justify-content: center; align-items: center; padding: 5rem 0 2rem 0; }
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

/* === Animated Curtain Title with Wave + Elastic Effect === */
const AnimatedTitle = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const letters = text.split("").map((l) => (l === " " ? "\u00A0" : l));

  return (
    <motion.h1
      ref={ref}
      style={{
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        fontFamily: "'Bebas Neue', cursive",
        fontWeight: 700,
        fontSize: "6rem",
        lineHeight: 1,
        letterSpacing: "0.1em", // improved letter gap
      }}
    >
      {letters.map((char, idx) => (
        <motion.span
          key={idx}
          style={{ display: "inline-block", perspective: 1000 }}
          initial={{ y: "120%", x: "-15%", opacity: 0, rotateX: 15 }}
          animate={
            isInView
              ? { y: "0%", x: "0%", opacity: 1, rotateX: 0 }
              : { y: "120%", x: "-15%", opacity: 0, rotateX: 15 }
          }
          transition={{
            delay: idx * 0.04 + delay,
            type: "spring",
            stiffness: 400,
            damping: 20,
            mass: 0.7, // elastic bounce feel
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/* === Connect Section === */
const Connect = () => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", help: "" });
  const budgetOptions = ["1K-5K", "5K-10K", "MORE"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="connect-container font-tech-mono">
      <div className="connect-content">
        <header className="header">
          <p className="header-subtitle">LET'S START THE CONVERSATION</p>
          <AnimatedTitle text="GREAT DESIGN" delay={0} />
          <p className="header-interlude">STARTS WITH</p>
          <AnimatedTitle text="GREAT COLLABORATION" delay={0.4} />
        </header>

        <form className="connect-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-layout">
            {["name", "phone", "email", "help"].map((field, idx) => (
              <div key={idx} className="form-field">
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  className="form-input"
                  placeholder=" "
                  value={formData[field]}
                  onChange={handleInputChange}
                />
                <label htmlFor={field} className="form-label">
                  {field === "help" ? "HOW CAN I HELP YOU" : field.toUpperCase() + "*"}
                </label>
              </div>
            ))}
          </div>

          <div className="budget-section">
            <label className="budget-label">PROJECT BUDGET (USD)</label>
            <div className="budget-options">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedBudget(option)}
                  className={`budget-option ${selectedBudget === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <InstagramButton />
        </form>
      </div>
    </div>
  );
};

/* === Main App === */
const App = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
      body { margin:0; font-family: 'Share Tech Mono', monospace; background-color: #F3F3F3; color:#1a1a1a; }
      .font-bebas { font-family: 'Bebas Neue', cursive; }
      .font-tech-mono { font-family: 'Share Tech Mono', monospace; }

      .connect-container { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1rem; }
      .connect-content { width:100%; max-width:1920px; margin:0 auto; display:flex; flex-direction:column; align-items:center; }

      .header { text-align:center; margin-bottom:4rem; }
      .header-subtitle { letter-spacing:0.2em; font-size:0.875rem; margin-bottom:1.5rem; }
      .header-interlude { letter-spacing:0.4em; margin:1rem 0; font-size:0.875rem; }

      .header-title { font-size:6rem; line-height:1; letter-spacing:0.1em; font-weight:700; } /* improved letter spacing */
      @media (min-width:768px){ .header-title { font-size:7rem; letter-spacing:0.12em; } }
      @media (min-width:1024px){ .header-title { font-size:8rem; letter-spacing:0.12em; } }
      @media (min-width:1280px){ .header-title { font-size:9rem; letter-spacing:0.12em; } }

      .connect-form { width:100%; max-width:56rem; }
      .form-layout { display:flex; flex-direction:column; gap:2rem; margin-bottom:3rem; }
      .form-field { position:relative; font-weight:300; }
      .form-label { position:absolute; top:50%; transform:translateY(-50%); left:0; font-size:1rem; color:#888; pointer-events:none; transition:all 0.3s ease; }
      .form-input { background:transparent; border:none; border-bottom:1px solid #1a1a1a; outline:none; transition:border-color 0.3s ease; padding:0.5rem 0; width:100%; font-size:1rem; font-weight:300; }
      .form-input:focus { border-bottom-color:#555; }
      .form-input:focus ~ .form-label,
      .form-input:not(:placeholder-shown) ~ .form-label { top:-0.75rem; transform:translateY(0); font-size:0.75rem; color:#1a1a1a; }

      .budget-section { padding-top:1rem; margin-bottom:3rem; font-weight:300; }
      .budget-label { font-size:0.875rem; margin-bottom:1.5rem; display:block; }
      .budget-options { display:flex; flex-wrap:wrap; gap:2.5rem; }
      .budget-option { font-size:1.125rem; letter-spacing:0.05em; background:none; border:none; padding:0; cursor:pointer; color:#888; font-weight:400; transition:color 0.3s, font-weight 0.3s; }
      .budget-option.selected, .budget-option:hover { font-weight:700; color:#1a1a1a; }
    `}</style>

    <Connect />
  </>
);

export default App;
