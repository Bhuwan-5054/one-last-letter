"use client";

import { useEffect, useMemo, useState } from "react";
import { playSfx } from "@/hooks/useSfx";

interface Memory {
  title: string;
  description?: string;
}

interface Props {
  memories: Memory[];
  onComplete: () => void;
}

type Position = {
  x: number;
  y: number;
  delay: number;
};

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
};

export default function Scene3_MemoryConstellation({
  memories,
  onComplete,
}: Props) {
  const safeMemories =
    memories.length > 0
      ? memories
      : [
          {
            title: "A small memory",
            description: "Some moments stay even when words disappear.",
          },
        ];

  const [selected, setSelected] = useState<number | null>(null);
  const [visited, setVisited] = useState<boolean[]>(
    new Array(safeMemories.length).fill(false),
  );
  const [closingMemory, setClosingMemory] = useState(false);
  const [completeGlow, setCompleteGlow] = useState(false);

  const allVisited = visited.every(Boolean);

  const positions = useMemo<Position[]>(() => {
    const presets = [
      { x: 22, y: 28 },
      { x: 72, y: 22 },
      { x: 58, y: 52 },
      { x: 28, y: 68 },
      { x: 80, y: 76 },
      { x: 42, y: 38 },
      { x: 16, y: 82 },
      { x: 88, y: 42 },
    ];

    return safeMemories.map((_, index) => ({
      ...(presets[index % presets.length] ?? {
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
      }),
      delay: index * 0.18,
    }));
  }, [safeMemories.length]);

  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: 28 }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 0.5,
    }));
  }, [selected]);

  useEffect(() => {
    if (!allVisited) return;

    setCompleteGlow(true);
    playSfx("/audio/constellation.mp3", 0.22);

    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [allVisited, onComplete]);

  const openMemory = (index: number) => {
    if (selected !== null) return;

    playSfx("/audio/star.mp3", 0.28);

    setVisited((prev) => prev.map((value, i) => (i === index ? true : value)));

    setSelected(index);
    setClosingMemory(false);

    setTimeout(() => {
      playSfx("/audio/memory.mp3", 0.18);
    }, 250);
  };

  const closeMemory = () => {
    if (selected === null) return;

    playSfx("/audio/dissolve.mp3", 0.14);
    setClosingMemory(true);

    setTimeout(() => {
      setSelected(null);
      setClosingMemory(false);
    }, 650);
  };

  return (
    <section className="scene-container relative overflow-hidden">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div
          className={`
            text-center
            transition-all
            duration-700
            ${selected !== null ? "opacity-20 blur-sm scale-[0.98]" : "opacity-100"}
          `}
        >
          <p className="premium-label mb-5">Constellation</p>

          <h2 className="heading-lg">
            Every star
            <br />
            remembers something.
          </h2>
        </div>

        <div
          className={`
            relative
            mt-10
            h-[430px]
            w-full
            max-w-[430px]
            transition-all
            duration-1000
            ${completeGlow ? "scale-[1.04]" : "scale-100"}
            ${selected !== null ? "opacity-25 blur-[2px]" : "opacity-100"}
          `}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {positions.map((pos, index) => {
              const next = positions[index + 1];
              if (!next) return null;

              const activeLine = visited[index] && visited[index + 1];

              return (
                <line
                  key={index}
                  x1={`${pos.x}%`}
                  y1={`${pos.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke={
                    activeLine
                      ? "rgba(214,179,106,.7)"
                      : "rgba(255,255,255,.09)"
                  }
                  strokeWidth={activeLine ? "1.5" : "1"}
                  strokeDasharray="4 8"
                  className={activeLine ? "constellation-line-active" : ""}
                />
              );
            })}
          </svg>

          {positions.map((pos, index) => {
            const isVisited = visited[index];

            return (
              <button
                key={index}
                onClick={() => openMemory(index)}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  animationDelay: `${pos.delay}s`,
                }}
                className="
                  absolute
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  p-4
                  transition-all
                  duration-700
                  hover:scale-125
                  focus:outline-none
                "
              >
                <span
                  className={`
                    block
                    rounded-full
                    transition-all
                    duration-700
                    ${
                      isVisited
                        ? "h-4 w-4 bg-accent shadow-[0_0_38px_rgba(214,179,106,.95)]"
                        : "h-3 w-3 bg-white/85 shadow-[0_0_22px_rgba(255,255,255,.55)]"
                    }
                    animate-starBreath
                  `}
                />

                {isVisited && (
                  <span className="absolute inset-0 rounded-full border border-accent/30 animate-starRipple" />
                )}
              </button>
            );
          })}

          {completeGlow && (
            <div className="pointer-events-none absolute inset-8 rounded-full bg-accent/10 blur-3xl soft-reveal" />
          )}
        </div>

        {!allVisited && selected === null && (
          <p className="mt-4 text-center text-sm text-faint">
            Touch the stars that still remember.
          </p>
        )}

        {allVisited && (
          <p className="mt-8 text-center text-gold soft-reveal">
            The sky remembers everything.
          </p>
        )}
      </div>

      {selected !== null && (
        <div
          onClick={closeMemory}
          className={`
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/75
            p-6
            backdrop-blur-2xl
            transition-all
            duration-700
            ${closingMemory ? "opacity-0 blur-md" : "opacity-100 blur-0"}
          `}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {sparks.map((spark) => (
              <span
                key={spark.id}
                className="absolute rounded-full bg-accent/70"
                style={{
                  left: `${spark.x}%`,
                  top: `${spark.y}%`,
                  width: `${spark.size}px`,
                  height: `${spark.size}px`,
                  animation: `memorySpark 1300ms ease-out ${spark.delay}s both`,
                }}
              />
            ))}
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className={`
              relative
              w-full
              max-w-[390px]
              text-center
              transition-all
              duration-700
              ${closingMemory ? "scale-95 opacity-0" : "scale-100 opacity-100"}
            `}
          >
            <p className="premium-label mb-6">Memory</p>

            <div className="glass-card px-7 py-9">
              <div className="mx-auto mb-6 h-2 w-2 rounded-full bg-accent shadow-[0_0_35px_rgba(214,179,106,.9)]" />

              <h3 className="font-heading text-3xl leading-tight text-white">
                {safeMemories[selected].title}
              </h3>

              {safeMemories[selected].description && (
                <p className="mt-6 leading-8 text-muted">
                  {safeMemories[selected].description}
                </p>
              )}
            </div>

            <p className="mt-7 text-xs uppercase tracking-[0.28em] text-white/35">
              Tap outside to return
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
