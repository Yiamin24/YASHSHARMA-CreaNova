import React from 'react';

// This is a single-file React component.
// For this to work, you MUST have Tailwind CSS configured in your project.
// For a quick test, you can add this script tag to your main `index.html` file's <head> section:
// <script src="https://cdn.tailwindcss.com"></script>

const PortfolioPage = () => {
  return (
    <>
      {/* STYLE BLOCK:
        - Imports 'Bodoni Moda' which closely matches the elegant, high-contrast serif font in the image.
        - Imports 'Roboto Mono' for the clean, monospaced look of the middle text.
        - Defines custom classes for specific font styles and the text-stretch effect.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,700;1,6..96,400&family=Roboto+Mono:wght@400&display=swap');
        
        body {
          background-color: #000;
        }

        /* Applies the Bodoni Moda font family */
        .font-display {
          font-family: 'Bodoni Moda', serif;
        }

        /* Applies the Roboto Mono font family */
        .font-mono-custom {
          font-family: 'Roboto Mono', monospace;
        }

        /* Creates the stretched text effect for the main title.
          - 'transform: scaleX(1.25)' horizontally stretches the text.
          - 'transform-origin: left' ensures the text stretches from the left edge, keeping it aligned to the left margin.
          - 'letter-spacing' adds a little space between characters for a more refined look.
        */
        .title-stretch {
            transform: scaleX(1.25);
            transform-origin: left;
            letter-spacing: 0.025em;
        }
      `}</style>

      {/* MAIN CONTAINER (Full Page):
        - `bg-black text-white min-h-screen`: Sets the black background, white text, and ensures the container takes up at least the full height of the screen.
        - `flex items-center justify-center`: This is crucial for centering the content perfectly, especially on screens wider than 1920px.
        - `p-8`: Adds padding around the edges of the screen.
      */}
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-8 selection:bg-white selection:text-black">
        
        {/* CONTENT WRAPPER:
          - `w-full max-w-[1920px]`: The content will fill the width of the screen UP TO a maximum of 1920px.
          - `h-[90vh]`: Sets the height to be 90% of the viewport height, creating nice vertical margins.
          - `flex flex-col justify-between`: THIS IS THE KEY TO THE PLACEMENT. It arranges its children (header, main, footer) in a vertical column and distributes space between them, pushing the header to the top, footer to the bottom, and centering the main content.
        */}
        <div className="w-full max-w-[1920px] h-[90vh] flex flex-col justify-between">
          
          {/* Header Section: YASH SHARMA '25 */}
          <header>
            {/* The text is left-aligned by default, matching the image perfectly. */}
            <h1 className="font-display font-bold text-6xl sm:text-8xl lg:text-9xl xl:text-[11rem] title-stretch">
              YASH SHARMA
              <span className="text-5xl sm:text-7xl lg:text-8xl xl:text-[10rem]">'25</span>
            </h1>
          </header>

          {/* Middle Section: Navigation and Info */}
          {/* `flex justify-between` places the first item (About) on the left, the last item (Contact) on the right, and the middle item takes the remaining space. */}
          <main className="w-full flex justify-between items-center text-xs sm:text-sm font-mono-custom tracking-widest uppercase">
            <button className="hover:opacity-75 transition-opacity">(ABOUT)</button>
            <span className="hidden md:inline text-center px-4">MIXING INTERACTIONS, CODE, & IMAGINATION</span>
            <button className="hover:opacity-75 transition-opacity">(CONTACT)</button>
          </main>

          {/* Footer Section: DESIGN - FOLIO */}
          {/* `text-right` aligns the text to the far right, exactly as seen in the image. */}
          <footer className="w-full text-right">
            <h2 className="font-display italic text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
              DESIGN - FOLIO
            </h2>
          </footer>

        </div>
      </div>
    </>
  );
};

export default PortfolioPage;