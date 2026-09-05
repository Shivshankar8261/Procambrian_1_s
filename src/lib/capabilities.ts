export type DeviceTier = "high" | "medium" | "low" | "none";

export function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isSmallViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function initialDeviceTier(): DeviceTier {
  if (!detectWebGL()) return "none";
  if (prefersReducedMotion()) return "none";
  const cores =
    typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
      ? navigator.hardwareConcurrency
      : 4;
  if (isSmallViewport()) return cores >= 6 ? "medium" : "low";
  return cores >= 8 ? "high" : "medium";
}

export function capDPR(tier: DeviceTier): [number, number] {
  switch (tier) {
    case "high":
      return [1, 2];
    case "medium":
      return [1, 1.5];
    case "low":
      return [1, 1];
    default:
      return [1, 1];
  }
}
