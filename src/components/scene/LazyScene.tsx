"use client";

import dynamic from "next/dynamic";
import styles from "./LazyScene.module.scss";

// WebGL only runs in the browser, and three.js is too heavy for the initial bundle.
const Scene = dynamic(
  () => import("./Scene").then((sceneModule) => sceneModule.Scene),
  { ssr: false },
);

export function LazyScene() {
  return (
    <div className={styles.sceneLayer} aria-hidden="true">
      <Scene />
    </div>
  );
}
