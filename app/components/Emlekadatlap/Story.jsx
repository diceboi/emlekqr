"use client";

import StoryYear from "../Emlekadatlap/StoryYear";
import StoryYearPeldaOldal from "../Emlekadatlap/StoryYearPeldaOldal";
import { useContext, useEffect, useState } from "react";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { Context } from "../../Context";
import { TbPlus, TbWallpaper } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { TbQrcode } from "react-icons/tb";
import Label from "../UI/Label";

import H1 from "../UI/H1"
import H2 from "../UI/H2"
import H3 from "../UI/H3"
import H4 from "../UI/H4"
import Paragraph from "../UI/Paragraph"

export default function Story({ data, free, peldaoldal }) {

  const storydata = data?.story

  const { addStoryBlock, formData } = useContext(UpdateEmlekadatlapContext);
  const [storyBlocks, setStoryBlocks] = useState(storydata);
  const { isEditable } = useContext(Context);

  useEffect(() => {
    // Always update from formData in free mode, or if we're editing an existing record
    setStoryBlocks(storydata);
  }, [storydata]);

  const handleAddStoryBlock = () => {
    addStoryBlock();
  };

  console.log("Story: ", storyBlocks)

  return (
    <div className="flex flex-col gap-8 px-1 py-8 rounded-2xl">
      <div className="flex gap-4 items-center">
        <TbWallpaper className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
        <H4 classname={"text-[--rose]"}>Történet</H4>
      </div>

      {peldaoldal ? (
        <StoryYearPeldaOldal data={storyBlocks[0]} />
      ):(
        storyBlocks && storyBlocks.length > 0 ? (
          storyBlocks.map((item, index) => (
            <StoryYear data={item} key={index} index={index} free={free} />
          ))
        ) : (
          <h4>Írj le történeteket szerettedről!</h4>
        )
      )}

      {isEditable && (
        <>
          {free && storyBlocks?.length >= 1 ? (
            <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-[--rose] text-[--rose] w-full h-48 rounded-2xl text-center p-4">
              
              <Paragraph classname={"font-semibold text-[--rose]"}>Az ingyenes verzióban legfeljebb 1 történetet hozhatsz létre.</Paragraph>
              <Label classname={"text-black"}>Vásárolj emlékérmét a korlátlan számú történet hozzáadásához.</Label>
              <Link
                href="/erme"
                className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-4 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] transition-all text-white h-fit self-center"
              >
                <Image src="/emlekqr-plus-white.svg" alt="EmlékQR Plusz" title="Válts EmlékQR Plusz-ra" width={15} height={15} />
                <Label classname={"cursor-pointer"}>Érme rendelés</Label>
              </Link>

            </div>
          ) : (
            <button
              className="flex flex-col items-center justify-center gap-2 border border-neutral-300 w-full h-48 rounded-2xl hover:shadow-xl hover:border-white hover:bg-white transition-all duration-200"
              onClick={handleAddStoryBlock}
            >
              <TbPlus className="w-6 h-6" />
              <p className="font-normal">Esemény hozzáadása</p>
            </button>
          )}
        </>
      )}
    </div>
  );
}