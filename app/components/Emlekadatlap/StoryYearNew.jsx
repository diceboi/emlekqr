"use client";

import Image from "next/image";
import {
  TbUsersGroup,
  TbCameraPlus,
  TbTrash,
} from "react-icons/tb";
import { useEffect, useState, useRef, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import UploadImageModal from "./UploadImageModal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";

export default function StoryYearNew({ data, index }) {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const { updateFormData, updateFileNames, selectedImages } = useContext(UpdateEmlekadatlapContext);

  const router = useRouter();

  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  const { isEditable } = useContext(Context);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const newFiles = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 15) // Unique identifier
    }));

    console.log("New files:", newFiles);

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const imageUrls = selectedFiles.map((file) => {
      // Construct the final URL with .webp extension
      return `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/story/${year}/${file.name}`;
    });

    updateFormData(`story.${index}.images`, [...images, ...imageUrls]);

    const originalFileNames = selectedFiles.map((file) => file.name);
    updateFileNames([...selectedImages, ...originalFileNames]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveNewImage = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <>
      <div className="flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special">
        <div className="flex flex-nowrap justify-between gap-4 ">
          <h2 className={`text-[--rose] ${isEditable ? "hidden" : ""}`}>
            Évszám
          </h2>
          {isEditable && (
            <input
              id="year"
              type="text"
              className="border border-neutral-300 rounded-2xl p-4 text-2xl text-[--rose] font-bold w-1/2"
              defaultValue="1990"
              onChange={(e) => updateFormData(`story.${index}.year`, e.target.value)}
            />
          )}
          <div
            className={`flex flex-nowrap items-center gap-2 py-1 px-4 bg-[--blue-15] rounded-full ${
              isEditable ? "hidden" : ""
            }`}
          >
            <TbUsersGroup className="w-6" />
            <p className="label">Esemény típusa</p>
          </div>
          {isEditable && (
            <select className="py-1 lg:py-2 px-2 lg:px-4 rounded-2xl border border-neutral-300 w-1/2" 
            defaultValue="milestone"
            onChange={(e) => updateFormData(`story.${index}.type`, e.target.value)}>
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

          {isEditable && files.map((file, index) => (
            <div key={file.id} className="relative w-full h-48 border border-neutral-300 rounded-xl overflow-hidden bg-black">
              <Image
                src={file.url}
                alt="Selected image preview"
                fill
                sizes="(max-width: 768px) 100%, 100%"
                style={{ objectFit: "cover" }}
                className="cursor-pointer"
              />
              <TbTrash
                className="absolute top-2 right-2 text-white w-6 h-6 bg-red-500 hover:bg-red-800 rounded-full p-1 cursor-pointer transition-all"
                onClick={() => handleRemoveNewImage(file.id)}
              />
            </div>
          ))}

          {isEditable && (
            <button
              className="flex flex-col items-center justify-center gap-2 border border-neutral-300 w-full h-48 rounded-2xl hover:bg-[--blue-15]"
              onClick={handleUploadClick}
            >
              <TbCameraPlus className="w-6 h-6" />
              <p>Kép hozzáadása</p>
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

        {/*isEditable && selectedImage && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-[--blue-15] text-white px-4 py-2 rounded-full hover:bg-[--blue-30]"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? "Feltöltés..." : "Feltöltés"}
            </button>
          </div>
        )*/}

        {isEditable && (
          <textarea
            rows="10"
            defaultValue="Esemény leírása"
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
