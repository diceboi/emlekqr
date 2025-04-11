"use client"

import EmlekadatlapTile from "../UI/EmlekadatlapTile";
import { TbLibraryPhoto } from "react-icons/tb";
import Modal from "../UI/Modal";
import CancelSubscription from "../UI/CancelSubscription";
import { Context } from "../../Context";
import { useContext } from "react";
import H4 from "../UI/H4";
import Image from "next/image";
import Label from "../UI/Label";
import Link from "next/link";

export default function ProfilEmlekadatlapok({ currentdata }) {

  const { deletableSubId, deletableAdatlapId, openPopup, togglePopup } = useContext(Context);

  return (
    <>
    <Modal openstate={openPopup === "deleteAdatlap"} onClose={() => togglePopup(null)}>
      <CancelSubscription subscriptionId={deletableSubId} adatlapId={deletableAdatlapId}/>
    </Modal>
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
        <div className="flex flex-col gap-8">
        <div className="flex flex-nowrap gap-4 items-center">
            <TbLibraryPhoto className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
            <H4 classname={"text-[--rose]"}>Emlékoldalak</H4>
        </div>
        
        <div className="flex flex-col gap-4">
            {currentdata.length > 0 ? (
            currentdata.map((data, index) => (
                <EmlekadatlapTile data={data} key={index}/>
            ))
            ) : (
            <h4>Jelenleg még nincs emlékoldalad, készítsd el saját érmédet</h4>
            )}
        </div>
        </div>
    </div>
    </>
    
  )
}
