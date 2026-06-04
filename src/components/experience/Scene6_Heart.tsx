"use client";

import { useEffect, useRef, useState } from "react";
import { playSfx } from "@/hooks/useSfx";

interface Props {
  onComplete: () => void;
}

export default function Scene6_Heart({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const midpointPlayed = useRef(false);
  const completePlayed = useRef(false);

  const startHold = () => {
    if (intervalRef.current || progress >= 100) return;

    playSfx("/audio/heart-start.mp3", 0.22);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.25;

        if (next >= 50 && !midpointPlayed.current) {
          midpointPlayed.current = true;
          playSfx("/audio/heart-heal.mp3", 0.28);
        }

        if (next >= 100) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          if (!completePlayed.current) {
            completePlayed.current = true;
            playSfx("/audio/heart-complete.mp3", 0.35);
          }

          return 100;
        }

        return next;
      });
    }, 25);
  };

  const stopHold = () => {
    if (progress >= 100) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = null;
    midpointPlayed.current = false;
    completePlayed.current = false;
    setProgress(0);
  };

  useEffect(() => {
    if (progress < 100) return;

    const timer = setTimeout(onComplete, 1300);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  const heart = progress < 50 ? "💔" : progress < 100 ? "❤️‍🩹" : "❤️";
  const glow = progress / 100;

  return (
    <section className="scene-container">
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <p className="premium-label mb-5">Final Letter</p>

        <h2 className="heading-lg mb-4">One Last Thing.</h2>

        <p className="text-muted mb-14 max-w-[260px]">Before you read it.</p>

        <div
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          className="relative cursor-pointer select-none"
        >
          <div
            className="relative flex h-60 w-60 items-center justify-center rounded-full border border-white/10 transition-all duration-300"
            style={{
              boxShadow: `0 0 ${30 + glow * 120}px rgba(214,179,106,${
                0.12 + glow * 0.5
              })`,
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="rgba(255,255,255,.08)"
                strokeWidth="2"
              />

              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="#D6B36A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * 578} 578`}
                transform="rotate(-90 100 100)"
              />
            </svg>

            <div
              className={`
                text-6xl
                transition-all
                duration-500
                ${progress > 45 && progress < 100 ? "animate-pulse" : ""}
              `}
              style={{
                transform: `scale(${1 + glow * 0.28})`,
                filter: `drop-shadow(0 0 ${glow * 34}px rgba(214,179,106,.75))`,
              }}
            >
              {heart}
            </div>

            {progress > 50 && progress < 100 && (
              <>
                <div className="absolute inset-0 rounded-full animate-pulse border border-accent/30" />
                <div className="absolute inset-8 rounded-full bg-accent/10 blur-2xl" />
              </>
            )}

            {progress >= 100 && (
              <div className="absolute inset-[-48px] rounded-full bg-accent/25 blur-3xl soft-reveal" />
            )}
          </div>
        </div>

        <p className="mt-12 text-sm text-muted">Hold to open the letter</p>
      </div>
    </section>
  );
}
