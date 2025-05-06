import { setLoadedDestination } from "../Slices/destinationSlice";

export const handleNext = (dispatch, destinations, currentDestination) => {
  if (!destinations.length) return;

  const currentIndex = destinations.findIndex(
    (dest) => dest.destinationID === currentDestination?.destinationID
  );
  const nextIndex = (currentIndex + 1) % destinations.length;
  const nextDestination = destinations[nextIndex];

  dispatch(setLoadedDestination(nextDestination));
};

export const handlePrevious = (dispatch, destinations, currentDestination) => {
  if (!destinations.length) return;

  const currentIndex = destinations.findIndex(
    (dest) => dest.destinationID === currentDestination?.destinationID
  );
  const prevIndex =
    (currentIndex - 1 + destinations.length) % destinations.length;
  const prevDestination = destinations[prevIndex];
  dispatch(setLoadedDestination(prevDestination));
};
