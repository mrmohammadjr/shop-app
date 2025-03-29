// features/dataSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginFormData } from "../routes/Login/Login";

type Data = {
  access_token: string;
  refresh_token: string;
};

type DataTypes = {
  data: Data | null;
  status: 'login' | 'logout' | 'loading' | 'no_user';
  error: string | null;
};

const initialState: DataTypes = {
  data: null,
  status: 'logout',
  error: null,
};

// تابع برای بررسی localStorage و auto login
const checkAutoLogin = async () => {
  const storedData = localStorage.getItem("information");
  if (storedData) {
    const userData: LoginFormData = JSON.parse(storedData);
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('User not found');
      }
      
      const resJson = await response.json();
      if (resJson.access_token && resJson.refresh_token) {
        return resJson;
      }
    } catch (error) {
      localStorage.removeItem("information");
      throw error;
    }
  }
  return null;
};

// Async Thunk برای ورود معمولی
export const loginFetch = createAsyncThunk<Data, LoginFormData>(
  'data/login',
  async (data: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('User not found');
      }
      
      const resJson = await response.json();
      if (resJson.access_token && resJson.refresh_token) {
        localStorage.setItem("information", JSON.stringify(data));
        return resJson;
      }
      throw new Error('Invalid response data');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk برای Auto Login
export const autoLogin = createAsyncThunk<Data | null>(
  'data/autoLogin',
  async (_, { rejectWithValue }) => {
    try {
      const data = await checkAutoLogin();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => { 
      localStorage.removeItem("information");
      state.data = null; 
      state.status = 'logout'; 
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // حالت‌های مربوط به loginFetch
      .addCase(loginFetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginFetch.fulfilled, (state, action) => {
        state.status = 'login';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loginFetch.rejected, (state, action) => {
        if (action.payload === 'User not found') {
          state.status = 'no_user';
        } else {
          state.status = 'logout';
        }
        state.error = action.payload as string || 'Something went wrong';
      })

      // حالت‌های مربوط به autoLogin
      .addCase(autoLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'login';
          state.data = action.payload;
        } else {
          state.status = 'logout';
        }
        state.error = null;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        if (action.payload === 'User not found') {
          state.status = 'no_user';
        } else {
          state.status = 'logout';
        }
        state.error = action.payload as string || 'Something went wrong';
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;