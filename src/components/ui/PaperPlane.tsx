"use client";
import { motion } from "framer-motion";

export default function PaperPlane() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 opacity-20 pointer-events-none z-50"
      animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    </motion.div>
  );
}
