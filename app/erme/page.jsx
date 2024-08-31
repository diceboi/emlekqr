"use client"

import Image from "next/image"

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { AiOutlineQrcode } from "react-icons/ai";
import { AiOutlineLayout } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";

import { FaCircleCheck } from "react-icons/fa6";
import { IoIosInfinite } from "react-icons/io";

import Arrow from "./../components/Animations/Arrow"
import Camel from "./../components/Animations/Camel"
import Hearth from "./../components/Animations/Hearth"

export default function Erme() {

    const [open, setOpen] = React.useState(false);

  return (
    <section className="flex flex-col gap-8 w-full lg:px-0 py-10 lg:py-20 min-h-[100vh]">

        <div className="relative flex flex-col container w-full m-auto px-4">

            <div className="relative flex flex-col gap-20 p-8 lg:flex-row w-full min-h-[60vh] bg-[--cream] bg-opacity-25 rounded-2xl">
                <div className="absolute top-0 left-[30vw] w-52 h-52 opacity-25 ">
                    <Arrow />
                </div>
                <div className="absolute top-2/3 left-[30vw] w-52 h-52 opacity-25">
                    <Camel />
                </div>
                <div className="absolute top-3/3 right-0 w-52 h-52 opacity-25">
                    <Hearth />
                </div>
                <div className="flex flex-col justify-center gap-8 p-8 w-1/2">
                    <h3 className="text-[--blue] px-2 p-1 bg-white w-fit rounded-full">EmlékQR emlékérme</h3>
                    <h1 className="text-[--rose]">Az emlékek életre kelnek</h1>
                    <p className="">A tökéletes, életre szóló ajándékot keresed?-  Lepd meg akár önmagad, vagy családodat - elevenítsétek fel együtt a csodás pillanatokat, meséljetek sosem hallott történeteket…
                    </p>
                </div>
            </div>

            <div className="absolute top-20 right-16 flex flex-col w-5/12 h-full">
                <div className="flex flex-col gap-8 sticky top-32 rounded-2xl m-8 bg-white shadow-2xl p-8">
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[
                        { src: "/sirko-hero.jpg" },
                        { src: "/sirko-hero.jpg" },
                        { src: "/sirko-hero.jpg" },
                        ]}
                    />
                    <div className="flex flex-col gap-4">
                        <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-2xl hover:scale-105 transition-all duration-200"/>
                        <div className="grid grid-cols-3 gap-4">
                            <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-xl hover:scale-105 transition-all duration-200"/>
                            <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-xl hover:scale-105 transition-all duration-200"/>
                            <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-xl hover:scale-105 transition-all duration-200"/>
                        </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <h4 className="text-[--rose]">990 Ft/hó</h4>
                        <p>vagy</p>
                        <h4 className="flex flex-nowrap gap-2 items-center text-[--rose] bg-[--cream] rounded-md p-2">9 900 Ft/év <p className="bg-[--rose] text-white p-2 rounded-md">-17%</p></h4>
                        
                    </div>
                    <div className="flex flex-row gap-4">
                        <input type="number" value="1" className="text-center bg-[--cream] w-1/2 rounded-full">
                        </input>
                        <button 
                            href="/erme" 
                            className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--blue] hover:bg-[--rose] hover:scale-105 transition-all text-white w-1/2">
                                <PiShoppingCart 
                                    className="w-6 h-6"
                                />
                                Kosárba
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-bold">Mit tartalmaz a csomag?</p>
                        <ul className="flex flex-col gap-2 list-disc">
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <AiOutlineQrcode className="text-[--blue] w-full h-auto"/> 
                                </div>
                                <p>
                                    2 db gravírozott aluminium emlékérmét (1 db tartalék)
                                </p>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <AiOutlineLayout className="text-[--blue] w-full h-auto"/>
                                </div>
                                <p>
                                    Egy szerkeszthető online emlékadatlapot ami kapcsolatban áll az érmével.
                                </p>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoDocumentTextOutline className="text-[--blue] w-auto h-full"/>
                                </div>
                                <p>
                                    Nyomtatott használati leírást.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-16 w-1/2">
                <div className="relative h-[350px]">
                    <Image src="/image-kepek/family-trip.webp" width={1000} height={500} className="absolute top-0 left-0 border-8 border-white shadow-xl w-2/3 -rotate-12"/>
                    <Image src="/image-kepek/family-trip2.webp" width={1000} height={500} className="absolute bottom-0 right-0 border-8 border-white shadow-xl w-2/3 rotate-6"/>
                </div>
                
                <h2 className="text-[--rose]">Mesélj el egy különleges történetet</h2>
                <p className="">Egy kirándulás, az első picúr a családban, egy életre szóló szerelem, sok sok esemény történik egy emberi élet alatt. Ne hagyd hogy ezek az emlékek feledésbe merüljenek.
                </p>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-8 w-1/2">
                <h4 className="text-[--rose]">Az örökkévalóságig, és tovább...</h4>
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--blue-15] to-[--cream] rounded-2xl">
                    
                    <ul className="flex flex-col gap-8">
                            <li className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <p className="uppercase">
                                    <b>Anodizált</b> aluminium
                                </p>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <p className="uppercase">
                                    <b>3M ultra erős</b> ragasztóval ellátva
                                </p>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <p className="uppercase">
                                    <b>+1</b> tartalék érme
                                </p>
                            </li>
                        </ul>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-16 w-1/2">
                <div className="">
                    <Image src="/image-kepek/fiok-kepek.webp" width={1000} height={500} className="rounded-xl"/>
                </div>
                
                <h2 className="text-[--rose]">Digitalizáld a fiókod</h2>
                <p className="">Fiókod tele van régi fotókkal? Gyönyörű fekete-fehér vagy akár szépia is van köztük? Digitalizáld! Ne hagyd elveszni, töltsd fel hogy örökre meglegyen.
                </p>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-8 w-1/2">
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--rose-15] to-[--cream] rounded-2xl">
                    
                            <div className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoIosInfinite className="text-[--blue] w-auto h-full"/>
                                </div>
                                <p className="uppercase font-bold">
                                    Életre szóló garancia
                                </p>
                            </div>
                            <p className="">Ha az idők során megrongálódna vagy elveszne emlékérméd <b>ingyenesen cseréljük</b>!</p>

                </div>
            </div>

        </div>

        <div className="container m-auto flex flex-col gap-8 py-20">
        <h2 className="text-[--rose] ml-20">Ezt mondták rólunk</h2>
        <div className="relative flex flex-col gap-20 px-8 lg:flex-row w-full bg-[--cream] rounded-2xl">

        <div className="m-auto flex flex-col gap-20 p-8 lg:flex-row w-full bg-[--cream] rounded-2xl overflow-x-scroll z-0">
             
            <div className="flex flex-row min-w-max gap-10 p-8">

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <p className="font-bold">Nagy Tímea</p>
                        <p>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</p>
                    </div>
                </div>

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <p className="font-bold">Nagy Tímea</p>
                        <p>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</p>
                    </div>
                </div>

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <p className="font-bold">Nagy Tímea</p>
                        <p>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</p>
                    </div>
                </div>

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <p className="font-bold">Nagy Tímea</p>
                        <p>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="absolute top-0 right-8 w-1/4 h-full bg-gradient-to-l from-[--cream] to-transparent rounded-2xl z-50 pointer-events-none"></div>
        </div>
        </div>
        
        
    </section>
  )
}
