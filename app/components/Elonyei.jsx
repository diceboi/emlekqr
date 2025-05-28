import H2 from "../components/UI/H2"
import Image from "next/image"
import H3 from "./UI/H3"
import Paragraph from "./UI/Paragraph"
import InfoBlock from "./UI/InfoBlock"
import Link from "next/link"

export default function Elonyei() {
  return (
    <section className='relative w-full py-20'>
        <div className="flex flex-col lg:gap-20 gap-16 container m-auto">
            <h2 className="font-bold xl:text-7xl md:text-5xl text-4xl tracking-tighter text-center text-[--rose]">Digitalizált emlékek egy helyen</h2>
            <div className="flex flex-col gap-16 px-4">
                <div className="flex lg:flex-row flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full">
                        <Image src="/szemelyre-szabhato.webp" alt="Személyre szabható" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>Mi az az Emlékoldal?</H3>
                        <Paragraph>
                        Az EmlékQR Emlékoldal egy különleges, modern megoldás arra, hogy örökre megőrizzük és digitálisan megoszthassuk másokkal azon szeretteink emlékét, akik már nem lehetnek velünk. Az emlékoldallal életre keltheted szeretteid élettörténetét, fotóit, vagy akár videókat is megoszthatsz.
                        </Paragraph>
                    </div>
                </div>

                <div className="flex lg:flex-row-reverse flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full bg-gradient-to-t from-[--cream] to-transparent rounded-3xl">
                        <Image src="/emlekqr-plusz.webp" alt="Maradandó megemlékezés" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>EmlékQR+ csomag</H3>
                        <Paragraph>
                            Tedd teljesség az emlékoldalt az EmlékQR+ szolgáltatással. Szerezd be a QR kóddal ellátott emlékérmét és kapcsold össze az emlékoldalt a nyughellyel.
                        </Paragraph>
                        <div>
                            <Paragraph classname={''}>Korlátlan mennyiségű <span className="bg-gradient-to-br from-[--rose] to-[--blue] px-2 py-1 text-white rounded-full w-fit h-auto">Kép</span> <span className="bg-gradient-to-br from-[--rose] to-[--blue] px-2 py-1 text-white rounded-full w-fit h-auto">Videó</span> <span className="bg-gradient-to-br from-[--rose] to-[--blue] px-2 py-1 text-white rounded-full w-fit h-auto">Történet</span> <span className="bg-gradient-to-br from-[--rose] to-[--blue] px-2 py-1 text-white rounded-full w-fit h-auto">Hozzászólás</span> egy helyen</Paragraph>
                        </div>
                        <Link
                            href="/erme"
                            className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center lg:self-start mt-4"
                            >
                            Érme rendelés
                        </Link>
                    </div>
                </div>

                <InfoBlock bgcolor={'bg-[--blue-15]'} bordercolor={'border-[--blue]'} infocolor={'text-[--blue]'}>
                    <Paragraph>
                        Az <b><b>Emlékérme</b></b> egy egyedi QR kóddal ellátott lézergravírozott érme, amely elhelyezhető az emlékhelyen. Az EmlékQR+ szolgáltatás része, ami biztosítja, hogy a nyughely összeköttetésben legyen az emlékoldallal.
                    </Paragraph>
                </InfoBlock>

            </div>
        </div>
    </section>
  )
}
