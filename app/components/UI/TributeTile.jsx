import { useContext } from "react";
import { Context } from "../../Context";

export default function TributeTile({ tribute }) {

    const { isEditable } = useContext(Context)

  return (
    <>
      <div className={`relative flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special my-4`}>
        <div className={`flex flex-col lg:gap-8 gap-4 ${ tribute.verified === false ? "opacity-50" : "opacity-100"}`}>
          <h4>{tribute.from}</h4>
          <p>{tribute.message}</p>
          {tribute.verified === false && (
          <p className="absolute top-2 right-3 text-sm text-[--blue]">Jóváhagyásra vár</p>
          )}
        </div>
        {tribute.verified === false && isEditable && (
        <div className="flex flex-nowrap gap-2 z-10">
          <button className="bg-[--success] px-2 py-1 rounded-full">Jóváhagy</button>
          <button className="bg-[--error] px-2 py-1 rounded-full text-white">Törlés</button>
        </div>
        )}
      </div>
    </>
  );
}
