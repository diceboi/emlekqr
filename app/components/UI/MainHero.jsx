import Image from "next/image"
import H1 from "./H1"

export default function MainHero({ title, image }) {
  return (
    <section className="relative flex flex-col items-center bg-[--cream] py-16 px-4 min-h-[30vh]">
        <Image src={image} fill style={{ objectFit: "cover", objectPosition: "20% 50%" }} className="mix-blend-multiply opacity-30"/>
        <div className="container m-auto">
            <div className="flex flex-col lg:items-start items-center gap-8">
                <H1 classname={"text-[--rose] z-[1] lg:text-left text-center"}>{title}</H1>
            </div>
        </div>
    </section>
  )
}
