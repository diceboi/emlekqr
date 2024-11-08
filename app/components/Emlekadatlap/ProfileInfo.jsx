"use client"

import { useState } from "react";
import Bio from "../../components/Emlekadatlap/Bio"
import Story from "../../components/Emlekadatlap/Story"
import Media from "../../components/Emlekadatlap/Media"
import Tributes from "../../components/Emlekadatlap/Tributes"

export default function ProfileInfo({ data, tributes, session }) {
  const [visibleSection, setVisibleSection] = useState("story");

  return (
    <div id="profile-info" className="flex flex-col w-full">
      <div className="overflow-x-scroll sm:overflow-hidden w-full py-8">
        <div className="flex flex-row gap-4 justify-between">
          <button
            className={`hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${visibleSection === "story" ? "bg-[--cream]" : ""}`}
            onClick={() => setVisibleSection("story")}
          >
            Történet
          </button>
          <button
            className={`hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${visibleSection === "media" ? "bg-[--cream]" : ""}`}
            onClick={() => setVisibleSection("media")}
          >
            Média
          </button>
          <button
            className={`hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${visibleSection === "tributes" ? "bg-[--cream]" : ""}`}
            onClick={() => setVisibleSection("tributes")}
          >
            Tiszteletnyilvánítás
          </button>
        </div>
      </div>
      <div className="w-full">
        {visibleSection === "story" && (
          <Story id="story" data={data?.story || null}/>
        )}
        {visibleSection === "media" && (
          <Media id="media" data={data?.media || null}/>
        )}
        {visibleSection === "tributes" && (
          <Tributes id="tributes" data={data?.owner || null} currenttributes={tributes || null} issession={session}/>
        )}
      </div>
    </div>
  );
}
