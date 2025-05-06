import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Image } from "@react-three/uikit";
import { handleNext, handlePrevious } from "../Utils/slideShowUtils";
import {
  handlePointerOverCursorChange,
  handlePointerOutCursorChange,
} from "../Utils/pointerUtils";
import { useThree } from "@react-three/fiber";

const SlideshowControls = () => {
  const dispatch = useDispatch();
  const { gl } = useThree();
  const destinations = useSelector((state) => state.destinations.destinations);
  const currentDestination = useSelector(
    (state) => state.destinations.loadedDestination
  );
  const isMobile = useSelector((state) => state.device.isMobile); // Check if mobile

  return (
    <Container
      flexDirection="row"
      alignItems="center"
      gap={isMobile ? 12 : 24} // Smaller gap on mobile
    >
      <Image
        src={"/icons/previous.png"}
        width={isMobile ? 16 : 24} // Smaller icon size on mobile
        height={isMobile ? 16 : 24} // Smaller icon size on mobile
        onClick={() => {
          handlePrevious(dispatch, destinations, currentDestination);
        }}
        onPointerOver={() => handlePointerOverCursorChange(gl)}
        onPointerOut={() => handlePointerOutCursorChange(gl)}
      />
      <Image
        src={"/icons/next.png"}
        width={isMobile ? 16 : 24} // Smaller icon size on mobile
        height={isMobile ? 16 : 24} // Smaller icon size on mobile
        onClick={() => {
          handleNext(dispatch, destinations, currentDestination);
        }}
        onPointerOver={() => handlePointerOverCursorChange(gl)}
        onPointerOut={() => handlePointerOutCursorChange(gl)}
      />
    </Container>
  );
};

export default SlideshowControls;
