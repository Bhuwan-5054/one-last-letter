"use client";

import { useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useBuilderStore } from "@/stores/builderStore";
import GlassButton from "@/components/ui/GlassButton";

export default function ReviewScreen() {
  const [publishedUrl, setPublishedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const {
    tone,
    senderName,
    recipientName,
    messages,
    memories,
    realizations,
    finalLetter,
    voiceNote,
    lastConversationDate,
  } = useBuilderStore();

  const summary = useMemo(
    () => [
      ["From", senderName],
      ["To", recipientName],
      ["Messages", String(messages.length)],
      ["Memories", String(memories.length)],
      ["Voice", voiceNote.enabled ? "Added" : "Skipped"],
      ["Letter", `${finalLetter.length} chars`],
    ],
    [
      senderName,
      recipientName,
      messages.length,
      memories.length,
      voiceNote.enabled,
      finalLetter.length,
    ],
  );

  const buildPayload = () => ({
    tone,
    senderName,
    recipientName,
    messages,
    memories,
    realizations,
    finalLetter,
    voiceNoteUrl: voiceNote.enabled ? voiceNote.url : undefined,
    lastConversationDate,
  });

  const handlePreview = () => {
    sessionStorage.setItem("oll_preview_data", JSON.stringify(buildPayload()));
    window.location.href = "/preview";
  };

  const handlePublish = async () => {
    setPublishing(true);
    setCopied(false);

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      });

      const result = await res.json();

      if (!result.ok) {
        alert("Publish failed. Try again after deployment/database binding.");
        return;
      }

      setPublishedUrl(result.url);

      try {
        await navigator.clipboard.writeText(result.url);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    } finally {
      setPublishing(false);
    }
  };

  const copyAgain = async () => {
    if (!publishedUrl) return;

    await navigator.clipboard.writeText(publishedUrl);
    setCopied(true);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 space-y-4">
        <p className="premium-label">Final Check</p>

        <div className="space-y-3">
          {summary.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 last:border-b-0"
            >
              <span className="text-sm text-muted">{label}</span>
              <span className="text-sm text-white text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <GlassButton
          onClick={handlePreview}
          variant="outline"
          className="flex-1"
        >
          Preview
        </GlassButton>

        <GlassButton
          onClick={handlePublish}
          disabled={publishing}
          className="flex-1"
        >
          {publishing ? "Publishing..." : "Publish"}
        </GlassButton>
      </div>

      {publishedUrl && (
        <div className="glass-card p-5 text-center space-y-5">
          <p className="text-gold">
            {copied ? "Link copied." : "Your link is ready."}
          </p>

          <div className="mx-auto w-fit rounded-3xl bg-[#f4e4c3] p-4 shadow-[0_25px_80px_rgba(0,0,0,.45)]">
            <QRCodeCanvas
              value={publishedUrl}
              size={190}
              bgColor="#f4e4c3"
              fgColor="#090d18"
              level="M"
              includeMargin
            />
          </div>

          <p className="break-all text-xs leading-6 text-muted">
            {publishedUrl}
          </p>

          <div className="space-y-3">
            <button onClick={copyAgain} className="secondary-btn">
              Copy Link
            </button>

            <button
              onClick={() => window.open(publishedUrl, "_blank")}
              className="primary-btn"
            >
              Open Letter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
