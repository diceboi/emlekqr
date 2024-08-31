"use client";

import Image from "next/image";
import { TbUsersGroup, TbCameraPlus, TbTrash } from "react-icons/tb";
import { useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { BiCameraMovie } from "react-icons/bi";
import Link from "next/link";

export default function Media({ data }) {
  const { formData, updateFormData, updateFileNames, selectedImages } =
    useContext(UpdateEmlekadatlapContext);
  const { isEditable } = useContext(Context);

  const [images, setImages] = useState(formData.media.images || []);
  const [allVideos, setAllVideos] = useState(formData.media.videos || []);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [removeImage, setRemoveImage] = useState([]);
  const [removeVideo, setRemoveVideo] = useState([]);
  const [tempVideoLink, setTempVideoLink] = useState("");
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  // Images //////////////////////////////////////

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newFiles = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 15), // Unique identifier
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const newImageUrls = newFiles.map((newFile) => newFile.url);

    const imageUrls = selectedFiles.map((file) => {
      // Construct the final URL with .webp extension
      return `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/media/${file.name}`;
    });

    const updatedImages = [...images, ...newImageUrls];
    setImages(updatedImages);

    updateFormData(`media.images`, updatedImages);

    const originalFileNames = selectedFiles.map((file) => file.name);
    updateFileNames([...selectedImages, ...originalFileNames]);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (imgIndex) => {
    const imageUrlToRemove = images[imgIndex]; // Get the image URL or ID to remove
    const updatedRemoveImage = [...removeImage, imageUrlToRemove]; // Track removed images by URL or ID
    setRemoveImage(updatedRemoveImage); // Update the removeImage state

    const updatedImages = images.filter(
      (url) => !updatedRemoveImage.includes(url)
    ); // Filter out removed images by URL or ID
    updateFormData(`media`, updatedImages); // Update formData with the new images
    setImages(updatedImages); // Update the local images state
  };

  // Videos ////////////////////////////////////////

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.value;
    setTempVideoLink(selectedVideo); // Store the video link temporarily
  };

  const handleVideoUploadClick = () => {
    if (tempVideoLink) {
      const videoId = tempVideoLink.slice(-11); // Extract the video ID

      setVideos((prevVideos) => [...prevVideos, videoId]);
      const updatedVideos = [...allVideos, videoId];
      setAllVideos(updatedVideos);
      updateFormData(`media.videos`, updatedVideos);

      // Clear the temporary video link after adding
      setTempVideoLink("");
    }
  };

  const handleRemoveVideo = (videoIndex) => {
    // Filter out the video at the specified index
    const updatedVideos = allVideos.filter((_, index) => index !== videoIndex);
  
    // Update the state to remove the video from both allVideos and formData
    setAllVideos(updatedVideos);
    updateFormData(`media.videos`, updatedVideos);
  };

  return (
    <div className="flex flex-col gap-20 py-8">
      <h4>Képek</h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 justify-start gap-4">
        <Lightbox
          open={lightbox.open}
          close={() => setLightbox({ open: false, index: 0 })}
          slides={images.map((url) => ({ src: url }))}
          index={lightbox.index}
        />
        {images.map((url, imgIndex) => (
          <div
            key={`${url}-${imgIndex}`}
            className={`group relative w-full h-48 shadow-xl rounded-xl overflow-hidden bg-black ${
              removeImage ? "block" : "hidden"
            }`}
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
            onClick={handleImageUploadClick}
          >
            <TbCameraPlus className="w-6 h-6" />
            <p className="font-normal">Kép hozzáadása</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </button>
        )}
      </div>
      <h4>Videók</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-start gap-4">
        {allVideos.map((id, videoIndex) => (
          <div key={videoIndex} className="flex flex-col relative">
            <iframe
              id="ytplayer"
              type="text/html"
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${id}`}
              frameBorder="0"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
            {isEditable && (
              <TbTrash
                className="absolute -top-2 -right-2 text-white w-6 h-6 bg-red-500 hover:bg-red-800 rounded-full p-1 cursor-pointer transition-all z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveVideo(videoIndex);
                }}
              />
            )}
          </div>
        ))}

        {isEditable && (
          <div className="flex flex-col items-center justify-center gap-2 border border-neutral-300 w-full h-[300px] rounded-2xl hover:shadow-xl hover:border-white transition-all p-4 duration-200">
            <BiCameraMovie className="w-6 h-6" />
            <p className="font-normal">Youtube videó hozzáadása</p>
            <input
              type="text"
              ref={videoInputRef}
              value={tempVideoLink}
              onChange={handleVideoChange}
              placeholder="Illeszd be ide a youtube videó linkjét"
              className="p-4 w-full text-center border border-neutral-300 rounded-md"
            />
            <button
              className="px-4 py-2 my-4 bg-[--blue] text-white rounded-full hover:bg-[--rose] transition-all"
              onClick={handleVideoUploadClick}
            >
              Hozzáadás
            </button>
            <Link href={"/"} className="text-sm underline">
              Segítség
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
