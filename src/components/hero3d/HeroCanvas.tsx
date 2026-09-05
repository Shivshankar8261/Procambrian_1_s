"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerformanceMonitor } from "@react-three/drei";
import { GrowthField } from "./GrowthField";
import { capDPR, initialDeviceTier, type DeviceTier } from "@/lib/capabilities";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tier, setTier] = useState<DeviceTier>("medium");

  useEffect(() => {
    setTier(initialDeviceTier());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) setVisible(false);
      else io.takeRecords();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const [minDpr, maxDpr] = capDPR(tier);

  return (
    // Anchored to its own column rather than the full hero: a fixed
    // world-space offset drifts across the copy as the viewport aspect
    // changes, so the canvas owns the right-hand band instead.
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-0 h-[42%] md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[56%]"
      aria-hidden="true"
    >
      <Canvas
        dpr={[minDpr, maxDpr]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.1, 9.6], fov: 42 }}
        frameloop={visible ? "always" : "never"}
      >
        <PerformanceMonitor
          onDecline={() => setTier((t) => (t === "high" ? "medium" : "low"))}
        />
        <color attach="background" args={["#eaefeb"]} />
        <fog attach="fog" args={["#eaefeb", 13, 24]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 2]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-4, -1, -3]} intensity={0.25} color="#2c8fd6" />
        <group position={[0, -1.3, 0]} scale={0.85}>
          <GrowthField seed={1117} />
        </group>
        {/* Isolated in its own Suspense: the HDRI fetch must never block
            the growth field (or anything else) from rendering. */}
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
