"use client";
import { useBuilderStore } from "@/stores/builderStore";

export default function DateScreen() {
  const { lastConversationDate, setLastConversationDate } = useBuilderStore();
  return (
    <div className="space-y-4">
      <input
        type="date"
        value={lastConversationDate}
        onChange={(e) => setLastConversationDate(e.target.value)}
        className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-accent"
      />
      <p className="text-sm text-white/50 text-center">
        When did you last properly talk?
      </p>
    </div>
  );
}
