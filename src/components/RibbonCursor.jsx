import React, { useState, useEffect } from "react";

const words = [
  "Interactive Design",
  "Responsive Layouts",
  "Motion Design",
  "Modern UI",
  "Creative Interfaces",
  "Intuitive UX",
  "Dynamic Components",
  "Sleek Design",
  "Engaging Experiences",
  "Minimalist Design",
  "Adaptive Interfaces"
  ,"Fluid Layouts",
  "Vibrant UI",
  "Polished Interfaces",
  "Seamless UX",
  "Clean Design",
  "Elegant UI",
  "Bold Typography",
  "Innovative Design",
  "Smart Interactions",
  "User-Friendly Interfaces",
  "Functional Design",
  "Visual Design",
  "Stylish UI",
  "Smooth Animations",
  "Cutting-Edge Design",
  "Fast Loading UI",
  "Efficient Code",
  "Accessible Design"
];

const AnimatedCursor = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="animated-cursor"
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
      >
        <div className="words-wrapper">
          {words.map((word, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        body {
          cursor: none;
        }

        .animated-cursor {
          position: fixed;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
        }

        .words-wrapper {
          display: flex;
          flex-wrap: nowrap;
          font-size: 14px;
          font-weight: 500;
        }

        .words-wrapper span {
          margin-right: 10px;
          color: #000;
          opacity: 0;
          transform: translateY(-20px);
          animation: floatIn 1s forwards;
        }

        @keyframes floatIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedCursor;
