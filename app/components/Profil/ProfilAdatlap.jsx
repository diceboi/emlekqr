"use client"

import Image from "next/image";
import Link from "next/link";
import { TbEdit, TbLogout2 } from "react-icons/tb";
import { signOut } from "next-auth/react"
import Modal from "../UI/Modal";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import ProfilDataForm from "../UI/ProfilDataForm"
import ResetPasswordProfileForm from "../ResetPasswordProfileForm";

export default function ProfilAdatlap({ session, user }) {
  const { openPopup, togglePopup } = useContext(Context);

  return (
    <>
      <Modal openstate={openPopup === "modifyData"} onClose={() => togglePopup(null)}>
        <ProfilDataForm email={user.email} name={user.name || []} zip={user.zip || []} city={user.city || []} street={user.address1 || []} floor={user.adress2 || []} phone={user.phone || []} />
      </Modal>

      <Modal openstate={openPopup === "modifyPassword"} onClose={() => togglePopup(null)}>
        <ResetPasswordProfileForm session={session} />
      </Modal>
      
      <div className="lg:sticky lg:top-36 flex flex-col gap-8 bg-white rounded-2xl border border-white shadow-special lg:w-1/4 h-fit p-8">
        <div className="relative rounded-full w-[150px] h-[150px] self-center">
          <Image
            src={user.image || "/blank-profile.webp"} // Prioritize `user.image`
            fill
            style={{ objectFit: "cover" }}
            alt="Profile Image"
            className="rounded-full relative"
          />
          <TbEdit
            className="absolute z-10 left-1/2 -translate-x-1/2 -bottom-4 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer"
            onClick={() => togglePopup("modifyData")} // Open the "modifyData" modal
          />
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="self-center">{user?.name || "Anonymous"}</h4>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-t border-[--cream] py-2">
            <div className="flex flex-col items-baseline gap-1 border-b border-[--cream] pb-2">
              <p className="text-xs w-fit">Cím:</p>
              <p className="text-sm w-fit font-medium">{user?.zip || ""}</p>
              <p className="text-sm w-fit font-medium">{user.city || ""}</p>
              <p className="text-sm w-fit font-medium">{user.address1 || ""}</p>
              <p className="text-sm w-fit font-medium">{user.address2 || ""}</p>
            </div>
            <div className="flex flex-col items-baseline gap-1 border-b border-[--cream] pb-2">
              <p className="text-xs w-fit">Telefonszám:</p>
              <p className="text-sm w-fit font-medium">{user.phone || ""}</p>
            </div>
            <div className="flex flex-col items-baseline gap-1 border-b border-[--cream] pb-2">
              <p className="text-xs min-w-fit">E-mail cím:</p>
              <p className="text-sm w-fit font-medium">{user.email}</p>
            </div>
            <button
              onClick={() => togglePopup("modifyData")}
              className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
            >
              <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
              Adatok módosítása
            </button>
            <button
              onClick={() => togglePopup("modifyPassword")}
              className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
            >
              <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
              Jelszó módosítása
            </button>
            <button
              onClick={signOut}
              className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
            >
              <TbLogout2 className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
              Kijelentkezés
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

