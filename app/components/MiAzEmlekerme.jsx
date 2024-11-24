"use client"

import Link from "next/link";

import * as React from "react";
import "yet-another-react-lightbox/styles.css";

import { useContext } from "react";
import { Context } from "../Context";
import LoginForm from "./LoginForm";
import Modal from "./UI/Modal";
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Paragraph from "./UI/Paragraph";
import Label from "./UI/Label";

import EmlekermeInner from "./EmlekermeInner"

export default function MiAzEmlekerme({ session, userdata }) {

  const { openPopup, togglePopup, setOpenPopup } = useContext(Context);

  return (
    <section className='flex flex-col justify-start relative w-full overflow-hidden'>
        <Modal openstate={openPopup === "Login"} onClose={() => togglePopup(null)}>
            <LoginForm />
        </Modal>
        <div className='flex container m-auto lg:flex-row flex-col-reverse items-center justify-center lg:gap-16 gap-8 overflow-hidden px-4 py-8'>
            <div className='relative w-full lg:w-1/2 lg:min-h-[80vh]'>
                
            <EmlekermeInner session={session} userdata={userdata} classname={"my-20"}/>

            </div>
            <div className="flex flex-col w-full lg:w-1/2 justify-start gap-8 z-10 lg:py-16">
                <H2 classname={"text-[--rose]"}>Mi az az emlékérme?</H2>
                <Paragraph classname={""}>Az EmlékQR emlékérme egy különleges, modern megoldás arra, hogy örökre <b><b>megőrizzük és megoszthassuk másokkal</b></b> azon szeretteink emlékét, akik már nem lehetnek velünk .<br></br><br></br> Ez az egyedi emléktárgy QR-kóddal van ellátva, amelyet a síremlékre vagy sírkőre rögzítve időtálló tisztelgés lehet akár <b><b>mindenszentek ünnepén</b></b>, <b><b>ajándékként</b></b>, vagy <b><b>megemlékezés alkalmával</b></b>. A QR-kód beolvasásával egy személyre szabott emlékoldal nyílik meg, ahol a családtagok és barátok képeket, történeteket, vagy akár videókat tölthetnek fel az elhunyt életéről.
                </Paragraph>
                <Link href="/hasznalata" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit">
                    Hogyan működik?
                </Link>
            </div>
            <div className="absolute -bottom-1/4 -right-40 w-[500px] h-[500px] bg-[--rose] rounded-full blur-[100px] opacity-15"></div>
        </div>
        
    </section>
  )
}
