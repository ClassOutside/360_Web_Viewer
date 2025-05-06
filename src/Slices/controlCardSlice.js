import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vrMenuVisible: false,
  cardPosition: [2, 1, -3], // Add initial card position
};

const controlCardSlice = createSlice({
  name: "controlCard",
  initialState,
  reducers: {
    setVrMenuVisible: (state, action) => {
      state.vrMenuVisible = action.payload;
    },
    setCardPosition: (state, action) => {
      state.cardPosition = action.payload;
    },
  },
});

export const { setVrMenuVisible, setCardPosition } = controlCardSlice.actions;
export default controlCardSlice.reducer;
