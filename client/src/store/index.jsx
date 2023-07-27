
import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slices/HomeSlice";
// import movieSlice from "./slices/MovieSlice";
import movieSlice from "./slices/MovieSlice";
import tvSlice from "./slices/TvSlice";
import AdminSlice from "./slices/AdminSlice";
import mediaDetailsSlice from "./slices/mediaDetailsSlice";
import CastSlice from "./slices/CastSlice";
import catMovieSlice from "./slices/CatMovieSlice";
import catTvSlice from "./slices/catTvSlice";
import favoriteSlice from "./slices/FavoriteSlice";
import userSlice from "./slices/UserSlice";

const store = configureStore({
    reducer: {
        home: homeSlice,
        movies: movieSlice,
        tv: tvSlice,
        md: mediaDetailsSlice,
        cast: CastSlice,
        catMovie: catMovieSlice,
        catTv: catTvSlice,
        favorites: favoriteSlice,
        user: userSlice,
        adminNew: AdminSlice
    },
    devTools: false
});

export default store;