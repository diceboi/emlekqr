'use client'; 

import { useState } from "react";

const BackgroundSwitcher = ({ children }) => {
  // Define different background images here
  const backgroundImages = [
    "/hatterek/hatter-1.webp",
    "/hatterek/hatter-2.webp",
    "/hatterek/hatter-3.webp",
    "/hatterek/hatter-4.webp",
    "/hatterek/hatter-5.webp",
    "/hatterek/hatter-6.webp",
    "/hatterek/hatter-7.webp",
  ];

  // Initialize state for the selected background
  const [currentBackground, setCurrentBackground] = useState(backgroundImages[0]);

  // Handler to switch the background
  const handleBackgroundChange = (image) => {
    setCurrentBackground(image);
  };

  return (
    <div
      className="relative w-full px-2 lg:px-0 py-10 lg:py-20"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {children}

      {/* Add background switcher buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {backgroundImages.map((image, index) => (
          <button
            key={index}
            className="p-2 bg-white border rounded"
            onClick={() => handleBackgroundChange(image)}
          >
            Background {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSwitcher;
