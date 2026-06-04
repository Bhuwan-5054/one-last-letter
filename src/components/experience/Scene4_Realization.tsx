"use client";

import { useEffect, useState } from "react";

type RealizationPair = {
  left: string;
  right: string;
};

interface Props {
  realizations?: RealizationPair[];
  onComplete: () => void;
}

const fallbackRealizations: RealizationPair[] = [
  {
    left: "I thought you were pulling away.",
    right: "Maybe you were hurting too.",
  },
  {
    left: "I kept waiting for a message.",
    right: "Maybe you were waiting too.",
  },
  {
    left: "I focused on what I felt.",
    right: "I forgot to see what you felt.",
  },
];

export default function Scene4_Realization({
  realizations = fallbackRealizations,
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);
  const [showRight, setShowRight] = useState(false);

  const current = realizations[index];

  useEffect(() => {
    if (!current) {
      const timer = setTimeout(onComplete, 1800);
      return () => clearTimeout(timer);
    }

    const rightTimer = setTimeout(() => setShowRight(true), 1500);

    const nextTimer = setTimeout(() => {
      setShowRight(false);
      setIndex((prev) => prev + 1);
    }, 4300);

    return () => {
      clearTimeout(rightTimer);
      clearTimeout(nextTimer);
    };
  }, [index, current, onComplete]);

  if (!current) {
    return (
      <section className="scene-container">
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-muted max-w-[280px]">
            Sometimes the distance grows before either person notices.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="scene-container">
      <div className="flex min-h-screen flex-col justify-center text-center">
        <p className="premium-label mb-16">Realization</p>

        <div className="mx-auto max-w-[340px]">
          <p className="text-2xl leading-snug text-white/80 soft-reveal">
            {current.left}
          </p>

          <div
            className={`
              my-10 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-accent/60 to-transparent
              transition-all duration-700
              ${showRight ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
            `}
          />

          <p
            className={`
              text-2xl leading-snug text-gold transition-all duration-1000
              ${
                showRight
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-4 blur-sm"
              }
            `}
          >
            {current.right}
          </p>
        </div>
      </div>
    </section>
  );
}
