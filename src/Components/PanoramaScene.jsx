import React, { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import useHandleWheel from "../Hooks/useHandleWheel";
import useInitialFOV from "../Hooks/useInitialFOV";
import useHandlePinchZoom from "../Hooks/useHandlePinchZoom";
import Destination from "./Destination";
import useIsXRSession from "../Hooks/useIsXRSession";
import { setIsXR } from "../Slices/deviceSlice"; // Import the action

const PanoramaScene = () => {
  const { camera, gl } = useThree();
  const hotspotRefs = useRef([]);
  const controlsRef = useRef();
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.device.isMobile);
  const isXR = useSelector((state) => state.device.isXR);
  const config = useSelector((state) => state.configuration.configuration);
  const dragging = useSelector((state) => state.video.dragging);

  const {
    distanceFromCameraToObjects,
    SphereWidth,
    SphereHeight,
    OrbitControlsDampingFactor,
    OrbitControlsRotateSpeed,
    InitialFOV,
  } = config;

  const sphereGeometry = [
    Math.abs(distanceFromCameraToObjects),
    SphereWidth,
    SphereHeight,
  ];

  // Initialize FOV using value from Redux store
  useInitialFOV(camera, InitialFOV);

  // Conditionally handle pinch-to-zoom for mobile or scroll zoom for desktop
  if (isMobile) {
    useHandlePinchZoom(camera, gl, controlsRef.current);
  } else {
    useHandleWheel(camera, gl);
  }

  // Pass the setter to the useIsXRSession hook
  useIsXRSession((isXR) => dispatch(setIsXR(isXR)));

  return (
    <>
      <Destination
        distanceFromCameraToObjects={distanceFromCameraToObjects}
        gl={gl}
        camera={camera}
        hotspotRefs={hotspotRefs}
        sphereGeometry={sphereGeometry}
      />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={OrbitControlsDampingFactor}
        rotateSpeed={OrbitControlsRotateSpeed}
        enabled={!isXR && !dragging}
      />
    </>
  );
};

export default PanoramaScene;
