"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Value-noise fbm, shared by both stages: the vertex shader lifts the
// plane into ridges, the fragment shader reads the same height back to
// place the contour lines. Cheap enough to run per vertex at this
// density, and deterministic — the range is the same on every load.
const noise = /* glsl */ `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      value += amplitude * vnoise(p);
      p = rot * p;
      amplitude *= 0.5;
    }
    return value;
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vDepth;

  ${noise}

  void main() {
    vec3 pos = position;

    // The range drifts toward the camera, so the landscape is always
    // arriving rather than looping a fixed loop of frames.
    // Not named "sample": that is a reserved word in GLSL ES 3.00 and
    // will not compile on a WebGL2 context.
    vec2 field = vec2(pos.x, pos.z + uTime * 0.9) * 0.055;

    // Ridged noise reads as eroded rock; plain fbm reads as dunes.
    float ridge = 1.0 - abs(fbm(field) * 2.0 - 1.0);
    ridge = ridge * ridge;

    // Peaks grow with distance so the near ground stays a valley floor
    // and the horizon carries the mountains. Edges are passed low-to-high
    // and inverted: smoothstep with edge0 > edge1 is undefined in GLSL,
    // and returned a flat plane on this driver.
    float far = 1.0 - smoothstep(-70.0, 6.0, pos.z);
    float amplitude = mix(0.5, 7.0, far);

    float height = ridge * amplitude - 1.35;

    // A flat water plane in the valley, the way the footage has a lake
    // under the mist.
    height = max(height, -0.55);

    pos.y = height;
    vHeight = height;
    vDepth = -pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vHeight;
  varying float vDepth;

  uniform vec3 uNight;
  uniform vec3 uSlope;
  uniform vec3 uRidge;
  uniform vec3 uWater;
  uniform float uFogNear;
  uniform float uFogFar;

  void main() {
    float fog = clamp((vDepth - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);

    float land = smoothstep(-0.54, -0.42, vHeight);
    float lift = smoothstep(-0.5, 5.0, vHeight);
    vec3 colour = mix(uWater, mix(uSlope, uRidge, lift), land);

    // Elevation contours — a landscape drawn the way it would be
    // surveyed. The band widens with distance so the far ridges don't
    // turn into moiré.
    float spacing = 0.42;
    float band = abs(fract(vHeight / spacing) - 0.5);
    float width = 0.06 + 0.28 * fog;
    float line = (1.0 - smoothstep(0.0, width, band)) * land;
    colour = mix(colour, uRidge, line * 0.8 * (1.0 - fog * 0.5));

    gl_FragColor = vec4(mix(colour, uNight, fog), 1.0);
  }
`;

export function TerrainField() {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(150, 120, 220, 200);
    geom.rotateX(-Math.PI / 2);
    geom.translate(0, 0, -50);

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNight: { value: new THREE.Color("#101a15") },
        uSlope: { value: new THREE.Color("#2f6142") },
        uRidge: { value: new THREE.Color("#7cc48d") },
        uWater: { value: new THREE.Color("#2a6b8c") },
        // Fog has to reach past the far ridges, not swallow them: at 62
        // the whole horizon washed out to flat ink.
        uFogNear: { value: 16 },
        uFogFar: { value: 115 },
      },
    });

    return { geometry: geom, material: mat };
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Reached through the ref rather than the memoised value: the clock
    // uniform is instance state being advanced, not a render result.
    (mesh.material as THREE.ShaderMaterial).uniforms.uTime.value += delta;

    // A very small pointer parallax: enough to feel like a place you are
    // standing in, not enough to fight the copy sitting on top of it.
    // The camera is taken off the frame state rather than captured from
    // render, so nothing from the render pass is mutated here.
    const camera = state.camera;
    const k = 1 - Math.exp(-delta * 2.2);
    camera.position.x += (state.pointer.x * 1.6 - camera.position.x) * k;
    camera.position.y += (3.6 + state.pointer.y * 0.6 - camera.position.y) * k;
    camera.lookAt(0, -0.4, -30);
  });

  // Geometry and material go in through args, the same way the growth
  // field builds its mesh. Attaching the material as a <primitive> child
  // left the mesh drawing nothing at all.
  return <mesh ref={meshRef} args={[geometry, material]} frustumCulled={false} />;
}
