import React from "react";
import { useSelector } from "react-redux";
import { Container, Image } from "@react-three/uikit";
import { enterVRSession } from "../Utils/xrUtils";
import {
  handlePointerOverCursorChange,
  handlePointerOutCursorChange,
} from "../Utils/pointerUtils";
import { useThree } from "@react-three/fiber";

const EnterVRButton = () => {
  const { gl } = useThree();
  const isMobile = useSelector((state) => state.device.isMobile); // Check if mobile

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image
        src={"/icons/enterVR.png"}
        width={isMobile ? 24 : 32} // Smaller icon size on mobile
        height={isMobile ? 24 : 32} // Smaller icon size on mobile
        onClick={() => {
          enterVRSession();
        }}
        aria-label="Enter VR Button"
        onPointerOver={() => handlePointerOverCursorChange(gl)}
        onPointerOut={() => handlePointerOutCursorChange(gl)}
      />
    </Container>
  );
};

export default EnterVRButton;
