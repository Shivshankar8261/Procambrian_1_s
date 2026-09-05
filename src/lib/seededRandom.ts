// Deterministic seeded PRNG (mulberry32) so the 3D composition is
// reproducible and art-directable — never Math.random() in the growth field.
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed: number) {
  const rand = mulberry32(seed);
  return {
    next: rand,
    range: (min: number, max: number) => min + rand() * (max - min),
    sign: () => (rand() < 0.5 ? -1 : 1),
  };
}
