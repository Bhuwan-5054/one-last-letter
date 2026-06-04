"use client";

import { useBuilderStore } from "@/stores/builderStore";

export default function RealizationEditor() {
  const { realizations, updateRealization } = useBuilderStore();

  return (
    <div className="space-y-6">
      {realizations.map((item, index) => (
        <div key={index} className="glass-card p-5 space-y-4">
          <p className="premium-label">Realization {index + 1}</p>

          <div>
            <label className="mb-2 block text-sm text-muted">
              What I thought
            </label>
            <textarea
              value={item.left}
              onChange={(e) => updateRealization(index, "left", e.target.value)}
              className="w-full min-h-[90px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white outline-none focus:border-accent/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">
              What they might have felt
            </label>
            <textarea
              value={item.right}
              onChange={(e) =>
                updateRealization(index, "right", e.target.value)
              }
              className="w-full min-h-[90px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white outline-none focus:border-accent/60"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
