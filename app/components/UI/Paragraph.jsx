"use client"

import { motion } from "framer-motion"

export default function Paragraph({children, classname}) {
  return (
    <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1}}
    transition={{ duration: 0.4}}
    className={`font-light xl:text-lg md:text-md text-sm tracking-normal ${classname}`}
    >
        {children}
    </motion.p>
  )
}
