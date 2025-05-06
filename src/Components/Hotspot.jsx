import React, { useRef, forwardRef } from "react";
import useAlwaysFaceCamera from "../Hooks/useAlwaysFaceCamera";
import { useDispatch, useSelector } from "react-redux";
import { handleInfoHotspotClick } from "../Utils/infoHotspotUtils";
import HotspotTypes from "../Constants/HotspotTypes";
import { handleTourSpotClick } from "../Utils/tourHotspotUtils";
import {
  handlePointerOverIconChange,
  handlePointerOut,
} from "../Utils/pointerUtils";
import useLoadIconTexture from "../Hooks/useLoadIconTexture";

const Hotspot = forwardRef(
  (
    {
      index,
      position,
      gl,
      camera,
      hotspotType,
      hotspotVisibility,
      detailCardVisibility,
      loadedDestination,
      customRenderOrder = 0,
      disableDepthTesting = false,
    },
    ref
  ) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const dispatch = useDispatch();
    const { destinations } = useSelector((state) => state.destinations);
    const config = useSelector((state) => state.configuration.configuration);
    const {
      hotspotHeight,
      hotspotWidth,
      tourButtonIcon,
      infoButtonIcon,
      tourButtonIconHighlighted,
      infoButtonIconHighlighted,
    } = config;

    useAlwaysFaceCamera(meshRef, camera);

    // Load the default texture for the hotspot based on its type
    useLoadIconTexture(
      hotspotType === HotspotTypes.TOUR ? tourButtonIcon : infoButtonIcon,
      materialRef
    );

    const onClick = () => {
      if (hotspotType === HotspotTypes.INFO) {
        handleInfoHotspotClick(
          dispatch,
          index,
          gl,
          hotspotVisibility,
          detailCardVisibility
        );
      } else if (hotspotType === HotspotTypes.TOUR) {
        handleTourSpotClick(
          index,
          gl,
          loadedDestination,
          dispatch,
          destinations
        );
      }
    };

    return (
      <mesh
        ref={(node) => {
          meshRef.current = node;
          if (ref) ref.current = node; // Forward ref
        }}
        position={position}
        onPointerOver={() =>
          handlePointerOverIconChange(
            gl,
            materialRef,
            hotspotType === HotspotTypes.TOUR
              ? tourButtonIconHighlighted
              : infoButtonIconHighlighted
          )
        }
        onPointerOut={() =>
          handlePointerOut(
            gl,
            materialRef,
            hotspotType === HotspotTypes.TOUR ? tourButtonIcon : infoButtonIcon
          )
        }
        onClick={onClick}
        renderOrder={customRenderOrder}
      >
        <planeGeometry args={[hotspotWidth, hotspotHeight]} />
        <meshBasicMaterial
          ref={materialRef}
          opacity={1}
          transparent
          depthTest={!disableDepthTesting}
        />
      </mesh>
    );
  }
);

export default Hotspot;
