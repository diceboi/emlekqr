"use client";

import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { useState, useRef, useContext } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";

export const dynamic = 'force-dynamic';

export default function ProfilePicture({ session, data }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const { isEditable } = useContext(Context);
  const { updateFormData, updateFileNames } = useContext(UpdateEmlekadatlapContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
  
      // Get the file name without extension
      const fileNameWithoutExtension = selectedFile.name.replace(/\.[^/.]+$/, "");
  
      // Create the final URL with the .webp extension
      const finalImageUrl = `https://elmekqr-storage.s3.amazonaws.com/${data.uri}/profileimage/${fileNameWithoutExtension}.webp`;
  
      // Update the form data with the new image URL
      updateFormData('profileimage', finalImageUrl);
      updateFileNames(fileNameWithoutExtension);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div id="profile-pic" className="relative flex flex-col items-center xl:items-start w-[250px] h-[250px] min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px] -mt-[100px]">
        {isEditable && (
          <>
            <TbEdit className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer" onClick={handleEditClick} />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </>
        )}
        {data && (
        <Image
          src={selectedImage || data.profileimage}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full border-8 border-white"
          alt="Profilkép"
        />
        )}
        {!data && (
        <h4>Töltsd fel a profilképet</h4>
        )}
      </div>
    </>
  );
}
