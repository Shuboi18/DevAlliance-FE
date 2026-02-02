import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: () => null,
    },
});

export const { addConnections, removeConnections } = ConnectionSlice.actions;

export default ConnectionSlice.reducer;