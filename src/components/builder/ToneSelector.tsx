"use client";
import { useBuilderStore } from "@/stores/builderStore";

const tones = [
  {
    id: "soft",
    label: "Soft & Emotional",
    description: "Gentle, heartfelt, sincere",
  },
  {
    id: "mature",
    label: "Mature & Honest",
    description: "Direct, respectful, thoughtful",
  },
  { id: "hopeful", label: "Hopeful", description: "Warm, optimistic, kind" },
  {
    id: "direct",
    label: "Simple & Direct",
    description: "Clear, honest, no drama",
  },
];

export default function ToneSelector() {
  const { tone, setTone } = useBuilderStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading text-center">
        What tone feels right?
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {tones.map((t) => (
          <button
            key={t.id}
            onClick={() => setTone(t.id)}
            className={`p-4 rounded-2xl text-left transition-all ${
              tone === t.id
                ? "bg-accent/20 border border-accent shadow-lg"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="font-semibold text-lg">{t.label}</div>
            <div className="text-sm text-white/60">{t.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
