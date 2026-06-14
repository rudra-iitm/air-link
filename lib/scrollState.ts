/**
 * Module-singleton bridge between the GSAP/ScrollTrigger timeline (DOM world)
 * and the React Three Fiber render loop (WebGL world).
 *
 * GSAP scrubs the fields on `model`; `useFrame` in the Scene reads them every
 * frame and layers idle-float + mouse-parallax on top. Plain mutable object —
 * no React state, so updates never trigger re-renders.
 */
export const model = {
  // scroll-driven targets (written by GSAP timeline)
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  posX: 0,
  posY: 0,
  scale: 1,
  camZ: 5.2,
  ledIntensity: 1, // glow accent driver

  // entry materialize (0 -> 1 on first load)
  appear: 0,
  explode: 0,

  // live progress 0..1 for any UI that wants it
  progress: 0,
};

/** Normalized pointer, -1..1, updated on pointermove. */
export const pointer = { x: 0, y: 0 };

export type ModelState = typeof model;
