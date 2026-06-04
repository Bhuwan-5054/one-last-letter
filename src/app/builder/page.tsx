"use client";

import { useState } from "react";
import ToneSelector from "@/components/builder/ToneSelector";
import SenderScreen from "@/components/builder/SenderScreen";
import RecipientScreen from "@/components/builder/RecipientScreen";
import DateScreen from "@/components/builder/DateScreen";
import MessagesEditor from "@/components/builder/MessagesEditor";
import MemoriesEditor from "@/components/builder/MemoriesEditor";
import RealizationEditor from "@/components/builder/RealizationEditor";
import VoiceRecorder from "@/components/builder/VoiceRecorder";
import LetterEditor from "@/components/builder/LetterEditor";
import ReviewScreen from "@/components/builder/ReviewScreen";
import GlassButton from "@/components/ui/GlassButton";
import { useBuilderStore } from "@/stores/builderStore";

type Step =
  | "tone"
  | "sender"
  | "recipient"
  | "date"
  | "messages"
  | "memories"
  | "realization"
  | "voice"
  | "letter"
  | "review";

const stepOrder: Step[] = [
  "tone",
  "sender",
  "recipient",
  "date",
  "messages",
  "memories",
  "realization",
  "voice",
  "letter",
  "review",
];

const stepTitle: Record<Step, string> = {
  tone: "What tone feels right?",
  sender: "Who is this from?",
  recipient: "Who is this for?",
  date: "When did you last properly talk?",
  messages: "What were the things you almost sent?",
  memories: "What moments still come to mind?",
  realization: "What did you realize?",
  voice: "Would you like to leave your voice?",
  letter: "What do you wish they understood?",
  review: "Read it once before it leaves.",
};

const stepSub: Record<Step, string> = {
  tone: "Choose the emotional direction. You can still edit everything later.",
  sender: "Keep it simple. This name will appear inside the experience.",
  recipient: "Use the name that feels natural between you both.",
  date: "This creates the silence counter in the beginning.",
  messages: "Small lines work better than long paragraphs. Minimum 3.",
  memories: "Each memory becomes a star in the constellation. Minimum 3.",
  realization:
    "These lines will appear after the memories. Keep them honest, not defensive.",
  voice: "Optional. If you skip it, the story will still feel complete.",
  letter: "This is the heart of the experience. Honest is better than perfect.",
  review: "Preview first. Publish only when it feels right.",
};

export default function BuilderPage() {
  const [step, setStep] = useState<Step>("tone");

  const { tone, senderName, recipientName, messages, memories, finalLetter } =
    useBuilderStore();

  const currentIndex = stepOrder.indexOf(step);
  const progress = ((currentIndex + 1) / stepOrder.length) * 100;

  const canProceed = () => {
    switch (step) {
      case "tone":
        return !!tone;
      case "sender":
        return senderName.trim().length > 0;
      case "recipient":
        return recipientName.trim().length > 0;
      case "date":
        return true;
      case "messages":
        return messages.length >= 3;
      case "memories":
        return memories.length >= 3;
      case "realization":
        return true;
      case "voice":
        return true;
      case "letter":
        return finalLetter.trim().length >= 100;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (step === "review") {
      window.location.href = "/preview";
      return;
    }

    if (!canProceed()) return;

    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen w-full px-5 py-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[470px] flex-col justify-center">
        <div className="mb-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="premium-label">Builder</p>
            <p className="text-xs text-faint">
              {currentIndex + 1}/{stepOrder.length}
            </p>
          </div>

          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent/40 via-accent to-accentSoft transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-6 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="font-heading text-[2.15rem] leading-[1.05] tracking-[-0.04em] text-white">
              {stepTitle[step]}
            </h1>

            <p className="mx-auto mt-4 max-w-[320px] text-sm leading-7 text-muted">
              {stepSub[step]}
            </p>
          </div>

          <div className="soft-reveal">
            {step === "tone" && <ToneSelector />}
            {step === "sender" && <SenderScreen />}
            {step === "recipient" && <RecipientScreen />}
            {step === "date" && <DateScreen />}
            {step === "messages" && <MessagesEditor />}
            {step === "memories" && <MemoriesEditor />}
            {step === "realization" && <RealizationEditor />}
            {step === "voice" && <VoiceRecorder />}
            {step === "letter" && <LetterEditor />}
            {step === "review" && <ReviewScreen />}
          </div>

          <div className="mt-9 flex gap-3">
            {step !== "tone" && (
              <GlassButton onClick={handleBack} variant="outline">
                Back
              </GlassButton>
            )}

            <GlassButton
              onClick={handleNext}
              disabled={!canProceed()}
              className={step === "tone" ? "w-full" : "flex-1"}
            >
              {step === "review" ? "Preview Letter" : "Continue"}
            </GlassButton>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-6 text-faint">
          Nothing is public until you choose to publish.
        </p>
      </div>
    </section>
  );
}
