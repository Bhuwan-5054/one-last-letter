"use client";

import { useEffect, useState } from "react";
import SceneManager from "@/components/experience/SceneManager";
import { decodeSharePayload } from "@/lib/sharePayload";

type ExperienceData = {
  senderName: string;
  recipientName: string;
  lastConversationDate: string;
  messages: string[];
  memories: { title: string; description?: string }[];
  realizations?: { left: string; right: string }[];
  voiceNoteUrl?: string;
  finalLetter: string;
  expiresAt?: number;
};

export default function ExperiencePage() {
  const [data, setData] = useState<ExperienceData | null>(null);
  const [expired, setExpired] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const encoded = hash.startsWith("#data=") ? hash.replace("#data=", "") : "";

    if (!encoded) {
      setInvalid(true);
      return;
    }

    const decoded = decodeSharePayload<ExperienceData>(encoded);

    if (!decoded) {
      setInvalid(true);
      return;
    }

    if (decoded.expiresAt && Date.now() > decoded.expiresAt) {
      setExpired(true);
      return;
    }

    setData(decoded);
  }, []);

  if (invalid) {
    return (
      <section className="scene-container">
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <p className="premium-label mb-6">Missing Letter</p>
          <h1 className="heading-lg">This letter could not be opened.</h1>
        </div>
      </section>
    );
  }

  if (expired) {
    return (
      <section className="scene-container">
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <p className="premium-label mb-6">Expired</p>
          <h1 className="heading-lg">This letter is no longer available.</h1>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="scene-container">
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-muted">Opening letter...</p>
        </div>
      </section>
    );
  }

  return (
    <SceneManager
      data={data}
      onExit={() => {
        window.location.href = "/";
      }}
    />
  );
}
