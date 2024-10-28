import Image from "next/image"
import H1 from "./UI/H1"
import H2 from "./UI/H2"
import Paragraph from "./UI/Paragraph"

export default function MiAzEmlekerme() {
  return (
    <section className='flex flex-col justify-start relative w-full my-16'>
        <Image src="/marvany-erme.webp" fill style={{ objectFit: "contain", objectPosition: 'left' }}/>
        <div className='flex lg:flex-row flex-col items-center justify-center gap-16 overflow-hidden'>
            <div className='relative w-full lg:w-1/3 min-h-[80vh]'>
                
            </div>
            <div className="flex flex-col w-full lg:w-1/4 justify-start gap-8 z-10">
                <H2 classname={"text-[--rose]"}>Mi az az emlékérme?</H2>
                <Paragraph>Az EmlékQR emlékérme egy különleges, modern megoldás arra, hogy örökre <b><b>megőrizzük és megoszthassuk másokkal</b></b> azon szeretteink emlékét, akik már nem lehetnek velünk .<br></br><br></br> Ez az egyedi emléktárgy QR-kóddal van ellátva, amelyet a síremlékre vagy sírkőre rögzítve időtálló tisztelgés lehet akár <b><b>mindenszentek ünnepén</b></b>, <b><b>ajándékként</b></b>, vagy <b><b>megemlékezés alkalmával</b></b>. A QR-kód beolvasásával egy személyre szabott emlékoldal nyílik meg, ahol a családtagok és barátok képeket, történeteket, vagy akár videókat tölthetnek fel az elhunyt életéről.
                </Paragraph>
            </div>
            <div className="absolute -bottom-1/4 -right-40 w-[500px] h-[500px] bg-[--rose] rounded-full blur-[100px] opacity-15"></div>
        </div>
        
    </section>
  )
}
