import React, { useEffect, useState } from "react";
import "./LoadingBar.css";

function LoadingBar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // simulate page load
  }, []);

  return (
    loading && (
      <div className="loading-container">
        <div className="loading-bar"></div>
      </div>
    )
  );
}

export default LoadingBar;
