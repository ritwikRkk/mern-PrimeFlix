import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import castApi from "../../api/modules/cast.api";
// import mediaApi from "../../api/modules/media.api";

const initialState = {
    castDetails: [],
    castMedias: [],
    isLoading: true,
    error: null,
}

// Md = mediaDetails
export const fetchCast = createAsyncThunk(
    'fetchCast',
    async (req) => {
        const cast = await castApi.getCastDetail({ castId: req.castId });
        const media = await castApi.getMedias({ castId: req.castId });
        // console.log({ media, genre })
        return { cast, media }
    }
)

const deleteDup = (state)=>{
    // DELETING PREVIOUS LOADED MOVIE KEYS
    let arr = Object.keys(state);
    let regex =/^[0-9]/;
    let loadedArr = arr.filter((elem)=> regex.test(elem));
    loadedArr.forEach((elem)=> {
        delete state[elem];
    })
    // console.log(loadedArr);
}

const castSlice = createSlice({
    name: "cast",
    initialState,
    reducers: {
        // getMovie(state, action) {
        //     return initialState
        // }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCast.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCast.fulfilled, (state, action) => {
            deleteDup(state);
            state.isLoading = false;
            // console.log(action.payload);
            state.castDetails = action.payload.cast.data;
            state.castMedias = action.payload.media.data.cast;
            state[`${action.payload.cast.data.id}isLoading`] = false;
            // delete state.isLoading;
        })
        builder.addCase(fetchCast.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

});
export default castSlice.reducer;
// export const { getMovie } = movieSlice.actions;