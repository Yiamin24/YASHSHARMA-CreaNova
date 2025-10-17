import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/loader.jsx";
import LandingPage from "./components/LandingPage";
import Home from "./Pages/Home";
import Header from "./components/Header"; // Import Header



function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader isFinished={!loading} />;

  return (
    <>
      {/* Show Header only if not on landing page */}
      {location.pathname !== "/" && <Header />}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
