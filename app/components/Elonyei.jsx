import H2 from "../components/UI/H2"
import Image from "next/image"
import H3 from "./UI/H3"
import Paragraph from "./UI/Paragraph"

export default function Elonyei() {
  return (
    <section className='relative w-full py-20'>
        <div className="flex flex-col lg:gap-20 gap-16 container m-auto">
            <H2 classname={"text-[--rose] self-center"}>Az emlékérme előnyei</H2>
            <div className="flex flex-col gap-16 px-4">
                <div className="flex lg:flex-row flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full bg-gradient-to-t from-[--cream] to-transparent rounded-3xl">
                        <Image src="/image-kepek/szemelyre-szabhato.webp" alt="Személyre szabható" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>Személyre szabható, egyedi</H3>
                        <Paragraph>
                            Minden QR-kód egyedi emlékoldalra vezet, ahol a hozzátartozók képeket és történeteket oszthatnak meg. Az oldal szerkesztése könnyű, és bármikor frissíthető.
                        </Paragraph>
                    </div>
                </div>

                <div className="flex lg:flex-row-reverse flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full bg-gradient-to-t from-[--cream] to-transparent rounded-3xl">
                        <Image src="/image-kepek/maradando-megemlekezes.webp" alt="Maradandó megemlékezés" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>Maradandó meg­emlékezés</H3>
                        <Paragraph>
                            A QR-kód segítségével bármikor hozzáférhető a tartalom, akár évekkel később is. Élettörténet, emlékirat, családfa rögzítésére is alkalmas. Egy gyönyörű sírkoszorú vagy sírcsokor mellé tökéletes kiegészítő, hiszen nem hervad el, örök darab marad.
                        </Paragraph>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full bg-gradient-to-t from-[--cream] to-transparent rounded-3xl">
                        <Image src="/image-kepek/modern.webp" alt="Modern és egyszerű" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>Modern és egyszerű megoldás</H3>
                        <Paragraph>
                            A technológia segítségével gyorsan és egyszerűen elérhető. A QR-kód beolvasása után az emlékoldal azonnal elérhető bármely eszközről. Nem veszik el, bármikor felidézheted.
                        </Paragraph>
                    </div>
                </div>

                <div className="flex lg:flex-row-reverse flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full bg-gradient-to-t from-[--cream] to-transparent rounded-3xl">
                        <Image src="/image-kepek/megoszthato.webp" alt="Megosztható, korlátlan tartalom" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>Megosztható, korlátlan tartalom</H3>
                        <Paragraph>
                            Az emlékoldal megosztható a család és barátok között, így lehetőséget nyújt arra is, hogy a akik távol vannak, szintén részesei legyenek a meg­emlékezésnek. Gyűjtsetek minél több fotót, történetet, őrizzétek meg a lehető legtöbb szép emléket!
                        </Paragraph>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
