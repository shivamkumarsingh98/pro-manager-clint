import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShareTask } from "./ShareTaskAPI";

const initialState = {
  task: {},
  toggle: false,
  fetching: false,
};

export const getShareTaskAsync = createAsyncThunk(
  "shareTask/getTask",
  async (data) => {
    try {
      const response = await getShareTask(data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const ShareTaskSlice = createSlice({
  name: "shareTask",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getShareTaskAsync.pending, (state, action) => {
        state.fetching = true;
      })
      .addCase(getShareTaskAsync.fulfilled, (state, action) => {
        if (!state.task?.id) {
          state.fetching = false;
          const { task } = action.payload;
          state.task = task;
          state.toggle = state.toggle ? false : true;
        }
        state.fetching = false;
      })
      .addCase(getShareTaskAsync.rejected, (state, action) => {
        state.fetching = false;
      });
  },
});
export const task = (state) => state.shareTask.task;
export const toggle = (state) => state.shareTask.toggle;
export const fetching = (state) => state.shareTask.fetching;
export default ShareTaskSlice.reducer;
