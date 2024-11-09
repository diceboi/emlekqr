"use client"

import Image from "next/image";
import { TbEdit, TbLogout2 } from "react-icons/tb";
import { signOut } from "next-auth/react"
import Modal from "../UI/Modal";
import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../Context";
import ProfilDataForm from "../UI/ProfilDataForm"
import ResetPasswordProfileForm from "../ResetPasswordProfileForm";
import H4 from "../UI/H4";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilAdatlap({ session, user }) {
  const { openPopup, togglePopup } = useContext(Context);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const router = useRouter()

  const updateUserProfileImage = async (imageURL) => {
    try {
      const response = await fetch("/api/updateUserImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, image: imageURL }),
      });

      const result = await response.json();

      if (response.ok && result.updatedUser) {
      } else {
        console.error("Error updating user profile image:", result.error);
      }
    } catch (error) {
      console.error("Failed to update user profile image:", error);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("A fájl méret meghaladja a maximálisan megengedett 5mb-ot. Válassz kissebb képet, vagy próbáld meg optimalizálni."); // Show toast error
      return;
    }

    setSelectedImage('/emlekqr-loading.gif');
  
    const filePath = `${user._id}/profileimage/profilepicture.webp`;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filePath", filePath);
    formData.append("fileName", selectedFile.name);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const timestamp = new Date().getTime();
        const s3ImageUrl = `https://elmekqr-storage.s3.amazonaws.com/${user._id}/profileimage/profilepicture.webp?${timestamp}`;
        setSelectedImage(s3ImageUrl); // Update with S3 URL after upload
        await updateUserProfileImage(s3ImageUrl);
        router.refresh(); // Refresh to load new profile picture
      } else {
        console.error("Error uploading file:", result.error || "Unknown error");
      }
    } catch (error) {
      console.error("Upload failed:", error);
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
    <>
      <Modal openstate={openPopup === "modifyData"} onClose={() => togglePopup(null)}>
        <ProfilDataForm email={user.email} name={user.name || []} zip={user.zip || []} city={user.city || []} street={user.address1 || []} floor={user.adress2 || []} phone={user.phone || []} />
      </Modal>

      <Modal openstate={openPopup === "modifyPassword"} onClose={() => togglePopup(null)}>
        <ResetPasswordProfileForm session={session} />
      </Modal>
      
      <div className="lg:sticky lg:top-36 flex flex-col gap-8 bg-white rounded-2xl border border-white shadow-special lg:w-1/4 h-fit p-8">
        
        <div
        id="profile-pic"
        className="relative flex flex-col items-center w-[150px] h-[150px] min-h-[150px] min-w-[150px] max-h-[150px] max-w-[150px] self-center"
        >
        {/* Lightbox component */}
        <Lightbox
          open={lightbox.open}
          close={() => setLightbox({ open: false, index: 0 })}
          slides={[
            {
              src: selectedImage || user?.image || '/blank-profile.webp', // The profile image to show in the lightbox
            }
          ]}
          index={lightbox.index}
        />
        
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
        
        {/* Profile Image */}
        {user?.image ? (
          <Image
            src={selectedImage || user.image || '/blank-profile.webp'}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full border-8 border-white cursor-pointer"
            alt="Profile Image"
            onClick={handleImageClick}
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

        <div className="flex flex-col gap-4">
        <H4 classname={"text-[--rose] text-center"}>{user?.name || "Anonymous"}</H4>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-t border-[--cream] py-2">
            <div className="flex flex-col items-baseline gap-1 border-b border-[--cream] pb-2">
              <p className="text-xs w-fit">Cím:</p>
              <p className="text-sm w-fit font-medium">{user?.zip || ""}</p>
              <p className="text-sm w-fit font-medium">{user.city || ""}</p>
              <p className="text-sm w-fit font-medium">{user.address1 || ""}</p>
              <p className="text-sm w-fit font-medium">{user.address2 || ""}</p>
            </div>
            <div className="flex flex-col items-baseline gap-1 border-b border-[--cream] pb-2">
              <p className="text-xs w-fit">Telefonszám:</p>
              <p className="text-sm w-fit font-medium">{user.phone || ""}</p>
            </div>
            <div className="flex flex-col items-baseline gap-1 border-b border-[--cream] pb-2">
              <p className="text-xs min-w-fit">E-mail cím:</p>
              <p className="text-sm w-fit font-medium">{user.email}</p>
            </div>
            <button
              onClick={() => togglePopup("modifyData")}
              className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
            >
              <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
              Adatok módosítása
            </button>
            <button
              onClick={() => togglePopup("modifyPassword")}
              className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
            >
              <TbEdit className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
              Jelszó módosítása
            </button>
            <button
              onClick={signOut}
              className="flex flex-nowrap items-center gap-1 text-[--blue] underline text-sm"
            >
              <TbLogout2 className="w-4 h-4 rounded-md text-[--blue] cursor-pointer" />
              Kijelentkezés
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

