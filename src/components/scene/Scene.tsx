"use client";

import { Edges, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";
import { CatmullRomCurve3, Vector3, type Group } from "three";
import { useReducedMotion } from "@/components/useReducedMotion";

function readPalette() {
  const tokens = getComputedStyle(document.documentElement);
  const token = (name: string) => tokens.getPropertyValue(name).trim();
  return {
    ground: token("--color-deep-navy"),
    terrace: token("--color-deep-teal"),
    canopy: token("--color-sage"),
    canopyLight: token("--color-seafoam"),
    metal: token("--color-mist"),
    water: token("--color-lagoon"),
    pipe: token("--color-teal"),
  };
}

type Palette = ReturnType<typeof readPalette>;
type Position = [number, number, number];

const terraces = [
  { center: [-4.5, 0.65, 3.1], size: [6.4, 1, 4.8], rows: 5, columns: 7 },
  { center: [3, 1.1, 3.1], size: [6.4, 1.9, 4.8], rows: 5, columns: 7 },
  { center: [4, 2, -3.4], size: [5.6, 3.7, 4], rows: 4, columns: 6 },
] satisfies {
  center: Position;
  size: Position;
  rows: number;
  columns: number;
}[];

function Tree({
  position,
  scale,
  color,
  trunk,
}: {
  position: Position;
  scale: number;
  color: string;
  trunk: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.045, 0.065, 0.5, 5]} />
        <meshStandardMaterial color={trunk} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.34, 1, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.07, 0]}>
        <coneGeometry args={[0.24, 0.7, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Pipe({ points, color }: { points: Position[]; color: string }) {
  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        points.map((point) => new Vector3(...point)),
        false,
        "catmullrom",
        0.1,
      ),
    [points],
  );
  return (
    <mesh>
      <tubeGeometry args={[curve, 32, 0.065, 6, false]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

const inletPipe: Position[] = [
  [-9, 2.6, -4],
  [-6.3, 2.6, -4],
  [-5.8, 2.1, -4],
  [-4, 2.1, -4],
];
const gravityPipe: Position[] = [
  [-3, 1.5, -2.4],
  [-3, 0.55, -0.3],
  [-4.5, 0.55, -0.1],
  [-4.5, 1.25, 1],
];
const secondPipe: Position[] = [
  [-3, 0.55, -0.3],
  [2.5, 0.55, -0.3],
  [2.5, 2.1, 1],
];
const uphillPipe: Position[] = [
  [-3, 0.55, -0.3],
  [0.1, 0.55, -1.2],
  [0.1, 3.95, -3.4],
  [2, 3.95, -3.4],
];

function ForestModel({
  palette,
  animate,
}: {
  palette: Palette;
  animate: boolean;
}) {
  const forestRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!animate || forestRef.current === null) return;
    forestRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.14) * 0.065;
    forestRef.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={forestRef} rotation={[0, -0.12, 0]}>
      <RoundedBox
        args={[19, 0.55, 13.5]}
        radius={0.2}
        position={[-0.8, -0.1, 0]}
      >
        <meshStandardMaterial
          color={palette.ground}
          metalness={0.15}
          roughness={0.75}
        />
        <Edges color={palette.pipe} />
      </RoundedBox>
      {terraces.map((terrace, terraceIndex) => (
        <group key={terraceIndex} position={terrace.center}>
          <RoundedBox args={terrace.size} radius={0.08}>
            <meshStandardMaterial color={palette.terrace} roughness={0.9} />
            <Edges color={palette.pipe} />
          </RoundedBox>
          {Array.from(
            { length: terrace.rows * terrace.columns },
            (_, treeIndex) => {
              const row = Math.floor(treeIndex / terrace.columns);
              const column = treeIndex % terrace.columns;
              const scale =
                0.7 + ((treeIndex * 7 + terraceIndex * 3) % 9) * 0.04;
              return (
                <Tree
                  key={treeIndex}
                  position={[
                    (column - (terrace.columns - 1) / 2) * 0.78,
                    terrace.size[1] / 2,
                    (row - (terrace.rows - 1) / 2) * 0.8,
                  ]}
                  scale={scale}
                  color={
                    treeIndex % 4 === 0 ? palette.canopyLight : palette.canopy
                  }
                  trunk={palette.pipe}
                />
              );
            },
          )}
          {Array.from({ length: terrace.rows }, (_, row) => (
            <mesh
              key={row}
              position={[
                0,
                terrace.size[1] / 2 + 0.02,
                (row - (terrace.rows - 1) / 2) * 0.8,
              ]}
            >
              <boxGeometry args={[terrace.size[0] - 0.5, 0.025, 0.025]} />
              <meshStandardMaterial color={palette.metal} />
            </mesh>
          ))}
        </group>
      ))}
      <group position={[-4, 0.18, -3.9]}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 1.8, 48, 1, true]} />
          <meshStandardMaterial
            color={palette.terrace}
            side={2}
            metalness={0.15}
          />
          <Edges color={palette.canopyLight} />
        </mesh>
        <mesh position={[0, 1.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.76, 48]} />
          <meshStandardMaterial
            color={palette.water}
            metalness={0.55}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, 1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.045, 8, 48]} />
          <meshStandardMaterial color={palette.metal} />
        </mesh>
      </group>
      <group position={[-7.9, 0.7, -2.5]}>
        {Array.from({ length: 6 }, (_, panelIndex) => (
          <group
            key={panelIndex}
            position={[
              (panelIndex % 2) * 1.25,
              0,
              Math.floor(panelIndex / 2) * 1.2,
            ]}
            rotation={[0.35, 0, 0]}
          >
            <mesh>
              <boxGeometry args={[1.12, 0.08, 1]} />
              <meshStandardMaterial
                color={palette.water}
                metalness={0.65}
                roughness={0.25}
              />
              <Edges color={palette.metal} />
            </mesh>
            {[-0.28, 0, 0.28].map((divider) => (
              <mesh key={divider} position={[divider, 0.05, 0]}>
                <boxGeometry args={[0.012, 0.012, 0.98]} />
                <meshStandardMaterial color={palette.pipe} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      <RoundedBox args={[0.8, 0.7, 1]} radius={0.1} position={[-6.2, 1.75, -4]}>
        <meshStandardMaterial
          color={palette.metal}
          metalness={0.6}
          roughness={0.3}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.65, 0.55, 0.8]}
        radius={0.1}
        position={[0.1, 0.6, -1.2]}
      >
        <meshStandardMaterial color={palette.canopyLight} metalness={0.5} />
      </RoundedBox>
      <Pipe points={inletPipe} color={palette.canopyLight} />
      <Pipe points={gravityPipe} color={palette.pipe} />
      <Pipe points={secondPipe} color={palette.pipe} />
      <Pipe points={uphillPipe} color={palette.canopyLight} />
    </group>
  );
}

export function Scene({ active }: { active: boolean }) {
  const [palette] = useState(readPalette);
  const reducedMotion = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      camera={{ position: [22, 19, 24], fov: 35 }}
      frameloop={reducedMotion || !active ? "demand" : "always"}
      fallback={<div>3D view unavailable. Explore the system below.</div>}
    >
      <ambientLight intensity={1.25} />
      <directionalLight
        position={[4, 15, 6]}
        intensity={3}
        color={palette.canopyLight}
      />
      <directionalLight
        position={[-10, 5, -5]}
        intensity={2}
        color={palette.pipe}
      />
      <ForestModel palette={palette} animate={!reducedMotion && active} />
      <EffectComposer multisampling={0}>
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}
