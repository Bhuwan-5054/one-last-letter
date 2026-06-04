"use client";

import { useEffect, useState } from "react";
import { playSfx } from "@/hooks/useSfx";

export default function Scene0_Loading({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    playSfx("/audio/intro-start.mp3", 0.18);

    const phaseTimers = [
      setTimeout(() => {
        setPhase(1);
        playSfx("/audio/soft-reveal.mp3", 0.14);
      }, 700),

      setTimeout(() => {
        setPhase(2);
        playSfx("/audio/gold-pulse.mp3", 0.16);
      }, 1900),

      setTimeout(() => {
        playSfx("/audio/scene-transition.mp3", 0.14);
        onComplete();
      }, 4700),
    ];

    return () => {
      phaseTimers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <section className="scene-container relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
        <div className="h-[420px] w-[420px] rounded-full border border-white/20" />
      </div>

      <div className="absolute left-1/2 top-[18%] h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="absolute top-[24%] left-1/2 -translate-x-1/2 text-accent text-3xl opacity-80 soft-reveal">
        ✦
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <p className="premium-label mb-7 opacity-100 translate-y-0">
          Midnight Letter
        </p>

        <h1 className="heading-xl soft-reveal text-white">
          One Last
          <br />
          <span className="text-gold">Letter</span>
        </h1>

        <div className="mt-9 min-h-[64px] max-w-[290px]">
          <p
            className={`
              body-md
              text-muted
              transition-all
              duration-1000
              ${
                phase >= 1
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-4 blur-sm"
              }
            `}
          >
            I don't know if you'll read this till the end.
          </p>
        </div>

        <div
          className={`
            mt-14
            flex
            items-center
            gap-3
            transition-all
            duration-1000
            ${
              phase >= 2
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-4 blur-sm"
            }
          `}
        >
          <span className="h-px w-10 bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_28px_rgba(214,179,106,0.65)]" />
          <span className="h-px w-10 bg-white/15" />
        </div>
      </div>
    </section>
  );
}
