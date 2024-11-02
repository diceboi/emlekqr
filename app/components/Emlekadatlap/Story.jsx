"use client";

import StoryYear from "../Emlekadatlap/StoryYear";
import { useContext, useEffect, useState } from "react";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { Context } from "../../Context";
import { TbPlus, TbWallpaper } from "react-icons/tb";

import H1 from "../UI/H1"
import H2 from "../UI/H2"
import H3 from "../UI/H3"
import H4 from "../UI/H4"
import Paragraph from "../UI/Paragraph"


export default function Story({ data }) {
  const { addStoryBlock, formData } = useContext(UpdateEmlekadatlapContext);
  const [storyBlocks, setStoryBlocks] = useState(data);

  const { isEditable } = useContext(Context);

  useEffect(() => {
    setStoryBlocks(formData.story);
  }, [formData]);

  const handleAddStoryBlock = () => {
    addStoryBlock();
  };

  return (
    <div className="flex flex-col gap-8 px-1 py-8 rounded-2xl">

      <div className="flex gap-4 items-center">
        <TbWallpaper className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
        <H4 classname={"text-[--rose]"}>Történet</H4>
      </div>

      {data && (
      storyBlocks.map((item, index) => (
        <StoryYear data={item} key={index} index={index} />
      ))
      )}

      {!data && (
        <h4>Írj le történeteket szerettedről!</h4>
      )}

      {isEditable &&
        <button
          className="flex flex-col items-center justify-center gap-2 border border-neutral-300 w-full h-48 rounded-2xl hover:shadow-xl hover:border-white hover:bg-white transition-all duration-200"
          onClick={handleAddStoryBlock}
        >
          <TbPlus className="w-6 h-6" />
          <p className="font-normal">Esemény hozzáadása</p>
        </button>
      }
      
    </div>
  );
}
