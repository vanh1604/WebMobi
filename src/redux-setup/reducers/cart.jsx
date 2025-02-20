import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  items: [],
};
const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isProdcutExist = false;
      state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.quantity += action.payload.quantity;
          isProdcutExist = true;
        }
        return item;
      });
      if (!isProdcutExist) state.items.push(action.payload);
    },
    updatedItemCart: (state, action) => {
      state.items.map((item) => {
        if (item._id === action.payload.id) {
          item.quantity = Number(action.payload.quantity);
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      const newItem = state.items.filter((item) => item._id !== action.payload);
      state.items = newItem;
      toast.success("Item removed from cart");
    },
    resetCart: (state, action) => {
      state.items = [];
    },
  },
});
export const { addToCart, removeFromCart, updatedItemCart,resetCart } =
  cartReducer.actions;
export default cartReducer.reducer;
