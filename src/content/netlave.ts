// Content and synthetic assumptions from ../landing-netlave/src/components/Idea.tsx
// and ../digitalTwin-netlave/README.md. These are not field measurements.
export const siteAssumptions = {
  forestAreaHa: 15,
  reservoirCapacityM3: 1500,
  initialReservoirM3: 900,
  meanInflowM3Hour: 60,
  solarCapacityKwp: 8,
  batteryCapacityKwh: 15,
  pumpLimitKw: 3,
  hydroPowerW: 294,
};

export const systems = [
  {
    id: "water",
    number: "01",
    name: "Reclaim the water",
    label: "Water",
    title: "Wastewater becomes a resource.",
    description:
      "Treated sewage effluent flows through a micro-hydro turbine into a reservoir. A shared filter protects the drip network, supplying two gravity-fed terraces and one pumped uphill zone.",
    facts: [
      { value: "60", unit: "m³/h", label: "Assumed mean TSE inflow" },
      { value: "1,500", unit: "m³", label: "Modelled reservoir capacity" },
    ],
    note: "Treatment quality is a safety gate, not an afterthought. HOLD or UNKNOWN closes irrigation requests.",
  },
  {
    id: "energy",
    number: "02",
    name: "Recover the energy",
    label: "Energy",
    title: "Renewable power. Physical limits.",
    description:
      "Solar generation and battery storage support the uphill pump and auxiliary loads. Micro-hydro recovers a modest amount of energy from the inlet; it does not power the entire irrigation system.",
    facts: [
      { value: "8", unit: "kWp", label: "Assumed solar array" },
      { value: "15", unit: "kWh", label: "Assumed battery capacity" },
    ],
    note: "At the assumed 3 m drop, micro-hydro supplies about 294 W. The uphill pump has a 3 kW electrical limit.",
  },
  {
    id: "control",
    number: "03",
    name: "Explain every decision",
    label: "Control",
    title: "Ask for water. Check what is possible.",
    description:
      "Soil-moisture hysteresis requests irrigation. A separate safety resolver checks quality, filtration, storage, hydraulic head, shared flow capacity and available power before granting delivery.",
    facts: [
      { value: "0.166", unit: "m³/m³", label: "Soil-moisture start threshold" },
      { value: "0.198", unit: "m³/m³", label: "Soil-moisture stop target" },
    ],
    note: "Every accepted or denied request has a reason. Manual commands cannot bypass the safety checks.",
  },
] as const;

export type SystemId = (typeof systems)[number]["id"];

export const scenarios = [
  {
    id: "baseline",
    label: "Baseline",
    number: "01",
    title: "Three zones. One shared network.",
    description:
      "With all zones just below the moisture trigger, A and C begin irrigation. Zone B waits because A and B share a 140 m³/h gravity manifold.",
    reason: "CONCURRENT_FLOW_LIMIT",
    reasonLabel: "Zone B waits for manifold capacity",
    tone: "warning",
    condition: "Normal site assumptions",
    response: "Queue the gravity-fed request",
    lesson: "Demand is not the same as delivered flow.",
    zones: ["Irrigating", "Waiting", "Irrigating"],
  },
  {
    id: "clogged_filter",
    label: "Clogged filter",
    number: "02",
    title: "A small blockage. A visible consequence.",
    description:
      "With solids loading multiplied by eight, Zone B loses sufficient head while A runs. At clog index 0.60, a five-minute flush uses 1.5 m³ of water and 0.10 kWh, then restores service.",
    reason: "INSUFFICIENT_HEAD",
    reasonLabel: "Zone B is denied until head recovers",
    tone: "fault",
    condition: "Solids loading ×8",
    response: "Flush the shared filter",
    lesson: "Maintenance has a water and energy cost.",
    zones: ["Irrigating", "Head limited", "Demand dependent"],
  },
  {
    id: "low_solar",
    label: "Low solar",
    number: "03",
    title: "Protect the battery. Pause the pump.",
    description:
      "At a cloud factor of 0.25 and an initial battery charge of 24%, the uphill pump runs for about 13 minutes before reaching the reserve. Its request is then denied with zero delivered flow.",
    reason: "BATTERY_BELOW_RESERVE",
    reasonLabel: "Zone C stops at the battery reserve",
    tone: "fault",
    condition: "Cloud factor 0.25 · battery 24%",
    response: "Stop pumping at the 20% reserve",
    lesson: "An Open command cannot create available power.",
    zones: ["Gravity fed", "Gravity fed", "Reserve limited"],
  },
  {
    id: "tse_interrupt",
    label: "Inflow interrupted",
    number: "04",
    title: "When the inlet stops, storage matters.",
    description:
      "The preset interrupts treated-water inflow from 06:30 to 12:30. Micro-hydro falls to zero and irrigation draws down the reservoir, exposing the dependency on stored water.",
    reason: "RESERVOIR_LOW",
    reasonLabel: "Low-storage gate protects delivery if reached",
    tone: "warning",
    condition: "Six-hour TSE interruption",
    response: "Draw on available reservoir storage",
    lesson: "The water balance still has to close.",
    zones: ["Storage dependent", "Storage dependent", "Storage dependent"],
  },
] as const;

// Published development run: baseline, seed 7, 14 days. Not measured savings.
export const comparison = [
  {
    label: "Irrigation delivered",
    fixed: "11,404",
    smart: "11,411",
    unit: "m³",
  },
  { label: "ET deficit", fixed: "0.42", smart: "0.56", unit: "mm" },
  { label: "Overflow / diversion", fixed: "8,245", smart: "8,139", unit: "m³" },
  { label: "Pump energy", fixed: "360", smart: "399", unit: "kWh" },
  { label: "Unserved electrical load", fixed: "0", smart: "0", unit: "kWh" },
];
