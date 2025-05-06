// src/Slices/configurationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //Defaults
  configuration: {
    distanceFromCameraToObjects: 10,
    SphereWidth: 32,
    SphereHeight: 32,
    InitialFOV: 45,
    OrbitControlsDampingFactor: 0.25,
    OrbitControlsRotateSpeed: -0.25,
    MinFOV: 10,
    MaxFOV: 90,
    FOVChangeRate: 0.05,
    FileLocation: "/slideshow.json",
  },
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setConfiguration: (state, action) => {
      state.configuration = action.payload;
    },
  },
});

export const { setConfiguration } = configurationSlice.actions;
export default configurationSlice.reducer;
