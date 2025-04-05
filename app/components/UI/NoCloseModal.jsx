"use client";

import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

export default function NoCloseModal({ children, openstate, classname }) {
  if (!openstate) return null;

  return (
    <motion.section
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className={`relative flex flex-col items-center bg-white bg-opacity-75 backdrop-blur-md rounded-2xl shadow-2xl w-[90%] max-w-lg lg:p-8 p-4 ${classname}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
