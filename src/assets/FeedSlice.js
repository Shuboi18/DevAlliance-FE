import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addFeedInfo: (state, action) => {
      return action.payload;
    },
    removeFeedInfo: (state, action) => {
      const newArray = state.filter((item) => item._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeedInfo, removeFeedInfo } = FeedSlice.actions;

export default FeedSlice.reducer;
