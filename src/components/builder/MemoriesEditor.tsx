"use client";
import { useState } from "react";
import { useBuilderStore } from "@/stores/builderStore";

export default function MemoriesEditor() {
  const { memories, addMemory, removeMemory } = useBuilderStore();
  const [newMem, setNewMem] = useState("");

  const handleAdd = () => {
    if (newMem.trim()) {
      addMemory({ title: newMem.trim() });
      setNewMem("");
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/60 text-center">
        Special moments (min 3)
      </p>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {memories.map((mem, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white/5 p-3 rounded-xl"
          >
            <span>{mem.title}</span>
            <button onClick={() => removeMemory(idx)} className="text-red-400">
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMem}
          onChange={(e) => setNewMem(e.target.value)}
          placeholder="e.g., Our first sunset..."
          className="flex-1 bg-white/5 border border-white/20 rounded-xl p-3"
        />
        <button onClick={handleAdd} className="bg-accent/30 px-4 rounded-xl">
          + Add
        </button>
      </div>
    </div>
  );
}
