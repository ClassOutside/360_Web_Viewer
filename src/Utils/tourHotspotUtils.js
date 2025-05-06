// language: js
import {
  setHotspotVisibility,
  setDetailCardVisibility,
  setLoadedDestination,
} from "../Slices/destinationSlice";

export const handleTourSpotClick = (
  index,
  gl,
  loadedDestination,
  dispatch,
  destinations
) => {
  const activeDest = loadedDestination;
  const clickedHotspot = activeDest?.HOTSPOTS[index];
  if (clickedHotspot?.destinationID !== undefined) {
    const nextDestination = destinations.find(
      (destination) =>
        destination.destinationID === clickedHotspot.destinationID
    );
    if (nextDestination) {
      gl.domElement.style.cursor = "default";
      dispatch(setHotspotVisibility(nextDestination.HOTSPOTS.map(() => true)));
      dispatch(
        setDetailCardVisibility(nextDestination.HOTSPOTS.map(() => false))
      );
      dispatch(setLoadedDestination(nextDestination));
    }
  }
};
