"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LuImage } from "react-icons/lu";
import { TbCamera } from "react-icons/tb";
import H4 from "../UI/H4";

export default function MediaPeldaOldal({ data }) {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const images = (data?.media?.images || []).map((imgUrl) => ({
    url: imgUrl.startsWith("http")
      ? imgUrl
      : `https://elmekqr-storage.s3.amazonaws.com${imgUrl}`,
  }));

  const videos = data?.media?.videos || [];

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Képek */}
      {images.length > 0 && (
        <>
          <div className="flex gap-4 items-center">
            <LuImage className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
            <H4 classname={"text-[--rose]"}>Képek</H4>
          </div>

          <Lightbox
            open={lightbox.open}
            close={() => setLightbox({ open: false, index: 0 })}
            slides={images.map((img) => ({ src: img.url }))}
            index={lightbox.index}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 justify-start gap-4 mb-4">
            {images.map((img, index) => (
              <div
                key={`${img.url}-${index}`}
                className="relative w-full h-48 shadow-xl rounded-xl overflow-hidden bg-black cursor-pointer"
                onClick={() => setLightbox({ open: true, index })}
              >
                <Image
                  src={img.url}
                  alt={`Kép ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100%, 100%"
                  style={{ objectFit: "cover" }}
                  className="transition-all hover:opacity-75"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Videók */}
      {videos.length > 0 && (
        <>
          <div className="flex gap-4 items-center">
            <TbCamera className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
            <H4 classname={"text-[--rose]"}>Videók</H4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 justify-start gap-4">
            {videos.map((id, index) => (
              <iframe
                key={index}
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
