import { createSlice } from "@reduxjs/toolkit";
import {
  createApartment,
  deleteApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
} from "./operations.js";

const initialState = {
  apartments: [],
  currentApartment: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    clearCurrentApartment(state) {
      state.currentApartment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllApartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = action.payload;
      })
      .addCase(getAllApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getApartmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApartmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApartment = action.payload;
      })
      .addCase(getApartmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createApartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApartment.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments.push(action.payload);
      })
      .addCase(createApartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = state.apartments.map((apt) =>
          apt._id === action.payload._id ? action.payload : apt
        );
        state.currentApartment = action.payload;
      })
      .addCase(updateApartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.apartments = state.apartments.filter(
          (apt) => apt._id !== action.payload
        );
      });
  },
});

export const { clearCurrentApartment } = slice.actions;
export const apartmentReducer = slice.reducer;
