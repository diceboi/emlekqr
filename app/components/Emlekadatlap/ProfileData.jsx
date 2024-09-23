"use client";

import Link from "next/link";
import { useContext } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext"
import { TbGrave, TbQuote } from "react-icons/tb";
import { LiaDoveSolid } from "react-icons/lia";

export default function ProfileData({ data }) {
  const { isEditable } = useContext(Context);
  const { updateFormData } = useContext(UpdateEmlekadatlapContext)

  return (
    <>
      {!isEditable && data && (
      <div className="flex flex-col gap-4 items-center xl:items-start xl:w-2/3 w-full bg-neutral-50 rounded-2xl z-10 lg:p-4">
        <div className="flex lg:flex-row flex-col items-center gap-4">
          <h4>{data.name}</h4>
          <p>{data.age}</p>
        </div>
        <div className="flex flex-nowrap gap-4 items-start">
          <LiaDoveSolid className="w-6 h-auto text-[--rose]" />

          <p className="label">
            {data.born} - {data.died}
          </p>
        </div>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${data.graveyard}`}
          className="flex flex-nowrap items-center gap-4 hover:text-[--blue]"
          target="_blank"
        >
          <TbGrave className="w-6 h-auto text-[--rose]" />
        <p className="label">{data.graveyard}</p>
        </Link>
        <div className="flex flex-nowrap gap-4 items-start">
          <TbQuote className="w-8 h-auto text-[--rose]" />
          <p className="label text-center xl:text-left font-thin">
          &quot;{data.quote}&quot;
          </p>
        </div>
      </div>
      )}

      {!isEditable && !data && (
      <div className="flex flex-col gap-4 items-center xl:items-start xl:w-2/3 w-full bg-neutral-50 rounded-2xl z-10 lg:p-4">
        <div className="flex lg:flex-row flex-col items-center gap-4">
          <h4>Szeretted neve</h4>
          <p>Kor</p>
        </div>
        <div className="flex flex-nowrap gap-4 items-start">
          <LiaDoveSolid className="w-6 h-auto text-[--rose]" />

          <p className="label">
            Született - Elhunyt
          </p>
        </div>
        <div className="flex flex-nowrap gap-4 items-start">
          <TbQuote className="w-8 h-auto text-[--rose]" />
          <p className="label text-center xl:text-left font-thin">
            Idézet
          </p>
        </div>
      </div>
      )}

      {isEditable && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 justify-start items-center w-full">
          <label htmlFor="name" className="label">Név</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border border-neutral-300 rounded-2xl p-4 w-full"
            defaultValue={data?.name || null}
            onChange={(e) => updateFormData('name', e.target.value)}
          />
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <label htmlFor="age" className="label">Kor</label>
            <input
              type="text"
              name="age"
              id="age"
              className="border border-neutral-300 rounded-2xl p-4 w-full"
              defaultValue={data?.age || null}
              onChange={(e) => updateFormData('age', e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <label htmlFor="born" className="label">Élt</label>
            <input
              type="text"
              name="born"
              id="born"
              className="border border-neutral-300 rounded-2xl p-4 w-full"
              size={6}
              defaultValue={data?.born || null}
              onChange={(e) => updateFormData('born', e.target.value)}
            />
            <input
              type="text"
              name="died"
              id="died"
              className="border border-neutral-300 rounded-2xl p-4 w-full" 
              size={6}
              defaultValue={data?.died || null}
              onChange={(e) => updateFormData('died', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <label htmlFor="graveyard" className="label">Nyughely</label>
            <textarea
              type="text"
              name="graveyard"
              id="graveyard"
              className="border border-neutral-300 rounded-2xl p-4 w-full"
              rows={2}
              defaultValue={data?.graveyard || null}
              onChange={(e) => updateFormData('graveyard', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <label htmlFor="quote" className="label">Idézet</label>
            <textarea
              type="text"
              name="quote"
              id="quote"
              className="border border-neutral-300 rounded-2xl p-4 w-full"
              rows={5}
              defaultValue={data?.quote || null}
              onChange={(e) => updateFormData('quote', e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}
