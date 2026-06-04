"use client";
import { useBuilderStore } from "@/stores/builderStore";

export default function SenderScreen() {
  const { senderName, setSenderName } = useBuilderStore();
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={senderName}
        onChange={(e) => setSenderName(e.target.value)}
        placeholder="e.g., Rahul"
        className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-accent transition"
        autoFocus
      />
      <p className="text-sm text-white/50 text-center">
        Your name, as they know you.
      </p>
    </div>
  );
}
