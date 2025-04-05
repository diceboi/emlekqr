import H2 from "../components/UI/H2"
import Image from "next/image"
import H3 from "./UI/H3"
import Paragraph from "./UI/Paragraph"

export default function Elonyei() {
  return (
    <section className='relative w-full py-20'>
        <div className="flex flex-col lg:gap-20 gap-16 container m-auto">
            <h2 className="font-bold xl:text-7xl md:text-5xl text-4xl tracking-tighter text-center text-[--rose]">Digitalizált emlékek egy helyen</h2>
            <div className="flex flex-col gap-16 px-4">
                <div className="flex lg:flex-row flex-col items-center lg:gap-16 gap-4">
                    <div className="relative lg:min-h-[500px] min-h-[250px] lg:w-1/2 w-full">
                        <Image src="/image-kepek/szemelyre-szabhato.webp" alt="Személyre szabható" fill style={{ objectFit: "contain" }} />
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
                        <Image src="/image-kepek/maradando-megemlekezes.webp" alt="Maradandó megemlékezés" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                        <H3 classname={"text-[--blue]"}>EmlékQR+ szolgáltatás</H3>
                        <Paragraph>
                            Emlékoldalaidhoz vásárolhatsz QR kóddal ellátott minőségi Emlékérmét is amely amellett, hogy a nyughelynél egy digitális emlékoldalként is szolgál, feloldja az ingyenes emlékoldaladon a korlátozásokat, ezáltal szabadon tölthetsz fel annyi képet, történetet, videót amennyit akarsz. A hozzászólásokat is engedélyezi így akár olyanok is leróhatják tiszteletüket akikről még nem is hallottál (persze a te engedélyeddel).
                        </Paragraph>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
