import { createSlice } from "@reduxjs/toolkit";
// import { cartData } from "./cartData";

// localStorage로 'cartData' 이름으로 받아오겠다는 선언
// (값이 있으면 parse로 받아오기, 없으면 빈배열 반환)
let cartData = localStorage.getItem("cartData")
  ? JSON.parse(localStorage.getItem("cartData"))
  : [];

// ======== cartDate 예시 ========
// {
//   id: 7,
//   title: "블링 스타피쉬 헤어핀",
//   img: "image7.jpg",
//   price: "24000",
//   category: "new",
//   discount: "0",
// },

let cart = createSlice({
  name: "cart",
  initialState: cartData, //import한 배열정보
  reducers: {
    //장바구니 관련
    addCount(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      //조건이 참일 경우, 해당 요소의 인덱스를 반환
      state[num].count++;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    minusCount(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      state[num].count--;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    delItem(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      state.splice(num, 1);
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    addItem(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      if (num === -1) state.push(action.payload);
      if (num !== -1) state[num].count += action.payload.count;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
  },
});

export const { addCount, minusCount, delItem, addItem } = cart.actions;
export default cart;

//내보내기
