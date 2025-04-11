"use client"

import Image from "next/image"
import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Arrow from "./Animations/Arrow"
import Camel from "./Animations/Camel"
import Hearth from "./Animations/Hearth"

export default function Fotomontazs() {

    const containerRef = useRef(null);

    // Figyeli az adott container görgetési helyzetét
    const { scrollYProgress } = useScroll({
        target: containerRef, 
        offset: ["start start", "end start"]
    });

    // Az opacity csökken 1-ről 0-ra
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // A szöveg felfelé mozog -50px-ig
    const translateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    return(
        <section className="py-8">
            <div className="flex flex-col gap-40 items-center">
                <div className="relative lg:min-h-[150vh] min-h-[130vh] w-full flex items-center justify-center -mb-[40vh] -mt-[40vh]">
                    <motion.h2 
                        className="font-bold xl:text-7xl md:text-5xl text-4xl tracking-tighter text-center text-[--rose] 
                                   sticky top-[30vh]"
                        style={{ y: translateY }}
                    >
                        Pillanatok, amik<br></br>nem merülhetnek feledésbe
                    </motion.h2>
                </div>


                <div className="flex flex-col bg-neutral-50 z-10 px-4 w-full overflow-hidden pb-20">

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: .4, ease: 'easeOut' }}
                        className="relative lg:w-[80vw] w-[120vw] lg:h-[80vh] h-[40vh] overflow-hidden lg:border-[20px] border-4 border-white shadow-2xl lg:-ml-0 -ml-[32vw]">
                            <Image src="/image-kepek/nagypapa-tortenetei.webp" alt="Fotómontázs kép 1" fill style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                            <H2 classname={'text-white z-20 absolute lg:bottom-8 bottom-4 lg:right-8 right-4 text-right'}>Nagypapa<br></br>legendás<br></br>történetei</H2>
                    </motion.div>

                    <div className="flex lg:flex-col flex-row gap-8 z-10 w-full lg:-mt-20 -mt-12">

                        <div className="flex flex-row w-full">
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y:0 }}
                            transition={{ duration: .4, ease: 'easeIn' }}
                            className="relative lg:w-5/12 w-[50vw] lg:h-[80vh] h-[30vh] overflow-hidden lg:border-[20px] border-4 border-white shadow-2xl lg:ml-20 ml-0 lg:-mr-0 -mr-[20vw]">
                                <Image src="/image-kepek/csaladi-pillanatok.webp" alt="Fotómontázs kép 1" fill style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                                <H2 classname={'lg:block hidden text-white z-20 absolute lg:bottom-8 bottom-4 lg:left-8 left-4 text-left'}>Ikonikus<br></br>pillanatok</H2>
                            </motion.div>
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y:0 }}
                            transition={{ duration: .4, ease: 'easeIn' }}
                            className="relative lg:w-8/12 w-[110vw] lg:h-[80vh] h-[40vh] overflow-hidden lg:border-[20px] border-4 border-white shadow-2xl lg:mt-40 mt-32 lg:-ml-10 lg:-mr-0 -mr-[20vw]">
                                <Image src="/image-kepek/vicces-pillanatok.webp" alt="Fotómontázs kép 1" fill style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                                <H2 classname={'text-white z-20 absolute lg:top-8 top-4 lg:left-8 left-4 text-left'}>Vicces<br></br>sztorik</H2>
                            </motion.div>
                        </div>

                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: .4, ease: 'easeIn' }}
                        className="relative lg:w-[80vw] w-[120vw] lg:h-[80vh] h-[40vh] overflow-hidden lg:border-[20px] border-4 border-white shadow-2xl rotate-45 -mt-20 lg:-ml-0 -ml-[32vw]">
                            <Image src="/image-kepek/elso-nyaralas.webp" alt="Fotómontázs kép 1" fill style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                            <H2 classname={'text-white z-20 absolute lg:bottom-8 bottom-4 lg:left-8 left-[32vw] text-left'}>Az első<br></br>közös<br></br>nyaralás</H2>
                    </motion.div>

                    <div className="flex flex-col gap-8 z-10 w-full -mt-20">

                        <div className="flex flex-row w-full">
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y:0 }}
                            transition={{ duration: .4, ease: 'easeIn' }}
                            className="relative lg:w-8/12 w-[100vw] lg:h-[80vh] h-[40vh] overflow-hidden lg:border-[20px] border-4 border-white shadow-2xl lg:mt-40 mt-32 lg:-ml-10 ml-4 lg:-mr-0 -mr-[32vw] z-10">
                                <Image src="/image-kepek/eletre-szolo-szerelmek.webp" alt="Fotómontázs kép 1" fill style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                                <H2 classname={'text-white z-20 absolute lg:bottom-8 bottom-4 lg:right-8 right-12 text-right'}>Életre szóló<br></br>szerelmek</H2>
                            </motion.div>
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y:0 }}
                            transition={{ duration: .4, ease: 'easeIn' }}
                            className="relative lg:w-5/12 w-[50vw] lg:h-[80vh] h-[30vh] overflow-hidden lg:border-[20px] border-4 border-white shadow-2xl lg:ml-8 -ml-28 ">
                                <Image src="/image-kepek/trombita.webp" alt="Fotómontázs kép 1" fill style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                                <H2 classname={'lg:block hidden text-white z-20 absolute lg:bottom-8 bottom-4 lg:left-8 left-4 text-left'}>Bolondos<br></br>dallamok</H2>
                            </motion.div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}