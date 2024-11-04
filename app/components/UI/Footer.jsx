import Image from "next/image"
import Paragraph from "./Paragraph"
import Link from "next/link"
import Label from "./Label"
import H4 from "./H4"
import { TbArrowBigRightLines, TbAnchor, TbPhone, TbMail, TbUsersGroup } from "react-icons/tb";

export default function Footer() {
  return (
    <section className="w-full py-16 bg-[--blue]">
        <div className="container m-auto px-4">
            <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-16 gap-8">
                <div className="flex flex-col justify-between gap-4">
                    <Image src="/emlek-qr-logo-white.webp" width={200} height={100} alt="logo"/>
                    <Paragraph classname={"text-white italic"}>&quot;Emlékbe, hogy emlékezz, mikor emlékem már csak emlék lesz.&quot;</Paragraph>
                    <Label classname={"text-white opacity-40"}>EmlékQR 2024 @ Minden jog fenntartva</Label>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-nowrap gap-2 items-center">
                        <TbArrowBigRightLines className="text-white bg-[--cream-25] min-w-8 min-h-8 p-1 rounded-full"/>
                        <H4 classname={"text-white"}>Gyors elérés</H4>
                    </div>
                    <ul className="flex flex-col justify-start gap-2 text-white">
                        <li><Link href={"/hasznalata"}><Label classname={"hover:underline cursor-pointer"}>Használata</Label></Link></li>
                        <li><Link href={"/rolunk"}><Label classname={"hover:underline cursor-pointer"}>Rólunk</Label></Link></li>
                        <li><Link href={"/gyik"}><Label classname={"hover:underline cursor-pointer"}>Gyik</Label></Link></li>
                        <li><Link href={"/erme"}><Label classname={"hover:underline cursor-pointer"}>Az érme</Label></Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-nowrap gap-2 items-center">
                        <TbAnchor className="text-white bg-[--cream-25] min-w-8 min-h-8 p-1 rounded-full"/>
                        <H4 classname={"text-white"}>Fontos linkek</H4>
                    </div>
                    
                    <ul className="flex flex-col justify-start gap-2 text-white">
                        <li><Link href={"/vasarlasi-feltetelek"}><Label classname={"hover:underline cursor-pointer"}>Vásárlási feltételek</Label></Link></li>
                        <li><Link href={"/adatkezelesi-tajekoztato"}><Label classname={"hover:underline cursor-pointer"}>Adatkezelési tájékoztató</Label></Link></li>
                        <li><Link href={"/elhunyt-jogainak-vedelme"}><Label classname={"hover:underline cursor-pointer"}>Elhunyt jogainak védelme</Label></Link></li>
                        <li><Link href={"/szallitas"}><Label classname={"hover:underline cursor-pointer"}>Szálíltási információ</Label></Link></li>
                        <li><Link href={"/kapcsolat"}><Label classname={"hover:underline cursor-pointer"}>Kapcsolat</Label></Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-nowrap gap-2 items-center">
                        <TbUsersGroup className="text-white bg-[--cream-25] min-w-8 min-h-8 p-1 rounded-full"/>
                        <H4 classname={"text-white"}>Elérhetőségek</H4>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-nowrap gap-2 items-center">
                            <TbPhone className="text-white bg-[--cream-25] min-w-5 min-h-5 p-1 rounded-full"/>
                            <a href="tel:+36302732236"><Label classname={"text-white hover:underline cursor-pointer"}>+36 30 273 2236</Label></a>
                        </div>
                        <div className="flex flex-nowrap gap-2 items-center">
                            <TbMail className="text-white bg-[--cream-25] min-w-5 min-h-5 p-1 rounded-full"/>
                            <a href="mailto:info@emlek-qr.hu"><Label classname={"text-white hover:underline cursor-pointer"}>info@emlek-qr.hu</Label></a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
  )
}
