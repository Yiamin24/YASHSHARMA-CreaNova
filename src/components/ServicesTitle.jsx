import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WorksTitle = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, margin: "-100px" });

  const letters = "SERVICES".split("");

  // Container variants for staggered ripple effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
    exit: {
      transition: { staggerChildren: 0.06, staggerDirection: -1 }, // reverse ripple
    },
  };

  // Individual letter animation variants
  const letterVariants = {
    hidden: { y: "120%", x: "-15%", opacity: 0, rotateX: 15 },
    visible: {
      y: "0%",
      x: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 400, damping: 20, mass: 0.7 },
    },
    exit: {
      y: "120%",
      x: "-15%",
      opacity: 0,
      rotateX: 15,
      transition: { type: "spring", stiffness: 400, damping: 20, mass: 0.7 },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        .works-title-container {
          display: flex;
          justify-content: center;
          margin: 5rem 0;
          cursor: pointer;
          gap: 0.25em; /* improved letter spacing */
          font-family: 'Anton', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          text-transform: uppercase;
          color: #000; /* simple black */
        }
      `}</style>

      <motion.h1
        ref={titleRef}
        className="works-title-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "exit"} // scroll in / out
      >
        {letters.map((char, idx) => (
          <motion.span
            key={idx}
            variants={letterVariants}
            whileHover={{
              scale: 1.08,
              x: 5, // diagonal shift
              y: 5,
              transition: { duration: 0.3, delay: idx * 0.05 },
            }}
            style={{ display: "inline-block", perspective: 1000 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </>
  );
};

export default WorksTitle;
