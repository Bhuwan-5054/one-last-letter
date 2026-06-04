"use client";

import SceneManager from "@/components/experience/SceneManager";
import { useBuilderStore } from "@/stores/builderStore";

const fallbackData = {
  senderName: "Me",
  recipientName: "You",
  lastConversationDate: new Date(
    Date.now() - 18 * 24 * 60 * 60 * 1000,
  ).toISOString(),
  messages: [
    "Reached home?",
    "Good night.",
    "Call me when free.",
    "Don't skip dinner.",
    "Take care.",
  ],
  memories: [
    {
      title: "That late night call",
      description: "The one where neither of us wanted to sleep first.",
    },
    {
      title: "Your fake anger",
      description: "I still remember how quickly it turned into a smile.",
    },
    {
      title: "The silence after the fight",
      description: "I thought waiting would fix it. It didn't.",
    },
  ],
  realizations: [
    {
      left: "I thought you were pulling away.",
      right: "Maybe you were hurting too.",
    },
    {
      left: "I kept waiting for a message.",
      right: "Maybe you were waiting too.",
    },
    {
      left: "I focused on what I felt.",
      right: "I forgot to see what you felt.",
    },
  ],
  voiceNoteUrl: undefined,
  finalLetter:
    "I know things have not been easy between us.\n\nI replayed a lot of moments in my head, and somewhere between the fight and the silence, I realized I was only looking at what I felt. I forgot to think about what you might have felt too.\n\nThis is not here to force you to forgive me. I just wanted to say what I could not say properly before.\n\nI am sorry for the hurt, for the silence, and for the distance that grew between us.\n\nWhatever happens next, I wanted you to know that what we had mattered to me.",
};

export default function PreviewPage() {
  const {
    senderName,
    recipientName,
    lastConversationDate,
    messages,
    memories,
    realizations,
    voiceNote,
    finalLetter,
  } = useBuilderStore();

  const hasBuilderData =
    senderName?.trim() &&
    recipientName?.trim() &&
    messages?.length >= 3 &&
    memories?.length >= 3 &&
    finalLetter?.trim()?.length >= 100;

  const data = hasBuilderData
    ? {
        senderName,
        recipientName,
        lastConversationDate:
          lastConversationDate || fallbackData.lastConversationDate,
        messages,
        memories,
        realizations,
        voiceNoteUrl: voiceNote.enabled ? voiceNote.url : undefined,
        finalLetter,
      }
    : fallbackData;

  return (
    <SceneManager
      data={data}
      onExit={() => {
        window.location.href = "/builder";
      }}
    />
  );
}
