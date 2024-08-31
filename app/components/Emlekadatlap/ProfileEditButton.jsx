'use client'

import { TbEdit, TbUserCheck, TbTrash } from "react-icons/tb";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext"

export default function ProfileEditButton({ session, user, data }) {

    const { isEditable, setEditable } = useContext(Context);
    const { formData, updateFormData, selectedImages } = useContext(UpdateEmlekadatlapContext)

    useEffect(() => {
      if (data) {
        updateFormData('uri', data.uri || "");
        updateFormData('name', data.name || "");
        updateFormData('age', data.age || "");
        updateFormData('graveyard', data.graveyard || "");
        updateFormData('bio', data.bio || "");
        updateFormData('story', data.story || []); // Ensure to handle this appropriately based on your data structure
        updateFormData('media', data.media || "");
        updateFormData('tributes', data.tributes || "");
        updateFormData('profileimage', data.profileimage || "");
        updateFormData('coverimage', data.coverimage || "");
        updateFormData('owner', data.owner || "");
        updateFormData('coowner', data.coowner || "");
        updateFormData('born', data.born || "");
        updateFormData('died', data.died || "");
        updateFormData('quote', data.quote || "");
      }
    }, [data])

    const handleSubmit = async () => {

        const response = await fetch('/api/updateadatlap', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({formData}),
        });
    
        if (response.ok) {
            setEditable(false)
            console.log("FormData", formData)
            console.log(selectedImages)
            console.log('Data submitted successfully');
        } else {
          // Handle error
          console.log("FormData", formData)
          console.log(selectedImages)
          console.log('Error submitting data');
        }
      };

    return(
        <>
        {session && user && !isEditable && ( 

            <button className="sticky inset-0 m-auto bottom-8 flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-[--rose] hover:bg-[--blue] shadow-2xl rounded-full z-50 transition-all" onClick={() => setEditable(true)}><TbEdit className="w-6 h-auto"/><p>Adatlap szerkesztése</p></button>

        )}

        {isEditable && ( 
        
        <>
        <div className="sticky inset-0 m-auto max-w-fit bottom-8 flex flex-row items-center justify-center gap-4 z-40 p-1">
            <button className="flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-green-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all" onClick={handleSubmit}><TbUserCheck className="w-4 h-auto"/><p className="label">Mentés</p></button>
            <button className="flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-red-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all" onClick={() => {setEditable(false); window.location.reload();}}><TbTrash className="w-4 h-auto"/><p className="label">Mégse</p></button>
        </div>
        
        </>
        )}
        </>
    )
}