import React, { useEffect } from "react";
import { loadIconTexture } from "../Utils/textureUtils";

const useLoadIconTexture = (textureLocation, materialRef) => {
  useEffect(() => {
    loadIconTexture(materialRef, textureLocation);
  }, [textureLocation]);
};

export default useLoadIconTexture;
