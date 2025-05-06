import { useEffect } from "react";

const useFaceCameraOnce = (groupRef, camera) => {
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  }, []);
};

export default useFaceCameraOnce;
