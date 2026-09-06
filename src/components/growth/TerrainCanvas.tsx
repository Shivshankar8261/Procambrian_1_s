"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { TerrainField } from "./TerrainField";
import { capDPR, initialDeviceTier } from "@/lib/capabilities";

export function TerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tier] = useState(initialDeviceTier);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.02 }
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
      <Canvas
        dpr={[minDpr, maxDpr]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 3.6, 6], fov: 55, near: 0.1, far: 200 }}
        // The band is one screen of a long page; there is no reason to
        // keep a GPU busy on a landscape nobody is looking at.
        frameloop={visible ? "always" : "never"}
      >
        <TerrainField />
      </Canvas>
    </div>
  );
}
