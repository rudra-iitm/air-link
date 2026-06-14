"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GalleryCanvas } from "./Canvas/GalleryCanvas";
import { ScrollSections } from "./Overlay/ScrollSections";
import { Navigation } from "./Overlay/Navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function GalleryClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    setLenisRef(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (index: number) => {
    if (!lenisRef) return;
    const targetSection = document.getElementById(`section-${index}`);
    if (targetSection) {
      lenisRef.scrollTo(targetSection, { duration: 1.5 });
    }
  };

  return (
    <main className="relative bg-[#080808] min-h-screen text-white font-sans selection:bg-white/20">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex items-center justify-between pointer-events-auto mix-blend-difference">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
        <div className="text-xl font-bold tracking-tighter text-white uppercase">
          AirLink
        </div>
      </header>

      {/* 3D Canvas Context */}
      <GalleryCanvas activeIndex={activeIndex} />

      {/* Dot Navigation */}
      <Navigation activeIndex={activeIndex} onNavigate={handleNavigate} />

      {/* Scrollable Sections */}
      <ScrollSections onActiveChange={setActiveIndex} />
    </main>
  );
}
