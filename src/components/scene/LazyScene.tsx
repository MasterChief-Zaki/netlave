"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./LazyScene.module.scss";

const Scene = dynamic(
  () => import("./Scene").then((sceneModule) => sceneModule.Scene),
  { ssr: false },
);

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function LazyScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    if (!context) return;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    const sceneElement = sceneRef.current;
    if (sceneElement === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Keep one mounted renderer after the first reveal. Scrolling across
        // the threshold must not repeatedly allocate WebGL contexts.
        setActive(entry?.isIntersecting ?? false);
        if (entry?.isIntersecting) setVisible(true);
      },
      { rootMargin: "150px" },
    );
    observer.observe(sceneElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.sceneLayer} aria-hidden="true">
      <svg className={styles.fallback} viewBox="0 0 800 560" fill="none">
        <path d="M90 330 400 160 710 330 400 500Z M90 330v24l310 170 310-170v-24 M400 500v24" />
        <path d="m150 300 125-68 140 77-125 68Zm175 95 130-72 140 77-130 72Zm110-168 100-55 110 60-100 55Z" />
        {Array.from({ length: 18 }, (_, index) => {
          const horizontal = 195 + (index % 6) * 60;
          const vertical = 275 + Math.floor(index / 6) * 48;
          return (
            <path
              key={index}
              d={`m${String(horizontal)} ${String(vertical)} 12-30 12 30Z m12 0v12`}
            />
          );
        })}
        <ellipse cx="350" cy="222" rx="45" ry="22" />
        <path d="M305 222v35c0 30 90 30 90 0v-35 M395 245l90 40v50 M305 250l-50 40" />
      </svg>
      {visible && (
        <SceneBoundary>
          <Scene active={active} />
        </SceneBoundary>
      )}
    </div>
  );
}
