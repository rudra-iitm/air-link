"use client";

import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { model as scrollState } from "@/lib/scrollState";

const basePath = process.env.NODE_ENV === "production" ? "/air-link" : "";
const MODEL_URL = `${basePath}/models/airlink-unit.glb`;

type Props = {
  simplified?: boolean;
};

type GLTFResult = GLTF & {
  nodes: {
    ['Cylinder-Mesh']: THREE.Mesh
    ['Cylinder-Mesh_1']: THREE.Mesh
    ['Cylinder-Mesh_2']: THREE.Mesh
    ['Cylinder-Mesh_3']: THREE.Mesh
  }
  materials: {
    Body: THREE.MeshStandardMaterial
    Blade: THREE.MeshStandardMaterial
    Cage: THREE.MeshStandardMaterial
    Inside: THREE.MeshStandardMaterial
  }
}

const BLADE_PIVOT = new THREE.Vector3(0.060, 0.410, 0.200);

export default function AetherModel({ simplified = false }: Props) {
  const { scene, nodes } = useGLTF(MODEL_URL) as unknown as GLTFResult;

  const pivotGroupRef = useRef<THREE.Group>(null);
  const explodeGroupRef = useRef<THREE.Group>(null);
  const cageRef = useRef<THREE.Mesh>(null);

  const { offset, fit } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    return { offset: center, fit: 2.4 / maxDim };
  }, [scene]);

  const mats = useMemo(() => {
    const stdBody = new THREE.MeshStandardMaterial();
    stdBody.color = new THREE.Color("#363c44");
    stdBody.metalness = 0.88;
    stdBody.roughness = 0.36;
    stdBody.envMapIntensity = 1.6;

    const stdCage = new THREE.MeshStandardMaterial();
    stdCage.color = new THREE.Color("#1a1e23");
    stdCage.metalness = 0.75;
    stdCage.roughness = 0.45;
    stdCage.envMapIntensity = 1.1;

    const stdBlade = new THREE.MeshStandardMaterial();
    stdBlade.color = new THREE.Color("#30363d");
    stdBlade.metalness = 1;
    stdBlade.roughness = 0.32;
    stdBlade.envMapIntensity = 1.3;

    const stdInside = new THREE.MeshStandardMaterial();
    stdInside.color = new THREE.Color("#060708");
    stdInside.metalness = 0.3;
    stdInside.roughness = 0.8;
    stdInside.envMapIntensity = 0.4;

    return { Body: stdBody, Cage: stdCage, Blade: stdBlade, Inside: stdInside };
  }, []);

  useFrame((state, delta) => {
    if (pivotGroupRef.current) {
      pivotGroupRef.current.rotation.x -= delta * 8;
    }

    const explode = scrollState.explode;

    if (cageRef.current) {
      const targetX = explode * (2.8 / fit);
      cageRef.current.position.x = THREE.MathUtils.lerp(cageRef.current.position.x, targetX, delta * 8);
      cageRef.current.rotation.y = THREE.MathUtils.lerp(cageRef.current.rotation.y, explode * 0.15, delta * 8);
    }

    if (explodeGroupRef.current) {
      const targetX = explode * (1.3 / fit);
      explodeGroupRef.current.position.x = THREE.MathUtils.lerp(explodeGroupRef.current.position.x, targetX, delta * 8);
    }
  });

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <group scale={fit} position={[-offset.x * fit, -offset.y * fit, -offset.z * fit]}>
        <mesh
          castShadow={!simplified}
          receiveShadow={!simplified}
          geometry={nodes['Cylinder-Mesh'].geometry}
          material={mats.Body}
        />

        <group ref={explodeGroupRef}>
          <group position={[BLADE_PIVOT.x, BLADE_PIVOT.y, BLADE_PIVOT.z]}>
            <group ref={pivotGroupRef}>
              <mesh
                position={[-BLADE_PIVOT.x, -BLADE_PIVOT.y, -BLADE_PIVOT.z]}
                castShadow={!simplified}
                receiveShadow={!simplified}
                geometry={nodes['Cylinder-Mesh_1'].geometry}
                material={mats.Blade}
              />
            </group>
          </group>
        </group>

        <mesh
          ref={cageRef}
          castShadow={!simplified}
          receiveShadow={!simplified}
          geometry={nodes['Cylinder-Mesh_2'].geometry}
          material={mats.Cage}
        />

        <mesh
          castShadow={!simplified}
          receiveShadow={!simplified}
          geometry={nodes['Cylinder-Mesh_3'].geometry}
          material={mats.Inside}
        />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
