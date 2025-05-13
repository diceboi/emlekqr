'use client';

import { useRef, useState } from 'react';

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;

    // Hang bekapcsolása
    video.muted = false;
    video.volume = 1;
    video.play();

    // Controlok megjelenítése
    setShowControls(true);
  };

  return (
    <div className="relative max-w-full cursor-pointer mb-8" onClick={handleUnmute}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        poster={poster}
        controls={showControls}
        className="rounded-lg w-full"
      >
        <source src={src} type="video/mp4" />
        A böngésződ nem támogatja a videó lejátszást.
      </video>

      {!showControls && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded pointer-events-none">
          Kattints a hanghoz 🔊
        </div>
      )}
    </div>
  );
}
