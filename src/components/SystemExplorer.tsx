"use client";

import { useState } from "react";
import { systems } from "@/content/netlave";
import styles from "./SystemExplorer.module.scss";

export function SystemExplorer() {
  const [selectedSystem, setSelectedSystem] = useState<
    (typeof systems)[number]
  >(systems[0]);

  return (
    <div className={styles.explorer}>
      <div
        className={styles.systemButtons}
        role="group"
        aria-label="Explore connected systems"
      >
        {systems.map((system) => (
          <button
            type="button"
            key={system.id}
            aria-pressed={selectedSystem.id === system.id}
            onClick={() => {
              setSelectedSystem(system);
            }}
          >
            <span className={styles.systemNumber}>{system.number}</span>
            <span>{system.name}</span>
            <span className={styles.buttonArrow} aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className={styles.content} aria-live="polite" aria-atomic="true">
        <div className={styles.diagram} aria-hidden="true">
          <div className={styles.diagramHeader}>
            <span>CONNECTED SYSTEM / {selectedSystem.label.toUpperCase()}</span>
            <span>NL—01</span>
          </div>
          <div className={styles.flow}>
            <span
              className={
                selectedSystem.id === "water" ? styles.highlight : undefined
              }
            >
              TSE inlet
            </span>
            <i>→</i>
            <span
              className={
                selectedSystem.id === "energy" ? styles.highlight : undefined
              }
            >
              Micro-hydro
            </span>
            <i>→</i>
            <span
              className={
                selectedSystem.id === "water" ? styles.highlight : undefined
              }
            >
              Reservoir
            </span>
          </div>
          <div className={styles.connectionLine} />
          <div className={styles.flow}>
            <span
              className={
                selectedSystem.id === "energy" ? styles.highlight : undefined
              }
            >
              Solar + battery
            </span>
            <i>→</i>
            <span
              className={
                selectedSystem.id === "control" ? styles.highlight : undefined
              }
            >
              Safety resolver
            </span>
            <i>→</i>
            <span
              className={
                selectedSystem.id === "water" ? styles.highlight : undefined
              }
            >
              Drip zones
            </span>
          </div>
          <p>Water, energy and control share one physical model.</p>
        </div>
        <h3>{selectedSystem.title}</h3>
        <p className={styles.description}>{selectedSystem.description}</p>
        <div className={styles.facts}>
          {selectedSystem.facts.map((fact) => (
            <div key={fact.label}>
              <p>
                {fact.value}
                <span>{fact.unit}</span>
              </p>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          <span aria-hidden="true">↳</span>
          {selectedSystem.note}
        </p>
      </div>
    </div>
  );
}
