"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Scene from "./Scene";
import Content from "./Content";
import Loader from "./Loader";
import { model, pointer } from "@/lib/scrollState";

type Pose = {
  rotX: number;
  rotY: number;
  rotZ: number;
  posX: number;
  posY: number;
  scale: number;
  camZ: number;
  ledIntensity: number;
  explode: number;
};

const POSES: Pose[] = [
  { rotX: 0.05, rotY: 0.0, rotZ: 0.0, posX: 0.0, posY: 0.0, scale: 1.0, camZ: 5.2, ledIntensity: 1.0, explode: 0 },
  { rotX: 0.1, rotY: 0.8, rotZ: 0.0, posX: 1.15, posY: 0.0, scale: 1.05, camZ: 4.8, ledIntensity: 1.3, explode: 0 },
  { rotX: -0.06, rotY: -0.55, rotZ: 0.0, posX: -1.35, posY: 0.1, scale: 0.68, camZ: 5.6, ledIntensity: 0.95, explode: 0 },
  { rotX: 0.08, rotY: 0.28, rotZ: 0.0, posX: 0.7, posY: -0.05, scale: 1.7, camZ: 3.8, ledIntensity: 1.6, explode: 1 },
  { rotX: -0.05, rotY: -1.05, rotZ: 0.0, posX: -1.25, posY: 0.3, scale: 0.7, camZ: 5.4, ledIntensity: 1.15, explode: 0 },
  { rotX: 0.05, rotY: 0.0, rotZ: 0.0, posX: 0.0, posY: 0.05, scale: 1.05, camZ: 4.9, ledIntensity: 1.35, explode: 0 },
];

function detectTouch() {
  if (
    typeof window !== "undefined" &&
    window.location.search.includes("desktop")
  )
    return false;
  return (
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 820
  );
}

export default function Experience() {
  const [mounted, setMounted] = useState(false);
  const [touch, setTouch] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTouch(detectTouch());
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);

    const isTouch = detectTouch();

    const wf = Math.min(Math.max(window.innerWidth / 1280, 0.5), 1.15);
    const poses = POSES.map((p) => ({
      ...p,
      posX: p.posX * wf * (isTouch ? 0.62 : 1),
      scale: isTouch ? p.scale * 0.8 : p.scale,
      camZ: isTouch ? p.camZ + 0.7 : p.camZ,
    }));

    let lenis: Lenis | null = null;
    let tickerFn: ((t: number) => void) | null = null;

    if (!isTouch) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    Object.assign(model, poses[0]);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: wrap.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            model.progress = self.progress;
          },
        },
      });
      for (let i = 1; i < poses.length; i++) {
        tl.to(model, { ...poses[i] }, i - 1);
      }

      gsap.set("[data-reveal]", { opacity: 0, y: 40 });
      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
      sections.forEach((sec) => {
        const items = sec.querySelectorAll("[data-reveal]");
        if (!items.length) return;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sec,
            start: "top 75%",
          },
        });
      });

      gsap.to("#brandmark", {
        opacity: 0,
        yPercent: -15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const entry = gsap.to(model, {
      appear: 1,
      duration: 1.8,
      ease: "power3.out",
      delay: 0.35,
    });

    ScrollTrigger.refresh();

    return () => {
      entry.kill();
      ctx.revert();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mounted]);

  return (
    <>
      <div className="brandmark" id="brandmark" aria-hidden>
        <span>
          <i>©</i>
          AIRLINK
        </span>
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {mounted && (
          <Canvas
            frameloop="always"
            shadows={touch ? false : "soft"}
            dpr={touch ? [1, 1.3] : [1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0, 0.22, 5.2], fov: 38, near: 0.1, far: 100 }}
          >
            <Suspense fallback={null}>
              <Scene simplified={touch} />
            </Suspense>
          </Canvas>
        )}
      </div>

      <div ref={wrap} className="relative z-10">
        <Content />
      </div>

      <div className="grain" />
      <Loader />
    </>
  );
}
