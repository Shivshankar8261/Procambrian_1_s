"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateGrowth } from "@/lib/growth";

const vertexShader = /* glsl */ `
  attribute float aOrder;
  attribute float aResolved;
  uniform float uTime;
  uniform float uMaxOrder;
  uniform float uGrowDuration;
  uniform float uGrowWindow;
  varying float vResolved;
  varying float vGrowth;
  varying vec3 vNormal;

  void main() {
    vResolved = aResolved;
    float growthTime = (aOrder / uMaxOrder) * uGrowDuration;
    float grown = clamp((uTime - growthTime) / uGrowWindow, 0.0, 1.0);
    vGrowth = grown;

    // Scale each instance in from zero along its own axis as it "grows".
    vec3 scaled = position * mix(0.001, 1.0, grown);
    vec4 mvPosition = instanceMatrix * vec4(scaled, 1.0);
    vNormal = normalize(mat3(instanceMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying float vResolved;
  varying float vGrowth;
  varying vec3 vNormal;

  uniform vec3 uAmber;
  uniform vec3 uOxide;
  uniform vec3 uLightDir;

  void main() {
    // On a light ground the shading has to darken rather than brighten,
    // or the structure washes out into the background.
    float diffuse = clamp(dot(normalize(vNormal), normalize(uLightDir)), 0.55, 1.0);
    vec3 base = mix(uAmber, uOxide, vResolved);
    vec3 color = base * diffuse;
    float alpha = vGrowth;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function GrowthField({ seed = 1117 }: { seed?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { geometry, material, count, segments } = useMemo(() => {
    const { segments, maxOrder } = generateGrowth(seed);
    const count = segments.length;

    const geom = new THREE.CylinderGeometry(1, 1, 1, 6, 1, true);
    geom.translate(0, 0.5, 0);

    const orders = new Float32Array(count);
    const resolved = new Float32Array(count);
    segments.forEach((seg, i) => {
      orders[i] = seg.order;
      resolved[i] = seg.resolved ? 1 : 0;
    });
    geom.setAttribute("aOrder", new THREE.InstancedBufferAttribute(orders, 1));
    geom.setAttribute(
      "aResolved",
      new THREE.InstancedBufferAttribute(resolved, 1)
    );

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMaxOrder: { value: Math.max(1, maxOrder) },
        uGrowDuration: { value: 2.4 },
        uGrowWindow: { value: 0.5 },
        // Structural growth carries the mark's leaf-green; branches that
        // differentiate into "live" routing resolve to its water-blue.
        uAmber: { value: new THREE.Color("#4f9d52") },
        uOxide: { value: new THREE.Color("#2c8fd6") },
        uLightDir: { value: new THREE.Vector3(0.4, 1, 0.6) },
      },
    });

    return { geometry: geom, material: mat, count, segments };
  }, [seed]);

  // Populate instance transforms once, on mount.
  const populated = useRef(false);
  useFrame((_state, delta) => {
    material.uniforms.uTime.value += delta;

    if (meshRef.current && !populated.current) {
      const dummy = new THREE.Object3D();
      segments.forEach((seg, i) => {
        const dir = new THREE.Vector3().subVectors(seg.end, seg.start);
        const len = dir.length() || 0.0001;
        dummy.position.copy(seg.start);
        dummy.scale.set(seg.radius * 22, len, seg.radius * 22);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        dummy.quaternion.copy(quat);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
      populated.current = true;
    }

    if (meshRef.current) {
      // Slow autorotation, delta-time driven (not frame-count).
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}
