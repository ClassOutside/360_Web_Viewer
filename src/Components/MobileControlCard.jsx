import React from "react";
import { Card } from "@react-three/uikit-apfel";
import { useSelector } from "react-redux";
import XRVideoControls from "./XRVideoControls";
import { Container } from "@react-three/uikit";
import FlatSceneControls from "./FlatSceneControls";
import TourTypes from "../Constants/TourTypes";
import SlideshowControls from "./SlideshowControls";

const MobileControlCard = ({ childOneRef }) => {
  const isVideo = useSelector((state) => state.video.isVideo);
  const isXR = useSelector((state) => state.device.isXR);
  const isIconsHidden = useSelector(
    (state) => state.destinations.isIconsHidden
  );
  const tourType = useSelector((state) => state.destinations.tourType);

  return (
    <Container
      marginLeft="0"
      maxWidth="100%"
      display="flex"
      flexDirection="column" // Stack everything vertically for mobile
      alignItems="center"
      justifyContent="center"
    >
      <Card
        width="auto"
        borderRadius={16}
        padding={8}
        paddingLeft={8}
        paddingRight={8}
        flexDirection="column" // Stack content vertically for mobile
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        {/* XRVideoControls (appears below the other controls on mobile) */}
        {isVideo && !isIconsHidden && (
          <Container width="100%" marginBottom={8}>
            <XRVideoControls />
          </Container>
        )}
        {/* Row for SlideshowControls and FlatSceneControls on mobile */}
        <Container
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          gap={16}
        >
          {/* SlideshowControls */}
          {!isXR && tourType === TourTypes.SLIDESHOW && (
            <Container flexShrink={0} minWidth={0}>
              <SlideshowControls />
            </Container>
          )}

          {/* FlatSceneControls */}
          {!isXR && (
            <Container flexShrink={0} minWidth={0}>
              <FlatSceneControls childOneRef={childOneRef} />
            </Container>
          )}
        </Container>
      </Card>
    </Container>
  );
};

export default MobileControlCard;
