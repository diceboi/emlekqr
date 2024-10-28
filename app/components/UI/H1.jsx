"use client"

import { motion } from "framer-motion"

export default function H1({children, classname}) {
  return (
    <motion.h1
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    className={`font-bold xl:text-7xl md:text-6xl text-5xl tracking-tighter ${classname}`}
    >
        {children}
    </motion.h1>
  )
}
