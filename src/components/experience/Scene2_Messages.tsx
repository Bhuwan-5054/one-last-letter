"use client";

import { useEffect, useMemo, useState } from "react";
import { playSfx } from "@/hooks/useSfx";

interface Props {
  messages: string[];
  onComplete: () => void;
}

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  distance: number;
};

export default function Scene2_Messages({ messages, onComplete }: Props) {
  const safeMessages =
    messages.length > 0 ? messages : ["I almost texted you."];

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "leave">("enter");

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 0.45,
      distance: Math.random() * 38 + 18,
    }));
  }, [index]);

  useEffect(() => {
    if (index >= safeMessages.length) {
      const endTimer = setTimeout(() => {
        playSfx("/audio/transition.mp3", 0.18);
        onComplete();
      }, 1000);

      return () => clearTimeout(endTimer);
    }

    setPhase("enter");
    playSfx("/audio/message.mp3", 0.22);

    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 900);

    const leaveTimer = setTimeout(() => {
      setPhase("leave");
      playSfx("/audio/dissolve.mp3", 0.15);
    }, 4200);

    const nextTimer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 5600);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(leaveTimer);
      clearTimeout(nextTimer);
    };
  }, [index, safeMessages.length, onComplete]);

  if (index >= safeMessages.length) {
    return (
      <section className="scene-container">
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-muted soft-reveal">
            Some words never reached you.
          </p>
        </div>
      </section>
    );
  }

  const currentMessage = safeMessages[index];

  return (
    <section className="scene-container relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {phase === "leave" &&
          particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-accent/70"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `messageParticle 900ms ease-out ${p.delay}s forwards`,
                ["--move" as string]: `${p.distance}px`,
              }}
            />
          ))}
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div
          className={`
            max-w-[330px]
            text-center
            transition-all
            duration-700
            ${
              phase === "enter"
                ? "opacity-0 translate-y-5 blur-md scale-[0.98]"
                : phase === "hold"
                  ? "opacity-100 translate-y-0 blur-0 scale-100"
                  : "opacity-0 -translate-y-5 blur-lg scale-[0.96]"
            }
          `}
        >
          <p className="premium-label mb-8">Unsent Message</p>

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-gradient-to-b
              from-white/[0.09]
              to-white/[0.035]
              px-8
              py-9
              shadow-[0_28px_90px_rgba(0,0,0,.42)]
              backdrop-blur-2xl
            "
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

            <p className="text-[1.55rem] font-light leading-snug text-white">
              {currentMessage}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {safeMessages.map((_, i) => (
              <span
                key={i}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    i === index
                      ? "w-7 bg-accent"
                      : i < index
                        ? "w-1.5 bg-accent/50"
                        : "w-1.5 bg-white/15"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
