import React, { useEffect } from "react";

const useInitialFOV = (camera, initialFOV) => {
  useEffect(() => {
    camera.fov = initialFOV;
    camera.updateProjectionMatrix();
  }, [camera]);
};

export default useInitialFOV;
