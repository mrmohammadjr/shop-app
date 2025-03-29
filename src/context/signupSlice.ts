import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define types
export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: 'customer';
  creationAt: string
}

interface DataState {
  data: Data | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: DataState = {
  data: null,
  status: 'idle',
  error: null,
};

// Async thunk for signup
export const signupFetch = createAsyncThunk<Data, User>(
  'data/signup',
  async (userData: User) => {
    const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return response.json();
  }
);

// Create the slice
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupFetch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(signupFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default signupSlice.reducer;