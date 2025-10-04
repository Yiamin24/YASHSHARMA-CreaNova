import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import LandingPage from "./components/LandingPage"; // ✅ Corrected path

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-500">
      {loading ? <Loader isFinished={!loading} /> : <LandingPage />} 
      {/* ✅ Show LandingPage after loader */}
    </div>
  );
}

export default App;
