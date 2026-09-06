"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { GrowthField } from "./GrowthField";
import { capDPR, initialDeviceTier, type DeviceTier } from "@/lib/capabilities";

export function GrowthCanvas({
  stageRef,
}: {
  stageRef: { current: number };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // This component is loaded with ssr:false, so the probes behind
  // initialDeviceTier() are safe to run in the initial state.
  const [tier, setTier] = useState<DeviceTier>(initialDeviceTier);

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
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {/* Transparent: an opaque clear colour drew a visible rectangle
          against the page ground at the edge of the canvas column.
          The field uses a raw ShaderMaterial, so scene lights and an
          HDRI environment would cost bandwidth and frame time without
          changing a single pixel — there are none. */}
      <Canvas
        dpr={[minDpr, maxDpr]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.2, 8.4], fov: 40 }}
        frameloop={visible ? "always" : "never"}
      >
        <PerformanceMonitor
          onDecline={() => setTier((t) => (t === "high" ? "medium" : "low"))}
        />
        <GrowthField seed={1117} stageRef={stageRef} />
      </Canvas>
    </div>
  );
}
