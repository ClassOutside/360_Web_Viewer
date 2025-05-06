import React from "react";
import { Fullscreen, Container, Image } from "@react-three/uikit";
import ControlCard from "./ControlCard";
import MobileControlCard from "./MobileControlCard";
import { useSelector } from "react-redux";

// Destructure the childOneRef prop from the props object.
const FlatControlCard = ({ childOneRef }) => {
  const isMobile = useSelector((state) => state.device.isMobile);

  return (
    <group>
      <Fullscreen
        flexDirection="column"
        justifyContent="flex-end"
        paddingBottom={16}
        paddingLeft={16}
        paddingRight={16}
      >
        {/* Conditionally render based on the device type */}
        {isMobile ? (
          <MobileControlCard childOneRef={childOneRef} />
        ) : (
          <ControlCard childOneRef={childOneRef} />
        )}
      </Fullscreen>
    </group>
  );
};

export default FlatControlCard;
