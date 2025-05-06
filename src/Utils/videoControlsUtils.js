import {
  togglePlayPause,
  setCurrentTime,
  setDragging,
  pause,
  play,
  setStartPlayingAfterSeek,
} from "../Slices/videoSlice";
import { useSelector, useDispatch } from "react-redux";

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
};

export const handleScrubberDragStart = (dispatch, value, isPlaying) => {
  dispatch(setCurrentTime(value));
  dispatch(setDragging(true));
};

export const handleScrubberDragEnd = (dispatch, startPlayingAfterSeek) => {
  // dispatch(setCurrentTime(value));
  dispatch(setDragging(false));
};

export const handlePlayPause = (dispatch) => {
  dispatch(togglePlayPause());
};
