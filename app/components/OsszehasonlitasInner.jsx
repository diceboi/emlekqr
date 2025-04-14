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
    <div className="lg:overflow-hidden overflow-x-scroll pt-20">
      <div className="flex flex-nowrap lg:min-w-max">
        <div className="flex flex-col lg:w-auto min-w-fit gap-4 rounded-3xl p-4 pr-10 mr-4">
          <div className="flex flex-col">

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbBrowserPlus className="w-6 h-6 text-[--blue]" />
              <Label>Nyilvános emlékoldal létrehozása</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbUserScan className="w-6 h-6 text-[--blue]" />
              <Label>Profilkép hozzáadása</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbImageInPicture className="w-6 h-6 text-[--blue]" />
              <Label>Borítókép hozzáadása</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbClipboardList className="w-6 h-6 text-[--blue]" />
              <Label>Személyes adatok hozzáadása</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbQrcode className="w-6 h-6 text-[--blue]" />
              <Label>Minőségi QR kódos emlékérme</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbGrave className="w-6 h-6 text-[--blue]" />
              <Label>Nyughely megjelölése térképen</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbWallpaper className="w-6 h-6 text-[--blue]" />
              <Label>Történetek hozzáadása</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbPhoto className="w-6 h-6 text-[--blue]" />
              <Label>Képek hozzáadása történetekhez</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbVideo className="w-6 h-6 text-[--blue]" />
              <Label>Média hozzáadása (képek, videók)</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
              <TbMessage className="w-6 h-6 text-[--blue]" />
              <Label>Hozzászólások engedélyezése</Label>
            </div>

            <div className="flex flex-nowrap gap-2 items-center py-2">
              <TbDevicesUp className="w-6 h-6 text-[--blue]" />
              <Label>Új funkciók</Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-1/2 min-w-[300px] bg-[--cream] rounded-3xl py-4 -ml-10 -mt-14 lg:mr-0 mr-4">
          <H3 classname={"text-[--rose] text-center h-10"}>
            Ingyenes emlékoldal
          </H3>
          <div className="flex flex-col">
            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2">
              <TbX className="w-6 h-6 text-[--error]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2">
              <TbX className="w-6 h-6 text-[--error]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px]">
              <Label classname={"text-[--error]"}>Max. 1 db</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px]">
            <Label classname={"text-[--error]"}>Max. 2 db</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px]">
            <Label classname={"text-[--error]"}>Max. 2 db kép</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px]">
              <TbX className="w-6 h-6 text-[--error]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center py-2">
              <Label classname={"text-[--error]"}>Korlátozottan</Label>
            </div>

            <Link
              href="/ingyenes-emlekoldal-keszites"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 mt-4 rounded-full bg-white hover:bg-opacity-75 transition-all text-[--rose] font-semibold w-fit self-center"
            >
              Emlékoldal készítés
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:w-1/2 min-w-[300px] gap-4 bg-gradient-to-br from-[--rose] to-[--blue] shadow-2xl rounded-3xl py-4 -ml-10 -mt-14">
          <div className="flex flex-nowrap gap-2 items-center justify-center">
            <Image
              src="/emlekqr-plus-white.svg"
              alt="EmlékQR Plusz"
              width={30}
              height={30}
            />
            <H3 classname={"text-white text-center h-10"}>EmlékQR+</H3>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px]">
              <Label classname={"text-[--success]"}>Korlátlan mennyiség</Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px]">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px]">
              <Label classname={"text-[--success] text-center"}>
                Képek, videók korlátlan mennyiségben
              </Label>
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px]">
              <TbCheck className="w-6 h-6 text-[--success]" />
            </div>

            <div className="flex flex-nowrap justify-center gap-2 items-center py-2">
              <Label classname={"text-[--success]"}>Minden funkció</Label>
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
    </div>
  );
}
