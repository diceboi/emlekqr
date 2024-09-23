"use client";

import { useContext } from "react";
import { Context } from "../../Context";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

export default function SecretCheckerModal({ children }) {
  const { openPopup, togglePopup } = useContext(Context);

  return (
    <motion.section
      className={`${
        openPopup ? "fixed" : "hidden"
      } top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center backdrop-brightness-[25%] z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, type: "ease-in-out" }}
    >
      <motion.div
        className="flex flex-col items-center gap-8 relative lg:w-[600px] w-[300px] m-auto bg-[--cream] rounded-2xl shadow-2xl lg:pb-8 lg:px-8 pb-4 px-4 pt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.4 }}
      >
        <button className="group absolute top-4 right-4" onClick={togglePopup}>
          <CgClose className="min-h-6 min-w-6 text-black group-hover:text-[--rose]" />
        </button>
        {children}
      </motion.div>
    </motion.section>
  );
}
