"use client";

import StoryYear from "../Emlekadatlap/StoryYear";
import { useContext, useEffect, useState } from "react";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { Context } from "../../Context";

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
          className="flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special hover:bg-[--blue-15]"
          onClick={handleAddStoryBlock}
        >
          <h1>+ Új esemény hozzáadása</h1>
        </button>
      }
      
    </div>
  );
}
