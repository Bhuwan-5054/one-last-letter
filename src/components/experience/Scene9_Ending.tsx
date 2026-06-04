"use client";

import { useState } from "react";
import { playSfx } from "@/hooks/useSfx";

export default function Scene9_Ending({ onClose }: { onClose: () => void }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    if (closing) return;

    setClosing(true);
    playSfx("/audio/final-close.mp3", 0.22);

    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <section className="scene-container">
      <div
        className={`
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          text-center
          transition-all
          duration-900
          ${
            closing
              ? "opacity-0 translate-y-4 blur-md scale-[0.98]"
              : "opacity-100 translate-y-0 blur-0 scale-100"
          }
        `}
      >
        <p className="premium-label mb-6">Goodbye</p>

        <h2 className="heading-lg mb-8">Thank you for reading.</h2>

        <p className="text-muted max-w-[310px] leading-8">
          Whatever happens next, I’m grateful you stayed till the end.
        </p>

        <div className="mt-14 w-full max-w-[330px]">
          <button onClick={handleClose} className="secondary-btn">
            Close
          </button>
        </div>
      </div>
    </section>
  );
}
