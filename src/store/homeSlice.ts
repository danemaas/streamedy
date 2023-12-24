//package imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//local imports
import { JsonMovieResponse } from "../types";

export interface HomeState {
  url: JsonMovieResponse;
  genres: Object;
}

const initialState: HomeState = {
  url: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action: PayloadAction<JsonMovieResponse>) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
