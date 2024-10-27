"use client";

import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

export default function Modal({ children, openstate, onClose }) {
  if (!openstate) return null;

  return (
    <motion.section
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button className="absolute top-4 right-4" onClick={onClose}>
          <CgClose className="w-6 h-6 text-gray-700 hover:text-red-500" />
        </button>
        {children}
      </motion.div>
    </motion.section>
  );
}
