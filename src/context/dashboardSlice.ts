import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Data } from "./signupSlice"
type DataTypes = {
  data : Data | null
  status: 'loading' | 'success' | 'error'
  error: string | null
}
type Info = {
  email: string
  password: string | number
}
const initialState: DataTypes = {
  data: null,
  status: 'loading',
  error: null
};
export const dashboardFetch = createAsyncThunk<Data,Info>('data/dashboard', async (data:Info) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users')
  const resJson = await response.json()
  const user = resJson.find((item:any) => item.email === data.email && item.password === data.password);
  console.log("hh",user);
  return user
})
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(dashboardFetch.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(dashboardFetch.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default dashboardSlice.reducer;