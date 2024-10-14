import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Image from "next/image";
import { TbEdit, TbBellRinging2Filled } from "react-icons/tb";
import Link from "next/link";

export default async function Profil() {
  const session = await getServerSession();

  if(!session) {
    redirect("/bejelentkezes")
  }

  return (
    <section className="lg:py-20 py-8 px-2">
      <div className="container m-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex flex-col gap-8 bg-white rounded-2xl border border-white shadow-special lg:w-1/4 p-8">

            <div className="relative rounded-full w-[150px] h-[150px] self-center">
              <Image 
              src={'/blank-profile.webp' || session.user.image}
              fill
              style={{ objectFit: 'cover' }}
              alt="Profile Image"
              className="rounded-full relative"
              />
              <TbEdit
                className="absolute z-10 left-1/2 -translate-x-1/2 -bottom-4 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="self-center">{session.user.name}</h4>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 border-y border-[--cream] py-4">
                <p className="font-medium text-sm">Adatok:</p>
                <div className="flex flex-row items-baseline gap-1">
                  <p className="text-xs w-fit">Ir. szám:</p>
                  <p className="text-sm w-fit font-medium">7400</p>
                </div>
                <div className="flex flex-row items-baseline gap-1">
                  <p className="text-xs w-fit">Település:</p>
                  <p className="text-sm w-fit font-medium">Kaposvár</p>
                </div>
                <div className="flex flex-row items-baseline gap-1">
                  <p className="text-xs w-fit">Utca, házszám:</p>
                  <p className="text-sm w-fit font-medium">Egyenesi út. 101.</p>
                </div>
                <div className="flex flex-row items-baseline gap-1">
                  <p className="text-xs w-fit">Emelet, ajtó:</p>
                  <p className="text-sm w-fit font-medium">8.em 2-es ajtó</p>
                </div>
                <div className="flex flex-row items-baseline gap-1">
                  <p className="text-xs w-fit">Telefonszám:</p>
                  <p className="text-sm w-fit font-medium">06303068676</p>
                </div>
                <div className="flex flex-col items-baseline gap-1">
                  <p className="text-xs min-w-fit">E-mail cím:</p>
                  <p className="text-sm w-fit font-medium">{session.user.email}</p>
                </div>
                <Link href={`/emlekadatlapok`} className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm">
                  <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer"/>
                  Adatok módosítása
                </Link>
              </div>
              <div className="flex flex-col items-start gap-1">
              <p className="font-medium text-sm">Jelszó:</p>
               <Link href={`/emlekadatlapok`} className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm">
                  <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer"/>
                  Jelszó módosítása
                </Link>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-16 w-full">

            <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
              <div className="flex flex-col gap-8">
                <div className="flex flex-nowrap gap-4 items-center">
                  <TbBellRinging2Filled className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
                  <h4>Legutóbbi értesítések</h4>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-grow border border-[--cream] hover:bg-[--cream] rounded-lg p-2 gap-2">
                    <Image src='/blank-profile.webp' width={50} height={50} className="w-6 h-6 rounded-full" />
                    <p className="text-[--rose] font-semibold min-w-fit">Szász Szabolcs</p>
                    <p className="min-w-fit">hozzászólt az</p>
                    <Link href='/emlekadatlapok/0000001' className="text-[--blue] underline min-w-fit">Adatlapodhoz</Link>
                  </div>
                  <div className="flex border border-[--cream] rounded-lg p-2 gap-2">
                    <Image src='/blank-profile.webp' width={50} height={50} className="w-6 h-6 rounded-full" />
                    <p>Szász Szabolcs</p>
                    <p>hozzászólt az</p>
                    <Link href='/emlekadatlapok/0000001' className="text-[--blue] underline">Adatlapodhoz</Link>
                  </div>
                  <div className="flex border border-[--cream] rounded-lg p-2 gap-2">
                    <Image src='/blank-profile.webp' width={50} height={50} className="w-6 h-6 rounded-full" />
                    <p>Szász Szabolcs</p>
                    <p>hozzászólt az</p>
                    <Link href='/emlekadatlapok/0000001' className="text-[--blue] underline">Adatlapodhoz</Link>
                  </div>
                  <div className="flex border border-[--cream] rounded-lg p-2 gap-2">
                    <Image src='/blank-profile.webp' width={50} height={50} className="w-6 h-6 rounded-full" />
                    <p>Szász Szabolcs</p>
                    <p>hozzászólt az</p>
                    <Link href='/emlekadatlapok/0000001' className="text-[--blue] underline">Adatlapodhoz</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
              <div className="flex flex-col gap-8">
                <div className="flex flex-nowrap gap-4 items-center">
                  <TbBellRinging2Filled className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
                  <h4>Emlékadatlapok</h4>
                </div>
                
                {/*<div className="flex flex-col gap-4">
                  {currentData?.length > 0 ? (
                    currentData.map((currentdata, index) => (
                      <Emlekadatlaptile data={currentdata} key={index}/>
                    ))
                  ) : (
                    <h4>Jelenleg még nincs adatlapod, készítsd el saját érmédet</h4>
                  )}
                </div>*/}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
