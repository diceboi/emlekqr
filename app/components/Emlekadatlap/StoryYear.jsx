"use client";

import Image from "next/image";
import { TbUsersGroup, TbCameraPlus, TbTrash, TbH3 } from "react-icons/tb";
import { useState, useRef, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import H4 from "../UI/H4";
import { toast } from "sonner";

export default function StoryYear({ data, index }) {
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  const { formData, updateFormData, updateFileNames, selectedImages, removeStoryBlock, blobStoryImages, setBlobStoryImages, updateBlobStoryImages } =
    useContext(UpdateEmlekadatlapContext);
  const { isEditable } = useContext(Context);

  const [images, setImages] = useState([]);

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [files, setFiles] = useState([]);
  const [removeImage, setRemoveImage] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Check if formData.story[index] and blobStoryImages[index] are defined
    if (!formData.story[index] || !formData.story[index].images) {
      return; // Exit the effect early if data is not available
    }
  
    const initialImages = (formData.story[index].images || []).map((imgUrl) => ({
      url: imgUrl.startsWith("http")
        ? imgUrl
        : `https://elmekqr-storage.s3.amazonaws.com${imgUrl}`,
      newUrl: imgUrl,
    }));
  
    // Get the blob images for this story index
    const currentBlobImages = blobStoryImages[index] || [];
  
    // Filter out formData images that are already in blobStoryImages
    const filteredFormDataImages = initialImages.filter(
      (formDataImg) =>
        !currentBlobImages.some((blobImg) => blobImg.newUrl === formDataImg.newUrl)
    );
  
    // Combine blobStoryImages with the filtered formData images
    const combinedImages = [
      ...filteredFormDataImages, // Use formData images that are not in blobStoryImages
      ...currentBlobImages.map((blobImg) => ({
        url: blobImg.url, // Blob URL for display
        newUrl: blobImg.newUrl, // Blob new URL
      })),
    ];
  
    setImages(combinedImages);
  }, [formData.story, index, blobStoryImages]);


  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    // Filter files that exceed the maximum size
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" kép túl nagy méretű, a megengedett legnagyobb méret 5 MB.`);
        return false;
      }
      return true;
    });
  
    // If no files pass the validation, exit early
    if (validFiles.length === 0) {
      return;
    }
  
    const newFiles = validFiles.map((file) => {
      const newUrlWebp = file.name.replace(/\.[^/.]+$/, ".webp");
  
      return {
        file,
        url: URL.createObjectURL(file), // Original URL for preview
        id: Math.random().toString(36).substring(2, 15), // Generate random ID
        path: `${lastDigits}/story/${data.year}/${file.name}`, // Keep the original file name in the path
        newUrl: `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/story/${data.year}/${newUrlWebp}`, // Use .webp for the newUrl
      };
    });
  

    setFiles((files) => [...files, ...newFiles]);

    // Add the new files to the blobStoryImages for this specific story index
    updateBlobStoryImages(index, [...(blobStoryImages[index] || []), ...newFiles]);

    // Setting images for viewer
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);

    // Update the filenames context with the new file objects
    updateFileNames((prevSelectedImages) => [
      ...prevSelectedImages,
      ...newFiles,
    ]);

    const updateImagesInStory = () => {
      const existingImages = formData.story[index].images || [];

      // Map over existing images to form the full URLs
      const prevImageUrls = existingImages.map((image) =>
        image.startsWith("http")
          ? image
          : `https://elmekqr-storage.s3.amazonaws.com${image}`
      );

      // Get new image URLs directly from the `newFiles` array
      const newImageUrls = newFiles.map((newFile) => newFile.newUrl);

      // Combine previous image URLs with new image URLs
      const allImageUrls = [...prevImageUrls, ...newImageUrls];

      // Update the formData using the context's updateFormData function
      updateFormData(`story.${index}.images`, allImageUrls);
    };

    // Execute the update
    updateImagesInStory();
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (imgIndex) => {
    const imageToRemove = images[imgIndex]; // Get the image object to remove

    const updatedRemoveImage = [...removeImage, imageToRemove.newUrl]; // Track removed images by newUrl
    setRemoveImage(updatedRemoveImage); // Update the removeImage state

    // Filter out the removed image from local images state
    const updatedImages = images.filter(
      (img) => img.newUrl !== imageToRemove.newUrl
    );
    setImages(updatedImages); // Update the local images state

    // Remove the image from blobStoryImages for this specific story index
    updateBlobStoryImages(
      index,
      (blobStoryImages[index] || []).filter((blobImg) => blobImg.newUrl !== imageToRemove.newUrl)
    );

    updateFormData(
      `story.${index}.images`,
      updatedImages.map((img) => img.newUrl)
    ); // Update formData with the correct newUrls
    setImages(updatedImages); // Update the local images state
  };

  const handleRemoveStoryBlock = () => {
    // Call removeStoryBlock from context to delete this story block
    removeStoryBlock(index);
  };

  return (
    <>
      <Lightbox
        open={lightbox.open}
        close={() => setLightbox({ open: false, index: 0 })}
        slides={images.map((img) => ({ src: img.url }))}
        index={lightbox.index}
      />
      <div className="flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special">
        <div className="flex flex-nowrap justify-between gap-4 ">
          <H4 classname={`text-[--rose] ${isEditable ? "hidden" : ""}`}>
            {data.year}
          </H4>
          {isEditable && (
            <input
              type="text"
              className="border border-neutral-300 rounded-2xl p-4 text-2xl text-[--rose] font-bold w-full"
              placeholder="Esemény címe"
              defaultValue={formData.story && formData.story[index] ? formData.story[index].year : ''} // Provide fallback
              onChange={(e) =>
                updateFormData(`story.${index}.year`, e.target.value)
              }
            />
          )}
        </div>
        <div
          className={`pb-4 mb-2 ${isEditable ? "hidden" : ""} max-h-40 overflow-y-auto`}
          style={{ maxHeight: '200px', overflowY: 'auto' }} // Set a max height for scrolling
          dangerouslySetInnerHTML={{ __html: data.data }}
        />

        {isEditable && (
          <textarea
            rows="10"
            name={`${data.year}-text`}
            id={`${data.year}-text`}
            defaultValue={formData.story && formData.story[index] ? formData.story[index].data : ''}
            placeholder="Esemény leírása"
            className="border border-neutral-300 rounded-2xl p-4"
            onChange={(e) =>
              updateFormData(`story.${index}.data`, e.target.value)
            }
          />
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-start gap-4">
          {images.map((img, imgIndex) => (
            <div
              key={`${img.newUrl}-${imgIndex}`}
              className={`group relative w-full h-48 shadow-xl rounded-xl overflow-hidden bg-black ${
                removeImage ? "block" : "hidden"
              }`}
              onClick={() => setLightbox({ open: true, index: imgIndex })}
            >
              <Image
                src={img.url}
                alt={`Story image ${imgIndex}`}
                fill
                sizes="(max-width: 768px) 100%, 100%"
                style={{ objectFit: "cover" }}
                className={`cursor-pointer group-hover:opacity-75 transition-all`}
              />
              {isEditable && (
                <TbTrash
                  className="absolute top-2 right-2 text-white w-6 h-6 bg-red-500 hover:bg-red-800 rounded-full p-1 cursor-pointer transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(imgIndex);
                  }}
                />
              )}
            </div>
          ))}

          {isEditable && (
            <button
              className="flex flex-col items-center justify-center gap-2 border border-neutral-300 w-full h-48 rounded-2xl hover:shadow-xl hover:border-white transition-all duration-200"
              onClick={handleUploadClick}
            >
              <TbCameraPlus className="w-6 h-6" />
              <p className="font-normal">Kép hozzáadása</p>
              <p className="font-normal text-xs opacity-50">max. 5 MB</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </button>
          )}
        </div>
        {isEditable && (
          <button className="flex flex-nowrap items-center gap-2 rounded-full bg-red-500 hover:bg-red-700 transition-all text-white w-fit px-4 py-2 self-center" onClick={handleRemoveStoryBlock}>
            <TbTrash className="w-6 h-6" />
            Esemény törlése
          </button>
        )}
      </div>
    </>
  );
}
