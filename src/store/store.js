import { configureStore } from "@reduxjs/toolkit";

import user from "./userStore";
import stock from "./stockStore";
import cart from "./cartStore";
import products from "./ProductStore";

export const store = configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
    // productstore.js 와 함께 추가
    products: products.reducer,
  },
  //reducer는 전달하는 역할만
});
