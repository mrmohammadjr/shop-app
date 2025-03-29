// features/dataSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
export interface Data {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
interface DataState {
  data: Data[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch data
export const fetchData = createAsyncThunk('data/fetchData', async (): Promise<Data[]> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products');
  const resJson = await response.json()
  return resJson;
});

// Create the slice
const singleDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default singleDataSlice.reducer;