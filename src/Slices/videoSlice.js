import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false, // Video starts paused
  currentTime: 0, // Current playback time
  duration: 100, // Example duration (should be set dynamically)
  dragging: false, // Whether the scrubber is being dragged
  isVideo: false, // New state to track if the current media is a video
  muted: false, // New state for muted status
  sliderValue: 0, // New state for slider value
  startPlayingAfterSeek: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setDragging: (state, action) => {
      state.dragging = action.payload;
    },
    setIsVideo: (state, action) => {
      state.isVideo = action.payload;
    },
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
    setMuted: (state, action) => {
      state.muted = action.payload;
    },
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload;
    },
    setStartPlayingAfterSeek: (state, action) => {
      state.startPlayingAfterSeek = action.payload;
    },
  },
});

export const {
  togglePlayPause,
  play,
  pause,
  setCurrentTime,
  setDuration,
  setDragging,
  setIsVideo,
  toggleMute,
  setMuted,
  setSliderValue,
  setStartPlayingAfterSeek,
} = videoSlice.actions;

export default videoSlice.reducer;
