import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { handleNext, handlePrevious } from "../Utils/slideShowUtils";
import { useSelector, useDispatch } from "react-redux";
const styles = {
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    gap: "20px",
  },
  button: {
    fontSize: "30px",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#333",
  },
};

const SlideshowControls = () => {
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destinations.destinations);
  const currentDestination = useSelector(
    (state) => state.destinations.loadedDestination
  );
  return (
    <div style={styles.controls}>
      <button
        style={styles.button}
        onClick={() => {
          handlePrevious(dispatch, destinations, currentDestination);
        }}
      >
        <FaArrowLeft />
      </button>
      <button
        style={styles.button}
        onClick={() => {
          handleNext(dispatch, destinations, currentDestination);
        }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SlideshowControls;
