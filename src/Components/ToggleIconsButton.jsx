import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIconsVisibility } from "../Slices/destinationSlice"; // Import the action
import { Container, Image } from "@react-three/uikit";
import {
  handlePointerOverCursorChange,
  handlePointerOutCursorChange,
} from "../Utils/pointerUtils";
import { useThree } from "@react-three/fiber";

const ToggleIconsButton = () => {
  const dispatch = useDispatch();
  const { gl } = useThree();
  const isIconsHidden = useSelector(
    (state) => state.destinations.isIconsHidden
  );
  const isMobile = useSelector((state) => state.device.isMobile);

  const handleClick = () => {
    dispatch(toggleIconsVisibility());
  };

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image
        src={isIconsHidden ? "/icons/hidden.png" : "/icons/visible.png"}
        width={isMobile ? 30 : 40}
        height={isMobile ? 30 : 40}
        onClick={handleClick}
        onPointerOver={() => handlePointerOverCursorChange(gl)}
        onPointerOut={() => handlePointerOutCursorChange(gl)}
      />
    </Container>
  );
};

export default ToggleIconsButton;
