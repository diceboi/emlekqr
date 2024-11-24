import Paragraph from "./UI/Paragraph";
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Image from "next/image";

export default function Velemenyek() {
  return (
    <div className="container m-auto flex flex-col gap-8 py-20">
        <H2 classname="text-[--rose] lg:text-left text-center lg:self-start self-center">Ezt mondták rólunk</H2>
        <div className="relative flex flex-col gap-20 lg:flex-row w-full bg-[--cream] rounded-2xl">

        <div className="m-auto flex flex-col gap-20 p-8 lg:flex-row w-full bg-[--cream] rounded-2xl overflow-x-scroll z-0">
             
            <div className="flex flex-row min-w-max gap-10 lg:p-8">

                <div className="flex flex-col gap-4 lg:max-w-[30vw] w-[80vw]">
                    <div className="flex flex-nowrap items-center gap-4">
                        <Image src="/velemenyek/veronika-soproni.jpg" alt="Veronika Soproni" width={75} height={75} className="rounded-full"/>
                        <H4 classname="text-[--rose]">Veronika Soproni</H4>
                    </div>                 
                    <div className="flex flex-col">
                        
                        <Paragraph>Szívet melengető kezdeményezésnek tartom az emlékeink megőrzésének ezen formáját. Különösen tetszik,  hogy a hozzájárulásommal más család tagok is leírhatják a közösen megélt történeteiket saját szemszögből megfogalmazva.
                        Szeretettel ajánlom Mindenkinek!</Paragraph>
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:max-w-[30vw] w-[80vw]">
                    <div className="flex flex-nowrap items-center gap-4">
                        <Image src="/velemenyek/gabriella-broda.jpg" alt="Veronika Soproni" width={75} height={75} className="rounded-full"/>
                        <H4 classname="text-[--rose]">Gabriella Boda </H4>
                    </div>                 
                    <div className="flex flex-col">
                        
                        <Paragraph>Szuper kezdeményezés! Mert a szó elszáll, az írás megmarad...</Paragraph>
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:max-w-[30vw] w-[80vw]">
                    <div className="flex flex-nowrap items-center gap-4">
                        <Image src="/velemenyek/gabriella-tordai.jpg" alt="Veronika Soproni" width={75} height={75} className="rounded-full"/>
                        <H4 classname="text-[--rose]">Gabriella Tordai</H4>
                    </div>                 
                    <div className="flex flex-col">
                        
                        <Paragraph>
                        Nagyon értékesnek találom az oldalt. Nagyon igényes, könnyen kezelhető, felhasználó barát. Különösen jónak találom, hogy nemcsak az oldal készítője tud megjegyzéseket és további képeket hozzáfűzni, hanem én is tudok hozzátenni az oldal készítője engedélyével. 
                        Nagyon szívmelengető érzés látni azt, hogy az emlék oldal egy igazi digitális és élő fénykép albummá alakul. ❤️❤️
                        Csak ajánlani tudom, bátran keressetek Gabikát!❤️❤️❤️
                        Csakis ⭐️⭐️⭐️⭐️⭐️
                        </Paragraph>
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:max-w-[30vw] w-[80vw]">
                    <div className="flex flex-nowrap items-center gap-4">
                        <Image src="/velemenyek/berkes-alexandra.jpg" alt="Veronika Soproni" width={75} height={75} className="rounded-full"/>
                        <H4 classname="text-[--rose]">Berkes Alexandra</H4>
                    </div>                 
                    <div className="flex flex-col">
                        
                        <Paragraph>Nagyszerű ötlet! Nincsenek közöttünk, de a szívünkben tovább élnek.
                        Remélem egyre több emléket tudunk feleleveníteni.🖤🤍❤️</Paragraph>
                    </div>
                </div>

                </div>
            </div>
            <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[--cream] to-transparent rounded-2xl z-50 pointer-events-none"></div>
          </div>
        </div>
  )
}
