"use client"

import { useState, useContext } from "react";
import Bio from "../../components/Emlekadatlap/Bio"
import Story from "../../components/Emlekadatlap/Story"
import Media from "../../components/Emlekadatlap/Media"
import MediaPeldaOldal from "../../components/Emlekadatlap/MediaPeldaOldal"
import Tributes from "../../components/Emlekadatlap/Tributes"
import { Context } from "../../Context";
import PremiumPopup from "../../components/Emlekadatlap/PremiumPopup";
import { TbWallpaper } from "react-icons/tb"

export default function ProfileInfo({ data, tributes, session, cursor, free, peldaoldal }) {
  const [visibleSection, setVisibleSection] = useState("story");

  const { openPopup, setOpenPopup } = useContext(Context);

  return (
    <>
    {openPopup === "premium-tributes" && (
      <PremiumPopup open={true} popup={'premium-tributes'} innertext={'A tiszteletnyilvánítás EmlékQR Plusz funkció, csak érme vásárlás után elérhető'} innerimage={'/popups/comments.webp'} />
    )}
    <div id="profile-info" className="relative flex flex-col w-full h-full">
      <div className="sticky top-[70px] z-10 bg-neutral-50">
        <div className="flex flex-row gap-4 justify-between overflow-x-auto py-2">
          <button
            className={`lg:hover:bg-[--blue-15] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${visibleSection === "story" ? "bg-[--blue] text-white" : ""}`}
            onClick={() => setVisibleSection("story")}
          >
            Történet
          </button>
          <button
            className={`lg:hover:bg-[--blue-15] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${visibleSection === "media" ? "bg-[--blue] text-white" : ""}`}
            onClick={() => setVisibleSection("media")}
          >
            Média
          </button>
          <button
            className={`lg:hover:bg-[--blue-15] py-2 px-4 w-full transition-all duration-200 rounded-2xl ${free ? 'cursor-not-allowed' : 'cursor-pointer'} ${visibleSection === "tributes" ? "bg-[--blue] text-white" : ""}`}
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
          <Story id="story" data={data || null} free={free} peldaoldal={peldaoldal} />
        )}
        {visibleSection === "media" && (
          peldaoldal ? (
            <MediaPeldaOldal data={data} />
          ) : (
            <Media id="media" data={data?.media || null} free={free} peldaoldal={peldaoldal} />
          )
        )}
        {visibleSection === "tributes" && (
          <Tributes id="tributes" data={data?.owner || null} currenttributes={tributes || null} issession={session} free={free} peldaoldal={peldaoldal} />
        )}
      </div>
    </div>
    </>
  );
}
