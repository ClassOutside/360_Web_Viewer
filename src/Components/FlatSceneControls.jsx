import React from "react";
import { Container } from "@react-three/uikit";
import ToggleIconsButton from "./ToggleIconsButton"; // Import the new component
import ToggleFullScreenButton from "./ToggleFullScreenButton";
import EnterVRButton from "./EnterVRButton";
import { useSelector } from "react-redux";

const FlatSceneControls = ({ childOneRef }) => {
  const isMobile = useSelector((state) => state.device.isMobile);
  const canFullScreen = useSelector((state) => state.device.canFullScreen);

  return (
    <Container flexDirection="row" alignItems="center" gap={isMobile ? 16 : 24}>
      <ToggleIconsButton />
      {!isMobile && <EnterVRButton />}
      {canFullScreen && <ToggleFullScreenButton ref={childOneRef} />}
    </Container>
  );
};

export default FlatSceneControls;
