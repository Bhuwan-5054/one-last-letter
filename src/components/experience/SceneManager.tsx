"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playSfx } from "@/hooks/useSfx";

import Scene0_Loading from "./Scene0_Loading";
import Scene1_Counter from "./Scene1_Counter";
import Scene2_Messages from "./Scene2_Messages";
import Scene3_MemoryConstellation from "./Scene3_MemoryConstellation";
import Scene4_Realization from "./Scene4_Realization";
import Scene5_Voice from "./Scene5_Voice";
import Scene6_Heart from "./Scene6_Heart";
import Scene7_Letter from "./Scene7_Letter";
import Scene8_Choice from "./Scene8_Choice";
import Scene9_Ending from "./Scene9_Ending";

interface Memory {
  title: string;
  description?: string;
  image?: string;
}

interface RealizationPair {
  left: string;
  right: string;
}

interface ExperienceData {
  senderName: string;
  recipientName: string;
  lastConversationDate: string;
  messages: string[];
  memories: Memory[];
  realizations?: RealizationPair[];
  voiceNoteUrl?: string;
  finalLetter: string;
}

interface Props {
  data: ExperienceData;
  onExit?: () => void;
}

export default function SceneManager({ data, onExit }: Props) {
  const [sceneIndex, setSceneIndex] = useState(0);

  const nextScene = () => {
    playSfx("/audio/scene-transition.mp3", 0.14);

    setTimeout(() => {
      setSceneIndex((prev) => prev + 1);
    }, 650);
  };

  const scenes = [
    <Scene0_Loading key="scene-0" onComplete={nextScene} />,

    <Scene1_Counter
      key="scene-1"
      lastConversationDate={data.lastConversationDate}
      onComplete={nextScene}
    />,

    <Scene2_Messages
      key="scene-2"
      messages={data.messages}
      onComplete={nextScene}
    />,

    <Scene3_MemoryConstellation
      key="scene-3"
      memories={data.memories}
      onComplete={nextScene}
    />,

    <Scene4_Realization
      key="scene-4"
      realizations={data.realizations}
      onComplete={nextScene}
    />,

    <Scene5_Voice
      key="scene-5"
      voiceUrl={data.voiceNoteUrl}
      onComplete={nextScene}
    />,

    <Scene6_Heart key="scene-6" onComplete={nextScene} />,

    <Scene7_Letter
      key="scene-7"
      content={data.finalLetter}
      onComplete={nextScene}
    />,

    <Scene8_Choice key="scene-8" onComplete={nextScene} />,

    <Scene9_Ending key="scene-9" onClose={() => onExit?.()} />,
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneIndex}
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.985,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -16,
            scale: 0.985,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="min-h-screen w-full"
        >
          {scenes[sceneIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
