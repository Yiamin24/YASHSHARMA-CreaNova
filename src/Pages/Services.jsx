import React, { useState, useRef, useEffect } from "react";

const Services = () => {
  const servicesData = [
    { id: 1, title: "WEB CRAFTING", img: "/assets/SAVYS.webp" },
    { id: 2, title: "FRONTEND MAGIC", img: "/assets/SNR.webp" },
    { id: 3, title: "BACKEND ENGINEERING", img: "/assets/TXBS.webp" },
    { id: 4, title: "FULL-STACK CREATION", img: "/assets/MOVIEFLIX.webp" },
    { id: 5, title: "MOTION INTERACTION", img: "/assets/FAV.webp" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const listRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!listRef.current) return;
      const rect = listRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const currentRef = listRef.current;
    if (currentRef) currentRef.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (currentRef) currentRef.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getStyledTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 1) {
      return (
        <>
          <span className="font-sans-serif">{words.slice(0, -1).join(" ")}</span>
          <span className="font-serif-italic">{words[words.length - 1]}</span>
        </>
      );
    }
    return <span className="font-serif-italic">{title}</span>;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:ital,opsz,wght@1,6..96,400..900&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --text-services: #ffffff;
          --font-display: 'Anton', sans-serif;
          --font-serif: 'Bodoni Moda', serif;
          --font-mono: 'Space Mono', monospace;
        }

        .services-section-container {
          background-color: #000;
          color: var(--text-services);
          padding: 8rem 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .services-list {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          text-align: center;
          position: relative;
        }

        .service-item {
          padding: 0.5rem 0;
          cursor: pointer;
          font-size: clamp(2.5rem, 8vw, 6.5rem);
          line-height: 1.2;
          text-transform: uppercase;
          transition: opacity 0.4s ease, filter 0.4s ease;
          position: relative;
          white-space: nowrap; /* prevent wrapping */
        }

        .font-sans-serif {
          font-family: var(--font-display);
          letter-spacing: 2px;
          display: inline-block;
          transform: skewX(-12deg);
          margin-right: 0.75em;
        }

        .font-serif-italic {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          letter-spacing: 1.5px;
        }

        .services-list.has-hover .service-item:not(:hover) {
          opacity: 0.2;
          filter: blur(4px);
        }

        .floating-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: clamp(100px, 15vw, 200px);
          height: clamp(120px, 18vw, 240px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
          will-change: transform;
        }

        .floating-image-container.visible {
          opacity: 1;
        }

        .floating-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .static-icon {
          width: 50px;
          height: 50px;
          margin-top: 3rem;
        }

        .bottom-text-container {
          margin-top: 1.5rem;
          text-align: center;
          font-family: var(--font-mono);
          font-size: clamp(0.75rem, 1.5vw, 0.875rem);
          line-height: 1.6;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 768px) {
          .services-section-container {
            padding: 6rem 1rem;
          }
          .service-item {
            font-size: clamp(1.8rem, 4vw, 2.5rem); /* smaller font to fit in one line */
          }
        }
      `}</style>

      <section className="services-section-container">
        <div
          className={`services-list ${hoveredIndex !== null ? "has-hover" : ""}`}
          ref={listRef}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="service-item"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {getStyledTitle(service.title)}
            </div>
          ))}

          <div
            className={`floating-image-container ${hoveredIndex !== null ? "visible" : ""}`}
            style={{
              transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))`,
            }}
          >
            {hoveredIndex !== null && (
              <img src={servicesData[hoveredIndex].img} alt={servicesData[hoveredIndex].title} />
            )}
          </div>
        </div>

        <img src="/assets/FAV.webp" alt="Icon" className="static-icon" />

        <div className="bottom-text-container">
          <p>WHAT I'VE BEEN CRAFTING ALONG THE WAY</p>
          <p>A GLIMPSE INTO THE CREATIVE TOOLS THAT SHAPE MY WORK.</p>
        </div>
      </section>
    </>
  );
};

export default Services;
