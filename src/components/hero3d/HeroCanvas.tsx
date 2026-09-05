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
    <div
      ref={containerRef}
      className="absolute inset-0"
      aria-hidden="true"
    >
      <Canvas
        dpr={[minDpr, maxDpr]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.1, 8.4], fov: 42 }}
        frameloop={visible ? "always" : "never"}
      >
        <PerformanceMonitor
          onDecline={() => setTier((t) => (t === "high" ? "medium" : "low"))}
        />
        <color attach="background" args={["#12181d"]} />
        <fog attach="fog" args={["#12181d", 9, 16]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 2]} intensity={1.1} color="#f2e6cf" />
        <directionalLight position={[-4, -1, -3]} intensity={0.25} color="#d5522f" />
        <group position={[1.8, -1.7, 0]} scale={1.05}>
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
