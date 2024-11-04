import Image from "next/image"
import Link from "next/link"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"

export default function RolunkInner() {
  return (
    <div className="relative flex flex-col items-center gap-8 lg:py-16 py-8 overflow-hidden px-4">
        <Image src={"/painting2.webp"} width={1000} height={1000} alt="Painting 1" className="absolute lg:w-[500px] lg:h-[500px] lg:top-4 lg:-left-[250px] h-[150px] w-[150px] top-4 -left-[70px] rotate-6 rounded-3xl border-2 border-white shadow-2xl"/>
        <Image src={"/painting3.webp"} width={1000} height={1000} alt="Painting 1" className="absolute lg:w-[500px] lg:h-[500px] lg:top-1/2 lg:-right-[250px] h-[150px] w-[150px] top-20 -right-[90px] -rotate-6 rounded-3xl border-2 border-white shadow-2xl"/>
        <Image src={"/painting4.webp"} width={1000} height={1000} alt="Painting 1" className="lg:block hidden absolute lg:w-[500px] lg:h-[500px] lg:-top-[100px] lg:-right-[250px] h-[150px] w-[150px] rotate-3 rounded-3xl border-2 border-white shadow-2xl"/>
        <div className="flex flex-col items-center gap-4 z-[1]">
            <Image src={"/bokrosgabi2.webp"} width={500} height={500} alt="Bokros Gabriella" className="rounded-full border-2 border-white shadow-lg lg:w-40 lg:h-40 w-28 h-28"/>
            <div className="flex flex-col items-center gap-0">
                <H2>Bokros Gabriella</H2>
                <H4>vagyok</H4>
            </div>
            <div className="flex flex-col gap-2 lg:w-1/2 w-full text-center p-8 bg-[--cream] rounded-3xl my-2">
                <Paragraph>
                    Az oldal megálmodója és alapítója. Évek óta foglalkozom kreatív alkotásokkal, képekkel, fontos számomra a művészet és az érzelmek kifejezése.
                </Paragraph>
                <Link href={"https://gabriella-bokros.pixels.com/"} target="__blank" className="text-[--blue] underline"><Paragraph>Tekintsd meg képeimet</Paragraph></Link>
            </div>
            <div className="flex flex-col gap-4 lg:w-1/2 w-full my-2">
                <Paragraph>
                    Szerettem volna az utókor számára egy hasznos, maradandó dolgot megálmodni. Így jött létre az EmlékQR, mely egy virtuális emlékkönyv, mindenki számára hozzáférhető, különleges és időtálló.
                </Paragraph>
                <Paragraph>
                    Célunk, hogy modern technológiai megoldást kínáljunk azon szeretteink emlékének méltó megőrzésére és elérhetővé tételére, akik sajnos már nem lehetnek velünk. Az EmlékQR lehetővé teszi, hogy szeretteidről szóló memoárokat, élettörténeteket, fotókat és akár videókat egyetlen QR-kód segítségével megoszthass, gyorsan és egyszerűen. Ez a megoldás nemcsak az emlékek megőrzését szolgálja, hanem segít az érzelmek kifejezésében is, lehetőséget adva arra, hogy az emlékeket bármikor felidézhessük.
                </Paragraph>
                <Paragraph>
                    Az általunk biztosított QR-kódos emlékoldal egyszerűen hozzáférhető: elég beolvasni a kódot vagy beírni az elhunyt nevét, és máris megnyílik az egyedi emlékoldal. Itt a látogatók elolvashatják a történeteket, megtekinthetik a képeket, és visszaidézhetik az elhunyt életének legszebb pillanatait. Ez a modern technológia alapú megoldás nemcsak praktikus, hanem mély érzelmi jelentőséggel is bír, hiszen lehetővé teszi az örök emlékek megőrzését.
                </Paragraph>
            </div>
            
        </div>
        <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center">
                Hogyan működik?
            </Link>
        

    </div>
  )
}
