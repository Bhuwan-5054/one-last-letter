"use client";
import { useState } from "react";
import { useBuilderStore } from "@/stores/builderStore";

export default function MessagesEditor() {
  const { messages, addMessage, removeMessage, updateMessage } =
    useBuilderStore();
  const [newMsg, setNewMsg] = useState("");

  const handleAdd = () => {
    if (newMsg.trim()) {
      addMessage(newMsg.trim());
      setNewMsg("");
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/60 text-center">
        Things you almost sent (min 3)
      </p>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="flex gap-2 items-center bg-white/5 p-2 rounded-xl"
          >
            <input
              value={msg}
              onChange={(e) => updateMessage(idx, e.target.value)}
              className="flex-1 bg-transparent text-white p-2 focus:outline-none"
            />
            <button
              onClick={() => removeMessage(idx)}
              className="text-red-400 text-xl px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 bg-white/5 border border-white/20 rounded-xl p-3 text-white placeholder-white/40"
        />
        <button onClick={handleAdd} className="bg-accent/30 px-4 rounded-xl">
          + Add
        </button>
      </div>
    </div>
  );
}
