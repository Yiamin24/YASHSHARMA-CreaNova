import React, { useState, useEffect } from "react";
import Loader from "./components/loader";
import Door from "./components/Door";
import Home from "./Pages/Home";
import RibbonCursor from "./components/RibbonCursor";

function App() {
  const [loading, setLoading] = useState(true);
  const [doorVisible, setDoorVisible] = useState(false);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setDoorVisible(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleDoorOpen = () => {
    setShowHome(true);
    setDoorVisible(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-500"
      style={{ cursor: "none" }} // removes the default cursor
    >
      {/* Custom Ribbon Cursor */}
      <RibbonCursor />

      {/* Loader */}
      {loading && <Loader isFinished={!loading} />}

      {/* Door Animation */}
      {!loading && doorVisible && !showHome && <Door onOpen={handleDoorOpen} />}

      {/* Home Page */}
      {showHome && <Home />}
    </div>
  );
}

export default App;
