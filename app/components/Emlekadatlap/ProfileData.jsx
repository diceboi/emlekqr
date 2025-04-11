"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { TbGrave, TbQuote, TbShare, TbLink, TbMail } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa";
import { LiaDoveSolid } from "react-icons/lia";
import H4 from "../UI/H4";
import H3 from "../UI/H3";
import H2 from "../UI/H2";
import Paragraph from "../UI/Paragraph";
import Label from "../UI/Label";
import Modal from "../UI/Modal";
import { toast } from "sonner";
import GraveyardMap from "../GraveyardMap";
import PremiumPopup from "./PremiumPopup";
import Ittjartam from "../../components/Emlekadatlap/Ittjartam";

export default function ProfileData({ data, cursor, free }) {
  const { isEditable, openPopup, setOpenPopup } = useContext(Context);
  const { updateFormData } = useContext(UpdateEmlekadatlapContext);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.info("Az emlékoldal linkje vágólapra másolva.");
    } catch (err) {
      console.error("Hiba másoláskor:", err);
    }
  };

  const facebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  };

  const emailShare = () => {
    const subject = encodeURIComponent("Nézd meg ezt az oldalt!");
    const body = encodeURIComponent(
      `Szerintem ez érdekelni fog: ${currentUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Modal
        openstate={openPopup === "graveyard"}
        onClose={() => setOpenPopup(null)}
      >
        <div className="flex flex-col gap-4">
          <H4 classname={"text-[--rose] self-center mb-4"}>
            Nyughely megjelölése a térképen
          </H4>
          <Label classname={"text-center"}>
            Keresd ki a térképen a nyugelyet majd kattints a megfelelő pontra,
            hogy a kis piros jelölő a sírhelynél legyen.
          </Label>
          <GraveyardMap />
          <button
            className="flex flex-nowrap gap-2 items-center bg-[--blue] hover:bg-[--blue-hover] rounded-full transition-all text-white w-fit py-2 px-4 self-center"
            onClick={() => setOpenPopup(null)}
          >
            Kész
          </button>
        </div>
      </Modal>
      {openPopup === "premium-graveyard" && (
            <PremiumPopup open={true} popup={'premium-graveyard'} innertext={'A nyughely megjelölése térképen EmlékQR Plusz funkció, csak érme vásárlás után elérhető'} innerimage={'/popups/terkep.webp'} />
          )}
      {!isEditable && data && (
        <div
          className={`flex flex-col gap-4 items-center xl:items-start w-full rounded-2xl z-10 ${
            cursor === false ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <div className="flex lg:flex-row flex-col lg:items-baseline items-center gap-4 w-full">
            <H3 classname={"lg:text-left text-center text-[--rose]"}>
              {data.name}{" "}
              <span className="text-black text-lg">({data.age})</span>
            </H3>
          </div>
          <div className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center items-center w-full py-4">
            <Label classname={"flex flex-nowrap gap-2 items-center"}>
              Megosztás:{" "}
            </Label>
            <div className="flex flex-nowrap gap-2 items-center">
              <TbLink
                onClick={copyToClipboard}
                className="min-w-7 h-auto text-white bg-[--blue] rounded-full p-1 hover:bg-[--blue-hover] cursor-pointer"
              />
              <FaFacebookF
                onClick={facebookShare}
                className="min-w-7 h-auto text-white bg-[--blue] rounded-full p-1 hover:bg-[--blue-hover] cursor-pointer"
              />
              <TbMail
                onClick={emailShare}
                className="min-w-7 h-auto text-white bg-[--blue] rounded-full p-1 hover:bg-[--blue-hover] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col bg-[--cream] rounded-3xl p-4 w-fit">
            <div className="flex flex-nowrap gap-4 items-center border-b border-white pb-2">
              <LiaDoveSolid className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />

              <Paragraph className="label">
                {data.born} - {data.died}
              </Paragraph>
            </div>
            {data.graveyard && (
              <div className="flex lg:flex-nowrap gap-4 items-center">
                <Link
                href={data.graveyard}
                className="flex flex-nowrap items-center gap-4 hover:text-[--blue] border-b border-white py-2"
                target="_blank"
                >
                <TbGrave className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
                <Paragraph classname="underline text-[--blue]">Nyughely megtekintése térképen</Paragraph>
                </Link>
              </div>
            )}
            
            <div className="flex flex-nowrap gap-4 items-start pt-2">
              <TbQuote className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
              <Paragraph className="label text-center xl:text-left font-thin">
                &quot;{data.quote}&quot;
              </Paragraph>
            </div>
          </div>
        </div>
      )}

      {!isEditable && !data && (
        <div
          className={`flex flex-col gap-4 items-center xl:items-start w-full rounded-2xl z-10 ${
            cursor === false ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <div className="flex lg:flex-row flex-col lg:items-baseline items-center gap-4 w-full">
            <H3 classname={"lg:text-left text-center text-[--rose]"}>
              Szeretted neve
            </H3>
            <Paragraph>Kor</Paragraph>
          </div>
          <div className="flex flex-col bg-[--cream] rounded-3xl p-4 w-full">
            <div className="flex flex-nowrap gap-4 items-center border-b border-white pb-2">
              <LiaDoveSolid className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />

              <Paragraph className="label">Született - Elhunyt</Paragraph>
            </div>
            <div className="flex flex-nowrap items-center gap-4 hover:text-[--blue] border-b border-white py-2">
              <TbGrave className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
              <Paragraph className="label">Nyughely</Paragraph>
            </div>
            <div className="flex flex-nowrap gap-4 items-center pt-2">
              <TbQuote className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
              <Paragraph className="label text-center xl:text-left font-thin">
                Idézet
              </Paragraph>
            </div>
          </div>
        </div>
      )}

      {isEditable && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <input
              type="text"
              name="name"
              id="name"
              className="border border-neutral-300 rounded-2xl p-4 w-full"
              defaultValue={data?.name || null}
              onChange={(e) => updateFormData("name", e.target.value)}
              placeholder="Név"
            />
            <input
              type="text"
              name="age"
              id="age"
              className="border border-neutral-300 rounded-2xl p-4 w-1/4"
              defaultValue={data?.age || null}
              onChange={(e) => updateFormData("age", e.target.value)}
              placeholder="Kor"
            />
          </div>
          <div className="flex flex-col bg-[--cream] rounded-3xl p-4 w-full">
            <div className="flex flex-nowrap gap-4 items-center border-b border-white pb-2">
              <LiaDoveSolid className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
              <input
                type="text"
                name="born"
                id="born"
                className="border border-neutral-300 rounded-2xl p-4 w-full"
                size={6}
                defaultValue={data?.born || null}
                onChange={(e) => updateFormData("born", e.target.value)}
                placeholder="Született"
              />
              {" - "}
              <input
                type="text"
                name="died"
                id="died"
                className="border border-neutral-300 rounded-2xl p-4 w-full"
                size={6}
                defaultValue={data?.died || null}
                onChange={(e) => updateFormData("died", e.target.value)}
                placeholder="Elhunyt"
              />
            </div>
            <div className="flex flex-nowrap items-center gap-4 hover:text-[--blue] border-b border-white py-2">
              <TbGrave className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
              <button onClick={() => setOpenPopup(data?.paymentStatus === 'free' || !data?.paymentStatus ? "premium-graveyard" : "graveyard")}
              className="flex flex-nowrap gap-2 items-center bg-[--blue] hover:bg-[--blue-hover] rounded-3xl transition-all text-white w-fit py-2 px-4">
                Nyughely megjelölése térképen
              </button>
            </div>
            <div className="flex flex-nowrap gap-4 items-start pt-2">
              <TbQuote className="min-w-10 h-auto text-[--rose] bg-white rounded-full p-2" />
              <textarea
                type="text"
                name="quote"
                id="quote"
                className="border border-neutral-300 rounded-2xl p-4 w-full"
                rows={5}
                defaultValue={data?.quote || null}
                onChange={(e) => updateFormData("quote", e.target.value)}
                placeholder="Idézet"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
