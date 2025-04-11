"use client";

import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import FreeEmlekadatlapTile from "./FreeEmlekadatlapTile";
import { toast } from "sonner";
import Image from "next/image";

export default function ErmeChecker({
  currentdata,
  session,
  currentuser,
  existingadatlapok,
}) {
  const { openPopup, setOpenPopup } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [freedata, setFreedata] = useState(null);
  const [modalShown, setModalShown] = useState(true)

  useEffect(() => {
    if (!currentdata?.paymentStatus) {
      setOpenPopup('freeChecker');
    }
  }, [currentdata, setOpenPopup]);

  const deleteAdatlap = async (adatlapId) => {
    try {
      const response = await fetch('/api/deleteAdatlapId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adatlapId }),
      });

    } catch (error) {
      console.error('Error deleting adatlap:', error);
    }
  };

  const handleLinkFree = async () => {
    if (!currentdata?.uri) return;

    setIsLoading(true);
    setStatus("Elkezdtem a folyamatot...");

    try {
      // Step 1: Rename S3 folder
      toast.info("Mappák átnevezése folyamatban...");
      const renameResponse = await fetch("/api/s3-rename-folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceFolder: freedata.uri,
          destinationFolder: currentdata.uri,
        }),
      });

      const renameData = await renameResponse.json();

      if (!renameData.success) {
        throw new Error(`Hiba a mappa átnevezésekor: ${renameData.error}`);
      }

      toast.info("Adatok frissítése folyamatban...");

      // Step 2: Update the emlekadatlap data
      const mergeResponse = await fetch("/api/mergeadatlap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentdata,
          freedata,
        }),
      });

      const mergeData = await mergeResponse.json();

      if (!mergeData.success) {
        throw new Error(
          `Hiba az emlékoldal frissítésekor: ${mergeData.error}`
        );
      }

      toast.success("Sikeres összekapcsolás!");

      deleteAdatlap(freedata._id)

      // Close modal after a brief delay to show success message
      setTimeout(() => {
        setOpenPopup(null);
        // Reload the page to reflect changes
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Hiba az összekapcsolás során:", error);
      toast.error("Hiba történt az összekapcsolás során.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        openstate={openPopup === "freeChecker"}
        onClose={() => {setModalShown(true); setOpenPopup(null)}}
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">
            Szeretnéd összekötni az emlékérméd egy ingyenes emlékoldaladdal? Válassz egyet.
          </h3>
          {existingadatlapok.map((data) => {
            const isSelected = freedata?.uri === data.uri;

            return (
              <div
                key={data.uri}
                onClick={() => setFreedata(data)}
                className={`relative flex lg:flex-row flex-col gap-8 rounded-xl border p-4 min-h-[125px] cursor-pointer transition-colors
                ${
                  isSelected
                    ? "bg-[--blue-15] border-[--blue]"
                    : "bg-white border-[--blue-15] hover:bg-[--blue-15]"
                }`}
              >
                <div className="flex lg:flex-row flex-col gap-4 w-full">
                  <div className="relative lg:min-w-[75px] lg:min-h-[75px] min-w-[50px] min-h-[50px] self-start">
                    {data.profileimage ? (
                      <Image
                        src={data.profileimage}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-full"
                        alt="Profile Image"
                      />
                    ) : (
                      <Image
                        src="/blank-profile.webp"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-full"
                        alt="Blank Profile Image"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <h4 className="text-lg">{data.name}</h4>
                      <p className="text-sm">({data.age})</p>
                    </div>

                    {data.uri && !data.uri.includes("@") && (
                      <p className="text-xs">Azonosító: {data.uri}</p>
                    )}

                    <div className="flex lg:flex-nowrap flex-wrap gap-2">
                      <p className="text-xs">Státusz: </p>
                      <p className="text-xs text-[--blue]">Ingyenes adatlap</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="flex lg:flex-row items-center justify-center flex-col gap-4">
          <button
            className={`px-4 py-2 rounded-full transition-all text-white lg:w-fit self-center
              ${freedata === null
                ? "bg-[--blue] cursor-not-allowed opacity-50"
                : "bg-[--blue] hover:bg-[--blue-hover] cursor-pointer"}`}
            onClick={handleLinkFree}
            disabled={freedata === null}
          >
            {isLoading ? "Folyamatban..." : "Összekötés"}
          </button>
          <button
            className="px-4 py-2 rounded-full transition-all text-white lg:w-fit self-center bg-[--blue] hover:bg-[--blue-hover] cursor-pointer"
            onClick={() => {setModalShown(true); setOpenPopup(null)}}
          >
            Nem, újat kezdek.
          </button>
        </div>
        </div>
      </Modal>
    </>
  );
}
