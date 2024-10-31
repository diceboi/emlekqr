"use client"

import { motion } from "framer-motion"

export default function H4({children, classname}) {
  return (
    <motion.h4
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 0.4, bounce: "spring" }}
    className={`font-bold xl:text-2xl md:text-2xl text-xl tracking-tighter ${classname}`}
    >
        {children}
    </motion.h4>
  )
}
