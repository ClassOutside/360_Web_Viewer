import React from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  formatTime,
  handleScrubberDragEnd,
  handleScrubberDragStart,
  handlePlayPause,
} from "../Utils/videoControlsUtils";
import { toggleMute } from "../slices/videoSlice"; // Adjust the path as needed

const styles = {
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  playPauseButton: {
    fontSize: "30px",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#333",
    marginRight: "15px",
  },
  muteButton: {
    fontSize: "30px",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#333",
    marginLeft: "15px",
  },
  scrubberContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scrubber: {
    width: "100%",
    marginBottom: "5px",
  },
  timestampsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  timestamp: {
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
  },
};

const VideoControls = () => {
  const { currentTime, isPlaying, duration, muted } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();

  return (
    <div style={styles.controls}>
      <button
        style={styles.playPauseButton}
        onClick={() => {
          handlePlayPause(dispatch);
        }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <div style={styles.scrubberContainer}>
        <div style={styles.scrubber}>
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={(value) => handleScrubberDragStart(dispatch, value)}
            onChangeComplete={(value) => handleScrubberDragEnd(dispatch, value)}
            railProps={{
              style: { backgroundColor: "#bbb", height: 5 },
            }}
            trackProps={{
              style: { backgroundColor: "#4caf50", height: 5 },
            }}
            handleProps={{
              style: {
                borderColor: "#4caf50",
                backgroundColor: "#4caf50",
                height: 15,
                width: 15,
              },
            }}
          />
        </div>

        <div style={styles.timestampsContainer}>
          <span style={styles.timestamp}>{formatTime(currentTime)}</span>
          <span style={styles.timestamp}>{formatTime(duration)}</span>
        </div>
      </div>

      <button style={styles.muteButton} onClick={() => dispatch(toggleMute())}>
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default VideoControls;
