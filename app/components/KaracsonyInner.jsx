"use client";

import Paragraph from "./UI/Paragraph";
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Link from "next/link";
import Image from "next/image";
import { TbQrcode } from "react-icons/tb";
import Snowfall from "./Animations/Snowfall";
import EmlekermeInner from "./EmlekermeInner"
import { motion } from "framer-motion";
import Hasznalata from "./Hasznalata";
import PeldaOldal from "./PeldaOldal";
import KaracsonyCTA from "./KaracsonyCTA"
import Velemenyek from "./Velemenyek"

export default function KaracsonyInner({ session, userdata }) {
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
              href="#emlekerme"
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
            style={{ objectFit: "cover", objectPosition: "40% 20%" }}
            className="opacity-30"
          />
          <div className="w-full h-full bg-[--rose]"></div>
        </div>
      </section>

      <section className="lg:py-20 py-8 px-4">
        <div className="container m-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-8">
                <div className="lg:w-2/3 w-full relative lg:min-h-[500px] min-h-[250px]">
                  <motion.video 
                    whileInView={{opacity:1}} 
                    initial={{opacity:0}} 
                    exit={{opacity:0.5}} 
                    transition={{ duration: 0.4}} 
                    src="videok/bemutatkozo.emlekqr.16.9.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    className='absolute w-full h-full top-0 left-0 object-cover lg:object-cover -z-20 opacity-50 rounded-3xl' 
                  />
                </div>
                <div className="lg:w-1/3 w-full flex flex-col gap-8">
                    <H3 classname={"text-[--rose]"}>
                      Ajándékozz idén karácsonykor valami igazán különlegeset!
                    </H3>
                    <Paragraph classname={""}>
                      Az EmlékQR emlékérme egy egyedi, személyre szabott ajándék, amely lehetővé teszi, hogy a közös emlékek örökké éljenek. Egy QR-kóddal ellátott érem formájában hozhatsz létre egy emlékoldalt, ahol fényképek, történetek és meghitt pillanatok kelnek életre azon szeretteidről, akik már nem lehetnek köztetek, de szeretnél megemlékezni róluk a szeretet ünnepén is. Tökéletes választás nagyszülőknek, családtagoknak és szeretteidnek.
                    </Paragraph>
                </div>
            </div>
        </div>
      </section>


      <section className="lg:py-20 py-8 px-4">
        <div className="container m-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-8">
                <div className="lg:w-1/2 flex flex-col gap-8">
                    <H3 classname={"text-[--rose]"}>
                      Miért az emlékérme?
                    </H3>
                    <ul className="flex flex-col gap-4 marker:text-[--blue] marker:font-bold marker:text-xl list-decimal ml-8">
                      <li>
                        <Paragraph classname={"ml-2"}>
                          Egyedi QR-kóddal ellátott érem: Az ajándékhoz tartozó QR-kód könnyen elérhetővé teszi a személyre szabott emlékoldalt.
                        </Paragraph>
                      </li>
                      <li>
                        <Paragraph classname={"ml-2"}>
                          Személyes és különleges karácsonyi ajándék: Tölts fel képeket, videókat, történeteket, hogy a legszebb pillanatok mindig kéznél legyenek.
                        </Paragraph>
                      </li>
                      <li>
                        <Paragraph classname={"ml-2"}>
                          Maradandó emléktárgy: Időtálló és tartós, tökéletes ajándék minden korosztály számára.
                        </Paragraph>
                      </li>
                      <li>
                        <Paragraph classname={"ml-2"}>
                          Egyszerű használat: Gyorsan és könnyen személyre szabható.
                        </Paragraph>
                      </li>
                      <li>
                        <Paragraph classname={"ml-2"}>
                          Megosztható tartalom: Az elkészült emlékoldal a QR kód beolvasásával bárki számára elérhető és megosztható, az emlékeket így közösen élheted át szeretteiddel, akik akár hozzá is szólhatnak.
                        </Paragraph>
                      </li>
                    </ul>
                </div>
                <EmlekermeInner classname={"lg:w-1/2 lg:mt-0 mt-20"} session={session} userdata={userdata}/>
            </div>
        </div>
      </section>

      <Hasznalata />

      <PeldaOldal />

      <KaracsonyCTA />

      <Velemenyek />
      
    </>
  );
}
