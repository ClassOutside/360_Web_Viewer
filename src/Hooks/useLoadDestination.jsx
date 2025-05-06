import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setDestinations,
  setLoadedDestination,
  setHotspotVisibility,
  setDetailCardVisibility,
  setTourType,
} from "../Slices/destinationSlice";
import TourTypes from "../Constants/TourTypes";
import { useSelector } from "react-redux"; // Import useSelector

const useLoadDestination = () => {
  const dispatch = useDispatch();

  // Access the FileLocation directly from Redux config
  const { FileLocation } = useSelector(
    (state) => state.configuration.configuration
  );

  useEffect(() => {
    fetch(FileLocation)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDestinations(data.destinations));
        const startingDestination = data.destinations.find(
          (destination) => destination.destinationID === 0
        );
        dispatch(setLoadedDestination(startingDestination));

        if (data.type === TourTypes.TOUR) {
          dispatch(setTourType(TourTypes.TOUR));
          dispatch(
            setHotspotVisibility(
              startingDestination?.HOTSPOTS.map(() => true) || []
            )
          );
          dispatch(
            setDetailCardVisibility(
              startingDestination?.HOTSPOTS.map(() => false) || []
            )
          );
        } else if (data.type === TourTypes.SLIDESHOW) {
          dispatch(setTourType(TourTypes.SLIDESHOW));
        }
      })
      .catch((error) => {
        console.error("Error loading tour.json:", error);
      });
  }, []);

  return {};
};

export default useLoadDestination;
