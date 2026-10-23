import { PageMotion } from "@/components/PageMotion";
import { ScenarioExplorer } from "@/components/ScenarioExplorer";
import { LazyScene } from "@/components/scene/LazyScene";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemExplorer } from "@/components/SystemExplorer";
import { comparison, siteAssumptions } from "@/content/netlave";
import styles from "./page.module.scss";

const nextSteps = [
  {
    number: "01",
    title: "Survey the site",
    description:
      "Measure inlet flow, recoverable head, terrain and the actual pipe network.",
  },
  {
    number: "02",
    title: "Connect the evidence",
    description:
      "Bring in water-quality records, soil measurements and species-specific agronomy.",
  },
  {
    number: "03",
    title: "Calibrate, then validate",
    description:
      "Test the model against sensor data and verify reuse approvals before deployment.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PageMotion>
        <main id="main">
          <section
            id="home"
            className={styles.hero}
            aria-labelledby="hero-heading"
          >
            <div className={styles.heroTopline} data-hero-reveal>
              <p className={styles.pill}>
                <span />
                Digital twin · TSE forestry
              </p>
              <p className={styles.projectMeta}>EGYPT / SIMULATION PROTOTYPE</p>
            </div>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow} data-hero-reveal>
                  RECLAIM. RECOVER. REGENERATE.
                </p>
                <h1 id="hero-heading" data-hero-reveal>
                  A forest,
                  <br />
                  before the
                  <br />
                  <span>first tree.</span>
                </h1>
                <p className={styles.heroDescription} data-hero-reveal>
                  Reclaimed water. Renewable power. Explainable control. Explore
                  a self-powered forest in simulation—before taking it into the
                  world.
                </p>
                <div className={styles.heroActions} data-hero-reveal>
                  <a className={styles.primaryButton} href="#twin">
                    Explore the digital twin <span aria-hidden="true">↗</span>
                  </a>
                  <a className={styles.textLink} href="#idea">
                    Discover the idea <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
              <figure className={styles.heroFigure}>
                <div className={styles.orbitRing} aria-hidden="true" />
                <div className={styles.sceneContainer}>
                  <LazyScene />
                </div>
                <div
                  className={[styles.sceneAnnotation, styles.inletAnnotation]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                >
                  <span>01 / RECLAIMED WATER</span>
                  <p>TSE → reservoir</p>
                </div>
                <div
                  className={[styles.sceneAnnotation, styles.forestAnnotation]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                >
                  <span>03 / FOREST IRRIGATION</span>
                  <p>Two gravity zones. One uphill.</p>
                </div>
                <figcaption>
                  <span className={styles.figureDot} />
                  FIG. 01 — A CONNECTED FOREST
                  <span>SCHEMATIC · NOT TO SCALE</span>
                </figcaption>
              </figure>
            </div>
            <div className={styles.heroBottom}>
              <a href="#idea" className={styles.scrollCue}>
                <span aria-hidden="true">↓</span>Scroll to explore
              </a>
              <p>Not a prediction. A place to ask better questions.</p>
              <span className={styles.coordinates}>
                WATER × ENERGY × CONTROL
              </span>
            </div>
          </section>

          <div
            className={styles.assumptionsStrip}
            aria-label="Synthetic site assumptions"
          >
            <div className={styles.assumptionsLabel}>
              <span>THE MODELLED SITE</span>
              <p>
                Synthetic assumptions,
                <br />
                not field measurements.
              </p>
            </div>
            <div className={styles.assumption}>
              <p>
                {siteAssumptions.forestAreaHa}
                <span>ha</span>
              </p>
              <span>Forest across 3 zones</span>
            </div>
            <div className={styles.assumption}>
              <p>
                {siteAssumptions.reservoirCapacityM3.toLocaleString("en-US")}
                <span>m³</span>
              </p>
              <span>Reservoir capacity</span>
            </div>
            <div className={styles.assumption}>
              <p>
                {siteAssumptions.solarCapacityKwp}
                <span>kWp</span>
              </p>
              <span>Solar generation capacity</span>
            </div>
            <div className={styles.assumption}>
              <p>
                {siteAssumptions.batteryCapacityKwh}
                <span>kWh</span>
              </p>
              <span>Battery storage</span>
            </div>
          </div>

          <section
            id="idea"
            className={styles.ideaSection}
            aria-labelledby="idea-heading"
          >
            <div className={styles.container}>
              <p className={styles.sectionLabel} data-reveal>
                <span>01 / THE IDEA</span>
                <span>A DIFFERENT KIND OF GROWTH</span>
              </p>
              <div className={styles.ideaGrid}>
                <h2
                  id="idea-heading"
                  className={styles.sectionHeading}
                  data-reveal
                >
                  What if a forest
                  <br />
                  could start with
                  <br />
                  <span>what we reclaim?</span>
                </h2>
                <div className={styles.ideaCopy} data-reveal>
                  <p className={styles.lead}>
                    Water, energy and land are connected.
                    <br />
                    Our decisions should be, too.
                  </p>
                  <p>
                    NetLave explores treated-wastewater forestry in Egypt: a
                    reservoir, renewable power and three drip-irrigated
                    terraces, connected through one simulation-driven digital
                    twin.
                  </p>
                  <p>
                    Instead of promising an outcome, we make the trade-offs
                    visible. Where does water go? When can the pump run? Why did
                    a zone wait? Test the system before planting it.
                  </p>
                  <a className={styles.textLink} href="#system">
                    Follow the connections <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <div className={styles.principles} data-reveal>
                <div>
                  <span>↳</span>
                  <h3>Reclaimed, not wasted.</h3>
                  <p>
                    Treated effluent becomes a modelled irrigation resource—not
                    drinking water.
                  </p>
                </div>
                <div>
                  <span>↳</span>
                  <h3>Powered, within limits.</h3>
                  <p>
                    Solar, micro-hydro and storage are checked against actual
                    modelled loads.
                  </p>
                </div>
                <div>
                  <span>↳</span>
                  <h3>Visible, not a black box.</h3>
                  <p>
                    Every irrigation request leaves an explainable decision
                    trace.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="system"
            className={styles.systemSection}
            aria-labelledby="system-heading"
          >
            <div className={styles.container}>
              <p className={styles.sectionLabel} data-reveal>
                <span>02 / THE SYSTEM</span>
                <span>THREE SYSTEMS. ONE BALANCE.</span>
              </p>
              <div className={styles.sectionHeader} data-reveal>
                <h2 id="system-heading" className={styles.sectionHeading}>
                  Everything flows.
                  <br />
                  <span>Nothing acts alone.</span>
                </h2>
                <p className={styles.sectionIntro}>
                  Follow the water, the watts and the decisions. Select a system
                  to see what connects it to the rest of the forest.
                </p>
              </div>
              <div data-reveal>
                <SystemExplorer />
              </div>
            </div>
          </section>

          <section
            id="twin"
            className={styles.twinSection}
            aria-labelledby="twin-heading"
          >
            <div className={styles.container}>
              <p className={styles.sectionLabel} data-reveal>
                <span>03 / THE DIGITAL TWIN</span>
                <span>ASK “WHAT IF?”</span>
              </p>
              <div className={styles.sectionHeader} data-reveal>
                <h2 id="twin-heading" className={styles.sectionHeading}>
                  Test the fault.
                  <br />
                  <span>Understand the response.</span>
                </h2>
                <p className={styles.sectionIntro}>
                  A cloudy day. A clogged filter. An interrupted inlet. The
                  reference twin makes each consequence visible. Explore its
                  documented scenarios below.
                </p>
              </div>
              <div data-reveal>
                <ScenarioExplorer />
              </div>
              <div className={styles.twinFootnote} data-reveal>
                <span>ONE PHYSICAL AUTHORITY</span>
                <p>
                  In the full digital twin, a deterministic engine advances in
                  60-second steps. Water, soil, electrical and battery balances
                  close at every step. These previews summarize its documented
                  behaviour; they do not run the engine.
                  <br />
                  <a
                    className={styles.textLink}
                    href="https://github.com/MasterChief-Zaki/digitalTwin-netlave"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open the digital twin project
                    <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section
            className={styles.evidenceSection}
            aria-labelledby="evidence-heading"
          >
            <div className={styles.container}>
              <p className={styles.sectionLabel} data-reveal>
                <span>04 / THE EVIDENCE</span>
                <span>RESULTS, NOT PROMISES</span>
              </p>
              <div className={styles.evidenceGrid}>
                <div data-reveal>
                  <h2 id="evidence-heading" className={styles.sectionHeading}>
                    A fair test.
                    <br />
                    <span>An honest result.</span>
                  </h2>
                  <p className={styles.evidenceIntro}>
                    Same site. Same weather. Same safety gates. Only the
                    irrigation policy changes.
                  </p>
                  <p className={styles.evidenceDescription}>
                    In the published synthetic baseline, smart hysteresis did{" "}
                    <strong>not</strong> save water. It delivered slightly more
                    water and used more pump energy than an already ET-sized
                    fixed timer. That is a useful result—not something to hide.
                  </p>
                  <p className={styles.runLabel}>
                    BASELINE / SEED 7 / 14 SIMULATED DAYS
                  </p>
                  <a
                    className={styles.textLink}
                    href="https://github.com/MasterChief-Zaki/digitalTwin-netlave#netlave-digital-twin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the model and assumptions
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className={styles.comparisonPanel} data-reveal>
                  <div className={styles.tableScroll}>
                    <table className={styles.comparisonTable}>
                      <caption>
                        Published simulated controller comparison
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Metric</th>
                          <th scope="col">Fixed timer</th>
                          <th scope="col">
                            Smart
                            <br />
                            hysteresis
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparison.map((metric) => (
                          <tr key={metric.label}>
                            <th scope="row">
                              {metric.label}
                              <span>{metric.unit}</span>
                            </th>
                            <td>{metric.fixed}</td>
                            <td>{metric.smart}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className={styles.comparisonNote}>
                    Scenario outputs, not measured savings. Results may favour
                    either policy as assumptions change.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="next"
            className={styles.nextSection}
            aria-labelledby="next-heading"
          >
            <div className={styles.container}>
              <p className={styles.sectionLabel} data-reveal>
                <span>05 / BEYOND THE MODEL</span>
                <span>THE NEXT CHAPTER</span>
              </p>
              <div className={styles.sectionHeader} data-reveal>
                <h2 id="next-heading" className={styles.sectionHeading}>
                  From a simulated forest
                  <br />
                  <span>to grounded evidence.</span>
                </h2>
                <p className={styles.sectionIntro}>
                  The prototype is a starting point. A real site needs
                  measurements, calibration, validation and the right approvals.
                </p>
              </div>
              <ol className={styles.nextSteps} data-reveal>
                {nextSteps.map((step) => (
                  <li key={step.number}>
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>
              <details className={styles.limitations}>
                <summary>
                  What this prototype does—and does not—prove
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <p>
                    This is a simulation-driven prototype using synthetic site
                    assumptions. It is not synchronized with or calibrated
                    against a real installation, and it does not establish
                    real-world savings, electrical autonomy or regulatory
                    compliance.
                  </p>
                  <p>
                    Salinity transport, pathogens, tree growth and carbon
                    sequestration are not modelled. The synthetic quality flag
                    never authorizes real-world irrigation. A real Egyptian TSE
                    deployment requires current reuse approvals, treatment-grade
                    checks, species authorization, worker protection and
                    monitoring.
                  </p>
                </div>
              </details>
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footerTop}>
              <p>
                Reclaimed water.
                <br />
                Renewable power.
                <br />
                <span>A forest, simulated.</span>
              </p>
              <a className={styles.backToTop} href="#home">
                Back to the beginning <span aria-hidden="true">↑</span>
              </a>
            </div>
            <p className={styles.footerWordmark} aria-hidden="true">
              NetLave<span>.</span>
            </p>
            <div className={styles.footerBottom}>
              <p>© 2026 NetLave</p>
              <nav aria-label="Footer">
                <a href="#idea">The idea</a>
                <a href="#system">The system</a>
                <a href="#twin">Digital twin</a>
              </nav>
              <p>BUILT TO EXPLORE. NOT TO OVERCLAIM.</p>
            </div>
          </div>
        </footer>
      </PageMotion>
    </>
  );
}
