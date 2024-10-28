"use client"

import { motion } from "framer-motion"

export default function Label({children, classname}) {
  return (
    <motion.label
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 0.4, bounce: "spring" }}
    className={`font-bold xl:text-7xl md:text-6xl text-5xl tracking-tighter ${classname}`}
    >
        {children}
    </motion.label>
  )
}
