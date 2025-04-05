"use client";

import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { useState, useRef, useContext, useEffect } from "react";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox"; // Import lightbox component
import "yet-another-react-lightbox/styles.css"; // Import lightbox styles

export const dynamic = 'force-dynamic';

export default function ProfilePicture({ session, data, cursor, free }) {
  const pathname = usePathname();
  let lastDigits = pathname.slice(-7); // Extract the last 7 digits for the S3 path

  if (free === true) {
    lastDigits = "free";
  }

  const [selectedImage, setSelectedImage] = useState(null); // Local state for selected image
  const fileInputRef = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 }); // State for lightbox

  const { isEditable } = useContext(Context);
  const { updateFormData, updateFileNames } = useContext(UpdateEmlekadatlapContext);

  // Handle profile image selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file selected

    if (selectedFile) {
      const selectedFileNoExtension = selectedFile.name.replace(/\.[^/.]+$/, ".webp");

      const newFile = {
        file: selectedFile,
        url: URL.createObjectURL(selectedFile), // Create a preview URL
        id: Math.random().toString(36).substring(2, 15),
        path: `${lastDigits}/profileimage/${selectedFile.name}`, // Path for S3 upload
        newUrl: `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/profileimage/${selectedFileNoExtension}`, // The final S3 URL
      };

      // Update local preview state
      setSelectedImage(newFile.url);

      // Update formData with the new image URL (to be saved in the database)
      updateFormData('profileimage', newFile.newUrl);

      // Update selected images for later processing (e.g., S3 upload)
      updateFileNames((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click(); // Open file input dialog
  };

  const handleImageClick = () => {
    // Open lightbox when the profile image is clicked
    setLightbox({ open: true, index: 0 });
  };

  return (
    <div
      id="profile-pic"
      className={`relative flex flex-col items-center xl:items-start w-[250px] h-[250px] min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px] lg:-mt-[250px] -mt-[150px] ${cursor === false ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      {/* Lightbox component */}
      <Lightbox
        open={lightbox.open}
        close={() => setLightbox({ open: false, index: 0 })}
        slides={[
          {
            src: selectedImage || data?.profileimage || '/blank-profile.webp', // The profile image to show in the lightbox
          }
        ]}
        index={lightbox.index}
      />
      
      {/* Profile Picture with editing capability */}
      {isEditable && (
        <>
          <TbEdit
            className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0 w-8 h-8 rounded-md text-white bg-[--blue] hover:bg-black p-2 cursor-pointer"
            onClick={handleEditClick}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Trigger when file is selected
            ref={fileInputRef}
            className="hidden"
          />
        </>
      )}
      
      {/* Profile Image */}
      {data?.profileimage || free ? (
        <Image
          src={selectedImage || data?.profileimage || '/blank-profile.webp'} // Use selected image for preview or existing profile image
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full border-8 border-white cursor-pointer" // Add cursor pointer
          alt="Profilkép"
          onClick={handleImageClick} // Open lightbox on image click
        />
      ) : (
        // Fallback Image
        <Image
          src='/blank-profile.webp'
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full border-8 border-white cursor-pointer" // Add cursor pointer
          alt="Blank Profile"
          onClick={handleImageClick} // Open lightbox on image click
        />
      )}
    </div>
  );
}
