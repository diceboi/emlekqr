"use client";

import Paragraph from "./UI/Paragraph";
import H1 from "./UI/H1";
import Link from "next/link";
import Image from "next/image";
import { TbQrcode } from "react-icons/tb";
import H2 from "./UI/H2";
import Snowfall from "./Animations/Snowfall";

export default function KaracsonyInner() {
  return (
    <>
      <section className="flex justify-center items-center w-full min-h-[95vh] relative overflow-hidden">
        <div className="container flex lg:flex-row lg:gap-16 gap-8 flex-col justify-center items-center m-auto py-2 px-4 w-full h-full lg:w-8/12 z-10">
          <Image src={"/erme.webp"} width={250} height={250} alt="érmék" className="lg:w-[300px] w-[150px] h-auto"/>
          <div className="flex flex-col lg:items-start items-center w-full gap-4">
            <h1 className="uppercase text-white lg:text-left text-center font-thin xl:text-lg md:text-md text-sm tracking-widest bg-[--blue-15] border border-[--cream-10] backdrop-blur-sm py-2 px-4 rounded-full">
              Különleges, egyedi ajándék karácsonyra
            </h1>
            <h1 className="text-white lg:text-left text-center font-bold xl:text-6xl md:text-5xl text-4xl tracking-tighter">EmlékQR emlékérme</h1>
            <h2 className="text-white lg:text-left text-center font-thin xl:text-xl md:text-lg text-md tracking-normal">
              Személyes ajándék, amely megőrzi a legkedvesebb emlékeket.
            </h2>
            <Link
              href="/erme"
              className="flex items-center lg:self-start self-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white"
            >
              <TbQrcode className="w-6 h-6" />
              Érdekel
            </Link>
          </div>
        </div>

        <Snowfall />
        <div className="absolute w-full h-full">
          <Image
            src="/image-kepek/karacsony.webp"
            fill
            style={{ objectFit: "cover", objectPosition: "50% 20%" }}
            className="opacity-30"
          />
          <div className="w-full h-full bg-[--rose]"></div>
        </div>
      </section>

      <section></section>
    </>
  );
}
