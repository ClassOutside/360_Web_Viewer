import * as THREE from "three";
import { loadIconTexture } from "./textureUtils";

export const handlePointerOverIconChange = (
  gl,
  materialRef,
  textureLocation
) => {
  handlePointerOverCursorChange(gl);
  loadIconTexture(materialRef, textureLocation);
};

export const handlePointerOut = (gl, materialRef, textureLocation) => {
  handlePointerOutCursorChange(gl);
  loadIconTexture(materialRef, textureLocation);
};

export const handlePointerOverCursorChange = (gl) => {
  gl.domElement.style.cursor = "pointer";
};

export const handlePointerOutCursorChange = (gl) => {
  gl.domElement.style.cursor = "default";
};
