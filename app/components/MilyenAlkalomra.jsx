"use client"

import Image from "next/image"
import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function MilyenAlkalomra() {

    const [sizes, setSizes] = useState({
      initialSize: { height: "400px", marginTop: "0px" },
      hoverSize: { height: "420px", marginTop: "-20px" },
    });
  
    useEffect(() => {
      const updateSizes = () => {
        if (window.innerWidth < 768) {
          setSizes({
            initialSize: { height: "250px", marginTop: "0px" },
            hoverSize: { height: "270px", marginTop: "0px" },
          });
        } else {
          setSizes({
            initialSize: { height: "400px", marginTop: "0px" },
            hoverSize: { height: "420px", marginTop: "-20px" },
          });
        }
      };
  
      updateSizes(); // Run initially
      window.addEventListener("resize", updateSizes); // Update on resize
  
      return () => window.removeEventListener("resize", updateSizes); // Cleanup listener
    }, []);

  return (
    <section className='relative w-full py-20 bg-white overflow-hidden'>
        <div className="flex flex-col lg:gap-20 gap-8 container m-auto px-4">
            <H2 classname={"text-[--rose] border-b border-neutral-200 py-4"}>Milyen alkalomra?</H2>
            <div className='container m-auto flex lg:flex-row flex-col gap-4 items-baseline justify-center z-[1]'>

                <div className="flex flex-col w-full lg:w-1/4 justify-start gap-8 z-10 self-start">
                    <H3 classname={""}>
                        Az emlékérme tökéletes választás:
                    </H3>
                </div>

                <div className="relative group lg:w-1/4 bg-neutral-50 pb-8 rounded-3xl transition-all">
                    <div className="flex flex-col w-full justify-end gap-4 z-10 bg-transparent group-hover:bg-gradient-to-b from-transparent via-[--blue-15] to-transparent group-hover:rounded-3xl transition-all duration-500">
                        <motion.div 
                            className="relative rounded-t-3xl overflow-hidden"
                            initial={sizes.initialSize}
                            whileHover={sizes.hoverSize}
                        >
                            <Image src={"/image-kepek/ajandek.webp"} fill style={{ objectFit: "cover", objectPosition: "center" }} alt="temetes"/>
                        </motion.div>
                        <H4 classname={"text-[--blue] lg:px-8 px-4"}>Emléktárgy, személyes ajándék</H4>
                        <Paragraph classname={"lg:px-8 px-4"}>
                            Emléktárgy, személyes ajándék: Az érme különleges egyedi ajándék, amelyet ajándékozhatunk családtagoknak, hogy közösen őrizzék meg szeretteik emlékét és továbbadhassák a következő generációnak.
                        </Paragraph>
                    </div>
                </div>

                <div className="relative group lg:w-1/4 bg-neutral-50 pb-8 rounded-3xl transition-all">
                    <div className="flex flex-col w-full justify-end gap-4 z-10 bg-transparent group-hover:bg-gradient-to-b from-transparent via-[--blue-15] to-transparent group-hover:rounded-3xl transition-all duration-500">
                        <motion.div 
                        className="relative rounded-t-3xl overflow-hidden"
                        initial={sizes.initialSize}
                        whileHover={sizes.hoverSize}
                        >
                            <Image src={"/image-kepek/halottak-napja.webp"} fill style={{ objectFit: "cover", objectPosition: "center" }} alt="temetes"/>
                        </motion.div>
                        <H4 classname={"text-[--blue] lg:px-8 px-4"}>Halottak napja, mindenszentek napja</H4>
                        <Paragraph classname={"lg:px-8 px-4"}>
                            Ez az ünnep kiváló alkalom arra, hogy az emlékoldalon keresztül megosszuk emlékeinket, és méltó módon tisztelegjünk az elhunytak előtt.
                        </Paragraph>
                    </div>
                </div>

                <div className="relative group lg:w-1/4 bg-neutral-50 pb-8 rounded-3xl transition-all">
                    <div className="flex flex-col w-full justify-end gap-4 z-10 bg-transparent group-hover:bg-gradient-to-b from-transparent via-[--blue-15] to-transparent group-hover:rounded-3xl transition-all duration-500">
                        <motion.div 
                        className="relative rounded-t-3xl overflow-hidden"
                        initial={sizes.initialSize}
                        whileHover={sizes.hoverSize}
                        >
                            <Image src={"/image-kepek/temetes.webp"} fill style={{ objectFit: "cover", objectPosition: "center" }} alt="temetes"/>
                        </motion.div>
                        <H4 classname={"text-[--blue] lg:px-8 px-4"}>Temetés alkalmával</H4>
                        <Paragraph classname={"lg:px-8 px-4"}>
                            Amikor szeretteink végső búcsúztatására készülünk, az emlékérme egy méltó és maradandó megemlékezési módot nyújt.
                        </Paragraph>
                    </div>
                </div>
                
            </div> 
            <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center">
                Hogyan működik?
            </Link>
        </div>
        <div className="absolute lg:bottom-1/4 -bottom-[250px] -left-40 w-[500px] h-[500px] bg-[--blue-15] rounded-full blur-[100px]"></div>
    </section>
  )
}
