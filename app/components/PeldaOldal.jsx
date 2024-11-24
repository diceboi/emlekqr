"use client"

import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"
import Image from "next/image"
import { LiaDoveSolid } from "react-icons/lia"
import { TbGrave, TbQuote } from "react-icons/tb"
import { useState } from "react"
import { motion } from "framer-motion"

export default function PeldaOldal() {

const [visibleSection, setVisibleSection] = useState("profil");

  return (
    <section className='w-full py-16 bg-white px-4'>
        <div className='flex flex-col gap-8 container m-auto'>
            <H2 classname={"text-[--rose] text-center self-center"}>Hogy fog kinézni az oldal?</H2>
               
            <div className='flex flex-col items-center lg:p-8 rounded-3xl'>

                <div className="overflow-x-scroll sm:overflow-hidden w-full py-8">
                    <div className="flex flex-row gap-4 justify-between lg:justify-center">
                    <button
                        className={`hover:bg-[--cream] py-2 px-4 w-fit transition-all duration-200 rounded-2xl ${visibleSection === "profil" ? "bg-[--cream]" : ""}`}
                        onClick={() => setVisibleSection("profil")}
                    >
                        <H4>Profil</H4>
                    </button>
                    <button
                        className={`hover:bg-[--cream] py-2 px-4 w-fit transition-all duration-200 rounded-2xl ${visibleSection === "story" ? "bg-[--cream]" : ""}`}
                        onClick={() => setVisibleSection("story")}
                    >
                        <H4>Történet</H4>
                    </button>
                    <button
                        className={`hover:bg-[--cream] py-2 px-4 w-fit transition-all duration-200 rounded-2xl ${visibleSection === "media" ? "bg-[--cream]" : ""}`}
                        onClick={() => setVisibleSection("media")}
                    >
                        <H4>Média</H4>
                    </button>
                    <button
                        className={`hover:bg-[--cream] py-2 px-4 w-fit transition-all duration-200 rounded-2xl ${visibleSection === "tributes" ? "bg-[--cream]" : ""}`}
                        onClick={() => setVisibleSection("tributes")}
                    >
                        <H4>Tiszteletnyilvánítás</H4>
                    </button>
                    </div>
                </div>

                <div className="flex flex-col bg-neutral-50 rounded-3xl p-4">
                    {visibleSection === "profil" && (
                    <motion.div 
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:top-[15%] top-16 lg:right-[15%] right-2 rounded-full"}>Borítókép</Paragraph>
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:bottom-[15%] bottom-4 lg:left-[10%] left-0 rounded-full"}>Profilkép</Paragraph>
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:bottom-[10%] bottom-2 lg:right-[15%] right-2 rounded-full"}>Adatok</Paragraph>
                        <Image src="/profil.webp" width={1280} height={1000} alt="Story" />
                    </motion.div>
                    )}
                    {visibleSection === "story" && (
                    <motion.div 
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:top-[20%] top-16 lg:right-[15%] right-2 rounded-full"}>Leírás</Paragraph>
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:bottom-[15%] bottom-4 lg:left-[15%] left-0 rounded-full"}>Képek</Paragraph>
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:top-[12%] top-2 lg:left-[30%] left-16 rounded-full"}>Cím</Paragraph>
                        <Image src="/story.webp" width={1280} height={1000} alt="Story" />
                    </motion.div>
                    )}
                    {visibleSection === "media" && (
                    <motion.div className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:top-[15%] top-16 lg:right-[15%] right-2 rounded-full"}>Képek</Paragraph>
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:bottom-[15%] bottom-4 lg:left-[15%] left-0 rounded-full"}>Videók</Paragraph>
                        <Image src="/media.webp" width={1280} height={1000} alt="Story" />
                    </motion.div>
                    )}
                    {visibleSection === "tributes" && (
                    <motion.div 
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:top-[18%] top-8 lg:right-[15%] right-2 rounded-full"}>Hozzászólások</Paragraph>
                        <Paragraph classname={"animate-pulse px-4 py-2 bg-[--blue] text-white absolute lg:top-[38%] top-20 lg:right-[15%] right-2 rounded-full"}>Válaszok</Paragraph>
                        <Image src="/tributes.webp" width={1280} height={1000} alt="Story" />
                    </motion.div>
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}
