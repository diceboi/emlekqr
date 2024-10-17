import { TbBellRinging } from "react-icons/tb"
import Image from "next/image";
import Link from "next/link";

export default function ProfilErtesitesek() {
  return (
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-nowrap gap-4 items-center">
          <TbBellRinging className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
          <h4>Legutóbbi értesítések</h4>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-grow border border-[--cream] hover:bg-[--cream] rounded-lg p-2 gap-2">
            <Image
              src="/blank-profile.webp"
              width={50}
              height={50}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-[--rose] font-semibold min-w-fit">
              Szász Szabolcs
            </p>
            <p className="min-w-fit">hozzászólt az</p>
            <Link
              href="/emlekadatlapok/0000001"
              className="text-[--blue] underline min-w-fit"
            >
              Adatlapodhoz
            </Link>
          </div>
          <div className="flex border border-[--cream] rounded-lg p-2 gap-2">
            <Image
              src="/blank-profile.webp"
              width={50}
              height={50}
              className="w-6 h-6 rounded-full"
            />
            <p>Szász Szabolcs</p>
            <p>hozzászólt az</p>
            <Link
              href="/emlekadatlapok/0000001"
              className="text-[--blue] underline"
            >
              Adatlapodhoz
            </Link>
          </div>
          <div className="flex border border-[--cream] rounded-lg p-2 gap-2">
            <Image
              src="/blank-profile.webp"
              width={50}
              height={50}
              className="w-6 h-6 rounded-full"
            />
            <p>Szász Szabolcs</p>
            <p>hozzászólt az</p>
            <Link
              href="/emlekadatlapok/0000001"
              className="text-[--blue] underline"
            >
              Adatlapodhoz
            </Link>
          </div>
          <div className="flex border border-[--cream] rounded-lg p-2 gap-2">
            <Image
              src="/blank-profile.webp"
              width={50}
              height={50}
              className="w-6 h-6 rounded-full"
            />
            <p>Szász Szabolcs</p>
            <p>hozzászólt az</p>
            <Link
              href="/emlekadatlapok/0000001"
              className="text-[--blue] underline"
            >
              Adatlapodhoz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
