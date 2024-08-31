"use client"

import { useContext } from "react"
import { Context } from "../../Context"
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext"

export default function Bio({ data }) {

    const { isEditable } = useContext(Context);
    const { formData, updateFormData } = useContext(UpdateEmlekadatlapContext);

    return(
        <>
            {!isEditable &&
            <div dangerouslySetInnerHTML={{ __html: data }} />
            }

            {!data && (
            <div>Rövid leírás szerettedről</div>
            )}

            {isEditable &&
                <textarea
                rows="10"
                defaultValue={formData.bio}
                className="border border-neutral-300 rounded-2xl p-4 w-full"
                onChange={(e) => updateFormData(`bio`, e.target.value)}
              />
            }

        </>
    )
}