import { configureStore } from "@reduxjs/toolkit";
import { apartmentReducer } from "./apartment/slice";

export const store = configureStore({
  reducer: {
    apartment: apartmentReducer,
  },
});
