import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ no Router here
import Loader from "./components/Loader";
import LandingPage from "./components/LandingPage";
import Home from "./Pages/Home";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader isFinished={!loading} />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
