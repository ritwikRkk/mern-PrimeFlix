import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msgType: null,
    msgContent: null,
}

const msgSlice = createSlice({
    name: "msg",
    initialState,
    reducers: {
        msgDetails(state, action) {
            if (action.payload === undefined) {
                return initialState;
            } else {
                state.msgType = action.payload.msgType;
                state.msgContent = action.payload.msgContent;

            }
        },
        deleteMsg() {
            return initialState;
        },
    }
});
export default msgSlice.reducer;
export const { msgDetails, deleteMsg } = msgSlice.actions;