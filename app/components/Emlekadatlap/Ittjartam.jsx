"use client";

import { TbUser, TbWalk } from "react-icons/tb";
import Label from "../UI/Label";
import Modal from "../UI/Modal";
import IttjartamForm from "../UI/IttjartamForm";
import { Context } from "../../Context";
import { useContext, useEffect, useState } from "react";
import PremiumPopup from "../../components/Emlekadatlap/PremiumPopup";
import AllIttjartam from "../../components/Emlekadatlap/AllIttjartam";


export default function Ittjartam({
  classname,
  free,
  data,
  currentuser,
  allittjartam,
  session,
  peldaoldal,
}) {
  const { openPopup, togglePopup, setOpenPopup, isEditable } = useContext(Context);
  const adatlap = data?.uri;

  return (
    <>
      <Modal
        openstate={openPopup === "Ittjartam"}
        onClose={() => togglePopup(null)}
      >
        <IttjartamForm adatlap={adatlap} userId={currentuser?._id} />
      </Modal>
      <Modal
        openstate={openPopup === "allIttjartam"}
        onClose={() => togglePopup(null)}
      >
        <AllIttjartam allittjartam={allittjartam} session={session} currentuser={currentuser} data={data}/>
      </Modal>
      {openPopup === "premium-ittjartam" && (
        <PremiumPopup
          open={true}
          popup={"premium-ittjartam"}
          innertext={
            'Az "Itt jártam" EmlékQR Plusz funkció, csak érme vásárlás után elérhető.'
          }
          innerimage={"/popups/ittjartam.webp"}
        />
      )}    
    {!isEditable && (
      <div className={`${classname}`}>
        {allittjartam?.length > 0 && !isEditable && (
          <div className="flex flex-col items-center text-sm text-gray-600 mb-2 min-w-full gap-1 self-center">
            <div className="flex flex-nowrap items-center">
              <TbUser className="text-[--rose] bg-white rounded-full p-1 min-w-6 h-6 z-[3] shadow-lg" />{" "}
              <TbUser className="text-[--rose-85] bg-white rounded-full p-1 min-w-6 h-6 -ml-3 z-[2] shadow-lg" />{" "}
              <TbUser className="text-[--rose-15] bg-white rounded-full p-1 min-w-6 h-6 -ml-3 shadow-lg" />
            </div>{" "}
            <button onClick={() => setOpenPopup("allIttjartam")} className="min-w-fit underline cursor-pointer">
              {allittjartam.length} ember járt már itt
            </button>
          </div>
        )}

        <button
          onClick={() => {
            if (free) {
              setOpenPopup("premium-ittjartam");
            } else {
              setOpenPopup("Ittjartam");
            }
          }}
          className={`flex flex-nowrap items-center gap-2 px-2 py-1 rounded-full min-w-fit bg-[--blue] hover:bg-[--blue-hover]`}
        >
          <TbWalk className="text-white min-w-4 h-4" />
          <Label classname={`min-w-fit text-white cursor-pointer`}>
          {allittjartam?.length > 0 ? "Én is itt jártam" : "Itt jártam"}
          </Label>
        </button>
        
      </div>
      )}
    </>
  );
}
