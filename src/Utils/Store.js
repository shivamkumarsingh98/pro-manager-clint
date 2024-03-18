import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "../Redux/Board/BoardSlice";
import UserReducer from "../Redux/User/UserSlice";
import ShareTaskReducer from "../Redux/ShareTask/ShareTaskSlice";

export const store = configureStore({
  reducer: {
    board: BoardReducer,
    user: UserReducer,
    shareTask: ShareTaskReducer,
  },
});
