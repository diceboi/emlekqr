"use client";

import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { useState, useRef, useContext } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";

export const dynamic = 'force-dynamic';

export default function CoverPicture({ data }) {
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
      const finalImageUrl = `https://elmekqr-storage.s3.amazonaws.com/${data.uri}/coverimage/${fileNameWithoutExtension}.webp`;
  
      // Update the form data with the new image URL
      updateFormData('coverimage', finalImageUrl);
      updateFileNames(imageUrl);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div id="cover-picture" className="relative w-full h-[300px] lg:h-[500px] rounded-2xl">
        {isEditable && (
          <>
            <TbEdit className="absolute z-40 right-4 top-4 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer" onClick={handleEditClick} />
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
          src={selectedImage || data.coverimage}
          fill
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          alt="Profilkép"
        />
        )}
        {!data && (
        <h4>Töltsd fel a borítóképet</h4>
        )}
      </div>
    </>
  );
}
