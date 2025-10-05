import React, { useState } from 'react';

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

          /* Header Styles */
          .header {
            text-align: center;
            margin-bottom: 4rem;
          }
          .header-subtitle {
            letter-spacing: 0.2em;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
          }
          .header-title {
            font-size: 3.75rem;
            line-height: 1;
            letter-spacing: -0.05em;
            display: flex; /* Use flex for better alignment */
            flex-wrap: wrap;
            justify-content: center;
          }
         
          .header-interlude {
            letter-spacing: 0.4em;
            margin: 1rem 0;
            font-size: 0.875rem;
          }
          
          /* NEW: U-Animation for letters */
          .letter-wrap {
            display: inline-block;
            overflow: hidden;
          }
          .letter {
            display: inline-block;
            transform: translateY(-120%);
            opacity: 0;
            animation-name: u-animation;
            animation-duration: 0.8s;
            animation-timing-function: cubic-bezier(0.6, 0.01, -0.05, 0.95);
            animation-fill-mode: forwards;
          }

          @keyframes u-animation {
            0% {
              transform: translateY(-120%);
              opacity: 0;
            }
            50% {
              transform: translateY(20px); /* Bottom of the 'U' */
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          /* Form Styles */
          .connect-form {
            width: 100%;
            max-width: 56rem;
          }
          .form-layout {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 3rem;
          }
          .form-field {
            position: relative;
            font-weight: 300;
          }
          .form-label {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            font-size: 1rem;
            color: #888;
            pointer-events: none;
            transition: all 0.3s ease;
          }
          .form-input {
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #1a1a1a;
            outline: none;
            transition: border-color 0.3s ease;
            padding: 0.5rem 0;
            width: 100%;
            font-family: 'Share Tech Mono', monospace;
            font-size: 1rem;
            font-weight: 300;
          }
          .form-input:focus {
            border-bottom-color: #555;
          }
          .form-input:focus ~ .form-label,
          .form-input:not(:placeholder-shown) ~ .form-label {
            top: -0.75rem;
            transform: translateY(0);
            font-size: 0.75rem;
            color: #1a1a1a;
          }

          /* Budget Section */
          .budget-section {
            padding-top: 1rem;
            margin-bottom: 3rem;
            font-weight: 300;
          }
          .budget-label {
            font-size: 0.875rem;
            margin-bottom: 1rem;
            display: block;
          }
          .budget-options {
            display: flex;
            gap: 2rem;
          }
          .budget-option {
            font-size: 1.125rem;
            letter-spacing: 0.05em;
            background: none;
            border: none;
            cursor: pointer;
            font-family: 'Share Tech Mono', monospace;
            color: #1a1a1a;
            font-weight: 300;
            transition: color 0.3s ease-in-out;
          }
          .budget-option.selected,
          .budget-option:hover {
            color: #555;
          }

          /* Submit Button */
          .submit-container {
            text-align: center;
            padding-top: 3rem;
          }
          .submit-button {
            font-size: 1.125rem;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            letter-spacing: 0.1em;
            position: relative;
            padding-bottom: 0.5rem;
            background: none;
            border: none;
            cursor: pointer;
            font-family: 'Share Tech Mono', monospace;
            font-weight: 300;
          }
          .submit-button svg {
            transition: transform 0.3s ease-in-out;
          }
          .submit-button:hover svg {
            transform: translateX(0.5rem);
          }

          /* Responsive */
          @media (min-width: 640px) {
            .connect-container { padding: 1.5rem; }
            .header-subtitle, .header-interlude { font-size: 1rem; }
            .header-title { font-size: 6rem; }
            .budget-option, .submit-button { font-size: 1.25rem; }
          }
          @media (min-width: 768px) {
            .connect-container { padding: 2rem; }
            .header { margin-bottom: 5rem; }
            .header-title { font-size: 7.5rem; }
            .form-layout { gap: 2.5rem; }
            .budget-option, .submit-button { font-size: 1.5rem; }
            .submit-container { padding-top: 4rem; }
          }
          @media (min-width: 1024px) {
            .header-title { font-size: 160px; }
          }
          @media (min-width: 1280px) {
            .header-title { font-size: 200px; }
          }
        `}
      </style>
      <Connect />
    </>
  );
};

// NEW: Reusable component for the title animation
const AnimatedTitle = ({ text, baseDelay = 0 }) => {
  const letters = text.split("").map((letter) => 
    letter === " " ? "\u00A0" : letter
  );

  return (
    <h1 className="header-title font-bebas" aria-label={text}>
      {letters.map((letter, index) => (
        <span className="letter-wrap" key={index} aria-hidden="true">
          <span
            className="letter"
            style={{ animationDelay: `${baseDelay + index * 50}ms` }}
          >
            {letter}
          </span>
        </span>
      ))}
    </h1>
  );
};

const Connect = () => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    help: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const budgetOptions = ['1K-5K', '5K-10K', 'MORE'];

  return (
    <div className="connect-container font-tech-mono">
      <div className="connect-content">
        <header className="header">
          <p className="header-subtitle">LET'S START THE CONVERSATION</p>
          
          {/* UPDATED: Using the new AnimatedTitle component */}
          <AnimatedTitle text="GREAT DESIGN" />
          <p className="header-interlude">STARTS WITH</p>
          <AnimatedTitle text="GREAT COLLABORATION" baseDelay={300} />

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
              <label htmlFor="name" className="form-label">YOUR NAME*</label>
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
              <label htmlFor="phone" className="form-label">PHONE*</label>
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
              <label htmlFor="email" className="form-label">YOUR EMAIL*</label>
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
              <label htmlFor="help" className="form-label">HOW CAN I HELP YOU</label>
            </div>
          </div>

          <div className="budget-section">
            <label className="budget-label">PROJECT BUDGET (USD)</label>
            <div className="budget-options">
              {budgetOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedBudget(option)}
                  className={`budget-option ${selectedBudget === option ? 'selected' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit-button">
              <span>DISCUSS THE <span className="project-text">PROJECT</span></span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;