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
    const MIN = 1100;
    const tick = (now: number) => {
      const elapsed = now - start;
      const timed = Math.min(100, (elapsed / MIN) * 100);
      const real = !active && progress >= 100 ? 100 : progress;
      const target = Math.max(timed, real);
      setShown((s) => (target > s ? target : s));
      if (elapsed >= MIN && (!active || progress >= 100)) {
        setTimeout(() => setGone(true), 350);
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#070809",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "22px",
        opacity: gone ? 0 : 1,
        pointerEvents: gone ? "none" : "auto",
        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="eyebrow" style={{ color: "#5ce1ff", letterSpacing: "0.5em" }}>
        AIRLINK
      </div>
      <div
        style={{
          width: "180px",
          height: "1px",
          background: "rgba(139,154,166,0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "left",
            transform: `scaleX(${Math.min(shown, 100) / 100})`,
            background: "linear-gradient(90deg,#2a9fd6,#5ce1ff)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
      <div
        className="font-display"
        style={{
          fontSize: "0.7rem",
          color: "#8b9aa6",
          letterSpacing: "0.2em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(Math.floor(Math.min(shown, 100))).padStart(3, "0")} / 100
      </div>
    </div>
  );
}
