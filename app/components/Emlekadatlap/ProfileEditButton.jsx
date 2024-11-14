"use client";

import { TbEdit, TbUserCheck, TbTrash } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { useRouter } from "next/navigation";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import EXIF from "exif-js";
import { motion } from "framer-motion";
import Loading from "../UI/Loading";
import { toast } from "sonner";

export default function ProfileEditButton({ session, user, data }) {

  const router = useRouter()

  const { isEditable, setEditable } = useContext(Context);
  const { formData, updateFormData, selectedImages } = useContext(UpdateEmlekadatlapContext);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadCount, setUploadCount] = useState(0); // Track uploaded images
  const [originalData, setOriginalData] = useState({});

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

      setOriginalData(data);
    }
  }, [data]);



  // Function to detect changes in the formData and prepare a notification
  const detectChangesAndNotify = async () => {
    const changes = [];
    let updatedImages = [];
    let updatedVideos = [];

    // Check for changes in specific fields (example: name, bio, etc.)
    if (formData.name !== originalData.name) {
      changes.push({ field: "Név", newValue: formData.name });
    }
    if (formData.bio !== originalData.bio) {
      changes.push({ field: "Adatok", newValue: formData.bio });
    }
    if (formData.story !== originalData.story) {
      changes.push({ field: "Story", newValue: formData.story });
    }
    if (formData.media !== originalData.media) {
      changes.push({ field: "Média", newValue: formData.media });
    }
    if (formData.tributes !== originalData.tributes) {
      changes.push({ field: "Tiszteletnyilvánítás", newValue: formData.tributes });
    }
    if (formData.profileimage !== originalData.profileimage) {
      changes.push({ field: "Profilkép", newValue: formData.profileimage });
    }
    if (formData.coverimage !== originalData.coverimage) {
      changes.push({ field: "Borítókép", newValue: formData.coverimage });
    }
    if (formData.quote !== originalData.quote) {
      changes.push({ field: "Idézet", newValue: formData.quote });
    }
    
    // Compare media images
    if (JSON.stringify(formData.media.images) !== JSON.stringify(originalData.media.images)) {
      updatedImages = formData.media.images.filter((img) => !originalData.media.images.includes(img));
      changes.push({ field: "Média > Képek", newValue: updatedImages });
    }

    // Compare media videos
    if (JSON.stringify(formData.media.videos) !== JSON.stringify(originalData.media.videos)) {
      updatedVideos = formData.media.videos.filter((video) => !originalData.media.videos.includes(video));
      changes.push({ field: "Média > Videók", newValue: updatedVideos });
    }

    // Compare story images
    formData.story.forEach((story, index) => {
      if (JSON.stringify(story.images) !== JSON.stringify(originalData.story[index]?.images || [])) {
        const updatedStoryImages = story.images.filter((img) => !originalData.story[index]?.images?.includes(img));
        updatedImages = [...updatedImages, ...updatedStoryImages]; // Add to updated images array
        changes.push({ field: `Story képek ${story.year}`, newValue: updatedStoryImages });
      }
    });

    // If there are changes, send a notification
    if (changes.length > 0) {
      const notificationPayload = {
        personal: false,
        viewed: false,
        notificationtype: "adatlap",
        adatlap: data.uri,
        from: session.user.name, // The user making the change
        message: `${changes.map(change => change.field).join(", ")}`, // Summary of changes
        images: updatedImages, // If any images were changed, you could add their references here
        videos: updatedVideos, // Same for videos if applicable
      };

      await fetch("/api/addNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationPayload),
      }).then((res) => {
        if (res.ok) {
          console.log("Notification sent successfully");
        } else {
          console.error("Failed to send notification");
        }
      });
    }
  };



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
      await detectChangesAndNotify();
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
          toast.success('Kép(ek) sikeresen feltöltve.')
        } else {
          setSaving(false);
          setUploading(false);
          console.log("Error uploading image:", fileData.name);
          console.log("Error: ", error)
          toast.error('Hiba történt a kép feltöltése közben.')
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
      {session && user && !isEditable && data && user.email === data.owner && (
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
