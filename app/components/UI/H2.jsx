"use client"

import { motion } from "framer-motion"

export default function H2({children, classname}) {
  return (
    <motion.h2
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 0.4, bounce: "spring" }}
    className={`font-bold xl:text-5xl md:text-4xl text-3xl tracking-tighter ${classname}`}
    >
        {children}
    </motion.h2>
  )
}
