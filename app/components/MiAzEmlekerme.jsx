"use client"

import Link from "next/link";

import * as React from "react";
import "yet-another-react-lightbox/styles.css";

import { useContext } from "react";
import { Context } from "../Context";
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Paragraph from "./UI/Paragraph";
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

import EmlekermeInner from "./EmlekermeInner"

export default function MiAzEmlekerme({ session, userdata }) {

  const { openPopup, togglePopup, setOpenPopup } = useContext(Context);

  return (
    <section id="emlekerme" className='flex flex-col justify-start relative w-full overflow-hidden'>
        <div className='flex container m-auto lg:flex-row flex-col items-center justify-center lg:gap-16 gap-0 overflow-hidden px-4 py-8'>
            <div className='flex flex-col items-center justify-center relative w-full lg:w-1/2 lg:min-h-[80vh]'>
                
              <EmlekermeInner session={session} userdata={userdata} classname={"my-20"}/>

            </div>
            <div className="flex flex-col w-full lg:w-1/2 justify-start gap-8 z-10 lg:py-16">
              <H2 classname={"text-[--rose]"}>Mit nyújt az EmlékQR+ ?</H2>
              <div className="flex flex-col">

                <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
                  <TbBrowserPlus className="w-6 h-6 text-[--blue]" />
                  <Label>Emlékoldal minden extra funkcióval</Label>
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
                  <Label>Történetek hozzáadása korlátlan számban</Label>
                </div>

                <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
                  <TbPhoto className="w-6 h-6 text-[--blue]" />
                  <Label>Képek hozzáadása történetekhez korlátlan számban</Label>
                </div>

                <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
                  <TbVideo className="w-6 h-6 text-[--blue]" />
                  <Label>Média hozzáadása (képek, videók) korlátlan számban</Label>
                </div>

                <div className="flex flex-nowrap gap-2 items-center border-b border-[--cream] py-2">
                  <TbMessage className="w-6 h-6 text-[--blue]" />
                  <Label>Hozzászólások engedélyezése</Label>
                </div>

                <div className="flex flex-nowrap gap-2 items-center py-2">
                  <TbDevicesUp className="w-6 h-6 text-[--blue]" />
                  <Label>Folyamatos új funkciók</Label>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1/4 -right-40 w-[500px] h-[500px] bg-[--rose] rounded-full blur-[100px] opacity-15"></div>
        </div>
        
    </section>
  )
}
