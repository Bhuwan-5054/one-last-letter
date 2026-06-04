"use client";
import { useBuilderStore } from "@/stores/builderStore";

export default function LetterEditor() {
  const { finalLetter, setFinalLetter } = useBuilderStore();
  return (
    <div className="space-y-4">
      <textarea
        rows={8}
        value={finalLetter}
        onChange={(e) => setFinalLetter(e.target.value)}
        placeholder="What do you wish they understood? (min 100 characters)"
        className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-accent"
      />
      <p className="text-right text-sm text-white/50">
        {finalLetter.length}/100 min.
      </p>
    </div>
  );
}
