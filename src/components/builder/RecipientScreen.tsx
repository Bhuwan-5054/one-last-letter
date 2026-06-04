"use client";
import { useBuilderStore } from "@/stores/builderStore";

export default function RecipientScreen() {
  const { recipientName, setRecipientName } = useBuilderStore();
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        placeholder="e.g., Priya"
        className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-accent transition"
        autoFocus
      />
      <p className="text-sm text-white/50 text-center">
        Who is this letter for?
      </p>
    </div>
  );
}
