"use client";

import StoryYear from "../Emlekadatlap/StoryYear";
import { useContext, useEffect, useState } from "react";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { Context } from "../../Context";
import { TbPlus } from "react-icons/tb";

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
    <div className="flex flex-col gap-8 px-1 py-2 rounded-2xl">

      {data && (
      storyBlocks.map((item, index) => (
        <StoryYear data={item} key={index} index={index} />
      ))
      )}

      {!data && (
        <h4>Hozd létre szeretted idővonalát</h4>
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
