"use client";

export function playSfx(src: string, volume = 0.35) {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch {
    // ignore missing/blocked audio
  }
}
