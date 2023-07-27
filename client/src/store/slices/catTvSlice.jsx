import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/modules/media.api";

const initialState = {
    actionContent: [],
    comedyContent: [],
    animationContent: [],
    crimeContent: [],
    dramaContent: [],
    isLoading: true,
    error: null,
}

const genres = [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

export const fetchCatTvContent = createAsyncThunk(
    'fetchCatTvContent',
    async (req) => {
        const action = await mediaApi.getList({ mediaType: req.mediaType, qs: {page: req.qs.page, with_genres: genres[0].id} });
        const comedy = await mediaApi.getList({ mediaType: req.mediaType, qs: {page: req.qs.page, with_genres: genres[2].id} });
        const animation = await mediaApi.getList({ mediaType: req.mediaType, qs: {page: req.qs.page, with_genres: genres[1].id} });
        const crime = await mediaApi.getList({ mediaType: req.mediaType, qs: {page: req.qs.page, with_genres: genres[3].id} });
        const drama = await mediaApi.getList({ mediaType: req.mediaType, qs: {page: req.qs.page, with_genres: genres[5].id} });
        return {action, comedy, animation, crime, drama};
    }
)

const catTvSlice = createSlice({
    name: "catTv",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchCatTvContent.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCatTvContent.fulfilled, (state, action) => {
            state.isLoading = false
            state.actionContent = action.payload.action.data.results;
            state.comedyContent = action.payload.comedy.data.results;
            state.animationContent = action.payload.animation.data.results;
            state.crimeContent = action.payload.crime.data.results;
            state.dramaContent = action.payload.drama.data.results;
        })
        builder.addCase(fetchCatTvContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

});

export default catTvSlice.reducer;
// --------------------------------------------------------------- //
