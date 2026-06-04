"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  voiceUrl?: string;
  onComplete: () => void;
}

export default function Scene5_Voice({ voiceUrl, onComplete }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);

  const [ended, setEnded] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!voiceUrl) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [voiceUrl, onComplete]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const update = () => {
      if (!audio.duration) return;

      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, []);

  useEffect(() => {
    if (!ended) return;

    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [ended, onComplete]);

  const handlePlay = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    await audioRef.current.play();

    setPlaying(true);
  };

  if (!voiceUrl) {
    return (
      <section className="scene-container">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <p className="text-muted max-w-[260px]">
            Some things are easier to feel than to say.
          </p>
        </div>
      </section>
    );
  }

  if (ended) {
    return (
      <section className="scene-container">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <p className="text-gold">Thank you for listening.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="scene-container">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-muted uppercase tracking-[0.35em] text-xs mb-5">
          Voice Note
        </p>

        <h2 className="heading-lg mb-8">
          Some things
          <br />
          deserve a voice.
        </h2>

        <p className="text-muted max-w-[260px] mb-10">
          Some things are easier to say when nobody is listening.
        </p>

        <button
          onClick={handlePlay}
          className="
            w-28
            h-28
            rounded-full
            border
            border-white/20
            backdrop-blur-xl
            flex
            items-center
            justify-center
            transition-all
            duration-300
          "
        >
          <div
            className={`
              ${playing ? "animate-pulse" : ""}
            `}
          >
            {playing ? "❚❚" : "▶"}
          </div>
        </button>

        <div className="w-[240px] mt-10">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D6B36A]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          src={voiceUrl}
          onEnded={() => {
            setEnded(true);
            setPlaying(false);
          }}
        />
      </div>
    </section>
  );
}
