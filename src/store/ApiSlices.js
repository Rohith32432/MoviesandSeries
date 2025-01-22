import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state for the slice
const res = {
  loading: false,
  data: null,
  error: null,
};

// Define the async thunk for making API requests
export const makeRequest = createAsyncThunk(
  'api/makeRequest',
  async ({ method = 'GET', url, data }, { rejectWithValue }) => {
    try {
      const response = method === 'POST'
        ? await axios.post(url, data)
        : await axios.get(`${url}&api_key=ff7c0340a9933baee3f46968474a001c`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

// Create the slice
const apiSlice = createSlice({
  name: 'api',
  initialState:res,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(makeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export default apiSlice.reducer;
