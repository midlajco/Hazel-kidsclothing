import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId == product.id,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId != action.payload,
      );
    },
    increaseQ: (state, action) => {
      const item = state.items.find(
        (product) => product.productId === action.payload,
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQ: (state, action) => {
      const item = state.items.find(
        (product) => product.productId === action.payload,
      );
      if (item) {
        item.quantity--;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQ, decreaseQ, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
