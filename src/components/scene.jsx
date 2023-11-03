import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Model } from "./threejs/Isometric-cityscape13";
import { gsap } from "gsap";
import Loader from "./Loader";

function Scene() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <fog attach="fog" args={["#fff", 0, 110]} />
        <Environment preset="sunset" />
        <ambientLight color={0xa0a0fc} intensity={0.82} />
        <directionalLight position={[-10, 10, 10]} intensity={1.96} />

        <directionalLight
          color={0xe8c37b}
          position={[-69, 44, 14]}
          intensity={1.96}
        />
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
