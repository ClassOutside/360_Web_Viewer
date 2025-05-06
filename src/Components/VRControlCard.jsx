import React, { useState, useEffect, useRef } from "react";
import { Root } from "@react-three/uikit";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import useFaceCameraOnce from "../Hooks/useFaceCameraOnce";
import ControlCard from "./ControlCard";

const VRControlCard = () => {
  const cardPosition = useSelector((state) => state.controlCard.cardPosition);
  const { camera } = useThree();

  const groupRef = useRef();

  useFaceCameraOnce(groupRef, camera);

  return (
    <group ref={groupRef} position={cardPosition}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[0, 0, 0]} />
      <Root>
        <ControlCard />
      </Root>
    </group>
  );
};

export default VRControlCard;
