import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/ui/AmbientBackground";
import AmbientAudio from "@/components/ui/AmbientAudio";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Last Letter",
  description: "Some things deserve to be heard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#050816] text-white antialiased`}
      >
        <AmbientBackground />
        <AmbientAudio />

        <main className="relative z-10 min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
