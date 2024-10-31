import Image from "next/image"
import H1 from "./UI/H1"
import H2 from "./UI/H2"
import Paragraph from "./UI/Paragraph"
import Link from "next/link"

export default function MiAzEmlekerme() {
  return (
    <section className='flex flex-col justify-start relative w-full overflow-hidden'>
        <Image src="/marvany-erme.webp" fill style={{ objectFit: "cover", objectPosition: 'center' }}/>
        <div className='flex lg:flex-row flex-col items-center justify-center gap-16 overflow-hidden px-4 lg:pt-0 pt-[75%]'>
            <div className='relative w-full lg:w-1/3 lg:min-h-[80vh]'>
                
            </div>
            <div className="flex flex-col w-full lg:w-1/4 justify-start gap-8 z-10 py-16">
                <H2 classname={"text-[--rose]"}>Mi az az emlékérme?</H2>
                <Paragraph classname={""}>Az EmlékQR emlékérme egy különleges, modern megoldás arra, hogy örökre <b><b>megőrizzük és megoszthassuk másokkal</b></b> azon szeretteink emlékét, akik már nem lehetnek velünk .<br></br><br></br> Ez az egyedi emléktárgy QR-kóddal van ellátva, amelyet a síremlékre vagy sírkőre rögzítve időtálló tisztelgés lehet akár <b><b>mindenszentek ünnepén</b></b>, <b><b>ajándékként</b></b>, vagy <b><b>megemlékezés alkalmával</b></b>. A QR-kód beolvasásával egy személyre szabott emlékoldal nyílik meg, ahol a családtagok és barátok képeket, történeteket, vagy akár videókat tölthetnek fel az elhunyt életéről.
                </Paragraph>
                <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit">
                    Hogyan működik?
                </Link>
            </div>
            <div className="absolute -bottom-1/4 -right-40 w-[500px] h-[500px] bg-[--rose] rounded-full blur-[100px] opacity-15"></div>
        </div>
        
    </section>
  )
}
