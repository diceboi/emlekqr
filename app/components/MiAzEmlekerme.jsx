"use client"

import Link from "next/link";

import * as React from "react";
import "yet-another-react-lightbox/styles.css";

import { useContext } from "react";
import { Context } from "../Context";
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
        <div className='flex container m-auto lg:flex-row flex-col-reverse items-center justify-center lg:gap-16 gap-8 overflow-hidden px-4 py-8'>
            <div className='relative w-full lg:w-1/2 lg:min-h-[80vh]'>
                
            <EmlekermeInner session={session} userdata={userdata} classname={"my-20"}/>

            </div>
            <div className="flex flex-col w-full lg:w-1/2 justify-start gap-8 z-10 lg:py-16">
                <H2 classname={"text-[--rose]"}>Mi az az emlékérme?</H2>
                <Paragraph classname={""}>Az EmlékQR emlékérme egy különleges, modern megoldás arra, hogy örökre <b><b>megőrizzük és megoszthassuk másokkal</b></b> azon szeretteink emlékét, akik már nem lehetnek velünk .<br></br><br></br>Az emlékoldallal életre keltheted szeretteid <b><b>élettörténetét, fotóit, vagy akár videókat is megoszthatsz.</b></b> Oszd meg az emlékeket ismerőseiddel, szeretteiddel, ezáltal ők is hozzászólhatnak és együtt őrizhetitek meg a közös emlékeket.<br></br><br></br>Az emlékoldalhoz tartozó érmét elhelyezheted az emlékhelyen, melyet mobiltelefonnal egyszerűen beolvasva szintén elérhető az emlékoldal.

                </Paragraph>
                <Link href="#hasznalata" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit">
                    Hogyan működik?
                </Link>
            </div>
            <div className="absolute -bottom-1/4 -right-40 w-[500px] h-[500px] bg-[--rose] rounded-full blur-[100px] opacity-15"></div>
        </div>
        
    </section>
  )
}
