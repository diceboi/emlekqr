"use client"

import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TbMessage, TbTrash } from "react-icons/tb";
import MainCommentForm from "./MainCommentForm";
import SecondaryTributeTile from "../UI/SecondaryTributeTile"

export default function TributeTile({ tribute, owner, session, alltributes, peldaoldal, onRequestDelete }) {

  const { isEditable } = useContext(Context);

  const [replyOpen, setReplyOpen] = useState(false);
  const [ userData, setUserData] = useState(null);

  const secondaryTributes = alltributes.filter(
    (secondarytribute) => secondarytribute.parent === tribute._id && secondarytribute.deleted !== true
  );

  const toggleReply = () => setReplyOpen(prev => !prev);

  const router = useRouter();

  const handleApprove = async () => {
    const formData = { _id: tribute._id, verified: true, deleted: false };
    try {
      const response = await fetch('/api/updateComment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Komment sikeresen megerősítve.');
        router.refresh();
      } else {
        console.error('Failed to approve tribute:', result.message);
      }
    } catch (error) {
      console.error('Error approving tribute:', error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await fetch(`/api/getUserData?id=${id}`);
      const result = await response.json();
      if (response.ok) setUserData(result.data.User);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  
  useEffect(() => {
    if (tribute.fromprofileid) getUserById(tribute.fromprofileid);
  }, [tribute.fromprofileid]);

  const isOwner = session?.user?.email === owner;

  const hidden = (
    (!isOwner && tribute.verified === false) ||
    tribute.deleted === true ||
    tribute.main === false
  );

  if (hidden) return null;

  return (
    <>
      <div
        className={`relative flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special my-4 ${tribute.verified === false ? "opacity-50" : "opacity-100"}`}
        id={tribute.fromprofileid}
      >
        <div className={`flex flex-col lg:gap-4 gap-2`}>
          <div className="flex flex-nowrap items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={ userData?.image || "/blank-profile.webp" }
                fill
                style={{ objectFit: "cover" }}
                alt="Profile"
              />
            </div>
            <h4 className="text-sm">{tribute.from}</h4>
          </div>
          
          <p className="text-sm">{tribute.message}</p>

          {tribute.verified === true && (
            <div className="flex items-center gap-2">
              <button
                className={`flex flex-nowrap gap-1 items-center self-start text-xs text-neutral-500 hover:bg-[--cream] px-2 py-1 rounded-full border border-neutral-300 ${peldaoldal ? 'pointer-events-none' : 'pointer-events-auto'}`}
                onClick={toggleReply}
              >
                <TbMessage /> Válasz
              </button>

              {isOwner && (
                <button
                  className="flex flex-nowrap gap-1 items-center self-start text-xs text-neutral-500 hover:bg-[--cream] px-2 py-1 rounded-full border border-neutral-300"
                  onClick={() => onRequestDelete?.(tribute._id)}
                >
                  <TbTrash /> Törlés
                </button>
              )}
            </div>
          )}
          
          {tribute.verified === false && (
            <p className="absolute top-2 right-3 text-sm text-[--blue]">Jóváhagyásra vár</p>
          )}
        </div>

        {tribute.verified === false && isEditable && (
          <div className="flex flex-nowrap gap-2 z-10">
            <button 
              className="bg-[--success] px-2 py-1 rounded-full text-white text-sm"
              onClick={handleApprove}
            >
              Jóváhagy
            </button>
            <button 
              className="bg-[--error] px-2 py-1 rounded-full text-white text-sm"
              onClick={() => onRequestDelete?.(tribute._id)}
            >
              Elvetés
            </button>
          </div>
        )}
      </div>

      {secondaryTributes.map((secondarytribute) => (
        <SecondaryTributeTile
          key={secondarytribute._id}
          maintributeid={tribute._id}
          tribute={secondarytribute}
          issession={session}
          tributes={alltributes}
          peldaoldal={peldaoldal}
        />
      ))}

      {replyOpen && (
        <div className="lg:pl-16">
          <MainCommentForm main={false} session={session} to={tribute._id} />
        </div>
      )}
    </>
  );
}
