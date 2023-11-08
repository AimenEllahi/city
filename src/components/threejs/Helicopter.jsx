import React, { useRef, useEffect } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import gsap from "gsap";

function Helicopter() {
  const helicopterRef = useRef();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  const gltf = useLoader(GLTFLoader, "/models/helicoptero.glb", (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  const animateHelicopter = () => {
    gsap.to(helicopterRef.current.position, {
      duration: 25,
      x: -25,
      y: 5.3999999999999986,
      z: -0.6,
      onComplete: () => {
        // Reset the position of the helicopter
        gsap.set(helicopterRef.current.position, {
          x: -8.1999999999999993,
          y: 3.400000000000001,
          z: -6.599999999999993,
        });
        // Restart the animation
        animateHelicopter();
      },
    });
  };

  useEffect(() => {
    if (helicopterRef.current) {
      animateHelicopter();
    }
  }, []);

  return (
    <group
      ref={helicopterRef}
      position={[-8.1999999999999993, 3.400000000000001, -6.599999999999993]}
      rotation={[0, 5.5, 0]}
    >
      <primitive object={gltf.scene} dispose={null} scale={1} />
    </group>
  );
}

export default Helicopter;
