import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducers/cart";
import authSlice from "./reducers/auth";
const persistConfig = {
  key: "cart",
  storage,
};
const persistedCardReducer = persistReducer(persistConfig, cartReducer);
const persistAuthReducer = persistReducer(persistConfig, authSlice);
const store = configureStore({
  reducer: {
    cart: persistedCardReducer,
    auth: persistAuthReducer,
  },
});
export const persiststor = persistStore(store);
export default store;
