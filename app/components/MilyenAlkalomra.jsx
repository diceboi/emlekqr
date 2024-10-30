import Image from "next/image"
import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import Paragraph from "./UI/Paragraph"
import Link from "next/link"

export default function MilyenAlkalomra() {
  return (
    <section className='flex flex-col gap-16 relative w-full py-16'>
        
        <H2 classname={"text-[--rose] self-center"}>Milyen alkalomra?</H2>
        <div className='container m-auto flex lg:flex-row flex-col items-baseline justify-center gap-0'>

            <div className="flex flex-col w-full lg:w-1/4 justify-start gap-8 z-10">
                <H3 classname={"text-[--blue]"}>
                    Az emlékérme tökéletes választás:
                </H3>
            </div>
            <div className="group border-l border-neutral-300 py-16 lg:w-1/4">
                <div className="flex flex-col w-full min-h-[500px] justify-between gap-8 z-10 bg-transparent group-hover:bg-[--blue-15] p-8 group-hover:rounded-3xl transition-all">
                <H3 classname={""}>Temetés alkalmával</H3>
                <Paragraph>
                    Amikor szeretteink végső búcsúztatására készülünk, az emlékérme egy méltó és maradandó megemlékezési módot nyújt.
                </Paragraph>
                </div>
            </div>
            
            <div className="group border-l  py-16 lg:w-1/4">
            <div className="flex flex-col w-full min-h-[500px] justify-between gap-8 z-10 bg-transparent group-hover:bg-[--blue-15] p-8 group-hover:rounded-3xl transition-all">
                <H3 classname={""}>Halottak napja, mindenszentek napja</H3>
                <Paragraph>
                    Ez az ünnep kiváló alkalom arra, hogy az emlékoldalon keresztül megosszuk emlékeinket, és méltó módon tisztelegjünk az elhunytak előtt.
                </Paragraph>
            </div>
            </div>

            <div className="group border-l border-neutral-300 py-16 lg:w-1/4">
            <div className="flex flex-col w-full min-h-[500px] justify-between gap-8 z-10 bg-transparent group-hover:bg-[--blue-15] p-8 group-hover:rounded-3xl transition-all ">
                <H3 classname={""}>Emléktárgy, személyes ajándék</H3>
                <Paragraph>
                    Az érme különleges emléktárgyként szolgál, amelyet ajándékozhatunk családtagoknak, hogy közösen őrizzék meg szeretteik emlékét és továbbadhassák a következő generációnak
                </Paragraph>
            </div>
            </div>
            
            <div className="absolute -bottom-1/4 -left-40 w-[500px] h-[500px] bg-[--blue] rounded-full blur-[100px] opacity-15"></div>
        </div> 
        <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center">
            Hogyan működik?
        </Link>
    </section>
  )
}
