"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const { progress, active } = useProgress();
  const [gone, setGone] = useState(false);
  const [shown, setShown] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const MIN = 1200; // Minimum time to show the loader so it doesn't flash
    const tick = (now: number) => {
      const elapsed = now - start;
      const timed = Math.min(100, (elapsed / MIN) * 100);
      const real = !active && progress >= 100 ? 100 : progress;
      const target = Math.max(timed, real);
      setShown((s) => (target > s ? target : s));
      
      // Wait slightly at 100% before fading out
      if (elapsed >= MIN && (!active || progress >= 100)) {
        setTimeout(() => setGone(true), 400);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, progress]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        opacity: gone ? 0 : 1,
        pointerEvents: gone ? "none" : "auto",
      }}
    >
      {/* Background large ghost text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[18vw] leading-none font-medium text-white tracking-tighter opacity-5 select-none font-display">
          AIRLINK
        </span>
      </div>

      <div className="z-10 flex flex-col items-center gap-6">
        <div className="text-[0.68rem] uppercase tracking-[0.2em] font-medium text-white flex items-center gap-2">
          <span className="text-white/40">©</span>AIRLINK
        </div>
        
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-0 origin-left bg-white transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${Math.min(shown, 100) / 100})` }}
          />
        </div>

        <div className="text-[0.65rem] font-mono tracking-widest text-white/50">
          {String(Math.floor(Math.min(shown, 100))).padStart(3, "0")} %
        </div>
      </div>
    </div>
  );
}
