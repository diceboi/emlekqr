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
    const selectedFile = e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      // Create a local preview URL
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);

      // Generate the final S3 URL (with .webp extension)
      const fileNameWithoutExtension = selectedFile.name.replace(/\.[^/.]+$/, "");
      const finalImageUrl = `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/coverimage/${fileNameWithoutExtension}.webp`;

      // Update formData with the new S3 URL
      updateFormData('coverimage', finalImageUrl);

      // Create the new file object to be tracked for upload
      const newFile = {
        file: selectedFile,
        url: imageUrl, // Blob URL for local preview
        id: Math.random().toString(36).substring(2, 15),
        path: `${lastDigits}/coverimage/${selectedFile.name}`, // S3 path
        newUrl: finalImageUrl, // The S3 URL after upload
      };

      // Add the file to the selected images for uploading later
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
