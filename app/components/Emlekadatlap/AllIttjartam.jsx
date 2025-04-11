"use client";

import { useState } from "react";
import H4 from "../UI/H4";
import Label from "../UI/Label";
import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

export default function AllIttjartam({ allittjartam, session, currentuser, data }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const deleteIttjartam = async (id) => {
    try {
      const response = await fetch("/api/deleteIttjartam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Üzenet sikeresen törölve.");
        window.location.reload();
      } else {
        toast.warning("Az üzenetet nem sikerült törölni.");
      }
    } catch (error) {
      console.error("Hiba a törlés közben:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <H4 classname={"text-[--rose]"}>Itt jártam üzenetek</H4>
      <div className="min-w-full">
        {allittjartam.map((item, index) => (
          <div
            className="relative bg-white rounded-lg p-4 mb-2 w-full"
            key={index}
          >
            <p className="text-lg font-bold max-w-10/12">
              {item?.name || "Anonim"}
            </p>
            <Label classname={"max-w-10/12"}>
              {item?.message || "Itt jártam."}
            </Label>

            {session?.user?.email === data?.owner || item.userId === currentuser?._id && (
            <div className="absolute lg:top-4 right-4">
              {confirmDeleteId === item._id ? (
                <button
                  onClick={() => deleteIttjartam(item._id)}
                  className="flex items-center gap-1 bg-[--error] text-white text-sm px-3 py-1 rounded-full shadow-md transition"
                >
                  Biztosan törlöd?
                </button>
              ) : (
                <button
                  onClick={() => setConfirmDeleteId(item._id)}
                  className="bg-transparent text-[--error] hover:text-white hover:bg-[--error] p-1 rounded-full transition"
                  title="Törlés"
                >
                  <TbTrash className="w-4 h-4" />
                </button>
              )}
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
