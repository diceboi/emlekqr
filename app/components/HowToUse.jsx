import Link from "next/link"
import Image from "next/image";

import { TbHammer } from "react-icons/tb";

export default function HowToUse() {
  return (
    <section className='flex justify-center items-center w-full min-h-[50vh] px-4 py-28'>
        <div className="flex flex-col items-center gap-12 container">
            <h2>Hogy működik?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-10/12">
                <div className="relative flex flex-col justify-between bg-[--cream] h-[300px] w-full rounded-2xl p-4 overflow-hidden">
                    <Image src="/muhely-abra.webp" width={150} height={150} className="absolute top-4 -right-10 z-0"/>
                    <h4 className="text-[--rose]">Készítsd el</h4>
                    <div className="flex flex-col gap-4">
                        <p>Készítsd el, majd rendeld meg egyedi érméd.</p>
                        <Link 
                        href="/erme-muhely" 
                        className="flex flex-nowrap items-center justify-center gap-2 hover:gap-3 w-fit py-1 px-4 lg:py-2 lg:px-6 mx-1 hover:mx-0 rounded-full bg-[--blue] hover:bg-[--rose] transition-all text-white">
                            <TbHammer 
                                className="w-6 h-6"
                            />
                            A műhelybe
                        </Link>
                    </div>
                </div>

                <div className="relative flex flex-col justify-between bg-[--cream] h-[300px] w-full rounded-2xl p-4 overflow-hidden">
                    <Image src="/muhely-abra.webp" width={150} height={150} className="absolute top-4 -right-10 z-0"/>
                    <h4 className="text-[--rose]">Regisztrálj</h4>
                    <div className="flex flex-col gap-4">
                        <p>Ha megérkezett az érme, szkenneld be és regisztrálj.</p>
                    </div>
                </div>

                <div className="relative flex flex-col justify-between bg-[--cream] h-[300px] w-full rounded-2xl p-4 overflow-hidden">
                    <Image src="/muhely-abra.webp" width={150} height={150} className="absolute top-4 -right-10 z-0"/>
                    <h4 className="text-[--rose]">Töltsd fel</h4>
                    <div className="flex flex-col gap-4">
                        <p>Hozd létre a profilt majd töltsd fel adatokkal.</p>
                    </div>
                </div>
            </div>
            <Link href="/hasznalat" className="underline hover:text-[--rose]">Bővebben a használatáról</Link>
        </div>
        
    </section>
  )
}
