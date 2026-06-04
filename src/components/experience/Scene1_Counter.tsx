"use client";

import { useEffect, useState } from "react";

interface Props {
  lastConversationDate: string;
  onComplete: () => void;
}

export default function Scene1_Counter({
  lastConversationDate,
  onComplete,
}: Props) {
  const [count, setCount] = useState(0);

  const targetDate = new Date(lastConversationDate);
  const now = new Date();

  const diffMs = now.getTime() - targetDate.getTime();

  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    let current = 0;

    const duration = 2200;

    const increment = Math.max(1, Math.ceil(totalDays / 60));

    const interval = setInterval(() => {
      current += increment;

      if (current >= totalDays) {
        current = totalDays;

        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 2500);
      }

      setCount(current);
    }, duration / 60);

    return () => clearInterval(interval);
  }, [totalDays, onComplete]);

  return (
    <section className="scene-container">
      <div className="flex flex-col items-center justify-center text-center h-full">
        <p className="text-muted uppercase tracking-[0.35em] text-xs mb-10">
          Silence
        </p>

        <div
          className="
            text-[7rem]
            md:text-[9rem]
            leading-none
            font-extralight
            tracking-[-0.06em]
          "
        >
          {count}
        </div>

        <div className="mt-3 text-gold uppercase tracking-[0.4em] text-sm">
          Days
        </div>

        <div className="mt-12 max-w-[260px]">
          <p className="text-muted body-md">Since we stopped talking.</p>
        </div>
      </div>
    </section>
  );
}
