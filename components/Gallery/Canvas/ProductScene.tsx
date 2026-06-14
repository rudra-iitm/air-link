import React, { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productsData } from "@/lib/products-data";
import { MediaPlane } from "./Models";

gsap.registerPlugin(ScrollTrigger);

interface ProductSceneProps {
  activeIndex: number;
}

export function ProductScene({ activeIndex }: ProductSceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for each model's wrapper group so we can animate them independently
  const modelRefs = useRef<(THREE.Group | null)[]>([]);

  // Lighting refs for dynamic crossfading
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  // Setup GSAP animations on mount
  useLayoutEffect(() => {
    const sections = document.querySelectorAll(".product-section");
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const modelWrapper = modelRefs.current[index];
        if (!modelWrapper) return;

        // Hide initially
        modelWrapper.visible = false;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onEnter: () => { modelWrapper.visible = true; },
            onEnterBack: () => { modelWrapper.visible = true; },
            onLeave: () => { modelWrapper.visible = false; },
            onLeaveBack: () => { modelWrapper.visible = false; }
          },
        });

        // 0-20%: Entry Phase (materialize, rise, scale up)
        tl.fromTo(
          modelWrapper.position,
          { y: -3 },
          { y: 0, duration: 0.2, ease: "power2.out" },
          0
        )
        .fromTo(
          modelWrapper.scale,
          { x: 0.8, y: 0.8, z: 0.8 },
          { x: 1, y: 1, z: 1, duration: 0.2, ease: "power2.out" },
          0
        )
        
        // 20-80%: Choreography Phase (subtle 3D tilt suitable for flat media)
        .to(modelWrapper.rotation, { y: 0.15, duration: 0.2 }, 0.2)
        .to(modelWrapper.rotation, { x: -0.05, duration: 0.2 }, 0.4)
        .to(modelWrapper.position, { z: 1, duration: 0.2, ease: "power1.inOut" }, 0.6)
        
        // 80-100%: Exit Phase (recede, scale down, slide out)
        .to(modelWrapper.position, { z: -1, y: 3, duration: 0.2, ease: "power2.in" }, 0.8)
        .to(modelWrapper.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 0.2, ease: "power2.in" }, 0.8)
        .to(modelWrapper.rotation, { y: -0.15, x: 0.1, duration: 0.2 }, 0.8);
      });
    });

    return () => ctx.revert();
  }, []);

  // Parallax and Lighting update loop
  useFrame((state, delta) => {
    // Mouse Parallax
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 16;
      const targetY = (state.pointer.y * Math.PI) / 16;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);
    }

    // Smooth lighting transition based on active product
    const activeProduct = productsData[activeIndex];
    if (activeProduct && keyLightRef.current && rimLightRef.current) {
      const targetKeyColor = new THREE.Color(activeProduct.lightColor);
      const targetRimColor = new THREE.Color(activeProduct.rimColor);
      
      keyLightRef.current.color.lerp(targetKeyColor, 0.05);
      rimLightRef.current.color.lerp(targetRimColor, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={keyLightRef}
        position={[5, 5, 5]}
        intensity={0.6}
        castShadow
      />
      <directionalLight
        ref={rimLightRef}
        position={[-5, 5, -5]}
        intensity={0.4}
      />

      <group ref={groupRef}>
        {productsData.map((product, index) => (
          <group
            key={product.id}
            ref={(el) => {
              modelRefs.current[index] = el;
            }}
          >
            <MediaPlane mediaUrl={product.mediaUrl} color={product.color} />
          </group>
        ))}
      </group>
    </>
  );
}
