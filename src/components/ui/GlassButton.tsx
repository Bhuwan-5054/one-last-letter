"use client";
import { motion } from "framer-motion";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  disabled?: boolean;
}

export default function GlassButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: GlassButtonProps) {
  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-full backdrop-blur-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        variant === "primary"
          ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
          : "bg-transparent border border-white/30 text-white/80 hover:bg-white/10"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}