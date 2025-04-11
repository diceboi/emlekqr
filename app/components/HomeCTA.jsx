import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"
import Link from "next/link"
import Image from "next/image"

export default function HomeCTA() {
  return (
    <section className='w-full pb-16 px-4 bg-white'>
        <div className='flex lg:flex-row flex-col gap-8 container m-auto '>
            <div className="flex flex-col-reverse bg-[--cream] gap-8 items-center rounded-3xl">
                <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 w-full p-8 ">
                    <H2 classname={"text-[--rose] text-center"}>Próbáld ki ingyen!</H2>
                    <Paragraph classname={"text-center"}>Kipróbálnád milyen az emlékoldal? Most akár bejelentkezés nélkül is megteheted. Ha pedig megtetszett az élmény, egy gyors regisztráció után el is mentheted, sőt emlékérmével is bármikor összekötheted!</Paragraph>
                    <Link href="/ingyenes-emlekoldal-keszites" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] text-center transition-all text-white w-fit self-center">
                        Kipróbálom az ingyenes emlékoldalt
                    </Link>
                </div>
                <div className="lg:w-1/2 w-full">
                    <Image src="/miazemlekerme.webp" width={500} height={800} alt="Tökélete ajándék" />
                </div>
            </div>

            <div className="flex flex-col-reverse bg-gradient-to-br from-[--rose] to-[--blue] gap-8 items-center rounded-3xl">
                <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 w-full p-8">
                    <H2 classname={"text-white text-center"}>Tedd teljessé!</H2>
                    <Paragraph classname={"text-white text-center"}>Ha szeretnéd fizikailag is összekötni az nyughelyet az emlékoldallal, korlátlanul fotókat, videókat, történeteket, megosztani szerettedről, akkor nincs más dolgod mint vásárolni egy Emlékérmét.</Paragraph>
                    <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] text-center transition-all text-white w-fit self-center">
                        Az összes funkciót szeretném
                    </Link>
                </div>
                <div className="lg:w-1/2 w-full">
                    <Image src="/ermek/negyzet-erme.webp" width={500} height={800} alt="Tökélete ajándék" />
                </div>
            </div>
        </div>
    </section>    
  )
}
