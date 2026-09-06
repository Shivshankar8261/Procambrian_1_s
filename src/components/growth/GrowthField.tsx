"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateGrowth } from "@/lib/growth";
import { makeRng } from "@/lib/seededRandom";

const vertexShader = /* glsl */ `
  attribute float aOrder;
  attribute float aResolved;
  attribute float aRank;
  attribute vec3 aScatter;

  uniform float uTime;
  uniform float uMaxOrder;
  uniform float uAssemble;
  uniform float uHighlight;

  varying float vResolved;
  varying float vRank;
  varying float vOrder;
  varying vec3 vNormal;

  void main() {
    vResolved = aResolved;
    vRank = aRank;
    vOrder = aOrder / uMaxOrder;

    float ranked = smoothstep(0.70, 0.78, aRank);
    // Selected limbs thicken as they are ranked, so the highlight reads
    // even where colour alone would be too subtle.
    float thick = mix(0.75, 1.0, uAssemble) * (1.0 + 0.45 * uHighlight * ranked);
    // The length axis collapses when scattered, turning each branch into
    // a loose speck — a record that has not been placed yet.
    float along = mix(0.16, 1.0, uAssemble);

    vec3 local = vec3(position.x * thick, position.y * along, position.z * thick);
    vec4 world = instanceMatrix * vec4(local, 1.0);

    float loose = 1.0 - uAssemble;
    vec3 drift = aScatter * loose;
    drift.y += sin(uTime * 0.3 + aOrder * 0.31) * 0.22 * loose;
    world.xyz += drift;

    vNormal = normalize(mat3(instanceMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * world;
  }
`;

// No precision qualifier here: three.js prepends the same default to both
// stages, and declaring mediump only in the fragment shader made the
// uniforms shared with the vertex stage fail to link.
const fragmentShader = /* glsl */ `
  varying float vResolved;
  varying float vRank;
  varying float vOrder;
  varying vec3 vNormal;

  uniform float uTime;
  uniform float uAssemble;
  uniform float uHighlight;
  uniform float uTrace;

  uniform vec3 uLeaf;
  uniform vec3 uWater;
  uniform vec3 uDust;
  uniform vec3 uPale;
  uniform vec3 uLightDir;

  void main() {
    // On a light ground the shading darkens rather than brightens, or
    // the structure washes out into the background.
    float lambert = dot(normalize(vNormal), normalize(uLightDir)) * 0.5 + 0.5;
    float shade = mix(0.62, 1.06, lambert);

    vec3 grown = mix(uLeaf, uWater, vResolved);
    vec3 colour = mix(uDust, grown, uAssemble);

    float ranked = smoothstep(0.70, 0.78, vRank);
    colour = mix(colour, uWater, uHighlight * ranked * 0.85);
    colour = mix(colour, uPale, uHighlight * (1.0 - ranked) * 0.6);

    // A pulse running root-to-tip: one figure being followed back to the
    // record it came from.
    float head = fract(uTime * 0.12);
    float pulse = smoothstep(0.10, 0.0, abs(head - vOrder));
    colour = mix(colour, uWater, uTrace * pulse);

    gl_FragColor = vec4(colour * shade, 1.0);
  }
`;

const TARGET_HEIGHT = 4.6;

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const STAGE_TARGETS = [
  { assemble: 0, highlight: 0, trace: 0 },
  { assemble: 1, highlight: 0, trace: 0 },
  { assemble: 1, highlight: 1, trace: 0 },
  { assemble: 1, highlight: 0.35, trace: 1 },
];

