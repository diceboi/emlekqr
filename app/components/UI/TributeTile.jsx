"use client"

import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TbMessage, TbTrash } from "react-icons/tb";
import MainCommentForm from "./MainCommentForm";
import SecondaryTributeTile from "../UI/SecondaryTributeTile"
import Modal from "./Modal";
import Paragraph from "./Paragraph";

export default function TributeTile({ tribute, owner, session, alltributes }) {

    const { isEditable, openPopup, togglePopup } = useContext(Context);

    const [replyOpen, setReplyOpen] = useState(false)
    const [ userData, setUserData] = useState(null);
    const [ currentSession, setCurrentSession ] = useState(null)

    const secondaryTributes = alltributes.filter(
      (secondarytribute) => secondarytribute.parent === tribute._id
    )

    const toggleReply = () => {
      setReplyOpen(prevState => !prevState);
    };

    const router = useRouter()

    const handleApprove = async () => {
      const formData = {
        _id: tribute._id,
        verified: true,
        deleted: false,
      };

      try {
        const response = await fetch('/api/updateComment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
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

    const getUserData = async (id) => {
      try {
        const response = await fetch(`/api/getUserData?id=${id}`);
        const result = await response.json();
        if (response.ok) {
          setUserData(result.data.User);
        } else {
          console.error("Error fetching user data:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
  
    useEffect(() => {
      // Fetch user data if session exists
      if (tribute.fromprofileid) {
        getUserData(tribute.fromprofileid);
      }
    }, [tribute.fromprofileid, session?.user?.email]);

    const handleDeny = async () => {
      const formData = {
        _id: tribute._id,
        verified: false,
        deleted: true,
      };

      try {
        const response = await fetch('/api/updateComment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success('Komment sikeresen törölve.');
          router.refresh();
        } else {
          console.error('Failed to delete tribute:', result.message);
        }
      } catch (error) {
        console.error('Error deleting tribute:', error);
      }
    };

    // Check if session exists and set a default if not
    const isOwner = session?.user?.email === owner;

    return (
      <>
      <div className={`relative ${
          !isOwner && tribute.verified === false || tribute.deleted === true || tribute.main === false
          ? "hidden"
          : "flex"
        } relative flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special my-4`}
        id={tribute.fromprofileid}
      >
        
        <div className={`flex flex-col lg:gap-4 gap-2 ${tribute.verified === false ? "opacity-50" : "opacity-100"}`}>
          <div className="flex flex-nowrap items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
              src={ userData?.image || "/blank-image.webp" }
              fill
              style={{ objectFit: "cover" }}
              alt="Profile"
            />
            </div>
            <h4 className="text-sm">{tribute.from}</h4>
          </div>
          
          <p className="text-sm">{tribute.message}</p>
          {tribute.verified === true &&(
            <>
            <button className="flex flex-nowrap gap-1 items-center self-start text-xs text-neutral-500 hover:bg-[--cream] px-2 py-1 rounded-full border border-neutral-300" onClick={toggleReply}><TbMessage /> Válasz</button>
            {/*<TbTrash className="absolute top-4 right-4 w-6 h-6 text-[--error] hover:text-white bg-transparent hover:bg-[--error] p-1 cursor-pointer rounded-full" onClick={() => {togglePopup("DeleteComment")}} />*/}
            </>
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
              onClick={handleDeny}
            >
              Elvetés
            </button>
          </div>
        )}
      </div>
      {secondaryTributes.map((secondarytribute, index) => (
        <SecondaryTributeTile key={index} maintributeid={tribute._id} tribute={secondarytribute} issession={session} tributes={alltributes}/>
      ))}
      {replyOpen && (
        <div className="lg:pl-16">
          <MainCommentForm main={false} session={session} to={tribute._id}/>
        </div>
      )}
      </>
    );
}
