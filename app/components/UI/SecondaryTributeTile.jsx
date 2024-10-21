"use client"

import { useContext, useState } from "react";
import { Context } from "../../Context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TbMessage } from "react-icons/tb";
import MainCommentForm from "./MainCommentForm";

export default function SecondaryTributeTile({ tribute, issession, tributes, maintributeid }) {

    console.log("Issession: ", issession)
    console.log("Tributes: ", tributes)

    const [replyOpen, setReplyOpen] = useState(false)

    const secondaryTributes = tributes.filter(
      (secondarytribute) => secondarytribute.parent === tribute._id
    )

    const toggleReply = () => {
      setReplyOpen(prevState => !prevState);
    };

    return (
      <>
      <div className={`relative ${
        tribute.deleted === true
          ? "hidden"
          : "flex"
        } flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special my-4 ${tribute.main === false ? 'ml-16' : ''}`}
      >
        <div className={`flex flex-col lg:gap-4 gap-2`}>
          <h4 className="text-sm">{tribute.from}</h4>
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
