// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(sessionStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      sessionStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to local storage
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      sessionStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to local storage
    },
    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem('cartItems'); // Clear local storage
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
