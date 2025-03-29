// app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataSlice';
import loginReducer from './loginSlice';
import dashboardReducer from './dashboardSlice';
import signupReducer from './signupSlice';
import cartReducer from './cartSlice'; // مسیر فایل cartSlice 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux' 
export const store = configureStore({
  reducer: {
    data: dataReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
    signup: signupReducer,
    cart: cartReducer,
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector