import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <style>{`
        .home-container {
          background-color: white;
          min-height: 100vh;
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .home-content {
          text-align: center;
          font-family: Arial, sans-serif;
          color: #000;
        }

        @media (max-width: 768px) {
          .home-content {
            font-size: 1rem;
          }
        }

        @media (min-width: 769px) {
          .home-content {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="home-content">
        <h1>Welcome to Home Page</h1>
        <p>This page is fully responsive up to 1920px width.</p>
      </div>
    </div>
  );
};

export default Home;
