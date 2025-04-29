import H3 from "./UI/H3";
import Label from "./UI/Label";
import {
  TbBrowserPlus,
  TbUserScan,
  TbImageInPicture,
  TbClipboardList,
  TbGrave,
  TbWallpaper,
  TbPhoto,
  TbVideo,
  TbMessage,
  TbCheck,
  TbX,
  TbQrcode,
  TbDevicesUp,
} from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

export default function OsszehasonlitasInner() {
  return (
    <div className="flex lg:flex-row flex-col lg:gap-16 gap-8">
        <div className="flex flex-col gap-4 lg:w-1/2 min-w-[300px] bg-[--cream] rounded-3xl pb-4">
          <H3 classname={"text-[--rose] text-center border-b-2 border-[--rose] p-4 rounded-t-3xl"}>
            Ingyenes emlékoldal
          </H3>
          <div className="flex flex-col">
            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /> <Label>Nyilvános emlékoldal</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /> <Label>Profilkép</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /> <Label>Borítókép</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /> <Label>Személyes adatok</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
              <TbX className="w-6 h-6 text-[--error]" /> <Label classname={"text-[--error]"}>Minőségi QR kódos emlékérme</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
              <TbX className="w-6 h-6 text-[--error]" /> <Label classname={"text-[--error]"}>Nyughely megjelölése térképen</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
              <Label classname={"text-[--error]"}>Max. 1 db történet</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
            <Label classname={"text-[--error]"}>Max. 2 db kép/történet</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
            <Label classname={"text-[--error]"}>Max. 2 db kép a médiába</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
              <TbX className="w-6 h-6 text-[--error]" /> <Label classname={"text-[--error]"}>Hozzászólások</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center py-2 mx-4">
              <Label classname={"text-[--error]"}>Új funkciók korlátozottan</Label>
            </div>

            <Link
              href="/ingyenes-emlekoldal-keszites"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 mt-4 rounded-full bg-white hover:bg-opacity-75 transition-all text-[--rose] font-semibold w-fit self-center"
            >
              Emlékoldal készítés
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:w-1/2 min-w-[300px] gap-4 bg-gradient-to-br from-[--rose] to-[--blue] shadow-2xl rounded-3xl pb-4 ">
          <div className="flex flex-nowrap gap-2 items-center justify-center border-b-2 border-white p-4 rounded-t-3xl">
            <Image
              src="/emlekqr-plus-white.svg"
              alt="EmlékQR Plusz"
              width={30}
              height={30}
            />
            <H3 classname={"text-white text-center h-10"}>EmlékQR+</H3>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Nyilvános emlékoldal</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Profilkép</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Borítókép</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Személyes adatok</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /> <Label classname={"text-white"}>Minőségi QR kódos emlékérme</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Nyughely megjelölése térképen</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Korlátlan történet</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
            <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Korlátlan kép/történet</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
              <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Képek videók korlátlanul a médiában</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
            <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Hozzászólások</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center py-2 mx-4">
            <TbCheck className="w-6 h-6 text-[--success]" /><Label classname={"text-white"}>Minden funkció</Label>
            </div>

            <Link
              href="/erme"
              className="flex flex-nowrap items-center justify-center gap-4 py-1 px-4 lg:py-2 lg:px-4 mt-4 rounded-full bg-white hover:bg-opacity-75 font-semibold transition-all text-[--rose] h-fit self-center"
            >
              <Image
                src="/emlekqr-plus-color.svg"
                alt="EmlékQR Plusz"
                title="Válts EmlékQR Plusz-ra"
                width={50}
                height={50}
                className="w-6 h-auto"
              />
              Érme rendelés
            </Link>
          </div>
        </div>
    </div>
  );
}
