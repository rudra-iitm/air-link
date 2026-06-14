"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { ProductScene } from "./ProductScene";

interface GalleryCanvasProps {
  activeIndex: number;
}

export function GalleryCanvas({ activeIndex }: GalleryCanvasProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#080808]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.2} />
          
          <ProductScene activeIndex={activeIndex} />
          
          {/* @ts-ignore */}
          <EffectComposer disableNormalPass>
            {/* @ts-ignore */}
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={0.9}
              intensity={0.6}
              mipmapBlur
            />
            {/* @ts-ignore */}
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0004, 0.0004)}
            />
            {/* @ts-ignore */}
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
