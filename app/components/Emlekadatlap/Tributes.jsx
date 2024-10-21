"use client"

import TributeTile from "../UI/TributeTile";
import MainCommentForm from "../UI/MainCommentForm";

export default function Tributes({ data, currenttributes, issession }) {  

  const availableTributes = currenttributes.filter(
    (tribute) => tribute.verified === true
  );

  return (
    <>
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
