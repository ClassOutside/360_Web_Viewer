// language: js
import {
  setHotspotVisibility,
  setDetailCardVisibility,
} from "../Slices/destinationSlice";

export const resetHotspotVisibility = (dispatch, loadedDestination) => {
  if (loadedDestination) {
    dispatch(setHotspotVisibility(loadedDestination.HOTSPOTS.map(() => true)));
    dispatch(
      setDetailCardVisibility(loadedDestination.HOTSPOTS.map(() => false))
    );
  }
};

export const handleInfoHotspotClick = (
  dispatch,
  index,
  gl,
  hotspotVisibility,
  detailCardVisibility
) => {
  const currentHotspotVisibility = [...hotspotVisibility];
  const currentDetailCardVisibility = [...detailCardVisibility];
  gl.domElement.style.cursor = "default";
  const updatedHotspotVisibility = currentHotspotVisibility.map((visible, i) =>
    i === index ? false : true
  );
  const updatedDetailCardVisibility = currentDetailCardVisibility.map(
    (visible, i) => (i === index ? true : false)
  );

  dispatch(setHotspotVisibility(updatedHotspotVisibility));
  dispatch(setDetailCardVisibility(updatedDetailCardVisibility));
};
