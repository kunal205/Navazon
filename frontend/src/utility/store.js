import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice.js";
import userRegisterSlice from "./UserSLice.js"
const store = configureStore({
  reducer: {
    products: ProductSlice,
    users: userRegisterSlice,
  },
});
export default store;
