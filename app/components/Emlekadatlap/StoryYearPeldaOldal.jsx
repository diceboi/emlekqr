"use client";

import Image from "next/image";
import H4 from "../UI/H4";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export default function StoryYearPeldaOldal({ data }) {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const images = (data.images || []).map((imgUrl) => ({
    url: imgUrl.startsWith("http")
      ? imgUrl
      : `https://elmekqr-storage.s3.amazonaws.com${imgUrl}`,
    newUrl: imgUrl,
  }));

  return (
    <>
      <Lightbox
        open={lightbox.open}
        close={() => setLightbox({ open: false, index: 0 })}
        slides={images.map((img) => ({ src: img.url }))}
        index={lightbox.index}
      />

      <div className="flex flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special">
        <H4 classname="text-[--rose]">{data.year || "Évszám nélküli történet"}</H4>

        {data.data && (
          <div
            className="pb-4 mb-2 max-h-40 overflow-y-auto"
            style={{ maxHeight: "200px", overflowY: "auto" }}
            dangerouslySetInnerHTML={{ __html: data.data }}
          />
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 justify-start gap-4">
            {images.map((img, imgIndex) => (
              <div
                key={`${img.newUrl || imgIndex}-${imgIndex}`}
                className="group relative w-full h-48 shadow-xl rounded-xl overflow-hidden bg-black"
                onClick={() => setLightbox({ open: true, index: imgIndex })}
              >
                <Image
                  src={img.url}
                  alt={`Story image ${imgIndex}`}
                  fill
                  sizes="(max-width: 768px) 100%, 100%"
                  style={{ objectFit: "cover" }}
                  className="cursor-pointer group-hover:opacity-75 transition-all"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
