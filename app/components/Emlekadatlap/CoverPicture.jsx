"use client";

import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { useState, useRef, useContext } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const dynamic = 'force-dynamic';

export default function CoverPicture({ data }) {
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7); // Extract the last 7 digits for the S3 path

  const [selectedImage, setSelectedImage] = useState(null); // Local state for the selected image
  const fileInputRef = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 }); // Lightbox state

  const { isEditable } = useContext(Context);
  const { updateFormData, updateFileNames } = useContext(UpdateEmlekadatlapContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file selected

    if (selectedFile) {
      const selectedFileNoExtension = selectedFile.name.replace(/\.[^/.]+$/, ".webp");

      const newFile = {
        file: selectedFile,
        url: URL.createObjectURL(selectedFile), // Create a preview URL
        id: Math.random().toString(36).substring(2, 15),
        path: `${lastDigits}/coverimage/${selectedFile.name}`, // Path for S3 upload
        newUrl: `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/coverimage/${selectedFileNoExtension}`, // The final S3 URL
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

  const handleImageClick = () => {
    // Open lightbox when the image is clicked
    setLightbox({ open: true, index: 0 });
  };

  return (
    <div id="cover-picture" className="relative w-full h-[300px] lg:h-[500px] rounded-2xl">
      <Lightbox
        open={lightbox.open}
        close={() => setLightbox({ open: false, index: 0 })}
        slides={[
          {
            src: selectedImage || data.coverimage || '/blank-image.webp', // The image to show in the lightbox
          }
        ]}
        index={lightbox.index}
      />
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
          src={selectedImage || data.coverimage || '/blank-image.webp'} // Show selected image or the existing cover image
          fill
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          alt="Borítókép"
          onClick={handleImageClick} // Open lightbox on click
          className="cursor-pointer" // Add pointer cursor to indicate it's clickable
        />
      )}
      {!data && (
        <Image
          src='/blank-image.webp' // Show selected image or the existing cover image
          fill
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          alt="blank image"
          onClick={handleImageClick} // Open lightbox on click
          className="cursor-pointer" // Add pointer cursor to indicate it's clickable
        />
      )}
    </div>
  );
}
