"use client"

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import snowfall from "./snowfall.json";

export default function Snowfall({ classname }) {
  const [dimensions, setDimensions] = useState({ width: "100%", height: "100vh" });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setDimensions({ width: "350%", height: "auto" }); // Adjust for mobile
      } else {
        setDimensions({ width: "100%", height: "100vh" }); // Adjust for larger screens
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial dimensions

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Lottie 
      animationData={snowfall} 
      loop={true} 
      style={{
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: dimensions.width,
        height: dimensions.height,
        pointerEvents: 'none'
      }}
      className={classname}
    />
  );
}
