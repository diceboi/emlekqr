import Image from "next/image"
import Link from "next/link"
import H1 from "../components/UI/H1"
import Paragraph from "../components/UI/Paragraph"

import { TbQrcode } from "react-icons/tb";

export default function Hero() {
  return (
    <section className='flex justify-center items-center w-full min-h-[90vh] relative'>
        <div className='container flex justify-center items-center m-auto py-2 w-full h-full lg:w-8/12 z-10'>
          <div className='flex flex-col items-center w-full gap-4'>
            <H1 classname={"text-center text-white"}>A digitális emlékoldal</H1>
            <Paragraph classname={"text-center text-white"}>Készítsd el saját emlékérméd, őrizd meg szeretteid legszebb pillanatait!</Paragraph>
            <Link 
              href="/erme" 
              className="flex flex-nowrap items-center justify-center gap-2 hover:gap-3 w-fit py-1 px-4 lg:py-2 lg:px-6 mx-1 hover:mx-0 rounded-full bg-[--blue] hover:bg-[--rose] transition-all text-white">
                  <TbQrcode 
                      className="w-6 h-6"
                  />
                  Elkészítem
            </Link>
          </div>
        </div>

        
        <div className="absolute w-full h-full bg-[--rose]">
          <Image src="/sirko-hero.jpg" fill style={{objectFit: "cover"}} className="opacity-50" />
          <div className="w-full h-full bg-[--rose]"></div>
        </div>
    </section>
  )
}
