//package imports
import { configureStore } from "@reduxjs/toolkit";

//local imports
import homeReducer from "../store/homeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
