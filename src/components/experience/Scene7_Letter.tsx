"use client";

import { useState } from "react";
import { playSfx } from "@/hooks/useSfx";

interface Props {
  content: string;
  onComplete: () => void;
}

export default function Scene7_Letter({ content, onComplete }: Props) {
  const [stage, setStage] = useState<"closed" | "opening" | "read">("closed");

  const openLetter = () => {
    if (stage !== "closed") return;

    playSfx("/audio/wax-crack.mp3", 0.28);

    setStage("opening");

    setTimeout(() => {
      playSfx("/audio/envelope-open.mp3", 0.3);
    }, 280);

    setTimeout(() => {
      playSfx("/audio/paper-slide.mp3", 0.28);
    }, 780);

    setTimeout(() => {
      setStage("read");
      playSfx("/audio/letter-reveal.mp3", 0.22);
    }, 2100);
  };

  const goNext = () => {
    if (stage === "read") {
      playSfx("/audio/transition.mp3", 0.18);
      onComplete();
    }
  };

  return (
    <section className="scene-container">
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <p className="premium-label mb-8">Final Letter</p>

        {stage !== "read" && (
          <>
            <button
              onClick={openLetter}
              disabled={stage === "opening"}
              className="relative h-[250px] w-[340px] max-w-full border-none bg-transparent outline-none"
              style={{ perspective: "1400px" }}
            >
              <div
                className={`
                  absolute
                  inset-0
                  rounded-[28px]
                  shadow-[0_40px_120px_rgba(0,0,0,.6)]
                  transition-transform
                  duration-700
                  ${stage === "opening" ? "scale-[1.02]" : "hover:scale-[1.03]"}
                `}
              >
                <div
                  className="
                    absolute
                    left-8
                    right-8
                    bottom-10
                    h-[160px]
                    rounded-2xl
                    border
                    border-[#d9bd79]/50
                    bg-[#f4e4c3]
                    shadow-[0_25px_70px_rgba(0,0,0,.35)]
                    transition-all
                    duration-[1700ms]
                    ease-out
                  "
                  style={{
                    opacity: stage === "opening" ? 1 : 0,
                    transform:
                      stage === "opening"
                        ? "translateY(-120px) scale(1.18)"
                        : "translateY(0px) scale(0.82)",
                    zIndex: stage === "opening" ? 45 : 5,
                  }}
                >
                  <div className="absolute left-6 right-6 top-9 h-px bg-black/15" />
                  <div className="absolute left-6 right-12 top-16 h-px bg-black/10" />
                  <div className="absolute left-6 right-20 top-[5.75rem] h-px bg-black/10" />
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-accent/35 bg-gradient-to-br from-[#ead8b5] via-[#f5e6c7] to-[#b99552]">
                  <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#b99552] via-[#d8bb77] to-transparent" />

                  <div className="absolute left-0 bottom-0 h-full w-1/2 origin-bottom-left bg-gradient-to-tr from-[#c89f55] to-transparent opacity-70 [clip-path:polygon(0_100%,100%_50%,0_0)]" />

                  <div className="absolute right-0 bottom-0 h-full w-1/2 origin-bottom-right bg-gradient-to-tl from-[#c89f55] to-transparent opacity-70 [clip-path:polygon(100%_100%,0_50%,100%_0)]" />

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-[58%]
                      w-full
                      origin-bottom
                      bg-gradient-to-b
                      from-[#fff0cf]
                      via-[#e7c986]
                      to-[#bd9351]
                      shadow-xl
                      transition-transform
                      duration-[950ms]
                      ease-out
                      [clip-path:polygon(0_0,100%_0,50%_100%)]
                    "
                    style={{
                      transform:
                        stage === "opening"
                          ? "rotateX(-170deg)"
                          : "rotateX(0deg)",
                      transformStyle: "preserve-3d",
                      zIndex: 50,
                    }}
                  />

                  <div
                    className="
                      absolute
                      left-1/2
                      top-[52%]
                      flex
                      h-16
                      w-16
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-[#8b1e2d]
                      text-[#f8d7a3]
                      shadow-[0_18px_40px_rgba(0,0,0,.45)]
                      transition-all
                      duration-700
                    "
                    style={{
                      opacity: stage === "opening" ? 0 : 1,
                      transform:
                        stage === "opening"
                          ? "translate(-50%, -50%) scale(.15)"
                          : "translate(-50%, -50%) scale(1)",
                    }}
                  >
                    ✦
                  </div>

                  <span
                    className="
                      absolute
                      bottom-7
                      left-0
                      right-0
                      text-sm
                      uppercase
                      tracking-[0.35em]
                      text-black/55
                      transition-opacity
                      duration-500
                    "
                    style={{
                      opacity: stage === "opening" ? 0 : 1,
                    }}
                  >
                    A Letter For You
                  </span>
                </div>
              </div>
            </button>

            <p className="mt-10 text-sm text-muted">
              {stage === "opening" ? "Opening..." : "Tap to read my words"}
            </p>
          </>
        )}

        {stage === "read" && (
          <button
            onClick={goNext}
            className="w-full border-none bg-transparent text-left outline-none"
          >
            <article className="relative mx-auto w-full rounded-[34px] border border-[#d9bd79]/40 bg-[#f4e4c3] px-7 py-9 text-[#19120a] shadow-[0_35px_120px_rgba(0,0,0,.55)] soft-reveal">
              <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,.55),transparent_45%)]" />

              <div className="relative">
                <p className="mb-7 text-xs uppercase tracking-[0.35em] text-black/45">
                  What I Wanted To Say
                </p>

                <div className="whitespace-pre-wrap font-serif text-[17px] leading-8 text-black/85">
                  {content}
                </div>

                <p className="mt-8 text-center text-xs uppercase tracking-[0.28em] text-black/35">
                  Tap when you are ready
                </p>
              </div>
            </article>
          </button>
        )}
      </div>
    </section>
  );
}
