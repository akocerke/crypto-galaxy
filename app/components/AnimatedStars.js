// app/components/AnimatedStars.js
"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function AnimatedStars() {
  const starsRef = useRef();
  
  useFrame((state, delta) => {
    if (!starsRef.current) return;
    
    // 🔥 ECHTE ROTATION - STERNE BEWEGEN SICH!
    starsRef.current.rotation.y += delta * 0.05; // Langsame Rotation
    starsRef.current.rotation.x += delta * 0.02; // Leichte Neigung
  });

  return (
    <Stars 
      ref={starsRef}
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0}
      fade={true}
      speed={0} // Wird von useFrame überschrieben
    />
  );
}