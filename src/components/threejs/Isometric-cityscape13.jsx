import React, { useRef, useEffect, useState } from "react";
import { useGLTF, PresentationControls } from "@react-three/drei";
import { useControls } from "leva";
import Car from "./Car";
import Helicopter from "./Helicopter";
import Birds from "./Birds";
import { gsap } from "gsap";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as TWEEN from "three/examples/jsm/libs/tween.module.js";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/isometric-cityscape13.glb");
  const [buildingState, setBuildingState] = useState(0);
  const { camera } = useThree();
  const buildingRef = useRef();
  const groupRef = useRef();
  const ferrisWheelRef = useRef();
  const windFanRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const initialCameraPosition = { x: 5, y: 5.5, z: -15 };
  const [isInitialPosition, setIsInitialPosition] = useState(true);

  const getMousePosition = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  const handleMouseDown = (e) => {
    getMousePosition(e);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(
      groupRef.current.children,
      true
    );
    if (intersects.length > 0) {
      const name = intersects[0].object.parent.name;
      const position = intersects[0].point;

      console.log(`Clicked object: ${name}`);
      console.log(
        `Position of clicked object: x: ${position.x}, y: ${position.y}, z: ${position.z}`
      );

      if (
        name === "ferriswheel" ||
        name === "greyBuilding" ||
        name === "heliBase"
      ) {
        if (isInitialPosition) {
          gsap.to(camera.position, {
            duration: 5,
            x: position.x + Math.PI * 2 - 1,
            y: position.y + 1.5,
            z: position.z,

            onUpdate: () => {
              // to smooth the camera movement on lookat
              camera.lookAt(position.x, position.y, position.z);
            },
            onComplete: () => {
              setIsInitialPosition(false);
            },
          });
        } else {
          gsap.to(camera.position, {
            duration: 5,
            x: initialCameraPosition.x,
            y: initialCameraPosition.y,
            z: initialCameraPosition.z,
            onUpdate: () => {
              camera.lookAt(...buildingRef.current.position);
            },
            onComplete: () => {
              setIsInitialPosition(true);
            },
          });
        }
      }
    }
  };

  document.addEventListener("onclick", handleMouseDown);

  useEffect(() => {
    if (!groupRef.current) return;

    if (controlsEnabled) return;
    gsap.fromTo(
      camera.position,
      {
        x: -25,
        y: 4,
        z: -15,
      },
      {
        duration: 10,
        x: 5,
        y: 5.5,
        z: -15,

        delay: 1,
        ease: TWEEN.Easing.Quartic.InOut,

        onUpdate: () => {
          camera.lookAt(...buildingRef.current.position);
        },
        onComplete: () => {
          setControlsEnabled(true);
        },
      }
    );
  }, [groupRef.current]);

  useFrame(() => {
    if (ferrisWheelRef.current) {
      ferrisWheelRef.current.rotation.y += 0.03;
    }
    if (windFanRefs.some((ref) => ref.current)) {
      windFanRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.rotation.z += 0.1;
        }
      });
    }
  });

  return (
    <PresentationControls enabled={controlsEnabled} polar={[0, 0]}>
      <group
        {...props}
        ref={groupRef}
        dispose={null}
        onClick={(e) => {
          handleMouseDown(e);
        }}
        name="model"
      >
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0002.geometry}
          material={materials["Landscape_color_1.001"]}
        />
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0002_1.geometry}
          material={materials.StreetGrey}
        />
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0002_2.geometry}
          material={materials["TreeGreen.005"]}
        />
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0002_3.geometry}
          material={materials["TreeGreen.005"]}
        />
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0001.geometry}
          material={materials.PineTrees}
        />
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0001_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Landskape_plane_Landscape_color_1_0001_2.geometry}
          material={materials["TreeGreen.003"]}
        />
        <mesh
          geometry={nodes.wind2.geometry}
          material={materials.LightMetal}
          position={[16.27, 2.7, -13.83]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
        />
        <mesh
          geometry={nodes.wind2001.geometry}
          material={materials.LightMetal}
          position={[23.93, 2.07, -22.8]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
        />
        <mesh
          geometry={nodes.wind2002.geometry}
          material={materials.LightMetal}
          position={[-6.28, 5.29, -21.28]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
        />
        <mesh
          geometry={nodes.wind2003.geometry}
          material={materials.LightMetal}
          position={[-14.24, 2.47, 23.59]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
        />
        <mesh
          geometry={nodes.wind2004.geometry}
          material={materials.LightMetal}
          position={[3.75, 1.37, 25.82]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
        />
        <mesh
          geometry={nodes.wind2005.geometry}
          material={materials.LightMetal}
          position={[24.98, 1.31, 16.74]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
        />
        <mesh
          geometry={nodes.wind2_head.geometry}
          material={materials.WindHead}
          position={[16.48, 4.65, -13.79]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
          ref={windFanRefs[0]}
        />
        <mesh
          geometry={nodes.wind2_head001.geometry}
          material={materials.WindHead}
          position={[24.14, 4.03, -22.75]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
          ref={windFanRefs[1]}
        />
        <mesh
          geometry={nodes.wind2_head002.geometry}
          material={materials.WindHead}
          position={[-6.07, 7.25, -21.24]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
          ref={windFanRefs[2]}
        />
        <mesh
          geometry={nodes.wind2_head003.geometry}
          material={materials.WindHead}
          position={[-14.04, 4.43, 23.63]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
          ref={windFanRefs[3]}
        />
        <mesh
          geometry={nodes.wind2_head004.geometry}
          material={materials.WindHead}
          position={[3.96, 3.32, 25.86]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
          ref={windFanRefs[4]}
        />
        <mesh
          geometry={nodes.wind2_head005.geometry}
          material={materials.WindHead}
          position={[25.19, 3.27, 16.78]}
          rotation={[0, 1.37, 0]}
          scale={0.08}
          ref={windFanRefs[5]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials.RedLight}
          position={[23.88, 4.12, -22.8]}
          rotation={[0, -0.16, 0]}
          scale={0.05}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={materials.RedLight}
          position={[16.23, 4.74, -13.83]}
          rotation={[0, -0.16, 0]}
          scale={0.05}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials.RedLight}
          position={[-6.32, 7.34, -21.29]}
          rotation={[0, -0.16, 0]}
          scale={0.05}
        />
        <mesh
          geometry={nodes.Cube005.geometry}
          material={materials.RedLight}
          position={[-14.28, 4.52, 23.58]}
          rotation={[0, -0.16, 0]}
          scale={0.05}
        />
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials.RedLight}
          position={[3.72, 3.41, 25.81]}
          rotation={[0, -0.16, 0]}
          scale={0.05}
        />
        <Car />
        <Helicopter />
        <Birds />

        <mesh
          geometry={nodes.Cube007.geometry}
          material={materials.RedLight}
          position={[24.94, 3.36, 16.73]}
          rotation={[0, -0.16, 0]}
          scale={0.05}
        />
        <group
          name="buildings"
          position={[0.4, 0.36, 0.53]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.65}
          ref={buildingRef}
        >
          <mesh
            geometry={nodes.CircleBuildBase003_1.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.CircleBuildBase003_2.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.CircleBuildBase003_3.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.CircleBuildBase003_4.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.CircleBuildBase003_5.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.CircleBuildBase003_6.geometry}
            material={materials.WindowLightBlue}
          />
        </group>
        <group
          name="ferriswheel"
          position={[3.7, 1.49, -3.29]}
          rotation={[Math.PI / 2, 1.57, 0]}
          scale={[-1, 0.15, 1]}
          // onClick={() => {
          //   setBuildingState(1);
          //   console.log("here");
          // }}
        >
          <mesh
            geometry={nodes.FerrisSupport_1.geometry}
            material={materials.DarkMetal}
          />
          <mesh
            geometry={nodes.FerrisSupport_2.geometry}
            material={materials.RedLight}
          />
          <mesh
            geometry={nodes.FerrisSupport_3.geometry}
            material={materials.BlueMetal}
          />
          <group
            position={[0.99, 1.41, 0.39]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.94, 0.14, 0.14]}
          >
            <mesh
              geometry={nodes.Cube037.geometry}
              material={materials.BuildingRed}
            />
            <mesh
              geometry={nodes.Cube037_1.geometry}
              material={materials.BuildingLightBlue}
            />
            <mesh
              geometry={nodes.Cube037_2.geometry}
              material={materials.WindowLightBlue}
            />
          </group>
          <mesh
            geometry={nodes.Roda_Gigante.geometry}
            material={materials.LightMetal}
            position={[0, -1.56, 0]}
            scale={0.96}
            ref={ferrisWheelRef}
          />
        </group>
        <group position={[3.25, 0.36, 2.93]} scale={0.65} name="circlebase">
          <mesh
            geometry={nodes.CircleBuildBase004.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.CircleBuildBase004_1.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.CircleBuildBase004_2.geometry}
            material={materials.BuildingOrange}
          />
          <mesh
            geometry={nodes.CircleBuildBase004_3.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.CircleBuildBase004_4.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.CircleBuildBase004_5.geometry}
            material={materials.LightOrange}
          />
          <group position={[0, 1.54, 0]}>
            <mesh
              geometry={nodes.Circle017.geometry}
              material={materials.Metal}
            />
            <mesh
              geometry={nodes.Circle017_1.geometry}
              material={materials.DarkMetal}
            />
          </group>
        </group>
        <group
          position={[-2.81, 0.36, 4.19]}
          rotation={[0, Math.PI / 4, 0]}
          scale={0.65}
        >
          <mesh
            geometry={nodes.CircleBuildBase001_1.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_2.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_3.geometry}
            material={materials.BuildingYellow}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_4.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_5.geometry}
            material={materials["SceneBl;ack"]}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_6.geometry}
            material={materials["TreeGreen.005"]}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_7.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.CircleBuildBase001_8.geometry}
            material={materials.WindowLightBlue}
          />
        </group>
        <group position={[-1.86, 0.36, -0.54]} scale={0.54}>
          <mesh
            geometry={nodes.Cube040.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.Cube040_1.geometry}
            material={materials.LightOrange}
          />
          <mesh
            geometry={nodes.Cube040_2.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube040_3.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.Cube040_4.geometry}
            material={materials.BuildingOrange}
          />
          <mesh
            geometry={nodes.Cube040_5.geometry}
            material={materials.FanBiege}
          />
          <mesh
            geometry={nodes.Cube040_6.geometry}
            material={materials.BuildingLightBlue}
          />
          <mesh
            geometry={nodes.Cube040_7.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.Cube040_8.geometry}
            material={materials.DarkMetal}
          />
        </group>

        <group
          position={[2.91, 0.36, 0.55]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.54}
        >
          <mesh
            geometry={nodes.Cube043.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.Cube043_1.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube043_2.geometry}
            material={materials.BuildingGreen}
          />
          <mesh
            geometry={nodes.Cube043_3.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.Cube043_4.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.Cube043_5.geometry}
            material={materials.FanBiege}
          />
          <mesh
            geometry={nodes.Cube043_6.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.Cube043_7.geometry}
            material={materials.DarkMetal}
          />
          <mesh
            geometry={nodes.Cube043_8.geometry}
            material={materials.BuildingWhite}
          />
          <mesh
            geometry={nodes.Cube043_9.geometry}
            material={materials.BuildingRed}
          />
        </group>
        <group name="redBuilding" position={[-3.02, 0.36, 0.95]} scale={0.54}>
          <mesh
            geometry={nodes.Cube046.geometry}
            material={materials.OldBrick}
          />
          <mesh
            geometry={nodes.Cube046_1.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube046_2.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.Cube046_3.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.Cube046_4.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.Cube046_5.geometry}
            material={materials.FanBiege}
          />
          <mesh
            geometry={nodes.Cube046_6.geometry}
            material={materials.BuildingOrange}
          />
          <mesh
            geometry={nodes.Cube046_7.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.Cube046_8.geometry}
            material={materials.DarkMetal}
          />
        </group>
        <group name="greyBuilding" position={[0.71, 0.36, 3.32]} scale={0.54}>
          <mesh
            geometry={nodes.Cube049.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.Cube049_1.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.Cube049_2.geometry}
            material={materials.BuildingLightBlue}
          />
          <mesh
            geometry={nodes.Cube049_3.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube049_4.geometry}
            material={materials.BuildingDarkBlue}
          />
          <mesh
            geometry={nodes.Cube049_5.geometry}
            material={materials.TreeBrown}
          />
          <mesh
            geometry={nodes.Cube049_6.geometry}
            material={materials.FanBiege}
          />
          <mesh
            geometry={nodes.Cube049_7.geometry}
            material={materials.DarkMetal}
          />
          <mesh
            geometry={nodes.Cube049_8.geometry}
            material={materials.BuildingWhite}
          />
          <mesh
            geometry={nodes.Cube049_9.geometry}
            material={materials.BuildingRed}
          />
          <mesh
            geometry={nodes.Cube049_10.geometry}
            material={materials.Metal}
          />
        </group>
        <group position={[1.28, 0.36, -2.04]} scale={0.54}>
          <mesh
            geometry={nodes.Cube052.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.Cube052_1.geometry}
            material={materials.LightOrange}
          />
          <mesh
            geometry={nodes.Cube052_2.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube052_3.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.Cube052_4.geometry}
            material={materials.BuildingLightBlue}
          />
          <mesh
            geometry={nodes.Cube052_5.geometry}
            material={materials.BuildingDarkBlue}
          />
          <mesh
            geometry={nodes.Cube052_6.geometry}
            material={materials.DarkMetal}
          />
          <mesh
            geometry={nodes.Cube052_7.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.Cube052_8.geometry}
            material={materials.Air_conditioning}
          />
        </group>
        <group name="heliBase" position={[4.3, 0.36, -1.67]} scale={0.54}>
          <mesh
            geometry={nodes.Cube005_1.geometry}
            material={materials.SquareBlockMain}
          />
          <mesh
            geometry={nodes.Cube005_2.geometry}
            material={materials.LightOrange}
          />
          <mesh
            geometry={nodes.Cube005_3.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube005_4.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.Cube005_5.geometry}
            material={materials.BuildingRed}
          />
          <mesh
            geometry={nodes.Cube005_6.geometry}
            material={materials.OldBrick}
          />
          <mesh
            geometry={nodes.Cube005_7.geometry}
            material={materials.DarkMetal}
          />
          <mesh
            geometry={nodes.Cube005_8.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.Cube005_9.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.Cube005_10.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube005_11.geometry}
            material={materials.BuildingWhite}
          />
        </group>
        <group position={[-0.36, 0.36, -3.56]} scale={0.65}>
          <mesh
            geometry={nodes.CircleBuildBase002_1.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.CircleBuildBase002_2.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.CircleBuildBase002_3.geometry}
            material={materials.BlackoutWindow}
          />
          <mesh
            geometry={nodes.CircleBuildBase002_4.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.CircleBuildBase002_5.geometry}
            material={materials.BuildingRed}
          />
          <mesh
            geometry={nodes.CircleBuildBase002_6.geometry}
            material={materials.BuildingWhite}
          />
          <mesh
            geometry={nodes.CircleBuildBase002_7.geometry}
            material={materials.DarkMetal}
          />
        </group>
        <group position={[-1.33, 1.25, 1.5]}>
          <mesh
            geometry={nodes.Cone003.geometry}
            material={materials.BuildingDarkBlue}
          />
          <mesh
            geometry={nodes.Cone003_1.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cone003_2.geometry}
            material={materials.DarkMetal}
          />
          <mesh
            geometry={nodes.Cone003_3.geometry}
            material={materials.Metal}
          />
          <mesh
            geometry={nodes.Cone003_4.geometry}
            material={materials.CircularBuildMain}
          />
          <mesh
            geometry={nodes.Cone003_5.geometry}
            material={materials.LightOrange}
          />
          <mesh
            geometry={nodes.Cone003_6.geometry}
            material={materials.BlackoutWindow}
          />
          <group position={[0, 0.65, 0]} scale={[0.01, 1, 0.01]}>
            <mesh
              geometry={nodes.Cylinder002.geometry}
              material={materials.DarkMetal}
            />
            <mesh
              geometry={nodes.Cylinder002_1.geometry}
              material={materials.WindowLightBlue}
            />
          </group>
        </group>
        <group position={[-2.39, 0.36, -3.05]}>
          <mesh
            geometry={nodes.Cube038.geometry}
            material={materials.BuildingDarkBlue}
          />
          <mesh
            geometry={nodes.Cube038_1.geometry}
            material={materials.BuildingOrange}
          />
          <mesh
            geometry={nodes.Cube038_2.geometry}
            material={materials.WindowLightBlue}
          />
          <mesh
            geometry={nodes.Cube038_3.geometry}
            material={materials.BlackoutWindow}
          />
        </group>
        <group position={[1.71, 0.36, 0.36]} scale={[0.36, 0.65, 4.9]}>
          <mesh
            geometry={nodes.Plane002.geometry}
            material={materials["SceneBl;ack"]}
          />
          <mesh
            geometry={nodes.Plane002_1.geometry}
            material={materials["Rocks.001"]}
          />
        </group>

        <mesh
          geometry={nodes.CityBase002.geometry}
          material={materials.Metal}
          position={[3.89, 0.47, -3.45]}
          scale={[4.9, 0.65, 4.9]}
        />
      </group>
    </PresentationControls>
  );
}

useGLTF.preload("/isometric-cityscape13.glb");
