import React, { forwardRef, useEffect } from "react";
import { BackSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useTextureLoader from "../Hooks/useTextureLoader";
import useVideoMuted from "../Hooks/useVideoMuted";
import useSeekedVideo from "../Hooks/useSeekVideo";
import usePlayPauseVideo from "../Hooks/usePlayPauseVideo";
import { useTransitionMaterial } from "../Hooks/useTransitionMaterial";
import { useSelector } from "react-redux";
import { usePreloadTextures } from "../Hooks/usePreloadTextures";
import { useHandleVisibilityChange } from "../Hooks/useHandleVisibilityChange";
import { useHover } from "@react-three/xr";
import { useRef, useState } from "react";
import * as THREE from "three";

const Sphere = ({
  sphereGeometry,
  mediaLocation,
  customRenderOrder,
  disableDepthTest,
}) => {
  const destinations = useSelector((state) => state.destinations.destinations);
  const currentDestination = useSelector(
    (state) => state.destinations.loadedDestination
  );
  const muted = useSelector((state) => state.video.muted);

  // Use the preload textures hook
  usePreloadTextures(currentDestination, destinations);
  const { videoRef, transitionMaterialRef } = useTextureLoader(mediaLocation);
  useVideoMuted(videoRef, muted);
  const material = useTransitionMaterial(
    transitionMaterialRef,
    disableDepthTest
  );
  useHandleVisibilityChange(transitionMaterialRef);
  useSeekedVideo(videoRef, transitionMaterialRef);
  usePlayPauseVideo(videoRef);

  if (!material) return null;

  function Hover({ children, hoverTargetRef }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    // console.log(hoverTargetRef);
    useHover(hoverTargetRef ?? ref, (hoverd, e) => {
      // console.log("hoverd " + hoverd);
    });
    return (
      <group ref={ref}>
        {typeof children === "function" ? children(hovered) : children}
      </group>
    );
  }

  return (
    <group>
      {/* Uncomment hover when bugfix implemented, currently it removes the ray from controller */}
      {/* <Hover> */}
      <mesh renderOrder={customRenderOrder}>
        <sphereGeometry args={sphereGeometry} cursor="pointer" />
        <primitive object={material} attach="material" side={BackSide} />
      </mesh>
      {/* </Hover> */}
    </group>
  );
};

export default Sphere;
