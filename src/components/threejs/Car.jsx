import React, { useRef, useEffect } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

function Car() {
  const dracoLoader = new DRACOLoader();
  const carRef = useRef();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  const gltf = useLoader(GLTFLoader, "/models/car2.glb", (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  const animateCar = () => {
    gsap.to(carRef.current.position, {
      duration: 15,
      x: 40,
      y: 0.3999999999999986,
      z: -0.6,
      onComplete: () => {
        // Reset the position of the car
        gsap.set(carRef.current.position, {
          x: -2.399999999999998,
          y: 0.3999999999999986,
          z: -0.6,
        });
        // Restart the animation
        animateCar();
      },
    });
  };

  useEffect(() => {
    if (carRef.current) {
      animateCar();
    }
  }, []);

  return (
    <group
      ref={carRef}
      position={[-2.399999999999998, 0.3999999999999986, -0.6]}
      rotation={[0, 1.6, 0]}
    >
      <primitive object={gltf.scene} dispose={null} scale={1} />
    </group>
  );
}

export default Car;
