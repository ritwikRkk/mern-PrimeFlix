import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/modules/media.api";

const initialState = {
    mediaContent: [],
    isLoading: true,
    error: null,
}

export const fetchHomeContent = createAsyncThunk(
    'fetchHomeContent',
    async (req) => {
        // console.log(req.qs);
        const data = await mediaApi.getList({ mediaType: req.mediaType, qs: req.qs});
        return data;

    }
)
// export const fetchHomeContent = createAsyncThunk(
//     'fetchHomeContent',
//     async (req) => {
//         const data = await mediaApi.getList({ mediaType: req.mediaType, page: req.page, params: req.params});
//         return data;

//     }
// )

const homeSlice = createSlice({
    name: "Media",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchHomeContent.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
            state.isLoading = false
            state.mediaContent = action.payload.data.results;
        })
        builder.addCase(fetchHomeContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

});

export default homeSlice.reducer;
// export const { addUser } = homeSlice.actions;
// export const { getMedia } = homeSlice.actions;
// --------------------------------------------------------------- //
