import { createSlice } from "@reduxjs/toolkit";

const ConnectionRequestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addConnectionReq: (state, action) => action.payload,
    removeConnectionReq: (state, action) => {
      const newArray = state.filter((item) => item._id !== action.payload);
      return newArray;
    }
  },
});

export const { addConnectionReq, removeConnectionReq } = ConnectionRequestSlice.actions;

export default ConnectionRequestSlice.reducer;
