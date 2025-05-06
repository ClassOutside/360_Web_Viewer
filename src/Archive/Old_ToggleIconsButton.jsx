import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { toggleIconsVisibility } from "../Slices/destinationSlice"; // Import the action

function ToggleIconsButton() {
  const dispatch = useDispatch();
  const isIconsHidden = useSelector(
    (state) => state.destinations.isIconsHidden
  );

  const handleClick = () => {
    dispatch(toggleIconsVisibility());
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isIconsHidden ? (
        <FaEyeSlash size={24} color="black" />
      ) : (
        <FaEye size={24} color="black" />
      )}
    </button>
  );
}

export default ToggleIconsButton;

// Original from Viewer360
{
  /* <div
        className={classes.controlsContainer}
        style={{
          background: isIconsHidden ? "transparent" : "#d0d0d0",
        }}
      >

        {!isIconsHidden && (
          <div className={classes.extraControls}>
            {tourType === TourTypes.SLIDESHOW && (
              <div className={classes.leftControls}>
                <SlideshowControls />
              </div>
            )}
            {isVideo && (
              <div className={classes.rightControls}>
                <VideoControls />
              </div>
            )}
          </div>
        )}

        <div className={classes.persistentControls}>
          <ToggleIconsButton />
          <button onClick={enterVRSession} className={classes.vrButton}>
            <BsBadgeVrFill size={24} />
          </button>

          <button
            className={classes.fullscreenButton}
            onClick={() => {
              toggleFullscreen(childOneRef);
            }}
            aria-label="Toggle fullscreen"
          >
            <MdFullscreen size={24} color="black" />
          </button>
        </div>
      </div> */
}
