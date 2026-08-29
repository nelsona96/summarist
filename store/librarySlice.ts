import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (state, action: PayloadAction<string[]>) => {
      state = action.payload;
    },
  },
});

export default librarySlice.reducer;

export const { setLibrary } = librarySlice.actions;
