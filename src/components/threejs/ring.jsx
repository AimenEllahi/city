import React, { useRef, useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useFrame, useThree, useLoader } from "@react-three/fiber";

export default function Ring() {
  const { camera } = useThree();
  const spriteRef = useRef();
  const tex = useLoader(TextureLoader, "/ring.png");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (spriteRef.current) {
      const spriteSize = 5;
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;

      const vector = new window.THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      spriteRef.current.position.copy(pos);
      spriteRef.current.scale.set(spriteSize, spriteSize, 1);
    }
  });

  return (
    <mesh ref={spriteRef}>
      <sprite>
        <spriteMaterial attach="material" map={tex} />
      </sprite>
    </mesh>
  );
}
