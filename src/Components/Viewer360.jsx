import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import SlideshowControls from "./SlideshowControls";
import { Canvas } from "@react-three/fiber";
import PanoramaScene from "./PanoramaScene";
import { useSelector, useDispatch } from "react-redux";
import TourTypes from "../Constants/TourTypes";
import ToggleIconsButton from "./ToggleIconsButton";
import { detectMobile, detectCanFullScreen } from "../Utils/deviceDetection";
import { setIsMobile, setCanFullScreen } from "../Slices/deviceSlice";
import { XR } from "@react-three/xr";
import { MdFullscreen } from "react-icons/md";
import { BsBadgeVrFill } from "react-icons/bs";
import { setConfiguration } from "../Slices/configurationSlice";
import VRControlCard from "./VRControlCard";
import { toggleFullscreen } from "../Utils/frameSizeControls";
import { store, enterVRSession } from "../Utils/xrUtils";
import FlatControlCard from "./FlatControlCard";

function Viewer360({ config }) {
  const dispatch = useDispatch();
  const isVideo = useSelector((state) => state.video.isVideo);

  const childOneRef = useRef(null);
  const isIconsHidden = useSelector(
    (state) => state.destinations.isIconsHidden
  );
  const vrMenuVisible = useSelector((state) => state.controlCard.vrMenuVisible);
  const isXR = useSelector((state) => state.device.isXR);

  useEffect(() => {
    dispatch(setConfiguration(config));
  }, [config, dispatch]);

  useEffect(() => {
    dispatch(setIsMobile(detectMobile()));
    dispatch(setCanFullScreen(detectCanFullScreen()));
  }, [dispatch]);

  return (
    <Box
      ref={childOneRef}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
      }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[-5, 5, 10]} />
        <XR store={store}>
          <PanoramaScene />
        </XR>
        {vrMenuVisible && isVideo && <VRControlCard />}
        {!isXR && <FlatControlCard childOneRef={childOneRef} />}
      </Canvas>
    </Box>
  );
}

export default Viewer360;
