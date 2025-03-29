import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  title: string;
  price: number;
  images: string[];
  count: number;
};

// خواندن اطلاعات از localStorage
const load = JSON.parse(localStorage.getItem("cart") || "[]");

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: load, // استفاده از load اگر وجود داشته باشد، در غیر این صورت آرایه خالی
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ id: number; title: string; price: number; images: string[] }>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // ذخیره در localStorage
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (state.items[itemIndex].count === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].count--;
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // ذخیره در localStorage
    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items)); // ذخیره در localStorage
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;