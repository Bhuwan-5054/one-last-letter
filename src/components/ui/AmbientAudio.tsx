"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("oll-audio-enabled");

    if (saved === "true") {
      setEnabled(true);
      setHidden(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.16;
    audio.loop = true;

    audio.play().catch(() => {
      setHidden(false);
    });
  }, [enabled]);

  const enableSound = () => {
    localStorage.setItem("oll-audio-enabled", "true");
    setEnabled(true);
    setHidden(true);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" preload="auto" />

      {!hidden && (
        <button
          onClick={enableSound}
          className="fixed bottom-5 right-5 z-50 rounded-full border border-white/15 bg-white/[0.06] px-4 py-3 text-xs text-white/70 backdrop-blur-xl"
        >
          Enable sound
        </button>
      )}
    </>
  );
}
