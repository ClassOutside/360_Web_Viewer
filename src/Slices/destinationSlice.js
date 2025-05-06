import { createSlice } from "@reduxjs/toolkit";
import TourTypes from "../Constants/TourTypes";

const initialState = {
  destinations: [],
  loadedDestination: null,
  hotspotVisibility: [],
  detailCardVisibility: [],
  tourType: TourTypes.SLIDESHOW,
  isIconsHidden: false, // New state to manage icons visibility
  isTransitionInProgress: true, // Added new state for transition progress
};

const destinationSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
    setLoadedDestination: (state, action) => {
      state.loadedDestination = action.payload;
    },
    setHotspotVisibility: (state, action) => {
      state.hotspotVisibility = action.payload;
    },
    setDetailCardVisibility: (state, action) => {
      state.detailCardVisibility = action.payload;
    },
    setTourType: (state, action) => {
      state.tourType = action.payload;
    },
    toggleIconsVisibility: (state) => {
      state.isIconsHidden = !state.isIconsHidden;
    },
    setTransitionInProgress: (state, action) => {
      state.isTransitionInProgress = action.payload;
    },
  },
});

export const {
  setDestinations,
  setLoadedDestination,
  setHotspotVisibility,
  setDetailCardVisibility,
  setTourType,
  toggleIconsVisibility,
  setTransitionInProgress, // New action to update transition state
} = destinationSlice.actions;

export default destinationSlice.reducer;
