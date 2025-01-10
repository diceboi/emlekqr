"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import {
  TbHammer,
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import Paragraph from "./UI/Paragraph";

export default function Hasznalata() {
  const parentRef = useRef(null);
  const [activeDiv, setActiveDiv] = useState(0); // Tracks which div is active

  useEffect(() => {
    const thresholds = [10, -0.6, -1.4, -2.2, -3, -3.8, -4.6, -5.4]; // Add thresholds for each div in vh units

    const handleScroll = () => {
      if (!parentRef.current) return;

      const parentTop = parentRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Find the current active div based on the thresholds
      const relativeScroll = parentTop / viewportHeight;
      const newActiveDiv = thresholds.findIndex(
        (threshold, index) =>
          relativeScroll <= threshold &&
          (index === thresholds.length - 1 ||
            relativeScroll > thresholds[index + 1])
      );

      // Update the active div only if it changes
      if (newActiveDiv !== activeDiv) {
        setActiveDiv(newActiveDiv);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeDiv]);

  return (
    <section id="hasznalata" className="flex justify-center items-center w-full min-h-[50vh] px-4 py-28">
      <div className="flex flex-col gap-16 container ">
        <div
          ref={parentRef}
          className="relative hidden lg:flex flex-nowrap gap-16"
        >
          <div className="flex flex-col gap-16 w-2/5">
            <H2 classname={"text-[--rose] text-left"}>Hogy működik?</H2>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Válassz érmét</H3>
              <Paragraph>
                Válassz egy érmét ami az emlékoldaladra fog vezetni és amit
                elpostázunk neked.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Olvasd be</H3>
              <Paragraph>
                Ha kézhez kaptad az emlékérmét, a QR-kódot beolvasva
                létrehozhatod a hozzá tartozó egyedi emlékoldalt.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Szerkeszd online</H3>
              <Paragraph>
                Szerkeszd szabadon az emlékoldal profilt azon szeretted
                történetével, akinek emlékét szeretnéd örökre megőrizni.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Mesélj el egy történetet</H3>
              <Paragraph>
                Meséld el szeretted élettörténetét, töltsd meg az adatlapot
                korlátlan mennyiségű fotóval és videóval.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Helyezd el</H3>
              <Paragraph>
                Helyezd el a QR-kódos érmét azon az emlékhelyen, ahol szeretnéd
                az egyedi oldalt elérhetővé tenni (sírhely, emlékmű, közös
                emlékhely) - az arra járók a QR-kódot beolvasva az emlékoldalon
                keresztül gyönyörködhetnek szeretteid legszebb emlékeiben,
                fotóiban.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Emlékezz meg bármikor bárhonnan</H3>
              <Paragraph>
                Emlékezzetek meg közösen - bárki hozzászólhat az általad
                létrehozott emlékoldalhoz, lehetőséget kínálva azok számára is
                akik távol vannak, vagy egyszerűen egy kedves emléket szeretne
                hozzáfűzni akár ünnepekkor, mindenszentekkor, vagy az év bármely
                napján.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">Keress rá</H3>
              <Paragraph>
                Az emlékoldal elérhető az emlek-qr.hu weboldalunkon keresztül is
                a kereső segítségével - írd be annak a nevét vagy születési
                idejét, akinek az emlékoldalát keresed és tekintsd meg online
                bárhol, bármikor.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-8 min-h-[80vh] scroll-section">
              <H3 classname="text-[--blue]">
                Digitalizált emlékoldal az utókornak
              </H3>
              <Paragraph>
                Az így létrehozott digitális emlékgyűjtemény a modern
                technológiának köszönhetően innovatív módon őrzi generációkon át
                a családi emlékeket, bárhol és bármikor elérhető és megosztható
                szeretteiddel, barátaiddal, valamint folyamatosan bővíthető.
              </Paragraph>
            </div>
          </div>
          <div className="sticky top-40 flex flex-col bg-[--cream] rounded-3xl w-3/5 h-[77vh]">
            {activeDiv === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/kor-erme.webp"
                  alt="Kör érme"
                  className="absolute top-[10%] left-[10%] w-[150px] h-[150px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: "-45%", x: "-50%" }}
                  whileInView={{ opacity: "100%", y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/negyzet-erme.webp"
                  alt="Kör érme"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[300px] h-[300px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/oval-erme.webp"
                  alt="Kör érme"
                  className="absolute bottom-[10%] right-[10%] w-[150px] h-[150px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "10%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/circle.svg"
                  alt="Kör érme"
                  className="absolute top-[-50%] right-[10%] w-[500px] h-[500px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "10%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/oval.svg"
                  alt="Kör érme"
                  className="absolute -left-1/4  top-1/2 -translate-y-1/2 w-[500px] h-[500px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "10%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/square.svg"
                  alt="Kör érme"
                  className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px]"
                />
              </motion.div>
            )}

            {activeDiv === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/scan.webp"
                  alt="Kör érme"
                  className="absolute bottom-0 left-0 w-full h-auto"
                />
              </motion.div>
            )}

            {activeDiv === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col justify-between w-full h-full overflow-hidden"
              >
                <div className="relative flex flex-nowrap w-full px-16 min-h-[200px]">
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    animate={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.2 }}
                    src="/image-kepek/szerkeszd-online-2.webp"
                    alt="Kör érme"
                    className="absolute top-10 left-20"
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.4 }}
                    src="/image-kepek/szerkeszd-online-3.webp"
                    alt="Kör érme"
                    className="absolute top-20 right-20"
                  />
                </div>
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/szerkeszd-online-1.webp"
                  alt="Kör érme"
                  className="z-10"
                />
              </motion.div>
            )}

            {activeDiv === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-8 w-full items-center justify-start overflow-hidden p-8"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/meselj-el-1.webp"
                  alt="Mesélj el egy történetet"
                  className=""
                />
                <div className="grid grid-cols-3 grid-rows-1 gap-2">
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    animate={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.1 }}
                    src="/image-kepek/meselj-el-2.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.2 }}
                    src="/image-kepek/meselj-el-3.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.3 }}
                    src="/image-kepek/meselj-el-4.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    animate={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.4 }}
                    src="/image-kepek/meselj-el-5.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.5 }}
                    src="/image-kepek/meselj-el-6.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.6 }}
                    src="/image-kepek/meselj-el-7.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                </div>
              </motion.div>
            )}

            {activeDiv === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center w-full h-full overflow-hidden relative"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/helyezd-el-2.webp"
                  alt="Kör érme"
                  className="rounded-3xl"
                />
              </motion.div>
            )}

            {activeDiv === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex flex-col items-center justify-start w-full h-full overflow-hidden"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.1 }}
                  src="/image-kepek/emlekezz-1.webp"
                  alt="Kör érme"
                  className=""
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.2 }}
                  src="/image-kepek/emlekezz-2.webp"
                  alt="Kör érme"
                  className="-mt-10"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.3 }}
                  src="/image-kepek/emlekezz-3.webp"
                  alt="Kör érme"
                  className="-mt-10"
                />
              </motion.div>
            )}

            {activeDiv === 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/keress-1.webp"
                  alt="Kör érme"
                  className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.4 }}
                  src="/image-kepek/keress-2.webp"
                  alt="Kör érme"
                  className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
                />
              </motion.div>
            )}

            {activeDiv === 7 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex w-full h-full overflow-hidden relative"
              >
                <motion.img
                  initial={{
                    opacity: 1,
                    y: "-50%",
                    x: "-50%",
                    scale: 1,
                    rotateX: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: "-50%",
                    x: "-50%",
                    scale: 1.5,
                    rotateX: 0,
                  }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 2, bounce: "spring" }}
                  src="/ermek/negyzet-erme.webp"
                  alt="Kör érme"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[300px] h-[300px] z-10"
                />

                <motion.img
                  initial={{ y: "-500%", x: "-50%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.2 }}
                  src="/image-kepek/meselj-el-6.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ y: "-50%", x: "-500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.4 }}
                  src="/image-kepek/meselj-el-7.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ y: "-500%", x: "-500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.5 }}
                  src="/image-kepek/meselj-el-8.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ y: "50%", x: "500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.7 }}
                  src="/image-kepek/meselj-el-9.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ y: "-500%", x: "-500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.9 }}
                  src="/image-kepek/szerkeszd-online-3.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ y: "-500%", x: "-50%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 1 }}
                  src="/image-kepek/szerkeszd-online-2.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ y: 0, x: 0, opacity: 0.8 }}
                  whileInView={{ y: 0, x: 0, opacity: 0.3 }}
                  transition={{ duration: 2, bounce: "spring" }}
                  src="/image-kepek/fiok-kepek.webp"
                  alt="Kutyus kép"
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
            )}
          </div>
        </div>


        <div className="relative lg:hidden flex flex-nowrap gap-16">
          <div className="flex flex-col gap-16 w-full">
            <H2 classname={"text-[--rose] text-left"}>Hogy működik?</H2>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/kor-erme.webp"
                  alt="Kör érme"
                  className="absolute top-[10%] left-[10%] w-[150px] h-[150px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: "-45%", x: "-50%" }}
                  whileInView={{ opacity: "100%", y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/negyzet-erme.webp"
                  alt="Kör érme"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150px] h-[150px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/oval-erme.webp"
                  alt="Kör érme"
                  className="absolute bottom-[10%] right-[10%] w-[150px] h-[150px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "10%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/circle.svg"
                  alt="Kör érme"
                  className="absolute top-[-50%] right-[10%] w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "10%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/oval.svg"
                  alt="Kör érme"
                  className="absolute -left-1/4  top-1/2 -translate-y-1/2 w-[200px] h-[200px]"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "10%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/ermek/square.svg"
                  alt="Kör érme"
                  className="absolute bottom-[-20%] right-[-20%] w-[200px] h-[200px]"
                />
              </motion.div>
              <H3 classname="text-[--blue]">Válassz érmét</H3>
              <Paragraph>
                Válassz egy érmét ami az emlékoldaladra fog vezetni és amit
                elpostázunk neked.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/scan.webp"
                  alt="Kör érme"
                  className="absolute bottom-0 left-0 w-full h-auto"
                />
              </motion.div>
              <H3 classname="text-[--blue]">Olvasd be</H3>
              <Paragraph>
                Ha kézhez kaptad az emlékérmét, a QR-kódot beolvasva
                létrehozhatod a hozzá tartozó egyedi emlékoldalt.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col justify-between w-full h-full overflow-hidden bg-[--cream] rounded-3xl"
              >
                <div className="relative flex flex-nowrap w-full px-16 min-h-[200px]">
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    animate={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.2 }}
                    src="/image-kepek/szerkeszd-online-2.webp"
                    alt="Kör érme"
                    className="absolute top-20 left-10 max-w-[150px]"
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.4 }}
                    src="/image-kepek/szerkeszd-online-3.webp"
                    alt="Kör érme"
                    className="absolute top-32 right-10 max-w-[150px]"
                  />
                </div>
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/szerkeszd-online-1.webp"
                  alt="Kör érme"
                  className="z-10"
                />
              </motion.div>
              <H3 classname="text-[--blue]">Szerkeszd online</H3>
              <Paragraph>
                Szerkeszd szabadon az emlékoldal profilt azon szeretted
                történetével, akinek emlékét szeretnéd örökre megőrizni.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-8 w-full items-center justify-start overflow-hidden p-4 bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/meselj-el-1.webp"
                  alt="Mesélj el egy történetet"
                  className=""
                />
                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    animate={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.1 }}
                    src="/image-kepek/meselj-el-2.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.2 }}
                    src="/image-kepek/meselj-el-3.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.3 }}
                    src="/image-kepek/meselj-el-4.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    animate={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.4 }}
                    src="/image-kepek/meselj-el-5.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.5 }}
                    src="/image-kepek/meselj-el-6.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                  <motion.img
                    initial={{ opacity: "0%", y: -10 }}
                    whileInView={{ opacity: "100%", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, bounce: "spring", delay: 0.6 }}
                    src="/image-kepek/meselj-el-7.webp"
                    alt="Kutyus kép"
                    className=""
                  />
                </div>
              </motion.div>
              <H3 classname="text-[--blue]">Mesélj el egy történetet</H3>
              <Paragraph>
                Meséld el szeretted élettörténetét, töltsd meg az adatlapot
                korlátlan mennyiségű fotóval és videóval.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex w-full h-full overflow-hidden relative bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/helyezd-el-2.webp"
                  alt="Kör érme"
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
              <H3 classname="text-[--blue]">Helyezd el</H3>
              <Paragraph>
                Helyezd el a QR-kódos érmét azon az emlékhelyen, ahol szeretnéd
                az egyedi oldalt elérhetővé tenni (sírhely, emlékmű, közös
                emlékhely) - az arra járók a QR-kódot beolvasva az emlékoldalon
                keresztül gyönyörködhetnek szeretteid legszebb emlékeiben,
                fotóiban.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex flex-col items-center justify-start w-full h-full overflow-hidden bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.1 }}
                  src="/image-kepek/emlekezz-1.webp"
                  alt="Kör érme"
                  className=""
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.2 }}
                  src="/image-kepek/emlekezz-2.webp"
                  alt="Kör érme"
                  className="-mt-10"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.3 }}
                  src="/image-kepek/emlekezz-3.webp"
                  alt="Kör érme"
                  className="-mt-10"
                />
              </motion.div>
              <H3 classname="text-[--blue]">Emlékezz meg bármikor bárhonnan</H3>
              <Paragraph>
                Emlékezzetek meg közösen - bárki hozzászólhat az általad
                létrehozott emlékoldalhoz, lehetőséget kínálva azok számára is
                akik távol vannak, vagy egyszerűen egy kedves emléket szeretne
                hozzáfűzni akár ünnepekkor, mindenszentekkor, vagy az év bármely
                napján.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring" }}
                  src="/image-kepek/keress-1.webp"
                  alt="Kör érme"
                  className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
                />
                <motion.img
                  initial={{ opacity: "0%", y: -10 }}
                  whileInView={{ opacity: "100%", y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, bounce: "spring", delay: 0.4 }}
                  src="/image-kepek/keress-2.webp"
                  alt="Kör érme"
                  className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
                />
              </motion.div>
              <H3 classname="text-[--blue]">Keress rá</H3>
              <Paragraph>
                Az emlékoldal elérhető az emlek-qr.hu weboldalunkon keresztül is
                a kereső segítségével - írd be annak a nevét vagy születési
                idejét, akinek az emlékoldalát keresed és tekintsd meg online
                bárhol, bármikor.
              </Paragraph>
            </div>
            <div className="flex flex-col justify-center gap-4 min-h-[60vh] scroll-section">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex w-full h-full overflow-hidden relative bg-[--cream] rounded-3xl"
              >
                <motion.img
                  initial={{
                    opacity: 1,
                    y: "-50%",
                    x: "-50%",
                    scale: 1,
                    rotateX: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: "-50%",
                    x: "-50%",
                    scale: 1.5,
                    rotateX: 0,
                  }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 2, bounce: "spring" }}
                  src="/ermek/negyzet-erme.webp"
                  alt="Kör érme"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150px] h-[150px] z-10"
                />

                <motion.img
                  initial={{ y: "-500%", x: "-50%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.2 }}
                  src="/image-kepek/meselj-el-6.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75px] h-[75px]"
                />
                <motion.img
                  initial={{ y: "-50%", x: "-500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.4 }}
                  src="/image-kepek/meselj-el-7.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75px] h-[75px]"
                />
                <motion.img
                  initial={{ y: "-500%", x: "-500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.5 }}
                  src="/image-kepek/meselj-el-8.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75px] h-[75px]"
                />
                <motion.img
                  initial={{ y: "50%", x: "500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.7 }}
                  src="/image-kepek/meselj-el-9.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75px] h-[75px]"
                />
                <motion.img
                  initial={{ y: "-500%", x: "-500%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 0.9 }}
                  src="/image-kepek/szerkeszd-online-3.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75px] h-[75px]"
                />
                <motion.img
                  initial={{ y: "-500%", x: "-50%" }}
                  animate={{ y: "-50%", x: "-50%" }}
                  transition={{ duration: 0.2, bounce: "spring", delay: 1 }}
                  src="/image-kepek/szerkeszd-online-2.webp"
                  alt="Kutyus kép"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75px] h-[75px]"
                />
                <motion.img
                  initial={{ y: 0, x: 0, scale: 1, opacity: 0.8 }}
                  whileInView={{ y: 0, x: 0, scale: 1.1, opacity: 0.3 }}
                  transition={{ duration: 2, bounce: "spring" }}
                  src="/image-kepek/fiok-kepek.webp"
                  alt="Kutyus kép"
                  className="w-full h-auto"
                />
              </motion.div>
              <H3 classname="text-[--blue]">
                Digitalizált emlékoldal az utókornak
              </H3>
              <Paragraph>
                Az így létrehozott digitális emlékgyűjtemény a modern
                technológiának köszönhetően innovatív módon őrzi generációkon át
                a családi emlékeket, bárhol és bármikor elérhető és megosztható
                szeretteiddel, barátaiddal, valamint folyamatosan bővíthető.
              </Paragraph>
            </div>
          </div>
        </div>

        <Link
          href="/erme"
          className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center"
        >
          Rengeteg emlékem van!
        </Link>
      </div>
    </section>
  );
}
