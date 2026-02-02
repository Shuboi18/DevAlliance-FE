import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'User',
    initialState: null,
    reducers: {
        addUserInfo: (state, action) => {
            console.log("Payload in addUserInfo:", action.payload);
            return action.payload;
        },
        removeUserInfo:() => null,
    }
})

export const { addUserInfo, removeUserInfo } = UserSlice.actions;

export default UserSlice.reducer;