"use client";

import { useState } from "react";
import { scenarios } from "@/content/netlave";
import styles from "./ScenarioExplorer.module.scss";

export function ScenarioExplorer() {
  const [selectedScenario, setSelectedScenario] = useState<
    (typeof scenarios)[number]
  >(scenarios[0]);

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <span className={styles.previewLabel}>
          <i />
          SCENARIO PREVIEW
        </span>
        <span>Illustrative states · not a live simulation</span>
      </div>
      <div
        className={styles.scenarioButtons}
        role="group"
        aria-label="Choose a scenario preview"
      >
        {scenarios.map((scenario) => (
          <button
            type="button"
            key={scenario.id}
            aria-pressed={selectedScenario.id === scenario.id}
            onClick={() => {
              setSelectedScenario(scenario);
            }}
          >
            <span>{scenario.number}</span>
            {scenario.label}
          </button>
        ))}
      </div>
      <div
        className={styles.scenarioContent}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={styles.narrative}>
          <p className={styles.condition}>{selectedScenario.condition}</p>
          <h3>{selectedScenario.title}</h3>
          <p className={styles.description}>{selectedScenario.description}</p>
          <div className={styles.response}>
            <span>CONTROLLER RESPONSE</span>
            <p>{selectedScenario.response}</p>
          </div>
          <p className={styles.lesson}>
            <span aria-hidden="true">↳</span> {selectedScenario.lesson}
          </p>
        </div>
        <div className={styles.monitor}>
          <div className={styles.monitorHeader}>
            <span>DECISION TRACE</span>
            <span>3 ZONES</span>
          </div>
          {selectedScenario.zones.map((status, zoneIndex) => (
            <div className={styles.zoneRow} key={zoneIndex}>
              <span className={styles.zoneBadge}>
                {String.fromCharCode(65 + zoneIndex)}
              </span>
              <div>
                <p>Zone {String.fromCharCode(65 + zoneIndex)}</p>
                <span>
                  {zoneIndex === 2
                    ? "Pumped · +34 m"
                    : `Gravity · +${zoneIndex === 0 ? "2" : "8"} m`}
                </span>
              </div>
              <span className={styles.zoneStatus}>{status}</span>
            </div>
          ))}
          <div
            className={
              selectedScenario.tone === "fault"
                ? styles.faultReason
                : styles.warningReason
            }
          >
            <span className={styles.reasonCaption}>
              SAFETY RESOLVER / REASON CODE
            </span>
            <code>{selectedScenario.reason}</code>
            <p>{selectedScenario.reasonLabel}</p>
          </div>
          <p className={styles.monitorNote}>
            A request is never proof of delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
