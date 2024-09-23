"use client"

import { useEffect, useState } from "react";

export default function GenerateRandomNumber() {

const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    // Generate a random 6-digit number
    const generateRandomNumber = () => {
      const number = Math.floor(100000 + Math.random() * 900000); // Ensures 6 digits
      return number;
    };

    setRandomNumber(generateRandomNumber());
  }, []);

  return (
    <p className="text-center">Rendelési azonosítód: <strong>{randomNumber}</strong></p>
  )
}