export function GrowthField({
  seed = 1117,
  stageRef,
}: {
  seed?: number;
  /**
   * Fractional position through the states, 0 to STAGE_TARGETS.length - 1,
   * passed as a ref rather than a prop. Scroll updates it every frame, and
   * putting that in React state re-rendered the whole canvas subtree on
   * each one — enough to lock the page up.
   */
  stageRef: { current: number };
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spinRef = useRef<THREE.Group>(null);

  const { geometry, material, count, segments, fit } = useMemo(() => {
    const { segments, maxOrder, limbCount } = generateGrowth(seed);
    const count = segments.length;
    const rng = makeRng(seed ^ 0x5f3a);

    // Closed cylinder: open-ended tubes showed their hollow interior at
    // every joint. Eight sides is enough at this scale.
    const geom = new THREE.CylinderGeometry(1, 1, 1, 8, 1, false);
    geom.translate(0, 0.5, 0);

    const orders = new Float32Array(count);
    const resolved = new Float32Array(count);
    const ranks = new Float32Array(count);
    const scatter = new Float32Array(count * 3);

    // One rank per limb, so a highlight lights a whole branch rather
    // than a spray of unrelated segments.
    const limbRank = Array.from({ length: Math.max(1, limbCount) }, () =>
      rng.next()
    );

    segments.forEach((seg, i) => {
      orders[i] = seg.order;
      resolved[i] = seg.resolved ? 1 : 0;
      ranks[i] = limbRank[seg.limb % limbRank.length];
      scatter[i * 3] = rng.range(-2.1, 2.1);
      scatter[i * 3 + 1] = rng.range(-1.5, 1.9);
      scatter[i * 3 + 2] = rng.range(-2.1, 2.1);
    });

    geom.setAttribute("aOrder", new THREE.InstancedBufferAttribute(orders, 1));
    geom.setAttribute(
      "aResolved",
      new THREE.InstancedBufferAttribute(resolved, 1)
    );
    geom.setAttribute("aRank", new THREE.InstancedBufferAttribute(ranks, 1));
    geom.setAttribute(
      "aScatter",
      new THREE.InstancedBufferAttribute(scatter, 3)
    );

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uMaxOrder: { value: Math.max(1, maxOrder) },
        uAssemble: { value: 0 },
        uHighlight: { value: 0 },
        uTrace: { value: 0 },
        // Structural growth carries the mark's leaf-green; branches that
        // differentiate into "live" routing resolve to its water-blue.
        uLeaf: { value: new THREE.Color("#3f8443") },
        uWater: { value: new THREE.Color("#1e6fa8") },
        uDust: { value: new THREE.Color("#8d9d93") },
        uPale: { value: new THREE.Color("#b9c8bd") },
        uLightDir: { value: new THREE.Vector3(0.45, 0.9, 0.7) },
      },
    });

    // Frame the tree from its own bounds rather than hand-tuned offsets,
    // so a different seed still lands centred in the canvas column.
    const box = new THREE.Box3();
    segments.forEach((s) => {
      box.expandByPoint(s.start);
      box.expandByPoint(s.end);
    });
    const size = new THREE.Vector3();
    const centre = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(centre);
    const fit = {
      scale: TARGET_HEIGHT / Math.max(size.y, 0.001),
      offset: new THREE.Vector3(-centre.x, -centre.y, -centre.z),
    };

    return { geometry: geom, material: mat, count, segments, fit };
  }, [seed]);

  const populated = useRef(false);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Reached through the ref rather than the memoised value: these are
    // instance state being advanced, not a render result.
    const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
    uniforms.uTime.value += delta;

    if (!populated.current) {
      const dummy = new THREE.Object3D();
      const dir = new THREE.Vector3();
      const up = new THREE.Vector3(0, 1, 0);
      segments.forEach((seg, i) => {
        dir.subVectors(seg.end, seg.start);
        const len = dir.length() || 0.0001;
        dummy.position.copy(seg.start);
        // Radii are already in world units; a 6% overrun closes the gap
        // at each joint without visibly lengthening the branch.
        dummy.scale.set(seg.radius, len * 1.06, seg.radius);
        dummy.quaternion.setFromUnitVectors(up, dir.clone().normalize());
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      populated.current = true;
    }

    // Ease toward the current step rather than cutting: scrolling back
    // and forth should feel like one continuous structure, not a slide
    // deck. Frame-rate independent damping.
    // useFrame always runs the latest callback, so this closes over the
    // current stage without a ref to shuttle it through. The stage is
    // fractional — it is scroll position, not a step index — so the two
    // states either side of it are blended rather than switched.
    const stage = stageRef.current;
    const clamped = Math.min(STAGE_TARGETS.length - 1, Math.max(0, stage));
    const low = Math.floor(clamped);
    const high = Math.min(STAGE_TARGETS.length - 1, low + 1);
    const blend = clamped - low;
    const target = {
      assemble: mix(STAGE_TARGETS[low].assemble, STAGE_TARGETS[high].assemble, blend),
      highlight: mix(STAGE_TARGETS[low].highlight, STAGE_TARGETS[high].highlight, blend),
      trace: mix(STAGE_TARGETS[low].trace, STAGE_TARGETS[high].trace, blend),
    };
    // Half the previous rate: the structure should look like it is
    // settling, not snapping.
    const k = 1 - Math.exp(-delta * 1.6);
    uniforms.uAssemble.value += (target.assemble - uniforms.uAssemble.value) * k;
    uniforms.uHighlight.value +=
      (target.highlight - uniforms.uHighlight.value) * k;
    uniforms.uTrace.value += (target.trace - uniforms.uTrace.value) * k;

    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group scale={fit.scale}>
      <group ref={spinRef}>
        <group position={fit.offset}>
          <instancedMesh
            ref={meshRef}
            args={[geometry, material, count]}
            frustumCulled={false}
          />
        </group>
      </group>
    </group>
  );
}
