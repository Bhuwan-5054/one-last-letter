import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RealizationPair = {
  left: string;
  right: string;
};

interface BuilderState {
  tone: string;
  senderName: string;
  recipientName: string;
  lastConversationDate: string;
  relationshipDuration: string;
  messages: string[];
  memories: { title: string; description?: string }[];
  realizations: RealizationPair[];
  voiceNote: { enabled: boolean; blob?: Blob; url?: string };
  finalLetter: string;

  setTone: (tone: string) => void;
  setSenderName: (name: string) => void;
  setRecipientName: (name: string) => void;
  setLastConversationDate: (date: string) => void;
  setRelationshipDuration: (duration: string) => void;

  addMessage: (msg: string) => void;
  removeMessage: (idx: number) => void;
  updateMessage: (idx: number, msg: string) => void;

  addMemory: (mem: { title: string; description?: string }) => void;
  removeMemory: (idx: number) => void;

  updateRealization: (
    idx: number,
    field: "left" | "right",
    value: string,
  ) => void;

  setVoiceNote: (data: { enabled: boolean; blob?: Blob; url?: string }) => void;
  setFinalLetter: (text: string) => void;
  reset: () => void;
}

const defaultRealizations: RealizationPair[] = [
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
];

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      tone: "",
      senderName: "",
      recipientName: "",
      lastConversationDate: "",
      relationshipDuration: "",
      messages: [],
      memories: [],
      realizations: defaultRealizations,
      voiceNote: { enabled: false },
      finalLetter: "",

      setTone: (tone) => set({ tone }),
      setSenderName: (name) => set({ senderName: name }),
      setRecipientName: (name) => set({ recipientName: name }),
      setLastConversationDate: (date) => set({ lastConversationDate: date }),
      setRelationshipDuration: (duration) =>
        set({ relationshipDuration: duration }),

      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),

      removeMessage: (idx) =>
        set((state) => ({
          messages: state.messages.filter((_, i) => i !== idx),
        })),

      updateMessage: (idx, msg) =>
        set((state) => ({
          messages: state.messages.map((m, i) => (i === idx ? msg : m)),
        })),

      addMemory: (mem) =>
        set((state) => ({ memories: [...state.memories, mem] })),

      removeMemory: (idx) =>
        set((state) => ({
          memories: state.memories.filter((_, i) => i !== idx),
        })),

      updateRealization: (idx, field, value) =>
        set((state) => ({
          realizations: state.realizations.map((item, i) =>
            i === idx ? { ...item, [field]: value } : item,
          ),
        })),

      setVoiceNote: (data) => set({ voiceNote: data }),
      setFinalLetter: (text) => set({ finalLetter: text }),

      reset: () =>
        set({
          tone: "",
          senderName: "",
          recipientName: "",
          lastConversationDate: "",
          relationshipDuration: "",
          messages: [],
          memories: [],
          realizations: defaultRealizations,
          voiceNote: { enabled: false },
          finalLetter: "",
        }),
    }),
    { name: "oll-builder-draft" },
  ),
);
