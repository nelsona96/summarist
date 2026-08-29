import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (_, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export default librarySlice.reducer;

export const { setLibrary } = librarySlice.actions;
