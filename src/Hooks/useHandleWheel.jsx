import { useEffect } from "react";
import * as THREE from "three";
import { useSelector } from "react-redux"; // Import useSelector

const WHEEL_EVENT = "wheel"; // Wheel event string

const useHandleWheel = (camera, gl) => {
  const { FOVChangeRate, MinFOV, MaxFOV } = useSelector(
    (state) => state.configuration.configuration
  );

  useEffect(() => {
    const handleWheel = (event) => {
      camera.fov += event.deltaY * FOVChangeRate;
      camera.fov = THREE.MathUtils.clamp(camera.fov, MinFOV, MaxFOV);
      camera.updateProjectionMatrix();
    };

    gl.domElement.addEventListener(WHEEL_EVENT, handleWheel);
    return () => gl.domElement.removeEventListener(WHEEL_EVENT, handleWheel);
  }, [camera, gl]);
};

export default useHandleWheel;
