"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/motion";

const HeroHomeScene = dynamic(() => import("@/components/three/HeroHomeScene"), {
  ssr: false,
});

export function LazyHeroCanvas() {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "80px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const runWebGl = !reduce && inView && pageVisible;

  if (reduce) {
    return (
      <div
        className="grain-hero h-full min-h-[280px] w-full rounded-[var(--radius-xl)]"
        style={{
          background:
            "linear-gradient(145deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)",
        }}
        aria-hidden
      />
    );
  }

  return (
    <div ref={host} className="h-full min-h-[280px] w-full">
      {!runWebGl ? (
        <div
          className="grain-hero h-full w-full rounded-[var(--radius-xl)]"
          style={{
            background:
              "linear-gradient(145deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
          }}
          aria-hidden
        />
      ) : (
        <Canvas
          className="h-full w-full rounded-[var(--radius-xl)] ring-1 ring-brand-start/20"
          dpr={[1, 1.35]}
          frameloop="always"
          camera={{ position: [0, 0.05, 4.35], fov: 40 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            toneMappingExposure: 1.05,
          }}
          onCreated={({ gl, scene }) => {
            gl.shadowMap.enabled = false;
            gl.shadowMap.type = THREE.PCFShadowMap;
            scene.background = null;
          }}
        >
          <Suspense fallback={null}>
            <HeroHomeScene />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
