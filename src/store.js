// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import destinationSlice from "./Slices/destinationSlice";
import videoSlice from "./Slices/videoSlice";
import deviceSlice from "./Slices/deviceSlice";
import configurationSlice from "./Slices/configurationSlice";
import controlCardSlice from "./Slices/controlCardSlice"; // Import the controlCardSlice

const store = configureStore({
  reducer: {
    destinations: destinationSlice,
    video: videoSlice,
    device: deviceSlice,
    configuration: configurationSlice,
    controlCard: controlCardSlice, // Add the controlCardSlice to the store
  },
});

export default store;
