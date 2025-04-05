"use client"

import Modal from "../UI/Modal";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../../Context";
import H1 from "../UI/H1";
import H2 from "../UI/H2";
import H3 from "../UI/H3";
import H4 from "../UI/H4";
import Paragraph from "../UI/Paragraph";
import Label from "../UI/Label";
import Link from "next/link";
import Image from "next/image";

import { TbPhotoScan } from "react-icons/tb";
import { TbVideoPlus } from "react-icons/tb";
import { TbQrcode } from "react-icons/tb";
import { TbMessage } from "react-icons/tb"
import { TbWallpaper } from "react-icons/tb"

export default function PremiumPopup({ hasReachedLimit, open, innertext, innerimage, popup }) {
  const { openPopup, setOpenPopup, togglePopup } = useContext(Context);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (hasReachedLimit && !hasShownPopup || open) {
      setOpenPopup(popup);
      setHasShownPopup(true); // csak egyszer engedjük
    }
  }, [hasReachedLimit, hasShownPopup, setOpenPopup]);

  return (
    <Modal openstate={openPopup === popup} onClose={() => togglePopup(null)} type={'premium'} classname={'bg-gradient-to-br from-[--rose] to-[--blue]'}>
        <div className="flex flex-col gap-4">
            <Image src='/emlekqr-plus-white.svg' width={50} height={50} alt="EmlékQR Plusz" className="w-8 h-auto self-center"/>
            <H4 classname={'text-white text-center'}>Hoppá, úgy tűnik elérted<br></br> az ingyenes határt</H4>
            {innerimage && (
              <Image src={innerimage} width={800} height={250} alt="EmlékQR Plusz" className=" rounded-2xl shadow-lg"/>
            )}
            {innertext && (
            <Label classname={'text-white opacity-75 text-center'}>{innertext}</Label>
            )}
            <div className="relative flex flex-col gap-4">
              <Link
                href="/erme"
                className="flex flex-nowrap items-center justify-center gap-4 py-1 px-4 lg:py-2 lg:px-4 rounded-full bg-white hover:bg-opacity-75 transition-all text-[--rose] h-fit self-center"
              >
                <Image src="/emlekqr-plus-color.svg" alt="EmlékQR Plusz" title="Válts EmlékQR Plusz-ra" width={50} height={50} className="w-6 h-auto" />
                <Label classname={"cursor-pointer font-semibold"}>Érme rendelés</Label>
              </Link>
            </div>
            
        </div>
    </Modal>
  );
}
