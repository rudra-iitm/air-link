import React, { useEffect, useRef } from "react";
import { productsData } from "@/lib/products-data";
import { InfoPanel } from "./InfoPanel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionsProps {
  onActiveChange: (index: number) => void;
}

export function ScrollSections({ onActiveChange }: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll(".product-section");

    sections.forEach((section, index) => {
      // Trigger for updating active dot navigation
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => onActiveChange(index),
        onEnterBack: () => onActiveChange(index),
      });

      const panel = section.querySelector(".info-panel");
      const isOdd = index % 2 !== 0;

      // Animation for the InfoPanel
      if (panel) {
        gsap.to(panel, {
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
          ease: "none",
          keyframes: [
            // 0-20%: slide in and fade in
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
            // 20-80%: hold
            { opacity: 1, x: 0, duration: 0.6 },
            // 80-100%: slide out and fade out
            { opacity: 0, x: isOdd ? -50 : 50, duration: 0.2, ease: "power2.in" },
          ],
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [onActiveChange]);

  return (
    <div ref={containerRef} className="relative z-10 w-full">
      {productsData.map((product, index) => (
        <section
          key={product.id}
          id={`section-${index}`}
          className="product-section relative w-full"
          style={{ height: "300vh" }}
        >
          <div className={`sticky top-0 h-screen w-full pointer-events-none overflow-hidden flex flex-col justify-center px-4 md:px-24 ${
            index % 2 !== 0 ? "items-start" : "items-end"
          }`}>
            <InfoPanel product={product} index={index} />
          </div>
        </section>
      ))}
    </div>
  );
}
