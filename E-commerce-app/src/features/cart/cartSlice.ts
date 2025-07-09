
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./types";

const initialState: CartItem[] = JSON.parse(sessionStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const updated = state.filter(item => item.id !== action.payload);
      sessionStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    },
    clearCart() {
      sessionStorage.removeItem('cart');
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

