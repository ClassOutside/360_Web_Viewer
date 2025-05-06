import * as THREE from "three";
import { setCardPosition } from "../Slices/controlCardSlice";

export const setNewMenuPositionAndRotation = (camera, dispatch) => {
  const distance = 5;
  const height = 0;

  // Calculate the direction the camera is facing
  var directionVector = new THREE.Vector3(0, 0, -1);
  camera.getWorldDirection(directionVector);

  // Calculate the object's position based on the camera's position and direction
  const objectPosition = new THREE.Vector3()
    .copy(camera.position)
    .add(directionVector.multiplyScalar(distance));
  objectPosition.y += height;

  // Dispatch the position to the Redux store
  dispatch(setCardPosition(objectPosition.toArray()));
};
