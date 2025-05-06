import { useState, useEffect } from "react";
import * as THREE from "three";
import { useSelector } from "react-redux";

const TOUCH_EVENT_START = "touchstart";
const TOUCH_EVENT_MOVE = "touchmove";
const TOUCH_EVENT_END = "touchend";
const TOUCH_EVENT_CANCEL = "touchcancel";

const useHandlePinchZoom = (camera, gl, controls) => {
  const [initialTouchDistance, setInitialTouchDistance] = useState(null);
  const [initialFov, setInitialFov] = useState(camera.fov);

  // Access the Redux state directly inside the hook and destructure config
  const { MinFOV, MaxFOV } = useSelector(
    (state) => state.configuration.configuration
  );

  useEffect(() => {
    const handleTouchStart = (event) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        setInitialTouchDistance(distance);
        setInitialFov(camera.fov);
        controls.enabled = false;
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length === 2 && initialTouchDistance !== null) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        const zoomFactor = initialTouchDistance / currentDistance;
        const newFov = initialFov * zoomFactor;

        camera.fov = THREE.MathUtils.clamp(newFov, MinFOV, MaxFOV);
        camera.updateProjectionMatrix();
      }
    };

    const handleTouchEnd = () => {
      setInitialTouchDistance(null);
      controls.enabled = true;
    };

    // Attach touch event listeners
    gl.domElement.addEventListener(TOUCH_EVENT_START, handleTouchStart);
    gl.domElement.addEventListener(TOUCH_EVENT_MOVE, handleTouchMove);
    gl.domElement.addEventListener(TOUCH_EVENT_END, handleTouchEnd);
    gl.domElement.addEventListener(TOUCH_EVENT_CANCEL, handleTouchEnd);

    return () => {
      // Clean up touch event listeners
      gl.domElement.removeEventListener(TOUCH_EVENT_START, handleTouchStart);
      gl.domElement.removeEventListener(TOUCH_EVENT_MOVE, handleTouchMove);
      gl.domElement.removeEventListener(TOUCH_EVENT_END, handleTouchEnd);
      gl.domElement.removeEventListener(TOUCH_EVENT_CANCEL, handleTouchEnd);
    };
  }, [camera, gl, initialTouchDistance, initialFov, controls]); // Use MinFOV and MaxFOV as dependencies
};

export default useHandlePinchZoom;
