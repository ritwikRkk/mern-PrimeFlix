import { createSlice } from "@reduxjs/toolkit";

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import favoriteApi from "../../api/modules/favorites.api";

const initialState = {
    favoritesArr: [],
    isLoading: true,
    error: null,
}

// export const fetchFavorites = createAsyncThunk(
//     'fetchFavorites',
//     async (token) => {
//         const favorites = await favoriteApi.getFavorites(token);
//         // console.log(favorites);
//         return { favorites }
//     }
// )

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        getFavorites(state, action) {
            if (action.payload === undefined) {
                return initialState;
            } else {
                state.favoritesArr = action.payload;

            }
        },
        addFavorite(state, action) {
            // console.log(action.payload);
            state.favoritesArr.push(action.payload)
        },
        removeFavorite(state, action) {
            return {
                favoritesArr: [
                    ...state.favoritesArr.filter(elem => elem._id !== action.payload)
                ]
            }
        },
        deleteFavorites(state, action) {
            return initialState;
        },
    },

    // extraReducers: (builder) => {
    //     builder.addCase(fetchFavorites.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     builder.addCase(fetchFavorites.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.favoritesArr = action.payload.favorites.favourites;
    //         // console.log(action.payload);
    //     })
    //     builder.addCase(fetchFavorites.rejected, (state, action) => {
    //         state.isLoading = false
    //         state.error = action.error.message
    //     })
    // },

});
export default favoriteSlice.reducer;
export const { getFavorites, addFavorite, removeFavorite, deleteFavorites } = favoriteSlice.actions;