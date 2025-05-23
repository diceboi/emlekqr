"use client"

import { motion } from "framer-motion"

export default function Label({children, classname}) {
  return (
    <label
    className={` xl:text-md md:text-sm text-xs tracking-normal ${classname}`}
    >
        {children}
    </label>
  )
}
