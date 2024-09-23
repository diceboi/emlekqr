"use client";

import Image from "next/image";
import {
  TbUsersGroup,
  TbCameraPlus,
  TbTrash,
} from "react-icons/tb";
import { useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";

export default function StoryYear({ data, index }) {

  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);
  
  const { formData, updateFormData, updateFileNames, selectedImages } = useContext(UpdateEmlekadatlapContext);
  const { isEditable } = useContext(Context);
  
  const [images, setImages] = useState(formData.story[index].images || []);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [files, setFiles] = useState([]);
  const [removeImage, setRemoveImage] = useState([])
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {

    // New uploadable files //

    const selectedFiles = Array.from(e.target.files); // +

    const newFiles = selectedFiles.map((file) => ({ // +
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 15),
      path: `${lastDigits}/story/${data.year}/${file.name}`,
      newUrl: `https://elmekqr-storage.s3.amazonaws.com/story/${data.year}/${file.name}`
    }));

    setFiles((files) => [...files, ...newFiles]); // +

    // ----- end ------ //

    // Setting images for viewer //

    const newImageUrls = newFiles.map((newFile) => newFile.url);

    const updatedImages = [...images, ...newImageUrls];

    setImages(updatedImages);
    
    // ----- end ------ //

  // Update the filenames context with the new file objects
  updateFileNames((prevSelectedImages) => [...prevSelectedImages, ...newFiles]);

  const updateImagesInStory = () => {
    const existingImages = formData.story[index].images || [];

    // Map over existing images to form the full URLs
    const prevImageUrls = existingImages.map((image) => 
      image.startsWith('http') ? image : `https://elmekqr-storage.s3.amazonaws.com${image}`
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
}

const handleUploadClick = () => {
  fileInputRef.current.click();
};

  const handleRemoveImage = (imgIndex) => {
    const imageUrlToRemove = images[imgIndex]; // Get the image URL or ID to remove
    const updatedRemoveImage = [...removeImage, imageUrlToRemove]; // Track removed images by URL or ID
    setRemoveImage(updatedRemoveImage); // Update the removeImage state
  
    const updatedImages = images.filter((url) => !updatedRemoveImage.includes(url)); // Filter out removed images by URL or ID
    updateFormData(`story.${index}.images`, updatedImages); // Update formData with the new images
    setImages(updatedImages); // Update the local images state
  };

  return (
    <>
      <Lightbox
        open={lightbox.open}
        close={() => setLightbox({ open: false, index: 0 })}
        slides={images.map((url) => ({ src: url }))}
        index={lightbox.index}
      />
      <div className="flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special">
        <div className="flex flex-nowrap justify-between gap-4 ">
          <h2 className={`text-[--rose] ${isEditable ? "hidden" : ""}`}>
            {data.year}
          </h2>
          {isEditable && (
            <input
              type="text"
              className="border border-neutral-300 rounded-2xl p-4 text-2xl text-[--rose] font-bold w-1/2"
              defaultValue={formData.story[index].year}
              onChange={(e) => updateFormData(`story.${index}.year`, e.target.value)}
            />
          )}
          <div
            className={`flex flex-nowrap items-center gap-2 py-1 px-4 bg-[--blue-15] rounded-full ${
              isEditable ? "hidden" : ""
            }`}
          >
            <TbUsersGroup className="w-6" />
            <p className="label">{data.type}</p>
          </div>
          {isEditable && (
            <select
              className="py-1 lg:py-2 px-2 lg:px-4 rounded-2xl border border-neutral-300 w-1/2"
              defaultValue={formData.story[index].type}
              onChange={(e) => updateFormData(`story.${index}.type`, e.target.value)}
            >
              <option value="religion">Vallás</option>
              <option value="challenge">Eredmény</option>
              <option value="health">Egészség</option>
              <option value="celebration">Ünnep</option>
              <option value="award">Díj</option>
              <option value="milestone">Mérföldkő</option>
              <option value="housing">Költözés</option>
              <option value="travel">Utazás</option>
              <option value="family">Család</option>
              <option value="education">Tanulmányok</option>
              <option value="job">Munka</option>
            </select>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-start gap-4">
          {images.map((url, imgIndex) => (
            <div
              key={`${url}-${imgIndex}`}
              className={`group relative w-full h-48 shadow-xl rounded-xl overflow-hidden bg-black ${removeImage ? 'block' : 'hidden'}`}
              onClick={() => setLightbox({ open: true, index: imgIndex })}
            >
              <Image
                src={url}
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

        <div
          dangerouslySetInnerHTML={{ __html: data.data }}
          className={`pb-4 mb-2 ${isEditable ? "hidden" : ""}`}
        />

        {isEditable && (
          <textarea
            rows="10"
            name={`${data.year}-text`}
            id={`${data.year}-text`}
            defaultValue={formData.story[index].data}
            className="border border-neutral-300 rounded-2xl p-4"
            onChange={(e) => updateFormData(`story.${index}.data`, e.target.value)}
          />
        )}

        {isEditable && (
          <button className="flex flex-nowrap items-center gap-2 rounded-full bg-red-500 hover:bg-red-700 transition-all text-white w-fit px-4 py-2 self-center">
            <TbTrash className="w-6 h-6" />
            Esemény törlése
          </button>
        )}
      </div>
    </>
  );
}
