import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Tiptap from "../../components/Tiptap"

export default async function Emlekadatlap() {
  const session = await getServerSession();

  if(!session) {
    redirect("/bejelentkezes")
  }

  return (
    <section className="w-full px-2 lg:px-0 py-10 lg:py-20">
      <div className="container-inner flex flex-col m-auto gap-8">
        <div id="cover-picture" className="relative w-full h-[300px] lg:h-[500px] rounded-2xl shadow-xl">
          <Image 
            src="/emlekadatlapok/0000001/test1.webp"
            fill 
            style={{objectFit: "cover", borderRadius:"1rem"}}
          />
        </div>
        <div id="profile-data" className="flex flex-col xl:flex-row w-full">

          <div id="profile-pic" className="relative w-full xl:w-1/2">
          <Image 
              src="/emlekadatlapok/0000001/profil.webp"
              width={250}
              height={250}
              className="absolute -bottom-1/3 translate-y-1/3 xl:left-[50px] left-1/2 xl:translate-x-0 -translate-x-1/2 rounded-full border-8 border-white"
            />
          </div>

          <div className="flex flex-col gap-4 items-center xl:items-start xl:w-1/2 w-full mt-[100px] xl:mt-0">
            <div className="flex flex-row items-center gap-2">
              <h4>Nagy Imre</h4>
              <p>(43)</p>
            </div>
            <p className="label">Élt: 1975 - 2018</p>
          </div>
          
        </div>
        <div id="profile-info" className="flex flex-col w-full mt-0 xl:mt-[125px]">
          <div className="overflow-x-scroll sm:overflow-hidden w-full">
            <div className="flex flex-row justify-between border-b border-[--rose] min-w-[640px] ">
              <button className="hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-t-2xl">Adatok</button>
              <button className="hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-t-2xl">Történet</button>
              <button className="hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-t-2xl">Média</button>
              <button className="hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-t-2xl">Tiszteletnyilvánítás</button>
            </div>
          </div>
        </div>
        <Tiptap />
      </div>
    </section>
  )
}
