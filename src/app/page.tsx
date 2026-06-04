"use client";

export default function HomePage() {
  return (
    <section className="scene-container relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-8 top-16 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 text-accent text-3xl opacity-80 soft-reveal">
        ✦
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <p className="premium-label mb-7">Midnight Letter</p>

        <h1 className="heading-xl soft-reveal">
          One Last
          <br />
          <span className="text-gold">Letter</span>
        </h1>

        <p className="body-lg text-muted mt-9 max-w-[330px]">
          Some things deserve to be heard before silence becomes the ending.
        </p>

        <div className="mt-14 w-full max-w-[330px] space-y-4">
          <button
            onClick={() => {
              window.location.href = "/builder";
            }}
            className="primary-btn"
          >
            Create Experience
          </button>

          <button
            onClick={() => {
              window.location.href = "/preview";
            }}
            className="secondary-btn"
          >
            View Demo
          </button>
        </div>

        <p className="mt-16 max-w-[290px] text-sm leading-7 text-faint">
          Built for words that waited too long to be spoken.
        </p>
      </div>
    </section>
  );
}
