"use client"

import { motion } from "framer-motion"

export default function H3({children, classname}) {
  return (
    <motion.h3
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 0.4, bounce: "spring" }}
    className={`font-bold xl:text-7xl md:text-6xl text-5xl tracking-tighter ${classname}`}
    >
        {children}
    </motion.h3>
  )
}
