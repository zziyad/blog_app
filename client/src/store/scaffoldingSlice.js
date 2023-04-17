import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import scaffolding from '../system/client';
import produce from 'immer';
const { api } = scaffolding;

export const loadData = createAsyncThunk(
  'scaffolding/loadData',
  async ({ type, method, args = {} }) => {
    await scaffolding.load(type);
    const response = args === {} ? await api[type][method]() :
      await api[type][method](args);
    return response;
  }
);


const scaffoldingSlice = createSlice({
  name: 'scaffolding',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loadData.fulfilled, produce((state, { payload }) => {
        state.status = 'fulfilled';
        state.data = payload;
      }))
      .addCase(loadData.rejected, produce((state, { error }) => {
        state.status = 'rejected';
        state.error = error.message;
      }));
  },
});

export default scaffoldingSlice.reducer;