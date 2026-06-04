"use client";
import { useBuilderStore } from "@/stores/builderStore";

export default function VoiceRecorder() {
  const { voiceNote, setVoiceNote } = useBuilderStore();
  return (
    <div className="text-center space-y-4">
      <button
        onClick={() =>
          alert("Recording will work after HTTPS or localhost. For now, skip.")
        }
        className="bg-accent/30 px-6 py-3 rounded-full"
      >
        🎙️ Record (max 20s)
      </button>
      <button
        onClick={() => setVoiceNote({ enabled: false })}
        className="ml-4 text-white/60 underline"
      >
        Skip
      </button>
      {voiceNote.enabled && <p>Voice note recorded ✅</p>}
    </div>
  );
}
