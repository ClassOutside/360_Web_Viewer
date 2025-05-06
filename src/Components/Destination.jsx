import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import Hotspot from "./Hotspot";
import Sphere from "./Sphere";
import DetailCard from "./DetailCard";
import TourTypes from "../Constants/TourTypes";
import useLoadDestination from "../Hooks/useLoadDestination";

const Destination = ({ gl, camera, hotspotRefs, sphereGeometry }) => {
  useLoadDestination();
  const vrMenuVisible = useSelector((state) => state.controlCard.vrMenuVisible);

  const {
    loadedDestination,
    hotspotVisibility,
    detailCardVisibility,
    tourType,
    isIconsHidden,
    isTransitionInProgress, // New state from redux
  } = useSelector((state) => state.destinations);

  if (!loadedDestination) {
    return null; // Or return a loading spinner/indicator
  }

  return (
    <group>
      <Suspense fallback={null}>
        <Sphere
          sphereGeometry={sphereGeometry}
          mediaLocation={loadedDestination.imageLocation}
          customRenderOrder={1}
          disableDepthTest={true}
        />

        {tourType === TourTypes.TOUR &&
          !isIconsHidden &&
          !vrMenuVisible &&
          !isTransitionInProgress &&
          loadedDestination.HOTSPOTS.map((hotspot, index) =>
            hotspotVisibility[index] ? (
              <Hotspot
                key={index}
                index={index}
                position={hotspot.position}
                camera={camera}
                gl={gl}
                hotspotType={hotspot.type}
                hotspotVisibility={hotspotVisibility}
                detailCardVisibility={detailCardVisibility}
                loadedDestination={loadedDestination}
                ref={(el) => (hotspotRefs.current[index] = el)}
                customRenderOrder={2}
                disableDepthTesting={true}
              />
            ) : null
          )}
      </Suspense>

      {tourType === TourTypes.TOUR &&
        !isIconsHidden &&
        !vrMenuVisible &&
        !isTransitionInProgress &&
        loadedDestination.HOTSPOTS.map((hotspot, index) =>
          detailCardVisibility[index] ? (
            <DetailCard
              key={index}
              title={hotspot.detailCard.title}
              content={hotspot.detailCard.content}
              position={hotspot.position}
              camera={camera}
              loadedDestination={loadedDestination}
            />
          ) : null
        )}
    </group>
  );
};

export default Destination;
