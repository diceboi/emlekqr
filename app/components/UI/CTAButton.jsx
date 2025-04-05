"use client";

import Link from "next/link";
import { delay, motion } from "framer-motion";
import { useState } from "react";
import BtnText from "../Typo/BtnText";

export default function CTAButton({
  link,
  text,
  classname,
  onclick,
  scrolled,
  type
}) {
  const [hovered, setHovered] = useState(false);

  // Framer Motion animation variants for falling leaves
  const leafAnimation1 = {
    initial: ({
      x: `${Math.random() * 70 + 150}px`, // Start outside the top-right
      y: `${Math.random() * -50 - 20}%`, // Above and to the right of the button
      rotate: Math.random() * 270, // Random rotation
    }),
    animate: ({
      x: `-${Math.random() * 80 + 50}%`, // Move to bottom-left outside the button
      y: `${Math.random() * 150 + 100}%`, // Move well below the button
      rotate: [0, 180], // Smooth full rotation
      transition: {
        duration: 1.7, // Animation duration
        delay: 0.5,
        ease: "easeOut",
        repeat: Infinity,
      },
    }),
  };

  const leafAnimation2 = {
    initial: ({
      x: `${Math.random() * 40 + 100}px`, // Start outside the top-right
      y: `${Math.random() * -150 - 50}%`, // Above and to the right of the button
      rotate: Math.random() * 270, // Random rotation
    }),
    animate: ({
      x: `-${Math.random() * 90 + 50}%`, // Move to bottom-left outside the button
      y: `${Math.random() * 150 + 100}%`, // Move well below the button
      rotate: [0, 180], // Smooth full rotation
      transition: {
        duration: 4, // Animation duration
        delay: 0.5,
        ease: "easeOut",
        repeat: Infinity,
      },
    }),
  };

  const leafAnimation3 = {
    initial: ({
      x: `${Math.random() * 50 + 100}px`, // Start outside the top-right
      y: `${Math.random() * -50 - 20}%`, // Above and to the right of the button
      rotate: Math.random() * 180, // Random rotation
    }),
    animate: ({
      x: `-${Math.random() * 50 + 50}%`, // Move to bottom-left outside the button
      y: `${Math.random() * 150 + 100}%`, // Move well below the button
      rotate: [0, 90], // Smooth full rotation
      transition: {
        duration: 2.8, // Animation duration
        ease: "easeOut",
        repeat: Infinity,
      },
    }),
  };

  return (
    <motion.button
      initial={{
        opacity: 0,
        scale: 0.5,
        backgroundColor: "var(--yellow)",
        borderRadius: "30px",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 1px 5px, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px, var(--yellow) 0px -3px 0px inset",
      }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{
        backgroundColor: "var(--yellow)",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 2px 20px, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px, var(--yellowhover) 0px -5px 0px inset",
        borderRadius: "30px",
      }}
      transition={{duration: 0.8, type: "spring", bounce: 0.4}}
      className={`group w-fit overflow-hidden relative ${classname}`}
      onMouseEnter={() => setHovered(true)} // Trigger animation on hover
      onMouseLeave={() => setHovered(false)} // Stop animation when unhovered
      onClick={onclick}
      type={type}
    >
      {/* Conditional Leaves Animation */}
      {hovered && (
        <div
          className="absolute inset-0 overflow-hidden"
        >
          {/* Leaf Animations */}
          <motion.div
            className="absolute w-8 h-8"
            style={{
              backgroundImage: `url('/leaf3.svg')`, // Replace with your uploaded leaf image path
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              opacity: 0.7,
              zIndex: 0
            }}
            initial="initial"
            animate="animate"
            variants={leafAnimation1}
          />
          <motion.div
            className="absolute w-8 h-8"
            style={{
              backgroundImage: `url('/leaf3.svg')`, // Replace with your uploaded leaf image path
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              opacity: 0.5,
              zIndex: 20
            }}
            initial="initial"
            animate="animate"
            variants={leafAnimation2}
          />
          <motion.div
            className="absolute w-8 h-8"
            style={{
              backgroundImage: `url('/leaf3.svg')`, // Replace with your uploaded leaf image path
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              opacity: 0.5,
              zIndex: 0
            }}
            initial="initial"
            animate="animate"
            variants={leafAnimation3}
          />
        </div>
      )}
      {/* Button Content */}
      <div className="relative" style={{ zIndex: 10 }}> {/* Ensure text stays above */}
        {link ? (
          <Link href={link}>
            <BtnText
              classname={`px-4 py-2 group-hover:text-black w-full h-full transition-all duration-200`}
            >
              {text}
            </BtnText>
          </Link>
        ) : (
          <BtnText
            classname={`px-4 py-2 group-hover:text-black w-full h-full transition-all duration-200`}
          >
            {text}
          </BtnText>
        )}
      </div>
    </motion.button>
  );
}