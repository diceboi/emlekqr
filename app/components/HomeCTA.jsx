import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"
import Link from "next/link"
import Image from "next/image"

export default function HomeCTA() {
  return (
    <section className='w-full py-16 bg-[--rose] px-4'>
        <div className='flex flex-col gap-8 container m-auto'>
            <div className="flex flex-col-reverse lg:flex-row lg:gap-16 items-center">
                <div className="flex flex-col lg:justify-start justify-center lg:gap-8 gap-4 lg:w-1/2 w-full">
                    <H2 classname={"text-white lg:text-start text-center"}>A tökéletes, életre szóló ajándékot keresed?</H2>
                    <Paragraph classname={"text-white  lg:text-start text-center"}>Lepd meg akár önmagad, vagy családodat - elevenítsétek fel együtt a csodás pillanatokat, meséljetek sosem hallott történeteket!</Paragraph>
                    <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit lg:self-start self-center">
                        Az érméhez
                    </Link>
                </div>
                <div className="lg:w-1/2 w-full">
                    <Image src="/miazemlekerme.webp" width={500} height={800} alt="Tökélete ajándék" />
                </div>
            </div>
        </div>
    </section>    
  )
}
