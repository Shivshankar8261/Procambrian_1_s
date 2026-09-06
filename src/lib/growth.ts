import { Vector3 } from "three";
import { makeRng } from "./seededRandom";

/**
 * Procedural vascular growth via space colonization.
 *
 * A procambial strand grows toward randomly seeded nutrient attractors.
 * Past a differentiation height, branches heading "outward" are tagged
 * phloem-like (structural, stays leaf-green) and branches heading "upward"
 * are tagged xylem-like and gradually re-tagged `resolved` — the point
 * where the biological strand starts reading as a routing graph.
 *
 * Deterministic: same seed -> same tree, every render.
 */

export type Segment = {
  start: Vector3;
  end: Vector3;
  order: number; // growth order, used to drive the reveal animation
  resolved: boolean; // true = differentiated into "data" (water-blue)
  radius: number;
  limb: number; // index of the limb this segment belongs to
};

export type GrowthResult = {
  segments: Segment[];
  maxOrder: number;
  attractorCount: number;
  limbCount: number;
};

type Node = {
  pos: Vector3;
  dir: Vector3;
  parent: Node | null;
  order: number;
  depth: number;
};

export function generateGrowth(seed = 1117, opts?: Partial<{
  attractorCount: number;
  volumeRadius: number;
  height: number;
  influenceRadius: number;
  killRadius: number;
  stepSize: number;
  maxIterations: number;
  differentiationHeight: number;
  limbDepth: number;
}>): GrowthResult {
  const rng = makeRng(seed);

  const attractorCount = opts?.attractorCount ?? 200;
  const volumeRadius = opts?.volumeRadius ?? 2.4;
  const height = opts?.height ?? 4.4;
  const influenceRadius = opts?.influenceRadius ?? 1.05;
  const killRadius = opts?.killRadius ?? 0.26;
  const stepSize = opts?.stepSize ?? 0.13;
  const maxIterations = opts?.maxIterations ?? 160;
  const differentiationHeight = opts?.differentiationHeight ?? height * 0.58;

  // Seed attractors in a tapered vertical volume (denser near the top,
  // like a canopy pulling growth upward).
  const attractors: Vector3[] = [];
  for (let i = 0; i < attractorCount; i++) {
    const t = rng.next();
    const y = -height * 0.15 + t * height;
    const bias = 0.35 + 0.65 * t; // wider spread higher up
    const r = volumeRadius * bias * Math.sqrt(rng.next());
    const a = rng.next() * Math.PI * 2;
    attractors.push(new Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
  }

  const root: Node = {
    pos: new Vector3(0, -height * 0.18, 0),
    dir: new Vector3(0, 1, 0),
    parent: null,
    order: 0,
    depth: 0,
  };
  const nodes: Node[] = [root];
  let order = 1;

  const live = attractors.slice();

  for (let iter = 0; iter < maxIterations && live.length > 0; iter++) {
    // For each attractor, find nearest node within influence radius.
    const influence = new Map<Node, Vector3[]>();
    for (let i = live.length - 1; i >= 0; i--) {
      const a = live[i];
      let nearest: Node | null = null;
      let nearestDist = Infinity;
      for (const n of nodes) {
        const d = n.pos.distanceTo(a);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = n;
        }
      }
      if (nearest && nearestDist < killRadius) {
        live.splice(i, 1);
        continue;
      }
      if (nearest && nearestDist < influenceRadius) {
        const arr = influence.get(nearest) ?? [];
        arr.push(a);
        influence.set(nearest, arr);
      }
    }

    if (influence.size === 0) break;

    const newNodes: Node[] = [];
    for (const [n, attrs] of influence) {
      const avg = new Vector3();
      for (const a of attrs) avg.add(a.clone().sub(n.pos).normalize());
      avg.normalize();
      // Gentle randomness so branches don't look mechanically perfect.
      avg.x += rng.range(-0.06, 0.06);
      avg.z += rng.range(-0.06, 0.06);
      avg.normalize();

      const nextPos = n.pos.clone().add(avg.clone().multiplyScalar(stepSize));
      newNodes.push({
        pos: nextPos,
        dir: avg,
        parent: n,
        order: order++,
        depth: n.depth + 1,
      });
    }
    nodes.push(...newNodes);
  }

  const maxOrder = order - 1;

  // Limb identity: every node inherits the id of its ancestor at the
  // branching depth below. Highlighting then lights up whole limbs
  // rather than a scatter of unrelated segments.
  const limbDepth = opts?.limbDepth ?? 6;
  const limbOf = new Map<Node, number>();
  let limbCount = 0;
  const resolveLimb = (n: Node): number => {
    const cached = limbOf.get(n);
    if (cached !== undefined) return cached;
    let id: number;
    if (n.depth <= limbDepth || !n.parent) id = limbCount++;
    else id = resolveLimb(n.parent);
    limbOf.set(n, id);
    return id;
  };

  const segments: Segment[] = [];
  for (const n of nodes) {
    if (!n.parent) continue;
    const resolved = n.pos.y > differentiationHeight;
    // Exponential taper from trunk to tip. The previous linear falloff
    // bottomed out after ~20 steps, so most of the tree rendered at a
    // single thickness and read as a mass rather than a branch system.
    const radius = Math.max(0.012, 0.075 * Math.exp(-n.depth * 0.06));
    segments.push({
      start: n.parent.pos,
      end: n.pos,
      order: n.order,
      resolved,
      radius,
      limb: resolveLimb(n),
    });
  }

  return { segments, maxOrder, attractorCount, limbCount };
}
