"use client";

import { Image, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function MediaPlane({ mediaUrl, color }: { mediaUrl: string; color: string }) {
  return (
    <group scale={1.5}>
      {/* Subtle backplate / frame for the media */}
      <RoundedBox args={[3.1, 3.1, 0.05]} radius={0.05} smoothness={4} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#111" roughness={0.8} />
      </RoundedBox>
      
      {/* Accent frame glowing edge */}
      <RoundedBox args={[3.15, 3.15, 0.02]} radius={0.06} smoothness={4} position={[0, 0, -0.06]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} toneMapped={false} />
      </RoundedBox>

      {/* The actual Image/Photo showcase */}
      <Image 
        url={mediaUrl} 
        transparent 
        radius={0.05}
        scale={[3, 3]} // Square aspect ratio for the generated images
        position={[0, 0, 0]}
      />
    </group>
  );
}
