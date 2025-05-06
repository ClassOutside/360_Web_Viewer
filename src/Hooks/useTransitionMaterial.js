import { createTransitionMaterial } from "../Materials/TransitionMaterial";
import { useEffect, useState } from "react";

export const useTransitionMaterial = (
  transitionMaterialRef,
  disableDepthTest
) => {
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    if (!transitionMaterialRef.current) {
      transitionMaterialRef.current =
        createTransitionMaterial(disableDepthTest);
      setMaterial(transitionMaterialRef.current);
    }
  }, []);
  return material;
};
