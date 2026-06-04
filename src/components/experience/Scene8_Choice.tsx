"use client";

import { useState } from "react";
import { playSfx } from "@/hooks/useSfx";

export default function Scene8_Choice({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [noCount, setNoCount] = useState(0);
  const [talk, setTalk] = useState(false);

  const noMessages = [
    "Sorry...",
    "Maan jao na.",
    "Ek last chance?",
    "Ek baar ache se socho na.",
    "Bas ek baar baat kar lo.",
    "Please, ek baar calmly soch lo.",
    "Theek hai... I’ll wait.",
  ];

  const currentMessage =
    noCount > 0 ? noMessages[(noCount - 1) % noMessages.length] : "";

  const handleNo = () => {
    playSfx("/audio/choice-soft.mp3", 0.2);
    setNoCount((prev) => prev + 1);
  };

  const handleTalk = () => {
    playSfx("/audio/choice-warm.mp3", 0.28);
    setTalk(true);
  };

  const handleContinue = () => {
    playSfx("/audio/transition.mp3", 0.18);
    onComplete();
  };

  if (talk) {
    return (
      <section className="scene-container">
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <p className="premium-label mb-6">Thank You</p>

          <h2 className="heading-lg mb-8">That is all I hoped for.</h2>

          <p className="text-muted max-w-[300px] leading-8">
            Maybe we can begin with one honest conversation.
          </p>

          <button onClick={handleContinue} className="primary-btn mt-14">
            Continue
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="scene-container">
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <p className="premium-label mb-6">Your Choice</p>

        <h2 className="heading-lg mb-7">No pressure.</h2>

        <p className="text-muted max-w-[310px] leading-8">
          I just wanted you to hear me once.
        </p>

        <div className="mt-10 flex min-h-[92px] items-center justify-center">
          {noCount > 0 && (
            <div
              key={noCount}
              className="
                rounded-[28px]
                border
                border-accent/20
                bg-white/[0.04]
                px-7
                py-5
                shadow-[0_22px_70px_rgba(0,0,0,.35)]
                backdrop-blur-xl
                soft-reveal
              "
            >
              <p className="text-gold text-2xl leading-9">{currentMessage}</p>
            </div>
          )}
        </div>

        <div className="mt-10 w-full max-w-[330px] space-y-4">
          <button onClick={handleNo} className="secondary-btn">
            Sorry, I can't
          </button>

          <button onClick={handleTalk} className="primary-btn">
            Okay, let's talk
          </button>
        </div>
      </div>
    </section>
  );
}
