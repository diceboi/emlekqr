"use client"

import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Context } from "../../Context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TbMessage } from "react-icons/tb";
import MainCommentForm from "./MainCommentForm";

export default function SecondaryTributeTile({ tribute, issession, tributes, maintributeid }) {

    const [replyOpen, setReplyOpen] = useState(false)
    const [ userData, setUserData] = useState(null);
    const [ currentSession, setCurrentSession ] = useState(null)

    const secondaryTributes = tributes.filter(
      (secondarytribute) => secondarytribute.parent === tribute._id
    )

    const toggleReply = () => {
      setReplyOpen(prevState => !prevState);
    };

    const getUserData = async (email) => {
      try {
        const response = await fetch(`/api/getUserData?email=${email}`);
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
    }, [tribute.fromprofileid, issession?.user?.email]);

    return (
      <>
      <div className={`relative ${
        tribute.deleted === true
          ? "hidden"
          : "flex"
        } flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special my-4 ${tribute.main === false ? 'ml-16' : ''}`}
      >
        <div className={`flex flex-col lg:gap-4 gap-2`}>
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
            <button className="flex flex-nowrap gap-1 items-center self-start text-xs text-neutral-500 hover:bg-[--cream] px-2 py-1 rounded-full border border-neutral-300" onClick={toggleReply}><TbMessage /> Válasz</button>
        </div>
      </div>
      {secondaryTributes.map((secondarytribute, index) => (
        <SecondaryTributeTile key={index} tribute={secondarytribute} maintributeid={maintributeid} issession={issession} tributes={tributes}/>
      ))}
      {replyOpen && (
        <div className="lg:pl-16">
          <MainCommentForm main={false} to={maintributeid}/>
        </div>
      )}
      </>
    );
}
