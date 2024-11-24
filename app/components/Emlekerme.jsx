"use client"

import Image from "next/image"

import * as React from "react";
import "yet-another-react-lightbox/styles.css";

import { FaCircleCheck } from "react-icons/fa6";
import { IoIosInfinite } from "react-icons/io";

import Arrow from "./../components/Animations/Arrow"
import Camel from "./../components/Animations/Camel"
import Hearth from "./../components/Animations/Hearth"

import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Paragraph from "./UI/Paragraph";
import Label from "./UI/Label";

import EmlekermeInner from "./EmlekermeInner"

export default function Emlekerme({ session, userdata }) {

  return (
    <>

    <section className="flex flex-col lg:gap-8 w-full lg:px-0 py-10 lg:py-20 min-h-[100vh]">

        <div className="relative flex flex-col container w-full m-auto px-4">

            <div className="relative flex flex-col gap-20 lg:p-8 lg:flex-row w-full min-h-[60vh] bg-[--cream] bg-opacity-25 rounded-2xl">
                <div className="absolute lg:top-0 top-44 lg:left-[30vw] left-0 w-52 h-52 opacity-25 ">
                    <Arrow />
                </div>
                <div className="absolute top-2/3 lg:left-[30vw] left-[30vw] w-52 h-52 opacity-25">
                    <Camel />
                </div>
                <div className="absolute lg:top-3/3 -top-16 lg:right-0 -right-6 w-52 h-52 opacity-25">
                    <Hearth />
                </div>
                <div className="flex flex-col justify-center gap-8 p-8 lg:w-1/2">
                    <Paragraph classname={"text-[--blue] px-2 p-1 bg-white w-fit rounded-full uppercase"}>EmlékQR emlékérme</Paragraph>
                    <H1 classname={"text-[--rose]"}>Az emlékek életre kelnek</H1>
                    <Paragraph className="">A tökéletes, életre szóló ajándékot keresed?-  Lepd meg akár önmagad, vagy családodat - elevenítsétek fel együtt a csodás pillanatokat, meséljetek sosem hallott történeteket…
                    </Paragraph>
                </div>            
            </div>
            
            <div className="flex w-full lg:-mt-[550px] mt-20 justify-end lg:sticky top-40 right-0">
                <EmlekermeInner session={session} userdata={userdata} classname={"lg:w-5/12 w-full lg:m-8"}/>
            </div>
            

            <div className="flex flex-col justify-center gap-4 lg:pl-16 lg:py-16 py-8 lg:w-1/2 lg:-mt-[400px]">
                <div className="relative h-[350px]">
                    <Image src="/image-kepek/family-trip.webp" width={1000} height={500} className="absolute lg:top-0 top-16 left-4 border-8 border-white shadow-xl w-2/3 max-w-[400px] -rotate-12"/>
                    <Image src="/image-kepek/family-trip2.webp" width={1000} height={500} className="absolute lg:bottom-0 bottom-16 right-4 border-8 border-white shadow-xl w-2/3 max-w-[400px] rotate-6"/>
                </div>
                
                <H2 classname={"text-[--rose]"}>Mesélj el egy különleges történetet</H2>
                <Paragraph >Egy kirándulás, az első picúr a családban, egy életre szóló szerelem, sok sok esemény történik egy emberi élet alatt. Ne hagyd hogy ezek az emlékek feledésbe merüljenek.
                </Paragraph>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 py-8 lg:w-1/2">
                <H4 classname={"text-[--rose]"}>Az örökkévalóságig, és tovább...</H4>
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--blue-15] to-[--cream] rounded-2xl">
                    
                    <ul className="flex flex-col gap-8">
                            <li className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>Gyönyörű szálcsiszolt</b> felület
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>Erős</b> ragasztóval ellátva
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>UV álló</b> kültéri műgyanta alapanyagú érme
                                </Paragraph>
                            </li>
                        </ul>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 lg:py-16 py-8 lg:w-1/2">
                <div className="">
                    <Image src="/image-kepek/fiok-kepek.webp" width={1000} height={500} className="rounded-xl"/>
                </div>
                
                <H2 classname={"text-[--rose]"}>Digitalizáld a fiókod</H2>
                <Paragraph>Fiókod tele van régi fotókkal? Gyönyörű fekete-fehér vagy akár szépia is van köztük? Digitalizáld! Ne hagyd elveszni, töltsd fel hogy örökre meglegyen.
                </Paragraph>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 py-8 lg:w-1/2">
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--rose-15] to-[--cream] rounded-2xl">
                    
                            <div className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoIosInfinite className="text-[--blue] w-auto h-full"/>
                                </div>
                                <H4 >
                                    Életre szóló garancia
                                </H4>
                            </div>
                            <Paragraph>Ha az idők során megrongálódna vagy elveszne emlékérméd <b>ingyenesen cseréljük</b>!</Paragraph>

                </div>
            </div>

        </div>        
        
    </section>
    </>
  )
}
