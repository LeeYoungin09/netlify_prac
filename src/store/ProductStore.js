import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// redux 메뉴얼참고

// createAsyncThunk(action이름, promise로 반환되는 콜백함수)- 비동기시
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (category) => {
    let url = `https://my-json-server.typicode.com/LeeYoungin09
    /netlify_prac/products`;
    if (category) {
      url += `?category=${category}`;
    }
    let response = await fetch(url); //데이터담기
    let data = await response.json(); //json변경
    return data;
  }
);

let products = createSlice({
  name: "products",
  // Promise 객체는 다음 세 가지 상태 반환
  initialState: {
    // state(전체정보)
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // 함수이름 : (state, action )=>{},
    loadData: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        // state(전체정보) 상태확인
        state.status = "loading";
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// extraReducers : 함수

export const { extraReducers } = products.actions;
export default products;
