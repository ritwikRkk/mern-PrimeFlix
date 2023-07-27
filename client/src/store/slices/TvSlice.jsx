import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/modules/media.api";

const initialState = {
    tvContent: [],
    tvGenre: [],
    isLoading: true,
    error: null,
}

export const fetchTvContent = createAsyncThunk(
    'fetchTvContent',
    async (req) => {
        const media = await mediaApi.getList({ mediaType: req.mediaType, qs: req.qs });
        const genre = await mediaApi.getGenre({ mediaType: req.mediaType });
        // console.log({ media, genre })
        return { media, genre }
    }
)
const tvSlice = createSlice({
    name: "Tv",
    initialState,
    reducers: {
        getNewTvContent(state, action) {
            // console.log(action.payload);
            return {
                ...state,
                tvContent: state.tvContent.concat(action.payload)
            }
            // state.movieContent.concat(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTvContent.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTvContent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tvContent = action.payload.media.data.results;
            state.tvGenre = action.payload.genre.data.genres;
        })
        builder.addCase(fetchTvContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

});
export default tvSlice.reducer;
export const { getNewTvContent } = tvSlice.actions;