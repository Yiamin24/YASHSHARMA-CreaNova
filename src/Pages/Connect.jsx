import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
// ✅ FIXED: Correct import casing (important on production builds)
import { submitConnectForm } from "../API/Connectapi";

/* === Instagram Button === */
const InstagramButton = ({ onSubmit, loading }) => (
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
        background: none;
        border: none;
        cursor: pointer;
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
      <button type="button" className="instagram-btn" onClick={onSubmit} disabled={loading}>
        {loading ? "SUBMITTING..." : "DISCUSS THE PROJECT"}
        <span className="arrow-container">
          <span className="arrow-default">↗</span>
          <span className="arrow-hover">→</span>
        </span>
      </button>
    </div>
  </>
);

/* === Animated Curtain Title === */
const AnimatedTitle = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.h1
      ref={ref}
      className="animated-title"
      style={{
        overflow: "hidden",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        fontFamily: "'Bebas Neue', cursive",
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
      }}
    >
      {text.split("").map((char, idx) => (
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
            mass: 0.7,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/* === Connect Section === */
const Connect = () => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", help_message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, phone, email, help_message } = formData;
    if (!name || !phone || !email || !help_message || !selectedBudget) {
      alert("Please fill all fields and select a project budget before submitting.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const submitData = { ...formData, budget: selectedBudget };

    try {
      await submitConnectForm(submitData);
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", help_message: "" });
      setSelectedBudget(null);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
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
            {["name", "phone", "email", "help_message"].map((field, idx) => (
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
                  {field === "help_message" ? "HOW CAN I HELP YOU*" : field.toUpperCase() + "*"}
                </label>
              </div>
            ))}
          </div>

          <div className="budget-section">
            <label className="budget-label">PROJECT BUDGET (Rs)</label>
            <div className="budget-options">
              {["1K-5K", "5K-10K", "MORE"].map((option) => (
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

          <InstagramButton onSubmit={handleSubmit} loading={loading} />

          {success && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
              onClick={() => setSuccess(false)}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "2rem 3rem",
                  borderRadius: "1rem",
                  textAlign: "center",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                <h2>Form Submitted Successfully!</h2>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
                <button
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    background: "#1a1a1a",
                    color: "#fff",
                  }}
                  onClick={() => setSuccess(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

/* === App.jsx === */
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

      .animated-title { font-size:6rem; line-height:1; letter-spacing:0.1em; font-weight:700; text-align:center; white-space: nowrap; overflow: hidden; }
      @media (max-width:768px) { 
        .animated-title { font-size:3rem; letter-spacing:0.02em; overflow: hidden; } /* MOBILE FIX */
      }

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
