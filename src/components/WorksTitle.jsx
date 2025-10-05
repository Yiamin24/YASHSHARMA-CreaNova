import React, { useEffect, useRef, useState } from "react";

const WorksTitle = () => {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        .works-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          color: #000000;
          text-transform: uppercase;
          text-align: center;
          margin: 5rem 0;
          cursor: pointer;
          transition: transform 1s ease, opacity 1s ease;
          opacity: 0;
          transform: translate(-50px, -50px); /* Start top-left */
        }

        /* When visible, animate to bottom-right */
        .works-title.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Hover effect for modern look */
        .works-title:hover {
          color: #333333;
          transform: translate(0, 0) scale(1.05);
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`works-title ${isVisible ? "visible" : ""}`}
      >
        WORKS
      </h1>
    </>
  );
};

export default WorksTitle;
