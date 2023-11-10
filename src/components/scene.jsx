import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "./threejs/Isometric-cityscape13";
import Loader from "./Loader";

function Scene() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <fog attach="fog" args={["#fff", 0, 110]} />
        <Environment preset="forest" />
        <ambientLight color={0xe8c37b} intensity={2} />
        <directionalLight
          position={[-10, 10, 10]}
          intensity={6}
          color={0xec8f5e}
        />
        <directionalLight
          color={0xec8f5e}
          position={[-69, 24, 14]}
          intensity={5}
        />
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
