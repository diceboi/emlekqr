"use client"

import Emlekadatlaptile from "../UI/EmlekadatlapTile";
import { TbLibraryPhoto } from "react-icons/tb";

export default function ProfilEmlekadatlapok({ currentdata, user }) {

  {/*const stripeUser = user.*/}

  return (
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
        <div className="flex flex-col gap-8">
        <div className="flex flex-nowrap gap-4 items-center">
            <TbLibraryPhoto className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
            <h4>Emlékadatlapok</h4>
        </div>
        
        <div className="flex flex-col gap-4">
            {currentdata.length > 0 ? (
            currentdata.map((data, index) => (
                <Emlekadatlaptile data={data} key={index}/>
            ))
            ) : (
            <h4>Jelenleg még nincs adatlapod, készítsd el saját érmédet</h4>
            )}
        </div>
        </div>
    </div>
  )
}
