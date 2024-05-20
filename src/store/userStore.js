import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  //사용할 변수의 이름선언
  initialState: {
    //변수리스트 (기본자료)
    username: "김수미",
    age: 31,
  },
  reducers: {
    //이름정보 업데이트
    changeName: (state, action) => {
      state.username = action.payload;
    },
    changeAge: (state, action) => {
      state.age += action.payload;
    },
  },
});

export const { changeName, changeAge } = user.actions;
export default user;
