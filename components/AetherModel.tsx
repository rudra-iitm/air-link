"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * The Airlink Aether unit — a real condenser/fan model, re-skinned to a
 * premium dark-metal finish and lit like a studio product shot. No emissive
 * tricks: just clean PBR so the studio lights + cast shadow do the work.
 *
 * Model: "Air Conditioner" by J-Toastie (Poly Pizza), CC BY. See
 * public/models/CREDITS.md.
 */

const MODEL_URL = "/models/airlink-unit.glb";

type Props = {
  simplified?: boolean;
};

export default function AetherModel({ simplified = false }: Props) {
  const { scene } = useGLTF(MODEL_URL);

  // clone so HMR / re-mounts never mutate the cached original
  const model = useMemo(() => scene.clone(true), [scene]);

  const { offset, fit } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    return { offset: center, fit: 2.4 / maxDim };
  }, [model]);

  useEffect(() => {
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = !simplified;
      mesh.receiveShadow = !simplified;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat || !mat.name) return;
      const std = new THREE.MeshStandardMaterial();
      switch (mat.name) {
        case "Body":
          std.color = new THREE.Color("#363c44");
          std.metalness = 0.88;
          std.roughness = 0.36;
          std.envMapIntensity = 1.6;
          break;
        case "Cage":
          std.color = new THREE.Color("#1a1e23");
          std.metalness = 0.75;
          std.roughness = 0.45;
          std.envMapIntensity = 1.1;
          break;
        case "Blade":
          std.color = new THREE.Color("#30363d");
          std.metalness = 1;
          std.roughness = 0.32;
          std.envMapIntensity = 1.3;
          break;
        case "Inside":
        default:
          std.color = new THREE.Color("#060708");
          std.metalness = 0.3;
          std.roughness = 0.8;
          std.envMapIntensity = 0.4;
          break;
      }
      mesh.material = std;
    });
  }, [model, simplified]);

  return (
    // base orientation turns the fan face toward camera; tuned for this model
    <group rotation={[0, -Math.PI / 2, 0]}>
      <group scale={fit} position={[-offset.x * fit, -offset.y * fit, -offset.z * fit]}>
        <primitive object={model} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
