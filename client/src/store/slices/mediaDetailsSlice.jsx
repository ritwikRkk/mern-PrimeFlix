import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/modules/media.api";
import reviewApi from "../../api/modules/review.api";

const initialState = {
    mdContent: [],
    mdCast: [],
    mdPosters: [],
    mdBackdrops: [],
    mdVideos: [],
    mdRecommendations: [],
    mdReviews: [],
    isLoading: true,
    error: null,
}

// Md = mediaDetails
export const fetchMd = createAsyncThunk(
    'fetchMd',
    async (req) => {
        const media = await mediaApi.getMediaDetail({ mediaType: req.mediaType, mediaId: req.mediaId });
        const cast = await mediaApi.getCast({ mediaType: req.mediaType, mediaId: req.mediaId });
        const images = await mediaApi.getImages({ mediaType: req.mediaType, mediaId: req.mediaId });
        const videos = await mediaApi.getVideos({ mediaType: req.mediaType, mediaId: req.mediaId });
        const recommendations = await mediaApi.getRecommendations({ mediaType: req.mediaType, mediaId: req.mediaId });
        const reviews = await reviewApi.getReviews({ mediaType: req.mediaType, mediaId: req.mediaId });
        // console.log({ media, genre })
        // console.log({ reviews })
        return { media, cast, images, videos, recommendations, reviews }
    }
)

const deleteDup = (state) => {
    // DELETING PREVIOUS LOADED MOVIE KEYS
    let arr = Object.keys(state);
    let regex = /^[0-9]/;
    let loadedArr = arr.filter((elem) => regex.test(elem));
    loadedArr.forEach((elem) => {
        delete state[elem];
    })
    // console.log(loadedArr);
}

const mediaDetailsSlice = createSlice({
    name: "Md",
    initialState,
    reducers: {
        addReview(state, action) {
            // console.log(action.payload);
            state.mdReviews.unshift(action.payload);
        },
        updateReview(state, action) {
            // console.log(action.payload);
            return {
                ...state,
                mdReviews: [
                    ...state.mdReviews.map(obj => {
                        if (obj._id === action.payload.id) {
                            return { ...obj, reviewContent: action.payload.data };
                        }
                        return obj;
                    })
                ]
            }
        },
        removeReview(state, action) {
            // console.log(action.payload);
            return {
                ...state,
                mdReviews: [
                    ...state.mdReviews.filter(elem => elem._id !== action.payload)
                ]
            }
        },
        deleteMdState(state, action) {
            // console.log(action.payload);
            return initialState;
        },

    },

    extraReducers: (builder) => {
        builder.addCase(fetchMd.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMd.fulfilled, (state, action) => {
            deleteDup(state);
            state.isLoading = false;
            // console.log(action.payload);
            state.mdContent = action.payload.media.data;
            state.mdCast = action.payload.cast.data.cast;
            state.mdPosters = action.payload.images.data.posters;
            state.mdBackdrops = action.payload.images.data.backdrops;
            state.mdVideos = action.payload.videos.data.results;
            state.mdRecommendations = action.payload.recommendations.data.results;
            if (action.payload.reviews.success === true) {
                state.mdReviews = action.payload.reviews.reviews;
            } else {
                state.mdReviews = [];
            }
            state[`${action.payload.media.data.id}isLoading`] = false;
            // delete state.isLoading;
        })
        builder.addCase(fetchMd.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

});
export default mediaDetailsSlice.reducer;
export const { removeReview, updateReview, deleteMdState, addReview } = mediaDetailsSlice.actions;