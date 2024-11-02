import Link from "next/link"
import Image from "next/image";

import { TbHammer, TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import Paragraph from "./UI/Paragraph";

export default function Hasznalata() {
  return (
    <section className='flex justify-center items-center w-full min-h-[50vh] px-4 py-28'>
        <div className="flex flex-col items-center gap-16    container">
            <H2>Hogy működik?</H2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-10/12">
                <div className="relative flex flex-col justify-between items-center bg-[--cream] h-[300px] w-full rounded-2xl p-4">
                    <Image src="/ermek2.webp" fill style={{ objectFit: "cover" }} className="absolute top-6 -right-10 z-0 mix-blend-multiply"/>
                    <TbCircleNumber1Filled className="absolute text-[--blue] w-10 h-10 -top-5"/>
                    <H3 classname="text-[--rose] z-[1] text-center">Válaszd ki</H3>
                    <div className="flex flex-col gap-4">
                        <Paragraph classname={"text-center z-[1]"}>Regisztrálj, és válaszd ki milyen érmét szeretnél</Paragraph>
                    </div>
                </div>

                <div className="relative flex flex-col justify-between items-center bg-[--cream] h-[300px] w-full rounded-2xl p-4">
                    <Image src="/secret.webp" fill style={{ objectFit: "contain" }} className="absolute top-6 -right-10 z-0 mix-blend-multiply"/>
                    <TbCircleNumber2Filled className="absolute text-[--blue] w-10 h-10 -top-5"/>
                    <H3 classname="text-[--rose] z-[1] text-center">Szkenneld be</H3>
                    <div className="flex flex-col gap-4">
                        <Paragraph classname={"text-center z-[1]"}>Ha megérkezett az érme, szkenneld be, és erősítsd meg, hogy a tiéd</Paragraph>
                    </div>
                </div>

                <div className="relative flex flex-col justify-between items-center bg-[--cream] h-[300px] w-full rounded-2xl p-4">
                    <Image src="/toltsd-fel.webp" fill style={{ objectFit: "contain" }} className="absolute top-6 -right-10 z-0 mix-blend-multiply"/>
                    <TbCircleNumber3Filled className="absolute text-[--blue] w-10 h-10 -top-5"/>
                    <H3 classname="text-[--rose] z-[1] text-center">Töltsd fel</H3>
                    <div className="flex flex-col gap-4">
                        <Paragraph classname={"text-center z-[1]"}>Töltsd fel a profilt adatokkal</Paragraph>
                    </div>
                </div>
            </div>
            <Link href="/hasznalata" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center">
                Bővebben a használatáról
            </Link>
        </div>
        
    </section>
  )
}
