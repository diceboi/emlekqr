"use client"

import { useState, useContext } from "react";
import Bio from "../../components/Emlekadatlap/Bio"
import Story from "../../components/Emlekadatlap/Story"
import Media from "../../components/Emlekadatlap/Media"
import Tributes from "../../components/Emlekadatlap/Tributes"
import { Context } from "../../Context";
import PremiumPopup from "../../components/Emlekadatlap/PremiumPopup";

export default function ProfileInfo({ data, tributes, session, cursor, free }) {
  const [visibleSection, setVisibleSection] = useState("story");

  const { openPopup, setOpenPopup } = useContext(Context);

  return (
    <>
    {openPopup === "premium-tributes" && (
      <PremiumPopup open={true} popup={'premium-tributes'} innertext={'A tiszteletnyilvánítás EmlékQR Plusz funkció, csak érme vásárlás után elérhető'} innerimage={'/popups/comments.webp'} />
    )}
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
            className={`hover:bg-[--cream] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${free ? 'cursor-not-allowed' : 'cursor-pointer'} ${visibleSection === "tributes" ? "bg-[--cream]" : ""}`}
            onClick={() => {
              if (free) {
                setOpenPopup('premium-tributes');
              } else {
                setVisibleSection("tributes");
              }
            }}
          >
            Tiszteletnyilvánítás
          </button>
        </div>
      </div>
      <div className={`w-full ${cursor === false ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        {visibleSection === "story" && (
          <Story id="story" data={data || null} free={free} />
        )}
        {visibleSection === "media" && (
          <Media id="media" data={data?.media || null} free={free} />
        )}
        {visibleSection === "tributes" && (
          <Tributes id="tributes" data={data?.owner || null} currenttributes={tributes || null} issession={session} free={free} />
        )}
      </div>
    </div>
    </>
  );
}
