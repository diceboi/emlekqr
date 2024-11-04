"use client";

import Image from "next/image";
import { TbCameraPlus, TbCamera, TbTrash } from "react-icons/tb";
import { useState, useRef, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Context } from "../../Context";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { BiCameraMovie } from "react-icons/bi";
import Link from "next/link";
import { LuImage } from "react-icons/lu";
import { toast } from "sonner";

import H1 from "../UI/H1"
import H2 from "../UI/H2"
import H3 from "../UI/H3"
import H4 from "../UI/H4"
import Paragraph from "../UI/Paragraph"

export default function Media({ data }) {
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  const { formData, updateFormData, updateFileNames, selectedImages, blobMediaImages, setBlobMediaImages } =
    useContext(UpdateEmlekadatlapContext);
  const { isEditable } = useContext(Context);

  const [allVideos, setAllVideos] = useState(formData.media.videos || []);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [removeImage, setRemoveImage] = useState([]);
  const [removeVideo, setRemoveVideo] = useState([]);
  const [tempVideoLink, setTempVideoLink] = useState("");
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    const initialImages = (formData.media.images || []).map((imgUrl) => ({
      url: imgUrl.startsWith("http")
        ? imgUrl
        : `https://elmekqr-storage.s3.amazonaws.com${imgUrl}`,
      newUrl: imgUrl,
    }));

    // Filter out formData images that are already in blobMediaImages
    const filteredFormDataImages = initialImages.filter(
      (formDataImg) =>
        !blobMediaImages.some((blobImg) => blobImg.newUrl === formDataImg.newUrl)
    );

    // Combine blobMediaImages with the filtered formData images
    const combinedImages = [
      ...filteredFormDataImages, // Use formData images that are not in blobMediaImages
      ...blobMediaImages.map((blobImg) => ({
        url: blobImg.url, // Blob URL for display
        newUrl: blobImg.newUrl, // Blob new URL
      })),
    ];

    setImages(combinedImages);
  }, [formData.media.images, blobMediaImages]);

  // Images //////////////////////////////////////

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleImageChange = (e) => {
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

    // New uploadable files
    const newFiles = validFiles.map((file) => {
    const newUrlWebp = file.name.replace(/\.[^/.]+$/, ".webp");
    return{
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 15),
      path: `${lastDigits}/media/${file.name}`,
      newUrl: `https://elmekqr-storage.s3.amazonaws.com/${lastDigits}/media/${newUrlWebp}`,
    };
  });

    // Setting images for viewer
    setFiles((files) => [...files, ...newFiles]);

    setBlobMediaImages((files) => [...files, ...newFiles])
    console.log(blobMediaImages);

    // Extract the image URLs for display
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);

    updateFileNames((prevSelectedImages) => [
      ...prevSelectedImages,
      ...newFiles,
    ]);

    const updateImagesInMedia = () => {
      const existingImages = formData.media.images || [];

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
      updateFormData(`media.images`, allImageUrls);
    };

    // Execute the update
    updateImagesInMedia();
    console.log(formData);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (imgIndex) => {
    const imageToRemove = images[imgIndex]; // Get the image object to remove

    // Update the removeImage state with the new URL
    const updatedRemoveImage = [...removeImage, imageToRemove.newUrl]; 
    setRemoveImage(updatedRemoveImage); 

    // Filter out the removed image from local images state
    const updatedImages = images.filter(
      (img) => img.newUrl !== imageToRemove.newUrl
    );
    setImages(updatedImages); // Update the local images state

    // Remove the corresponding image from the blobMediaImages context
    setBlobMediaImages((prevBlobMediaImages) =>
      prevBlobMediaImages.filter(
        (blobImg) => blobImg.newUrl !== imageToRemove.newUrl
      )
    );

    console.log(blobMediaImages)

    // Update formData with the correct newUrls
    updateFormData(
      `media.images`,
      updatedImages.map((img) => img.newUrl)
    );
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
    <div className="flex flex-col gap-8 py-8">
      <div className="flex gap-4 items-center">
        <LuImage className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
        <H4 classname={"text-[--rose]"}>Képek</H4>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 justify-start gap-4 mb-4">
        <Lightbox
        open={lightbox.open}
        close={() => setLightbox({ open: false, index: 0 })}
        slides={images.map((img) => ({ src: img.url }))}
        index={lightbox.index}
        />
        {images.map((img, imgIndex) => (
          <div
            key={`${img.url}-${imgIndex}`}
            className="group relative w-full h-48 shadow-xl rounded-xl overflow-hidden bg-black"
            onClick={() => setLightbox({ open: true, index: imgIndex })}
          >
            <Image
              src={img.url} // Ensure the correct URL (blob or S3) is passed
              alt={`Story image ${imgIndex}`}
              fill
              sizes="(max-width: 768px) 100%, 100%"
              style={{ objectFit: "cover" }}
              className="cursor-pointer group-hover:opacity-75 transition-all lightbox"
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
            <p className="font-normal text-xs opacity-50">max. 5 MB</p>
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
      <div className="flex gap-4 items-center">
        <TbCamera className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
        <H4 classname={"text-[--rose]"}>Videók</H4>
      </div>
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
