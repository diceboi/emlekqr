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
          <TributeTile key={index} tribute={tribute} owner={data} session={issession}/>
        ))}

      {issession &&
        currenttributes.map((tribute, index) => (
          <TributeTile key={index} tribute={tribute} owner={data} session={issession} />
        ))}

      <MainCommentForm session={issession}/>
    </>
  );
}
