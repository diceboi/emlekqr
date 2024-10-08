"use client";

import { TbEdit, TbUserCheck, TbTrash } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { useRouter } from "next/navigation";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import EXIF from "exif-js";
import { motion } from "framer-motion";
import Loading from "../UI/Loading";

export default function ProfileEditButton({ session, user, data }) {

  const router = useRouter()

  const { isEditable, setEditable } = useContext(Context);
  const { formData, updateFormData, selectedImages } = useContext(UpdateEmlekadatlapContext);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadCount, setUploadCount] = useState(0); // Track uploaded images

  useEffect(() => {
    if (data) {
      updateFormData("uri", data.uri || "");
      updateFormData("name", data.name || "");
      updateFormData("age", data.age || "");
      updateFormData("graveyard", data.graveyard || "");
      updateFormData("bio", data.bio || "");
      updateFormData("story", data.story || []); 
      updateFormData("media", data.media || {});
      updateFormData("tributes", data.tributes || "");
      updateFormData("profileimage", data.profileimage || "");
      updateFormData("coverimage", data.coverimage || "");
      updateFormData("owner", data.owner || "");
      updateFormData("coowner", data.coowner || "");
      updateFormData("born", data.born || "");
      updateFormData("died", data.died || "");
      updateFormData("quote", data.quote || "");
    }
  }, [data]);

  const handleSubmit = async () => {
    setSaving(true); // Start saving
    const response = await fetch("/api/updateadatlap", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      setEditable(false);
      console.log("FormData", formData);
      console.log(selectedImages);
      console.log("Data submitted successfully");
    } else {
      console.log("Error submitting data");
      setSaving(false);
      return; // Stop if there was an error
    }

    if (selectedImages.length > 0) {
      setUploading(true); // Start uploading process
      setUploadCount(0); // Reset upload count

      // Upload each image
      for (const image of selectedImages) {

        const fileData = image.file;

        // Step 1: Use FormData to preserve EXIF metadata
        const formData = new FormData();
        formData.append("file", fileData); // Directly append the file blob to FormData
        formData.append("filePath", image.path);
        formData.append("fileName", fileData.name);

        // Send the image details to the S3 upload API
        const s3Upload = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData, // Send FormData, not JSON
        });

        if (s3Upload.ok) {
          console.log("Image uploaded successfully:", fileData.name);
          setUploadCount((prevCount) => prevCount + 1); // Increment upload count
        } else {
          console.log("Error uploading image:", fileData.name);
        }
      }
    } else {
      setSaving(false);
      window.location.reload() // Reload immediately if no image uploads
    }
  };

  useEffect(() => {
    // If all images are uploaded, reload the page
    if (uploading && uploadCount === selectedImages.length) {
      setUploading(false);
      window.location.reload() // Reload after all uploads are done
    }
  }, [uploadCount, selectedImages.length, uploading]);

  return (
    <>
      {session && user && !isEditable && data && (
        <div className="fixed bottom-0 flex flex-col justify-center w-full py-4 bg-[--cream-25] bg-opacity-50 backdrop-blur-lg shadow-xl z-50 border-t border-white">
          <button
            className={`m-auto flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-[--rose] hover:bg-[--blue] shadow-2xl rounded-full transition-all ${
              uploading || saving ? "pointer-events-none" : ""
            }`}
            onClick={() => setEditable(true)}
          >
            <TbEdit className="w-6 h-auto" />
            <p>{saving ? "Mentés..." : "Adatlap szerkesztése"}</p>
          </button>
        </div>
      )}

      {isEditable && (
        <>
          <div className="fixed bottom-0 flex flex-row gap-4 justify-center w-full py-4 bg-[--cream-25] bg-opacity-50 backdrop-blur-lg shadow-xl z-50 border-t border-white">
            <button
              className="flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-green-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all"
              onClick={handleSubmit}
            >
              <TbUserCheck className="w-4 h-auto" />
              <p className="label">{uploading ? "Feltöltés..." : "Mentés"}</p>
            </button>
            <button
              className="flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-red-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all"
              onClick={() => {
                setEditable(false);
                window.location.reload();
              }}
            >
              <TbTrash className="w-4 h-auto" />
              <p className="label">Mégse</p>
            </button>
          </div>
        </>
      )}

      <motion.section
      className={`${
        uploading ? "fixed" : "hidden"
      } top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center backdrop-brightness-[100%] z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, type: "ease-in-out" }}
    >
        <div className="fixed top-0 left-0 w-full h-full bg-[--cream-25]"></div>
        <Loading text={'Feltöltés...'}/>
      </motion.section>
    </>
  );
}
