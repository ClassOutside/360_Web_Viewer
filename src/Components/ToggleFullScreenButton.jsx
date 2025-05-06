import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Container, Image } from "@react-three/uikit";
import { toggleFullscreen } from "../Utils/frameSizeControls";
import {
  handlePointerOverCursorChange,
  handlePointerOutCursorChange,
} from "../Utils/pointerUtils";
import { useThree } from "@react-three/fiber";

const ToggleFullScreenButton = forwardRef((props, ref) => {
  const { gl } = useThree();
  const isMobile = useSelector((state) => state.device.isMobile);

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image
        src={"/icons/expand.png"}
        width={isMobile ? 20 : 24}
        height={isMobile ? 20 : 24}
        onClick={() => {
          toggleFullscreen(ref);
        }}
        aria-label="Toggle fullscreen"
        onPointerOver={() => handlePointerOverCursorChange(gl)}
        onPointerOut={() => handlePointerOutCursorChange(gl)}
      />
    </Container>
  );
});

export default ToggleFullScreenButton;
