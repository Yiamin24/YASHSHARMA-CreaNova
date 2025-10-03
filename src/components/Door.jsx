// src/components/Door.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Door = ({ onOpen }) => {
  const [doorOpen, setDoorOpen] = useState(false);

  const handleClick = () => {
    setDoorOpen(true);
  };

  return (
    <div className="door-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&display=swap');

        .door-container {
          width: 100vw;
          height: 100vh;
          background: #0f0f12;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .doors-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          perspective: 1500px;
          max-width: 1920px;
          cursor: pointer;
        }

        .door {
          flex: 1;
          height: 100%;
          background: linear-gradient(to bottom, #111827, #0a0a0f);
          border: 2px solid #0ff;
          box-shadow: 0 0 20px #0ff, 0 0 40px rgba(0, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .door-left {
          border-right: 1px solid #0ff;
        }

        .door-right {
          border-left: 1px solid #0ff;
        }

        .door-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: #0ff;
          letter-spacing: 5px;
          text-shadow: 0 0 10px #0ff, 0 0 20px rgba(0, 255, 255, 0.5);
          user-select: none;
        }

        @media (max-width: 768px) {
          .door-title {
            font-size: clamp(2rem, 10vw, 4rem);
          }
        }
      `}</style>

      <AnimatePresence>
        {!doorOpen && (
          <motion.div
            key="doors"
            className="doors-wrapper"
            onClick={handleClick}
          >
            {/* Left Door */}
            <motion.div
              className="door door-left"
              animate={{ rotateY: doorOpen ? -120 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
              onAnimationComplete={() => {
                if (doorOpen && onOpen) onOpen(); // Trigger Home only after animation
              }}
            >
              <h1 className="door-title">YASH</h1>
            </motion.div>

            {/* Right Door */}
            <motion.div
              className="door door-right"
              animate={{ rotateY: doorOpen ? 120 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "right center" }}
            >
              <h1 className="door-title">25</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Door;
