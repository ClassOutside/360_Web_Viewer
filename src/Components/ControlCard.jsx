import React from "react";
import { Card } from "@react-three/uikit-apfel";
import { useSelector } from "react-redux";
import XRVideoControls from "./XRVideoControls";
import { Container } from "@react-three/uikit";
import FlatSceneControls from "./FlatSceneControls";
import TourTypes from "../Constants/TourTypes";
import SlideshowControls from "./SlideshowControls";

// Destructure the childOneRef prop from the props object.
const ControlCard = ({ childOneRef }) => {
  const isVideo = useSelector((state) => state.video.isVideo);
  const isXR = useSelector((state) => state.device.isXR);
  const isIconsHidden = useSelector(
    (state) => state.destinations.isIconsHidden
  );
  const tourType = useSelector((state) => state.destinations.tourType);
  const isMobile = useSelector((state) => state.device.isMobile);

  return (
    <Container
      marginLeft="auto"
      maxWidth="100%"
      maxHeight="10%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Card
        width="auto"
        borderRadius={16}
        padding={8}
        paddingLeft={24}
        paddingRight={24}
        gap={24}
        flexDirection="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* XRVideoControls - Takes remaining space */}
        {isVideo && !isIconsHidden && (
          <Container flexGrow={1} minWidth={304}>
            <XRVideoControls />
          </Container>
        )}

        {/* FlatSceneControls */}
        {!isXR && (
          <>
            {/* SlideshowControls */}
            {tourType === TourTypes.SLIDESHOW && (
              <Container flexShrink={0} minWidth={0}>
                <SlideshowControls />
              </Container>
            )}

            <Container flexShrink={0} minWidth={0}>
              <FlatSceneControls childOneRef={childOneRef} />
            </Container>
          </>
        )}
      </Card>
    </Container>
  );
};

export default ControlCard;
