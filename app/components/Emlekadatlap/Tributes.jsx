"use client"

import TributeTile from "../UI/TributeTile";
import MainCommentForm from "../UI/MainCommentForm";
import { TbMessage } from "react-icons/tb";
import H1 from "../UI/H1"
import H2 from "../UI/H2"
import H3 from "../UI/H3"
import H4 from "../UI/H4"
import Paragraph from "../UI/Paragraph"

export default function Tributes({ data, currenttributes, issession }) {  

  const availableTributes = currenttributes.filter(
    (tribute) => tribute.verified === true
  );

  return (
    <>
      <div className="flex gap-4 items-center pt-8 pb-4">
        <TbMessage className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
        <H4 classname={"text-[--rose]"}>Hozzászólások</H4>
      </div>
      {!issession &&
        availableTributes.map((tribute, index) => (
          <TributeTile key={index} tribute={tribute} owner={data} session={issession} alltributes={currenttributes}/>
        ))}

      {issession &&
        currenttributes.map((tribute, index) => (
          <TributeTile key={index} tribute={tribute} owner={data} session={issession} alltributes={currenttributes}/>
        ))}

      <MainCommentForm session={issession} main={true}/>
    </>
  );
}
