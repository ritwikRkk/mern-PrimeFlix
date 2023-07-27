import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    isLoading: true,
    error: null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userDetails(state, action) {
            if (action.payload === undefined) {
                return initialState;
            } else {
                state.userInfo = action.payload;
                state.isLoading = false;

            }
        },
        deleteUser() {
            return initialState;
        },
    }
});
export default userSlice.reducer;
export const { userDetails, deleteUser } = userSlice.actions;