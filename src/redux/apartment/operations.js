import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const rentApi = axios.create({
  baseURL: "https://apartments-back.onrender.com/api",
  withCredentials: true,
});

export const getAllApartments = createAsyncThunk(
  "rent/getAll",
  async (queryString = "", { rejectWithValue }) => {
    try {
      const res = await rentApi.get(`/${queryString}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getApartmentById = createAsyncThunk(
  "rent/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await rentApi.get(`/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createApartment = createAsyncThunk(
  "rent/create",
  async (formData) => {
    const res = await rentApi.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const updateApartment = createAsyncThunk(
  "rent/update",
  async ({ id, formData }) => {
    const res = await rentApi.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const deleteApartment = createAsyncThunk("rent/delete", async (id) => {
  await rentApi.delete(`/${id}`);
  return id;
});
