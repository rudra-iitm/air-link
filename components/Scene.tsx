"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import AetherModel from "./AetherModel";
import { model, pointer } from "@/lib/scrollState";

const GROUND_Y = -0.8;

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

/** Soft round texture for the mobile fake-shadow (no shadow maps on touch). */
function useBlobTexture() {
  return useMemo(() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(0.6, "rgba(0,0,0,0.22)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }, []);
}

/** Soft additive light pool for the studio floor */
function useLightBlobTexture() {
  return useMemo(() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,0.16)");
    g.addColorStop(0.3, "rgba(255,255,255,0.06)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((state, delta) => {
    const camera = state.camera;
    t.current += delta;
    const g = group.current;
    if (!g) return;

    // entry: rise into place + scale up (settles grounded — no idle float)
    const appear = model.appear;
    const entryScale = 0.9 + 0.1 * appear;
    const entryLift = (1 - appear) * -0.6;

    g.rotation.x = model.rotX;
    g.rotation.y = model.rotY;
    g.rotation.z = model.rotZ;
    g.position.x = model.posX;
    g.position.y = model.posY + entryLift;
    g.scale.setScalar(model.scale * entryScale);

    // subtle mouse parallax + a slightly raised, downward-looking camera so the
    // floor and its shadow read like a studio product shot
    const px = pointer.x * 0.5;
    const py = 0.22 + pointer.y * 0.3;
    camera.position.x = damp(camera.position.x, px, 3, delta);
    camera.position.y = damp(camera.position.y, py, 3, delta);
    camera.position.z = damp(camera.position.z, model.camZ, 4, delta);
    camera.lookAt(0, -0.05, 0);

    if (appear < 1) {
      g.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (m && "opacity" in m) {
          m.transparent = true;
          m.opacity = appear;
        }
      });
    }
  });

  return (
    <group ref={group}>
      <AetherModel simplified={false} />
    </group>
  );
}

export default function Scene({ simplified }: { simplified: boolean }) {
  const blob = useBlobTexture();
  const lightBlob = useLightBlobTexture();

  return (
    <>
      {/* fog blends the floor into the void — no hard horizon line */}
      <fog attach="fog" args={["#070809", 7, 18]} />

      {/* ---------- clean studio lighting ---------- */}
      <ambientLight intensity={0.45} />
      {/* key — warm white, casts the soft floor shadow */}
      <directionalLight
        position={[3.5, 6.5, 3.5]}
        intensity={4.2}
        color={"#fff6ec"}
        castShadow={!simplified}
        shadow-mapSize={[2048, 2048]}
        shadow-radius={6}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={22}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      {/* cool rim from the back to draw the silhouette edges */}
      <directionalLight position={[-4, 4, -5]} intensity={1.6} color={"#a9c2e6"} />
      {/* front fill so the fan face reads */}
      <directionalLight position={[0, 1.5, 6]} intensity={1.1} color={"#ffffff"} />

      {/* ---------- studio environment for metal reflections ---------- */}
      <Environment resolution={simplified ? 128 : 256}>
        <group>
          <Lightformer form="rect" intensity={4} position={[0, 4, 4]} scale={[10, 5, 1]} color={"#ffffff"} />
          <Lightformer form="rect" intensity={2.2} position={[-5, 1, 2]} scale={[3, 6, 1]} color={"#c4d2e6"} />
          <Lightformer form="rect" intensity={2.6} position={[5, 2, -2]} scale={[4, 5, 1]} color={"#ffffff"} />
          <Lightformer form="rect" intensity={1} position={[0, -3, 2]} scale={[10, 3, 1]} color={"#2a323c"} />
        </group>
      </Environment>

      {/* ---------- studio floor ---------- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y, 0]} receiveShadow={!simplified}>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial transparent opacity={0.65} />
      </mesh>
      
      {/* ---------- soft pool of light ---------- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.005, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial map={lightBlob} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* mobile fallback grounding (no shadow maps on touch) */}
      {simplified && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y + 0.01, 0]}>
          <planeGeometry args={[5, 3]} />
          <meshBasicMaterial map={blob} transparent depthWrite={false} />
        </mesh>
      )}

      <Rig />
    </>
  );
}
