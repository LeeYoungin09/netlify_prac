import { createSlice } from "@reduxjs/toolkit";

let stock = createSlice({
  name: "stock",
  //통상 변수와 같게 선언
  initialState: {
    pdstock: [10, 50, 30, 5, 4],
  },
});
export default stock;
