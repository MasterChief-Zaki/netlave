"use client";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SMAA } from "@react-three/postprocessing";

// The only module that imports three.js; load it through LazyScene so it stays out of the initial bundle.
export function Scene() {
  return (
    // The effect composer renders the final image, so it handles antialiasing instead of the WebGL context.
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <Preload all />
      <EffectComposer multisampling={0}>
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}
