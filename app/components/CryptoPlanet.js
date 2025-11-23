// components/CryptoPlanet.js
"use client";

import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Decal } from "@react-three/drei";

export default function CryptoPlanet({ coin, onClick, position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Logo
  const texture = useLoader(TextureLoader, coin.image);

  // Style je Coin
  const styles = {
    bitcoin: { color: "#FF6B00", emissive: "#FF4500" },
    ethereum: { color: "#8C19FF", emissive: "#6A0DAD" },
    monero: { color: "#FF2600", emissive: "#CC0000" },
  };

  const style =
    styles[coin.id] || {
      color: "#6C47FF",
      emissive: "#4A2FCC",
    };

  // Größe
  const baseSize = Math.log(coin.market_cap) / 12;
  const size = Math.max(0.8, Math.min(2.2, baseSize));

  // Animationen
  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.001;

    meshRef.current.scale.lerp(
      hovered ? { x: 1.25, y: 1.25, z: 1.25 } : { x: 1, y: 1, z: 1 },
      0.1
    );

    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group position={position}>
      {/* Planet */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(coin);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={style.color}
          emissive={style.emissive}
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.85}
          envMapIntensity={2.0}
        />

        {/* LOGO – NICHT VERZERRT! */}
        <Decal
          position={[0, size * 0.3, size * 0.99]} // vorne
          rotation={[0, 0, 0]}
          scale={size * 0.9}
          map={texture}
          depthTest={true}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh scale={1.18}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshBasicMaterial
          color={style.emissive}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Preisring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size + 0.4, size + 0.6, 32]} />
        <meshBasicMaterial
          color={coin.price_change_percentage_24h > 0 ? "#00FF00" : "#FF0000"}
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh>

      {/* Hover Glow */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[size * 1.4, 16, 16]} />
          <meshBasicMaterial
            color={style.emissive}
            transparent
            opacity={0.1}
          />
        </mesh>
      )}
    </group>
  );
}
