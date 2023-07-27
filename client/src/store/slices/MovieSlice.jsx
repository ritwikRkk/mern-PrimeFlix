import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/modules/media.api";

const initialState = {
    movieContent: [],
    movieGenre: [],
    isLoading: true,
    error: null,
}

export const fetchMovieContent = createAsyncThunk(
    'fetchMovieContent',
    async (req) => {
        const media = await mediaApi.getList({ mediaType: req.mediaType, qs: req.qs});
        const genre = await mediaApi.getGenre({ mediaType: req.mediaType });
        // console.log({ media, genre })
        return { media, genre }
    }
)
const movieSlice = createSlice({
    name: "Movie",
    initialState,
    reducers: {
        getNewMovieContent(state, action) {
            // console.log(action.payload);
            return{
                ...state,
                movieContent: state.movieContent.concat(action.payload)
            }
            // state.movieContent.concat(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchMovieContent.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMovieContent.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log(action.payload.media.data.results)
            // console.log(action.payload.genre.data.genres)
            state.movieContent = action.payload.media.data.results;
            state.movieGenre = action.payload.genre.data.genres;
        })
        builder.addCase(fetchMovieContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

});
export default movieSlice.reducer;
export const { getNewMovieContent } = movieSlice.actions;