import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  isXR: false,
  thumbStickTriggered: false,
  canFullScreen: false, // Add canFullScreen state
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsXR: (state, action) => {
      state.isXR = action.payload;
    },
    setThumbStickTriggered: (state, action) => {
      state.thumbStickTriggered = action.payload;
    },
    setCanFullScreen: (state, action) => {
      state.canFullScreen = action.payload;
    },
  },
});

export const {
  setIsMobile,
  setIsXR,
  setThumbStickTriggered,
  setCanFullScreen,
} = deviceSlice.actions;
export default deviceSlice.reducer;
