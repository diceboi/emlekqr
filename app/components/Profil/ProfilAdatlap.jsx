import Image from "next/image";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";

export default function ProfilAdatlap({ session, user }) {

  

  return (
    <div className="lg:sticky lg:top-36 flex flex-col gap-8 bg-white rounded-2xl border border-white shadow-special lg:w-1/4 h-fit p-8">
      <div className="relative rounded-full w-[150px] h-[150px] self-center">
        <Image
          src={"/blank-profile.webp" || user.image}
          fill
          style={{ objectFit: "cover" }}
          alt="Profile Image"
          className="rounded-full relative"
        />
        <TbEdit className="absolute z-10 left-1/2 -translate-x-1/2 -bottom-4 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="self-center">{user.name}</h4>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border-y border-[--cream] py-4">
          <p className="font-medium text-sm">Adatok:</p>
          <div className="flex flex-row items-baseline gap-1">
            <p className="text-xs w-fit">Ir.szám:</p>
            <p className="text-sm w-fit font-medium">{user.zip || ""}</p>
          </div>
          <div className="flex flex-row items-baseline gap-1">
            <p className="text-xs w-fit">Település:</p>
            <p className="text-sm w-fit font-medium">{user.city || ""}</p>
          </div>
          <div className="flex flex-row items-baseline gap-1">
            <p className="text-xs w-fit">Utca, házszám:</p>
            <p className="text-sm w-fit font-medium">{user.address1 || ""}</p>
          </div>
          <div className="flex flex-row items-baseline gap-1">
            <p className="text-xs w-fit">Emelet, ajtó:</p>
            <p className="text-sm w-fit font-medium">{user.address2 || ""}</p>
          </div>
          <div className="flex flex-row items-baseline gap-1">
            <p className="text-xs w-fit">Telefonszám:</p>
            <p className="text-sm w-fit font-medium">{user.phone || ""}</p>
          </div>
          <div className="flex flex-col items-baseline gap-1">
            <p className="text-xs min-w-fit">E-mail cím:</p>
            <p className="text-sm w-fit font-medium">{user.email}</p>
          </div>
          <Link
            href={`/emlekadatlapok`}
            className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
          >
            <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
            Adatok módosítása
          </Link>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-sm">Jelszó:</p>
          <Link
            href={`/emlekadatlapok`}
            className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
          >
            <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
            Jelszó módosítása
          </Link>
        </div>
      </div>
    </div>
  );
}
