"use client";

import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type { FontData } from "@react-three/drei/core/useFont";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json";

const font = helvetikerBold as unknown as FontData;

const BRAND = {
  cyan: "#00b4ff",
  orange: "#ff6b35",
  magenta: "#e91e8c",
} as const;

const t3d = {
  size: 0.42,
  height: 0.1,
  curveSegments: 4,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.018,
  bevelSegments: 1,
} as const;

function Letter({
  ch,
  color,
  position,
}: {
  ch: string;
  color: string;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <Text3D font={font} {...t3d}>
        {ch}
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Text3D>
    </group>
  );
}

function FCBLetters() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
  });

  return (
    <group ref={group}>
      <Letter ch="F" color={BRAND.cyan} position={[-0.52, 0, 0]} />
      <Letter ch="C" color={BRAND.orange} position={[0.02, 0, 0]} />
      <Letter ch="B" color={BRAND.magenta} position={[0.52, 0, 0]} />
    </group>
  );
}

export default function HeroHomeScene() {
  return (
    <>
      <ambientLight intensity={0.78} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 2, -4]} intensity={0.4} color="#e8f4ff" />
      <pointLight position={[-2.5, 1, 3]} intensity={0.45} color={BRAND.magenta} />
      <pointLight position={[3, -0.5, 2]} intensity={0.45} color={BRAND.cyan} />

      <Center position={[0, -0.06, 0]}>
        <FCBLetters />
      </Center>
    </>
  );
}
