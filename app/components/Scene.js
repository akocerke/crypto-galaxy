// components/Scene.js
"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import CryptoPlanet from './CryptoPlanet';
import AnimatedStars from './AnimatedStars';
import { useMemo } from 'react';

function CryptoPlanets({ coins, onPlanetClick }) {
  const planetPositions = useMemo(() => {
    const positions = [];
    const usedPositions = new Set();
    
    coins.forEach((coin) => {
      let attempts = 0;
      let position;
      let valid = false;

      while (!valid && attempts < 100) {
        const seed = [...coin.id]
          .reduce((a, b) => a + b.charCodeAt(0) * (attempts + 1), 0);

        const distance = 10 + (seed % 100) / 100 * 35;
        const a1 = (seed * (1.7 + attempts * 0.1) % 360) * Math.PI / 180;
        const a2 = (seed * (2.3 + attempts * 0.2) % 360) * Math.PI / 180;

        position = [
          Math.sin(a1) * Math.cos(a2) * distance,
          Math.sin(a2) * distance * 0.5,
          Math.cos(a1) * distance
        ];

        const key = position.map(p => Math.round(p * 10)).join('|');

        if (!usedPositions.has(key)) {
          usedPositions.add(key);
          valid = true;
        }
        attempts++;
      }

      positions.push(position || [0, 0, 0]);
    });

    return positions;
  }, [coins]);

  return (
    <>
      <Environment preset="night" background={false} />
      {coins.map((coin, i) => (
        <CryptoPlanet
          key={coin.id}
          coin={coin}
          position={planetPositions[i]}
          onClick={onPlanetClick}
        />
      ))}
    </>
  );
}

export default function Scene({ coins, onPlanetClick }) {
  return (
    <Canvas camera={{ position: [0, 30, 70], fov: 80 }}>
      
      {/* Hintergrund */}
      <color attach="background" args={['#000000']} />

      {/* Sterne */}
      <AnimatedStars />

      {/* Beleuchtung */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[40, 40, 40]} intensity={1.5} />
      <directionalLight position={[-40, 30, -40]} intensity={0.8} />

      {/* Rim Light */}
      <directionalLight 
        position={[0, -20, -30]} 
        intensity={1.2} 
        color={"#4488ff"} 
      />

      {/* Controls */}
      <OrbitControls 
        enableZoom
        enablePan
        zoomSpeed={0.7}
        minDistance={25}
        maxDistance={150}
      />

      {/* Planeten */}
      <CryptoPlanets coins={coins} onPlanetClick={onPlanetClick} />

      {/* ✨ MAGIC BLOOM */}
      <EffectComposer>
        <Bloom
          intensity={2.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.HUGE}
        />
      </EffectComposer>

    </Canvas>
  );
}
