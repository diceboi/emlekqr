"use client";

import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { useState, useRef, useContext } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { usePathname } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function CoverPicture({ data }) {
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7); // Extract the last 7 digits for the S3 path

  const [selectedImage, setSelectedImage] = useState(null); // Local state for the selected image
  const fileInputRef = useRef(null);

  const { isEditable } = useContext(Context);
  const { updateFormData, updateFileNames } = useContext(UpdateEmlekadatlapContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file selected

    if (selectedFile) {
      const newFile = {
        file: selectedFile,
        url: URL.createObjectURL(selectedFile), // Create a preview URL
        id: Math.random().toString(36).substring(2, 15),
        path: `${lastDigits}/coverimage/${selectedFile.name}`, // Path for S3 upload
        newUrl: `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/coverimage/${selectedFile.name}`, // The final S3 URL
      };

      // Update local preview state
      setSelectedImage(newFile.url);

      // Update formData with the new image URL (to be saved in the database)
      updateFormData('coverimage', newFile.newUrl);

      // Update selected images for later processing (e.g., S3 upload)
      updateFileNames((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click(); // Open file input dialog
  };

  return (
    <div id="cover-picture" className="relative w-full h-[300px] lg:h-[500px] rounded-2xl">
      {isEditable && (
        <>
          <TbEdit
            className="absolute z-40 right-4 top-4 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer"
            onClick={handleEditClick}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Handle file selection
            ref={fileInputRef}
            className="hidden"
          />
        </>
      )}
      {data && (
        <Image
          src={selectedImage || data.coverimage} // Show selected image or the existing cover image
          fill
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          alt="Borítókép"
        />
      )}
      {!data && <h4>Töltsd fel a borítóképet</h4>}
    </div>
  );
}
